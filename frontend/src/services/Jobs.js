import axios from 'axios';
let server = "http://localhost:8000/api"
class Jobs {
    addJob(body) {
        try {
            return axios.post(
                `${server}/jobs`,
                body
            )
        } catch (e) {
            throw e;
        }
    }
}

export default new Jobs();