const API = {

}

const getApiUrl = (pathname) =>  {
    let url = ""
    if(import.meta.env.PROD) {
            url = process.env.API_SERVER + pathname
    } else {
            url = `http://localhost:5050${pathname}`
            // url = import.meta.env.API_SERVER + pathname
    }
    return url;
}

export {API, getApiUrl};