import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertTestResultSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  app.get("/api/user/test-results", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const results = await storage.getUserTestResults(userId);
      res.json(results);
    } catch (error) {
      console.error("Error fetching user test results:", error);
      res.status(500).json({ error: "Failed to fetch user test results" });
    }
  });
  // Get test results
  app.get("/api/test-results", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
      const results = await storage.getTestResults(limit);
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch test results" });
    }
  });

  // Create test result
  app.post("/api/test-results", async (req, res) => {
    try {
      // Add userId if user is authenticated
      let testData = req.body;
      if (req.isAuthenticated() && req.user) {
        testData = { ...testData, userId: (req.user as any).claims.sub };
      }
      
      const data = insertTestResultSchema.parse(testData);
      const result = await storage.createTestResult(data);
      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create test result" });
      }
    }
  });

  // Get text samples endpoint
  app.get("/api/text-samples", async (req, res) => {
    const { language = "fr", difficulty = "medium", mode = "words" } = req.query;
    
    const textSamples = {
      fr: {
        easy: [
          "Le chat mange sa nourriture. Il fait beau aujourd'hui. La maison est grande. Les enfants jouent dans le jardin.",
          "La voiture roule sur la route. Le soleil brille dans le ciel. Les oiseaux chantent dans les arbres.",
          "Ma famille aime regarder des films. Nous mangeons du pain avec du beurre. Le chien court dans le parc.",
          "Les fleurs poussent dans le jardin. Le livre est sur la table. Mon ami habite près d'ici.",
          "La cuisine sent bon. Les vacances arrivent bientôt. J'aime me promener le matin.",
          "Le train part à huit heures. Cette chanson me plaît beaucoup. L'école ouvre ses portes.",
          "Les nuages cachent le soleil. Mon téléphone sonne souvent. La mer est calme aujourd'hui."
        ],
        medium: [
          "La programmation est l'art de dire à un ordinateur ce qu'il doit faire. C'est un processus créatif qui combine logique et imagination pour résoudre des problèmes complexes.",
          "L'intelligence artificielle transforme notre façon de travailler et de vivre. Les algorithmes d'apprentissage automatique permettent aux machines de s'améliorer continuellement.",
          "La révolution numérique a changé notre société de manière fondamentale. Les technologies émergentes offrent de nouvelles opportunités mais posent aussi des défis importants.",
          "L'environnement est devenu une préoccupation majeure de notre époque. Les changements climatiques affectent tous les aspects de notre vie quotidienne.",
          "L'éducation moderne doit s'adapter aux nouvelles réalités du monde numérique. Les étudiants d'aujourd'hui apprennent différemment de leurs parents.",
          "La médecine personnalisée promet de révolutionner les traitements. Chaque patient pourra bénéficier d'un plan de soins adapté à son profil génétique.",
          "L'économie collaborative transforme notre rapport à la consommation. Partager plutôt que posséder devient une tendance de fond."
        ],
        hard: [
          "L'algorithme de tri rapide utilise une approche diviser-pour-régner, partitionnant récursivement les éléments selon un pivot choisi judicieusement pour optimiser la complexité temporelle.",
          "Les structures de données sophistiquées comme les arbres équilibrés et les tables de hachage permettent d'atteindre des performances optimales dans les opérations de recherche et d'insertion.",
          "L'architecture microservices décompose les applications monolithiques en services indépendants, facilitant la scalabilité et la maintenance mais introduisant une complexité supplémentaire.",
          "La théorie de la complexité computationnelle étudie les ressources nécessaires pour résoudre des problèmes algorithmiques, notamment en termes de temps d'exécution et d'espace mémoire.",
          "Les protocoles de consensus distribués comme Raft et Byzantine Fault Tolerance garantissent la cohérence des données dans les systèmes répartis malgré les défaillances possibles.",
          "L'optimisation combinatoire cherche à trouver la meilleure solution parmi un ensemble fini de possibilités, souvent en utilisant des heuristiques et des métaheuristiques.",
          "Les réseaux de neurones convolutionnels exploitent la structure spatiale des données pour extraire automatiquement des caractéristiques pertinentes lors de l'apprentissage profond."
        ]
      },
      en: {
        easy: [
          "The cat eats its food. It is a beautiful day today. The house is big. Children play in the garden.",
          "The car drives on the road. The sun shines in the sky. Birds sing in the trees.",
          "My family loves watching movies. We eat bread with butter. The dog runs in the park."
        ],
        medium: [
          "Programming is the art of telling a computer what to do. It is a creative process that combines logic and imagination to solve complex problems.",
          "Artificial intelligence transforms how we work and live. Machine learning algorithms enable machines to improve continuously.",
          "The digital revolution has fundamentally changed our society. Emerging technologies offer new opportunities but also pose important challenges."
        ],
        hard: [
          "The quicksort algorithm uses a divide-and-conquer approach, recursively partitioning elements according to a carefully chosen pivot to optimize time complexity.",
          "Sophisticated data structures like balanced trees and hash tables enable optimal performance in search and insertion operations.",
          "Microservices architecture decomposes monolithic applications into independent services, facilitating scalability and maintenance while introducing additional complexity."
        ]
      },
      es: {
        easy: [
          "El gato come su comida. Hoy es un día hermoso. La casa es grande. Los niños juegan en el jardín.",
          "El coche conduce por la carretera. El sol brilla en el cielo. Los pájaros cantan en los árboles.",
          "Mi familia ama ver películas. Comemos pan con mantequilla. El perro corre en el parque."
        ],
        medium: [
          "La programación es el arte de decirle a una computadora qué hacer. Es un proceso creativo que combina lógica e imaginación para resolver problemas complejos.",
          "La inteligencia artificial transforma cómo trabajamos y vivimos. Los algoritmos de aprendizaje automático permiten que las máquinas mejoren continuamente.",
          "La revolución digital ha cambiado fundamentalmente nuestra sociedad. Las tecnologías emergentes ofrecen nuevas oportunidades pero también plantean desafíos importantes."
        ],
        hard: [
          "El algoritmo de ordenamiento rápido utiliza un enfoque de dividir y conquistar, particionando recursivamente los elementos según un pivote elegido cuidadosamente para optimizar la complejidad temporal.",
          "Las estructuras de datos sofisticadas como los árboles equilibrados y las tablas hash permiten un rendimiento óptimo en las operaciones de búsqueda e inserción.",
          "La arquitectura de microservicios descompone las aplicaciones monolíticas en servicios independientes, facilitando la escalabilidad y el mantenimiento mientras introduce complejidad adicional."
        ]
      },
      de: {
        easy: [
          "Die Katze frisst ihr Futter. Heute ist ein schöner Tag. Das Haus ist groß. Die Kinder spielen im Garten.",
          "Das Auto fährt auf der Straße. Die Sonne scheint am Himmel. Die Vögel singen in den Bäumen.",
          "Meine Familie liebt es, Filme zu schauen. Wir essen Brot mit Butter. Der Hund läuft im Park."
        ],
        medium: [
          "Programmierung ist die Kunst, einem Computer zu sagen, was er tun soll. Es ist ein kreativer Prozess, der Logik und Vorstellungskraft kombiniert, um komplexe Probleme zu lösen.",
          "Künstliche Intelligenz verändert, wie wir arbeiten und leben. Maschinelle Lernalgorithmen ermöglichen es Maschinen, sich kontinuierlich zu verbessern.",
          "Die digitale Revolution hat unsere Gesellschaft grundlegend verändert. Aufkommende Technologien bieten neue Möglichkeiten, stellen aber auch wichtige Herausforderungen dar."
        ],
        hard: [
          "Der Quicksort-Algorithmus verwendet einen Teile-und-Herrsche-Ansatz und partitioniert rekursiv die Elemente nach einem sorgfältig gewählten Pivot, um die Zeitkomplexität zu optimieren.",
          "Ausgeklügelte Datenstrukturen wie ausgeglichene Bäume und Hash-Tabellen ermöglichen optimale Leistung bei Such- und Einfügeoperationen.",
          "Die Microservices-Architektur zerlegt monolithische Anwendungen in unabhängige Dienste, erleichtert Skalierbarkeit und Wartung, führt aber zusätzliche Komplexität ein."
        ]
      }
    };

    const samples = textSamples[language as keyof typeof textSamples]?.[difficulty as keyof typeof textSamples.fr] || textSamples.fr.medium;
    
    // For time-based modes, generate longer text by combining multiple sentences
    if (mode === "1min" || mode === "3min" || mode === "5min") {
      let combinedText = "";
      const targetLength = mode === "1min" ? 400 : mode === "3min" ? 1200 : 2000;
      
      // Shuffle samples to create variety
      const shuffledSamples = [...samples].sort(() => Math.random() - 0.5);
      
      while (combinedText.length < targetLength) {
        for (const sample of shuffledSamples) {
          combinedText += (combinedText ? " " : "") + sample;
          if (combinedText.length >= targetLength) break;
        }
      }
      
      res.json({ text: combinedText });
    } else {
      // For word mode, return a single sentence
      const randomIndex = Math.floor(Math.random() * samples.length);
      let randomSample = samples[randomIndex];
      
      // For random difficulty, pick from all difficulties
      if (difficulty === 'random') {
        const allDifficulties = ['easy', 'medium', 'hard'];
        const randomDifficulty = allDifficulties[Math.floor(Math.random() * allDifficulties.length)];
        const randomDifficultySamples = textSamples[language as keyof typeof textSamples]?.[randomDifficulty as keyof typeof textSamples.fr] || textSamples.fr.medium;
        const randomDifficultyIndex = Math.floor(Math.random() * randomDifficultySamples.length);
        randomSample = randomDifficultySamples[randomDifficultyIndex];
      }
      
      res.json({ text: randomSample });
    }
  });

  // Leaderboard routes
  app.get('/api/leaderboard', async (req, res) => {
    try {
      const { region = 'world', timeRange = 'all-time' } = req.query;
      
      // Mock leaderboard data for demonstration
      const mockData = Array.from({ length: 20 }, (_, i) => ({
        rank: i + 1,
        userId: `user-${i + 1}`,
        username: `Utilisateur ${i + 1}`,
        wpm: Math.floor(Math.random() * 50) + 80,
        accuracy: Math.floor(Math.random() * 10) + 90,
        tests: Math.floor(Math.random() * 500) + 50,
        country: 'France',
        continent: 'Europe',
        isPremium: Math.random() > 0.7,
        profileImage: null
      }));
      
      res.json(mockData);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      res.status(500).json({ message: 'Failed to fetch leaderboard' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
