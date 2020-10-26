import { callFetch } from './call-fetch';

let spy;

beforeEach(() => {
    spy = jest.spyOn(window, 'fetch');
});

afterEach(() => {
    spy.mockRestore();
});

const url = '/test';
const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
};

describe('callFetch', () => {
    it('should call fetch with the given arguments and return the response', async () => {
        const mockResponse = { data: true };
        const mockJsonPromise = Promise.resolve(mockResponse);
        const mockFetchPromise = Promise.resolve({
            ok: true,
            json: () => mockJsonPromise
        });
        spy.mockImplementation(() => mockFetchPromise);

        const result = await callFetch(url, options);

        expect(result).not.toBeNull();
        const { error, response } = result;
        expect(error).toEqual(false);
        expect(response).toEqual(mockResponse);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(url, options);
    });
    it('sets the error when a network error occurs', async () => {
        const mockError = 'Network Error';
        const mockFetchPromise = Promise.reject(mockError);
        spy.mockImplementation(() => mockFetchPromise);

        const result = await callFetch(url, options);

        expect(result).not.toBeNull();
        const { error, response } = result;
        expect(error).toEqual(mockError);
        expect(response).toBeNull();
    });
    it('sets the error with the response status code when a 4xx or 5xx error occurs', async () => {
        const mock404Error = {
            ok: false,
            status: '404',
            statusText: 'Not found'
        };
        const mockFetchPromise = Promise.resolve(mock404Error);
        spy.mockImplementation(() => mockFetchPromise);

        const result = await callFetch(url, options);

        expect(result).not.toBeNull();
        const { error, response } = result;
        expect(error).toEqual(`Error: ${mock404Error.status}`);
        expect(response).toBeNull();
    });
});
