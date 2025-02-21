import React from "react";
import EventService from "../../services/event.service";
import './detail.page.css'

export default class DetailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            event: JSON.parse(localStorage.getItem("currentEvent")) || {}, // ✅ Prevents crashes if null
            clients: [],
            errorMessage: "",
        };
    }

    componentDidMount() {
        this.getTicketCount();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.setState({ id: this.props.match.params.id }, () => {
                this.getTicketCount();
            });
        }
    }

    getTicketCount() {
        this.setState({ errorMessage: "" }); // Reset error before request

        EventService.getTicketCount(this.state.id)
            .then(response => {
                this.setState({ noTickets: response.data });
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    this.setState({ noTickets: [], errorMessage: "No sales have been registered yet." });
                } else {
                    this.setState({ errorMessage: "An error occurred while fetching data." });
                }
            });
    }

    render() {
        const { noTickets, event, errorMessage } = this.state;

        return (
            <div className="detail-container fade-in">
                {event ? (
                    <div className="event-detail-card">
                        <h1>{event.organiser || "Unknown Organiser"}</h1>
                        <div className="event-info">
                            <p>
                                <strong>Performer:</strong> {event.performer || "Unknown"}
                            </p>
                            <p>
                                <strong>Category:</strong> {event.category || "Uncategorized"}
                            </p>
                            <p>
                                <strong>Description:</strong> {event.description || "No description available"}
                            </p>
                            <p className="event-price">Price:
                                ${event.price !== undefined ? event.price.toFixed(2) : "N/A"}</p>
                        </div>
                        <div className="ticket-info">
                            <h2>Ticket Sales</h2>
                            {errorMessage ? (
                                <p className="error-message">{errorMessage}</p>
                            ) : (
                                <p className="ticket-count">
                                    Number of tickets sold: <span>{noTickets}</span>
                                </p>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="error-message">Event details not available.</div>
                )}
            </div>

        );
    }
}
