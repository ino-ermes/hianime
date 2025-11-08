/// <reference types="express" />

declare namespace Express {
  interface Request {
    user: { userId: string; role: 'admin' | 'user' };
  }
}
