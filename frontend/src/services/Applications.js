import axios from 'axios';
let server = process.env.REACT_APP_SERVER_API;
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