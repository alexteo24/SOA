import React from "react";
import UserService from "../../services/user.service";
import EventService from "../../services/event.service";
import './profile.page.css';
export default class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        if (!UserService.currentUserValue) {
            this.props.history.push('/');
            return;
        }

        this.state = {
            user: UserService.currentUserValue,
            tickets: [],
            totalSpent: 0
        };
    }

    componentDidMount() {
        this.setState({
            tickets: {loading: true}
        });
        const user = this.state.user;
        EventService.findTicketsByUserId(user.id).then(tickets => {
            this.setState({tickets: tickets.data});
        });
        this.fetchTotalSpent(user);
    }

    fetchTotalSpent(user) {
        EventService.computeTotal(user.id).then(response => {
            this.setState({totalSpent: response.data});
        }).catch(error => {
            console.error(error);
        });
    }

    render() {
        const { tickets } = this.state;
        return (
            <div className="profile-container fade-in">
                <div className="profile-header">
                    <img className="profile-avatar" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="Profile" />
                    <h1>Hello, {this.state.user.name}!</h1>
                    <p className="total-spent">Total Spent: ${this.state.totalSpent.toFixed(2)}</p>
                </div>

                <div className="ticket-history">
                    <h2>Ticket History</h2>
                    {tickets.length > 0 ? (
                        <div className="ticket-list">
                            {tickets.map((ticket, index) => (
                                <div key={index} className="ticket-card">
                                    <div className="ticket-info">
                                        <h3>{ticket.event.performer}</h3>
                                        <p>
                                            <strong>Organiser:</strong> {ticket.event.organiser}
                                        </p>
                                        <p>
                                            <strong>Category:</strong> {ticket.event.category}
                                        </p>
                                        <p>{ticket.event.description}</p>
                                    </div>
                                    <div className="ticket-details">
                                        <p className="ticket-price">${ticket.event.price}</p>
                                        <p className="purchase-date">Purchased on: {new Date(ticket.purchaseDate).toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-tickets">
                            <p>You haven't purchased any tickets yet.</p>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}