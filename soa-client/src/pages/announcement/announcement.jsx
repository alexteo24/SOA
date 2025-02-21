import React from "react";
import './announcement.css';

export default class Announcement extends React.Component {
    state = {
        events: [
            {organiser: "EventCorp", performer: "John Doe Band", description: "A night of live jazz music.", link: "localhost:8082/chat"}
        ]
    };

    render() {
        const discussions = this.state;
        return (
            <div className="announcement-container fade-in">
                <div className="announcement-header">
                    <h1>Announcements Board</h1>
                    <p>
                        Welcome to the announcement board! Here you can see announcements regarding existing or upcoming
                        events and
                        discuss them with the community.
                    </p>
                </div>

                <div className="announcements-list">
                    {discussions.events.length > 0 ? (
                        discussions.events.map((event, index) => (
                            <div key={event.id} className="announcement-card">
                                <div className="announcement-content">
                                    <h2>{event.performer}</h2>
                                    <p>
                                        <strong>Organiser:</strong> {event.organiser}
                                    </p>
                                    <p>{event.description}</p>
                                </div>
                                <div className="announcement-action">
                                    <a href={event.link} className="chat-button" target="_blank"
                                       rel="noopener noreferrer">
                                        Join Discussion
                                    </a>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-announcements">
                            <p>No announcements available yet.</p>
                        </div>
                    )}
                </div>
            </div>

        );
    }
}