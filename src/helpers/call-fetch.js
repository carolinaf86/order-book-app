import 'whatwg-fetch';

export const callFetch = (url, options) => {
    return window.fetch(url, options)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.status);
            }
        })
        .then((response) => {
            return {
                error: false,
                response,
            };
        })
        .catch((err) => {
            return {
                error: err.toString(),
                response: null,
            };
        });
};
