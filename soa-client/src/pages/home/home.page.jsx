import {User} from "../../models/user";
import React from "react";
import UserService from "../../services/user.service";
import EventService from "../../services/event.service";
import "./home.page.css";

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            errorMessage: '',
            infoMessage: '',
            currentUser: new User()
        };
    }

    componentDidMount() {
        UserService.currentUser.subscribe(data => {
            this.setState({currentUser: data});
        });

        this.getAllEvents();
    }

    getAllEvents() {
        this.setState({events: {loading: true}});

        EventService.findAllEvents().then(products => {
            this.setState({events: products.data});
        });
    }

    buy(event) {
        if (!this.state.currentUser) {
            this.setState({errorMessage: 'You must be logged in to buy a product'});
            return;
        }
        EventService.findEventById(event.id).then(event => {
            var ticket = {event: event.data, userId: UserService.currentUserValue.id}
            EventService.createTicket(ticket).then(data => {
                this.setState({ infoMessage: 'Ticket successfully bought!' });
                this.props.history.push('/profile');
            }, error => {
                this.setState({ errorMessage: 'An error occurred' });
            });
        });
    }

    detail(event) {
        localStorage.setItem("currentEvent", JSON.stringify(event));
        this.props.history.push('/detail' + event.id);
    }

    render() {
        const { events, errorMessage, infoMessage } = this.state;
        return (
            <div className="home-container fade-in">
                {infoMessage && (
                    <div className="alert alert-success" role="alert">
                        <strong>Success! </strong> {infoMessage}
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                )}
                {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                        <strong>Error! </strong> {errorMessage}
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                )}

                {events.loading && <div className="loading">Loading events...</div>}

                {events.length > 0 && (
                    <>
                    <h2 className="text-center mb-4">Available Events</h2>
                    <div className="events-list">
                        {events.map((event, index) => (
                            <div key={index} className="event-card">
                                <div className="event-details">
                                    <h3>{event.performer}</h3>
                                    <p>
                                        <strong>Organiser:</strong> {event.organiser}
                                    </p>
                                    <p>
                                        <strong>Category:</strong> {event.category}
                                    </p>
                                    <p>{event.description}</p>
                                    <p className="event-price">${event.price}</p>
                                </div>
                                <div className="event-actions">
                                    <button className="btn btn-primary" onClick={() => this.buy(event)}>
                                        Buy
                                    </button>
                                    <button className="btn btn-secondary" onClick={() => this.detail(event)}>
                                        Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    </>
                )}
            </div>
        )
    }
}