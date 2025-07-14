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
    
    const { params } = req.query;
    const [region = 'world', continent = 'Europe', country = 'France', timeRange = 'all-time'] = 
      Array.isArray(params) ? params : [params || 'world'];
    
    // Generate different data based on filters
    const getCountryList = (selectedRegion: string, selectedContinent: string, selectedCountry: string) => {
      if (selectedRegion === 'world') {
        return ['France', 'Canada', 'Belgique', 'Suisse', 'États-Unis', 'Royaume-Uni', 'Allemagne', 'Espagne', 'Italie', 'Brésil'];
      } else if (selectedRegion === 'continent') {
        const continentCountries: Record<string, string[]> = {
          'Europe': ['France', 'Belgique', 'Suisse', 'Royaume-Uni', 'Allemagne', 'Espagne', 'Italie'],
          'Amérique du Nord': ['Canada', 'États-Unis'],
          'Amérique du Sud': ['Brésil'],
          'Asie': ['Japon', 'Corée du Sud', 'Chine'],
          'Afrique': ['Maroc', 'Tunisie', 'Algérie'],
          'Océanie': ['Australie', 'Nouvelle-Zélande']
        };
        return continentCountries[selectedContinent as string] || ['France'];
      } else {
        return [selectedCountry as string];
      }
    };
    
    const availableCountries = getCountryList(region as string, continent as string, country as string);
    
    // Generate comprehensive test data with 100 users from different regions
    const allCountries = [
      'France', 'Belgique', 'Suisse', 'Royaume-Uni', 'Allemagne', 'Espagne', 'Italie', 'Portugal', 'Pays-Bas', 'Autriche',
      'Canada', 'États-Unis', 'Brésil', 'Argentine', 'Chili', 'Japon', 'Corée du Sud', 'Chine', 'Inde', 'Australie',
      'Nouvelle-Zélande', 'Maroc', 'Tunisie', 'Algérie', 'Afrique du Sud', 'Sénégal', 'Côte d\'Ivoire', 'Cameroun',
      'Madagascar', 'Maurice', 'Suède', 'Norvège', 'Danemark', 'Finlande', 'Pologne', 'République tchèque', 'Hongrie',
      'Roumanie', 'Bulgarie', 'Grèce', 'Croatie', 'Slovénie', 'Slovaquie', 'Lituanie', 'Lettonie', 'Estonie'
    ];
    
    const continentMap: Record<string, string> = {
      'France': 'Europe', 'Belgique': 'Europe', 'Suisse': 'Europe', 'Royaume-Uni': 'Europe', 'Allemagne': 'Europe',
      'Espagne': 'Europe', 'Italie': 'Europe', 'Portugal': 'Europe', 'Pays-Bas': 'Europe', 'Autriche': 'Europe',
      'Canada': 'Amérique du Nord', 'États-Unis': 'Amérique du Nord', 'Brésil': 'Amérique du Sud', 'Argentine': 'Amérique du Sud',
      'Chili': 'Amérique du Sud', 'Japon': 'Asie', 'Corée du Sud': 'Asie', 'Chine': 'Asie', 'Inde': 'Asie',
      'Australie': 'Océanie', 'Nouvelle-Zélande': 'Océanie', 'Maroc': 'Afrique', 'Tunisie': 'Afrique', 'Algérie': 'Afrique'
    };
    
    const frenchNames = [
      'Pierre', 'Marie', 'Jean', 'Françoise', 'Michel', 'Monique', 'Alain', 'Catherine', 'Philippe', 'Nathalie',
      'Patrick', 'Isabelle', 'Bernard', 'Sylvie', 'Christophe', 'Martine', 'Christian', 'Brigitte', 'Daniel', 'Nicole',
      'Laurent', 'Christine', 'Stéphane', 'Véronique', 'Frédéric', 'Sandrine', 'Julien', 'Valérie', 'Sébastien', 'Céline'
    ];
    
    // Generate realistic leaderboard data
    const leaderboardData = Array.from({ length: 100 }, (_, i) => {
      const userId = `user-${i + 1}`;
      const selectedCountry = availableCountries[i % availableCountries.length];
      const continent = continentMap[selectedCountry] || 'Europe';
      
      // Generate country-specific name
      let username;
      if (selectedCountry === 'France' || selectedCountry === 'Belgique' || selectedCountry === 'Suisse') {
        username = frenchNames[i % frenchNames.length] + (i + 1);
      } else {
        username = `Utilisateur${i + 1}`;
      }
      
      // Generate performance based on rank with some randomness
      const baseWpm = Math.max(30, 120 - i * 0.5 + Math.random() * 20);
      const wpm = Math.round(baseWpm);
      const accuracy = Math.round(Math.max(70, 100 - i * 0.1 + Math.random() * 10));
      const tests = Math.round(Math.max(50, 1000 - i * 5 + Math.random() * 500));
      const averageWpm = Math.round(wpm * (0.8 + Math.random() * 0.3));
      const bestWpm = Math.round(wpm * (1.1 + Math.random() * 0.2));
      const totalWords = Math.round(tests * averageWpm * 0.8);
      
      // Generate join date
      const joinDate = new Date();
      joinDate.setMonth(joinDate.getMonth() - Math.floor(Math.random() * 24));
      
      return {
        userId,
        username,
        wpm,
        accuracy,
        tests,
        country: selectedCountry,
        continent,
        isPremium: Math.random() < 0.15, // 15% premium users
        profileImage: null,
        averageWpm,
        bestWpm,
        totalWords,
        joinDate: joinDate.toISOString(),
        rank: i + 1
      };
    });
    
    // Apply time range filter (for demo purposes, we'll just randomize the data slightly)
    const filteredData = leaderboardData.map(user => ({
      ...user,
      wpm: timeRange === 'day' ? Math.round(user.wpm * (0.8 + Math.random() * 0.4)) : user.wpm
    }));
    
    // Sort by WPM descending and update ranks
    const sortedData = filteredData.sort((a, b) => b.wpm - a.wpm).map((user, index) => ({
      ...user,
      rank: index + 1
    }));
    
    res.json(sortedData);
  } catch (error) {
    console.error("Error in leaderboard API:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}