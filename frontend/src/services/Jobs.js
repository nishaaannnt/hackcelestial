import axios from 'axios';
let server = process.env.REACT_APP_SERVER_API;
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