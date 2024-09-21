import axios from 'axios';
let server = "http://localhost:8000/api"
class Applications {
    getAllApplications() {
        try {
            return axios.get(
                `${server}/applications/`
            )
        } catch (e) {
            throw e;
        }
    }
    getUserApplications() {
        try {
            return axios.get(
                `${server}/applications/getUserApplications`
            )
        } catch (e) {
            throw e;
        }
    }
    updateStatusApplication(body) {
        try {
            return axios.put(
                `${server}/applications/:id`,
                body
            )
        } catch (e) {
            throw e;
        }
    }
}

export default new Applications();