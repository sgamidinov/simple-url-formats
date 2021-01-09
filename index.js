function toURLObject(text) {
    let result = {};

    try {
        result = new URL(text);
    } catch (e) {
        console.error(e);
    }

    return result;
}

function toJSON(urlInstance) {
    const urlJsonSkelet = {
        protocol: '',
        hostname: '',
        pathname: '',
        queryParams: {},
    }

    urlJsonSkelet.protocol = urlInstance.protocol;
    urlJsonSkelet.hostname = urlInstance.hostname;
    urlJsonSkelet.pathname = urlInstance.pathname;

    for (const pair of urlInstance.searchParams) {
        urlJsonSkelet.queryParams[pair[0]] = pair[1];
    }

    return JSON.stringify(urlJsonSkelet);
}

function removeSlashes(component) {
    return component.replace(/^\/|\/$/g, '');
}

function constructSearchParams(searchParamsObject) {
    return Object
        .keys(searchParamsObject)
        .map(key => `${key}=${searchParamsObject[key]}`)
        .join('&');
}

function fromJSON(urlJsonSkelet) {
    const jsObject = JSON.parse(urlJsonSkelet);
    const searchString = constructSearchParams(jsObject.queryParams);

    return `${removeSlashes(jsObject.protocol)}//${removeSlashes(jsObject.hostname)}/${removeSlashes(jsObject.pathname)}/?${searchString}`.trim();
}

function toBase64(source) {
    let targetAsString = '';

    if (typeof source === 'object') {
        targetAsString = JSON.stringify(source);
    } else {
        targetAsString = String(source);
    }

    return new Buffer
        .from(targetAsString)
        .toString('base64');
}

function fromBase64(base64String) {
    return new Buffer
        .from(base64String, 'base64')
        .toString('utf8');
}

module.exports = {
    toJSON,
    fromJSON,
    toBase64,
    fromBase64,
}
