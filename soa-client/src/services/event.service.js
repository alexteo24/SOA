import axios from 'axios';

let API_URL = 'http://localhost:8765/api/service';

class EventService {
    createTicket(ticket){
        return axios.post(`${API_URL}/ticket`, JSON.stringify(ticket), {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        });
    }

    findTicketsByUserId(userId){
        return axios.get(`${API_URL}/ticket/user/${userId}`, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        });
    }

    computeTotal(userId){
        return axios.get(`${API_URL}/ticket/total/${userId}`, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        });
    }

    findEventById(eventId){
        return axios.get(`${API_URL}/events/${eventId}`, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        });
    }

    findAllEvents(){
        return axios.get(`${API_URL}/events`,{
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        });
    }

    getTicketCount(eventId) {
        return axios.get(`${API_URL}/events/${eventId}/ticket-count`, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        });
    }
}

export default new EventService();