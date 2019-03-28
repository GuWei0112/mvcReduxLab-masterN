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
    SaveToDoFormData: (args) => {
        const url = '/ReduxLab/Graduation/SaveToDoFormData'
        return axios.post(url, args )
    },
    LoadToDoFormData: () => {
        const url = '/ReduxLab/Graduation/LoadToDoFormData'
        return axios.post(url)
    },
    DeleteToDoFormData: (args) => {
        const url = '/ReduxLab/Graduation/DeleteToDoFormData'
        console.log(args)
        return axios.post(url, args)
    },
    UpdateToDoFormData: (formData) => {
        const url = '/ReduxLab/Graduation/UpdateToDoFormData'
        console.log('SaveToDoFormData', formData)
        return axios.post(url, formData)
    },
    DeleteToDoCompleteData: (formData) => {
        const url = '/ReduxLab/Graduation/DeleteToDoCompleteData'
        return axios.post(url, formData)
    },
}
