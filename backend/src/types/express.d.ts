// src/types/express.d.ts

import "express"; // make sure Express types are loaded first

declare global {
  namespace Express {
    interface Request {
      user?: {
        publicKey: string;
      };
    }
  }
}

// Ensure this file is treated as a module (required by TS)
export {};
