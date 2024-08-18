const API = {

}

const getApiUrl = (pathname) =>  {
    let url = ""
    switch(process.env.NODE_ENV) {
        case 'production':
            url = process.env.API_SERVER + pathname
        break;
        default:
            url = `http://localhost:5050${pathname}`
        break;
    }
    return url;
}

export {API, getApiUrl};