import axios from 'axios';

let server = "http://localhost:8000/api";

class GeminiService {
    getAiReview(imageFile) {
        try {
            const formData = new FormData();
            formData.append('img', imageFile);
            return axios.post(`${server}/review/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
}

export default new GeminiService();
