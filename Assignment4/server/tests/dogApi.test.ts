import { describe, it, expect } from 'vitest';
import request from 'supertest';
import express, { Request, Response, NextFunction, Express } from 'express';
import cors from 'cors';
import dogRoutes from '../routes/dogRoutes';

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use('/api/dogs', dogRoutes);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

describe('Dog API Tests', () => {
  it('returns random dog image from /api/dogs/random', async () => {
    const response = await request(app).get('/api/dogs/random');

    expect(response.status).toBe(200);

    expect(response.body.success).toBe(true);

    expect(response.body.data).toBeDefined();

    expect(response.body.data.imageUrl).toBeDefined();

    expect(typeof response.body.data.imageUrl).toBe('string');
  });

  it('returns 404 and correct error for invalid route', async () => {
    const response = await request(app).get('/api/dogs/invalid');

    expect(response.status).toBe(404);

    expect(response.body.error).toBeDefined();
    
    expect(response.body.error).toBe('Route not found');
  });
});
