const proxy_url = 'https://whateverorigin.org/';
const query_string = 'get?url=';


export const getCorsProxiedURL = (request_url: string): URL => {
    return new URL(`${query_string}${request_url}`, proxy_url);
}

export const getCorsProxiedHref = (request_url: string): string => {
    return getCorsProxiedURL(request_url).href;
}


export const getCorsProxiedJSON = async (request_url: string): Promise<object> => {
    try {
        const proxied_href = getCorsProxiedHref(request_url);

        const resp = await fetch(proxied_href, {
            headers: {
            'Content-Type': 'application/json',
            // "Access-Control-Allow-Origin": "*",
            }
        });

        if (!resp.ok) {
            throw new Error(`Response status: ${resp.status}`);
        }

        const respDataWithProxyContext = await resp.json();
        const unproxiedRespData = JSON.parse(respDataWithProxyContext['contents']);
        return unproxiedRespData;
    }
    catch (error) {
        throw error;
    }
}