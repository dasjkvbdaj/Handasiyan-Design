// api/cloudinary-signature.js

// Simple in-memory rate limiter for serverless function
const rateLimitMap = new Map();

export default async function handler(req, res) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Rate Limiting (10 requests per minute per IP)
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 10;

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
  } else {
    const data = rateLimitMap.get(ip);
    if (now > data.resetTime) {
      rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    } else {
      data.count++;
      if (data.count > maxRequests) {
        return res.status(429).json({ error: 'Too Many Requests' });
      }
    }
  }

  try {
    const { public_id } = req.body;
    
    // Validate public_id input
    if (!public_id || typeof public_id !== 'string') {
      return res.status(400).json({ error: 'Invalid public_id' });
    }

    // Sanitize input to prevent injection
    const sanitizedPublicId = public_id.replace(/[^a-zA-Z0-9_.-]/g, '');

    const timestamp = Math.round(new Date().getTime() / 1000);
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    const apiKey = process.env.VITE_CLOUDINARY_API_KEY;

    if (!apiSecret || !apiKey) {
      console.error('Missing Cloudinary credentials in server environment');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const signatureStr = `public_id=${sanitizedPublicId}&timestamp=${timestamp}${apiSecret}`;
    
    // Generate SHA-1 hash for signature
    const crypto = await import('crypto');
    const hash = crypto.createHash('sha1').update(signatureStr).digest('hex');

    return res.status(200).json({
      signature: hash,
      timestamp,
      apiKey
    });

  } catch (error) {
    console.error('Cloudinary Signature Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
