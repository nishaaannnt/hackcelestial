import axios from 'axios';
let server = process.env.REACT_APP_SERVER_API;
class Ratings {
    getRating(body) {
        try {
            axios.get(
                `${server}/rating?id=${body.job._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            )
        } catch (e) {
            throw e;
        }
    }
    putRating(body) {
        try {
            axios.put(
                `${server}/rating/`,
                body,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            )
        } catch (e) {
            throw e;
        }
    }
}

export default new Ratings();