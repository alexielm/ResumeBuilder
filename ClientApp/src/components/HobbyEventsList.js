import React, { Component } from 'react';
import { MarkDown } from './MarkDown';

export class HobbyEventsList extends Component {
    static displayName = HobbyEventsList.name;

    constructor(props) {
        super(props);
        this.state = {
            events: this.props.timeLine.filter(event => event.eventType === "Hobby")
        };
    }

    render() {
        return this.state.events.map((event, eventIndex) => {
            return (
                <div key={eventIndex} className="HobbyTimeLineEvent">
                    <div className="HobbyTitle">
                        {event.title}
                    </div>
                    <div className="HobbyRemarks">
                        {
                            event.remarks.map((remark, remarkIndex) => <div key={remarkIndex}><MarkDown>{remark}</MarkDown>.</div>)
                        }
                    </div>
                </div>
            );
        });
    }
}