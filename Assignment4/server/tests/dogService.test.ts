import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getRandomDogImage } from '../services/dogService';

describe('dogService', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    describe('Test 1. Positive. getRandomDogImage', () => {
        it('should return dog image when API call is successful', async () => {
            const mockData = {
                message: 'https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg',
                status: 'success'
            };

            const mockFetch = vi.fn().mockResolvedValue({
                ok: true,
                json: async () => mockData
            });
            vi.stubGlobal('fetch', mockFetch);

            const result = await getRandomDogImage();

            expect(result.imageUrl).toBe(mockData.message);
            expect(result.status).toBe('success');
            expect(mockFetch).toHaveBeenCalledOnce();
        });
    });

    describe('Test 2. Negative. getRandomDogImage', () => {
        it('should throw an error when API call fails', async () => {
            const mockFetch = vi.fn().mockResolvedValue({
                ok: false,
                status: 500
            });
            vi.stubGlobal('fetch', mockFetch);

            await expect(getRandomDogImage()).rejects.toThrow('Failed to fetch dog image: Dog API returned status 500');
            expect(mockFetch).toHaveBeenCalledOnce();
        });
    });
});