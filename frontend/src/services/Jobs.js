import axios from 'axios';
let server = "https://hackcelestial.onrender.com/"
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