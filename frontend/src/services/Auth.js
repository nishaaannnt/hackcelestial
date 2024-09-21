import axios from 'axios';
let server = "https://hackcelestial.onrender.com/"
class Auth {
    login(body) {
        try {
            return axios.post(
                `${server}/auth/login`,
                body
            )

        } catch (e) {
            throw e;
        }
    }
    signup(body) {
        try {
            return axios.post(
                `${server}/auth/signup`,
                body
            )
        } catch (e) {
            throw e;
        }
    }
    sendEmail(body) {
        try {
            return axios.post(
                `${server}/auth/send_recovery_email`,
                body
            )
        } catch (error) {
            throw error;

        }
    }
    verifyEmail(body) {
        try {
            return axios.post(
                `${server}/auth/verify_otp`,
                body
            )
        } catch (error) {
            throw error;

        }
    }
    forgotPassword(body) {
        try {
            return axios.post(
                `${server}/auth/password/forgot`,
                body
            )
        } catch (e) {
            throw e;
        }
    }
    resetPassword(body) {
        try {
            return axios.post(
                `${server}/auth/password/reset`,
                body
            )
        } catch (e) {
            throw e;
        }
    }
}

export default new Auth();