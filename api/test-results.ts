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
    
    if (req.method === 'GET') {
      // Return empty array for now
      res.json([]);
    } else if (req.method === 'POST') {
      // For now, just return success without saving
      const result = {
        id: Math.floor(Math.random() * 1000),
        ...req.body,
        createdAt: new Date().toISOString()
      };
      res.json(result);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error("Error in test-results API:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}