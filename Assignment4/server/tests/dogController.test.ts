import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getDogImage } from '../controllers/dogController';
import * as dogService from '../services/dogService';
import { Request, Response } from 'express';

vi.mock('../services/dogService');

describe('dogController', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    describe('Test 3. Positive. getDogImage', () => {
        it('should return 200 and dog image data when service succeeds', async () => {
            // Mock
            const mockDogData = {
                imageUrl: 'https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg',
                status: 'success'
            };
            vi.mocked(dogService.getRandomDogImage).mockResolvedValue(mockDogData);

            // Mock request and response
            const req = {} as Request;
            const res = {
                json: vi.fn(),
                status: vi.fn().mockReturnThis()
            } as unknown as Response;

            // Call controller
            await getDogImage(req, res);

            expect(res.json).toHaveBeenCalledWith({
                success: true,
                data: mockDogData
            });
            expect(dogService.getRandomDogImage).toHaveBeenCalledOnce();
        });
    });
});
