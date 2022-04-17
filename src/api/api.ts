import axios from 'axios'

const createURL = () => {
    const location = document.location.hostname
    return `http://${location}${location === 'localhost' ? ':3001/': ''}`
}

export const instance = axios.create({
    baseURL: createURL()
})