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
    
    // For now, return a simple unauthorized response
    // This will be handled properly once Vercel auth is configured
    res.status(401).json({ message: "Unauthorized" });
  } catch (error) {
    console.error("Error in auth/user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}