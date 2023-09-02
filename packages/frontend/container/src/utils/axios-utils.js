import axios from 'axios'
// import _ from 'lodash'

let CancelToken = axios.CancelToken


const withCancel = (cancelFn) => {
    return {
        cancelToken: new CancelToken(function executor(c) { cancelFn && cancelFn(c) })
    }
}


const client = () => {

    const defaultOptions = {
        headers: {}
    }
    return {
        get: (url, options = {}) => axios.get(url, { ...defaultOptions, ...options }),
        post: (url, data, options = {}) => axios.post(url, data, { ...defaultOptions, ...options }),
        put: (url, data, options = {}) => axios.put(url, data, { ...defaultOptions, ...options }),
        patch: (url, data, options = {}) => axios.patch(url, data, { ...defaultOptions, ...options }),
        delete: (url, data, options = {}) => axios.delete(url, { data, ...defaultOptions })
    }
}

const axiosInterceptor = () => {
        return axios.interceptors.response.use(async(response) => { return response }, async(error) => {

        if (401 === _.get(error, 'response.status')) {
            window.location = '/login/enter'
        } else if (403 === _.get(error, 'response.status')) {
            localStorage.removeItem(LOGGED_CUSTOMER)
            localStorage.removeItem(TOKEN_CUSTOMER)
            localStorage.removeItem(REFRESHTOKEN_CUSTOMER)
            window.location = '/'
        } else {
            return await Promise.reject(error || {});
        }
    })
    return true
}
var getFormData = function (obj, form, namespace) {
    var fd = form || new FormData(),
        formKey;

    for (let property in obj) {
        if (obj.hasOwnProperty(property)) {
            let val = obj[property]
            formKey = (namespace) ? `${namespace}[${property}]` : property

            if (_.isArray(val) || (_.isObject(val) && !(val instanceof File))) {
                getFormData(val, fd, formKey)
            } else {
                fd.append(formKey, val)
            }
        }
    }
    return fd;
}

export {
    client,
    axiosInterceptor,
    getFormData,
    withCancel
}