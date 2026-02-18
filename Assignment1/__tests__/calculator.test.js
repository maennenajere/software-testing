import { add, divide } from '../src/calculator';


describe('add', () => {
    it('adds two positive numbers', () => {
        expect(add(2, 3)).toBe(5);
    });

    it('adds negative numbers', () => {
        expect(add(-2, -3)).toBe(-5);
    });

    it('throws when inputs are not numbers', () => {
        expect(() => add('2', 3)).toThrow('add expects two numbers');
    });
});


describe('divide', () => {
    it('divides two positive numbers', () => {
        expect(divide(10, 2)).toBe(5);
    });

    it('throws error when first argument is not a number', () => {
        expect(() => divide('10', 2)).toThrow(TypeError);
        expect(() => divide('10', 2)).toThrow('Both arguments must be numbers');
    });

    it('throws error when second argument is not a number', () => {
        expect(() => divide(10, '2')).toThrow(TypeError);
        expect(() => divide(10, '2')).toThrow('Both arguments must be numbers');
    });

    it('throws error when argument is NaN', () => {
        expect(() => divide(NaN, 2)).toThrow(TypeError);
        expect(() => divide(NaN, 2)).toThrow('Arguments cannot be NaN');
    });

    it('throws error when dividing by zero', () => {
        expect(() => divide(10, 0)).toThrow(RangeError);
        expect(() => divide(10, 0)).toThrow('Division by zero is not allowed');
    });
});