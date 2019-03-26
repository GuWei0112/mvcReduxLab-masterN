import axios from 'axios'

export default {
    SaveFormData: (formData) => {
        const url = '/ReduxLab/Graduation/SaveFormData'
        return axios.post(url, { formData })
    },
    LoadFormData: (args) => {
        const url = '/ReduxLab/Graduation/LoadFormData'
        return axios.post(url, args)
    },
    SaveToDoFormData: (formData) => {
        const url = '/ReduxLab/Graduation/SaveToDoFormData'
        console.log('SaveToDoFormData',formData)
        return axios.post(url, { formData })
    },
    UpdateToDoFormData: (args) => {
        const url = '/ReduxLab/Graduation/UpdateToDoFormData'
        return axios.post(url, args)
    },
    DeleteToDoFormData: (args) => {
        const url = '/ReduxLab/Graduation/DeleteToDoFormData'
        return axios.post(url, args)
    }
}
