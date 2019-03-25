import axios from 'axios'

export default {
    SaveFormData: (formData) => {
        const url = '/ReduxLab/Graduation/SaveFormData'
        return axios.post(url, { formData })
    },
    LoadFormData: (args) => {
        const url = '/ReduxLab/Graduation/LoadFormData'
        return axios.post(url, args)
    }
}
