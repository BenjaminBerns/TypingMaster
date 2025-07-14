import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
    
    const { language = "fr", difficulty = "medium", mode = "words" } = req.query;
    
    const textSamples = {
      fr: {
        easy: [
          "Le chat mange sa nourriture. Il fait beau aujourd'hui. La maison est grande. Les enfants jouent dans le jardin.",
          "La voiture roule sur la route. Le soleil brille dans le ciel. Les oiseaux chantent dans les arbres.",
          "Ma famille aime regarder des films. Nous mangeons du pain avec du beurre. Le chien court dans le parc."
        ],
        medium: [
          "La programmation est l'art de dire à un ordinateur ce qu'il doit faire. C'est un processus créatif qui combine logique et imagination pour résoudre des problèmes complexes.",
          "L'intelligence artificielle transforme notre façon de travailler et de vivre. Les algorithmes d'apprentissage automatique permettent aux machines de s'améliorer continuellement.",
          "La révolution numérique a changé notre société de manière fondamentale. Les technologies émergentes offrent de nouvelles opportunités mais posent aussi des défis importants."
        ],
        hard: [
          "L'algorithme de tri rapide utilise une approche diviser-pour-régner, partitionnant récursivement les éléments selon un pivot choisi judicieusement pour optimiser la complexité temporelle.",
          "Les structures de données sophistiquées comme les arbres équilibrés et les tables de hachage permettent d'atteindre des performances optimales dans les opérations de recherche et d'insertion.",
          "L'architecture microservices décompose les applications monolithiques en services indépendants, facilitant la scalabilité et la maintenance mais introduisant une complexité supplémentaire."
        ]
      },
      en: {
        easy: [
          "The cat eats its food. It's a beautiful day today. The house is big. The children play in the garden.",
          "The car drives on the road. The sun shines in the sky. The birds sing in the trees.",
          "My family loves watching movies. We eat bread with butter. The dog runs in the park."
        ],
        medium: [
          "Programming is the art of telling a computer what to do. It's a creative process that combines logic and imagination to solve complex problems.",
          "Artificial intelligence transforms how we work and live. Machine learning algorithms allow machines to continuously improve.",
          "The digital revolution has fundamentally changed our society. Emerging technologies offer new opportunities but also pose important challenges."
        ],
        hard: [
          "The quicksort algorithm uses a divide-and-conquer approach, recursively partitioning elements according to a carefully chosen pivot to optimize time complexity.",
          "Sophisticated data structures like balanced trees and hash tables enable optimal performance in search and insertion operations.",
          "Microservices architecture decomposes monolithic applications into independent services, facilitating scalability and maintenance while introducing additional complexity."
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
  } catch (error) {
    console.error("Error in text-samples API:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}