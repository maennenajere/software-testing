import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import express from 'express';
import dogRoutes from '../routes/dogRoutes';
import * as dogController from '../controllers/dogController';

vi.mock('../controllers/dogController');

const app = express();
app.use(express.json());
app.use('/api/dogs', dogRoutes);

describe('dogRoutes', () => {
    describe('Test 4. Positive. GET /api/dogs/random', () => {
        it('should return 200 and the mocked dog data', async () => {
            const mockDogData = {
                imageUrl: 'https://images.dog.ceo/breeds/stbernard/n02109525_15579.jpg',
                status: 'success'
            };

            vi.mocked(dogController.getDogImage).mockImplementation(async (_req, res) => {
                res.status(200).json({
                    success: true,
                    data: mockDogData
                });
            });

            const response = await request(app).get('/api/dogs/random');

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data.imageUrl).toBe(mockDogData.imageUrl);
        });
    });

    describe('Test 5. Negative. GET /api/dogs/random', () => {
        it('should return 500 when the service/controller fails', async () => {
            const errorMessage = 'Failed to fetch dog image: Network error';
            vi.mocked(dogController.getDogImage).mockImplementation(async (_req, res) => {
                res.status(500).json({
                    success: false,
                    error: errorMessage
                });
            });

            const response = await request(app).get('/api/dogs/random');

            expect(response.status).toBe(500);
            expect(response.body.success).toBe(false);
            expect(response.body.error).toBe(errorMessage);
        });
    });
});