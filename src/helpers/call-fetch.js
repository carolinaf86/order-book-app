import 'whatwg-fetch';

export const callFetch = async (url, options, extractJson = true) => {
    try {
        let response = await window.fetch(url, options);

        if (response.ok) {

            if (extractJson) {
                response = await response.json()
            }

        } else {
            throw new Error(response.status?.toString());
        }

        return {
            error: false,
            response
        };

    } catch (error) {
        return {
            error: error.toString(),
            response: null,
        };
    }
};
