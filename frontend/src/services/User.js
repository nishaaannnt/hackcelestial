import axios from 'axios';
let server = process.env.REACT_APP_SERVER_API;

class User {
    getUser(body) {
        try {
            return axios.get(
                `${server}/user/${body.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                }
            )
        } catch (e) {
            throw e;
        }
    }
    getAllusers() {
        try {
            return axios.get(
                `${server}/user/all`,
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
    updateUser(body) {
        console.log(body)
        try {
            return axios.put(
                `${server}/user/${body.user}`,
                body.data,
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
    deleteUser(body) {
        try {
            return axios.get(
                `${server}/user/deleteUser/${body.user}`, {

                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            }
            )
        } catch (e) {
            throw e;
        }
    }
    getAllAplicants() {
        try {
            return axios.get(
                `${server}/user/allApplicant`,
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
    getAllRecruitants() {
        try {
            return axios.get(
                `${server}/user/allRecruiter`,
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

export default new User();