import React, { Component } from 'react';
import { RemoveHttp, Period } from "../generalUtils/Utils";

export class EducationEventsList extends Component {
    static displayName = EducationEventsList.name;

    constructor(props) {
        super(props);
        this.state = {
            events: this.props.timeLine
                .filter(event => event.eventType === "Education")
                .sort((left, right) => left.startDate === right.startDate ? 0 : (left.startDate < right.startDate ? 1 : -1))
        };
    }

    render() {
        return this.state.events.map((event, eventIndex) => {
            return (
                <div key={eventIndex} className="EducationTimeLineEvent">
                    <div className="EducationHeader">
                        <span className="Program">{event.program}</span>
                        <span className="Period">{Period(event)}</span>
                    </div>
                    <div className="InstitutionHeader">
                        <span className="Institution">{event.institution}</span>
                        {
                            event.web ? <span className="InstitutionWeb"><a href={event.web}>({RemoveHttp(event.web)})</a></span> : ""
                        }
                        {
                            event.location ? <span className="Location">{event.location}</span> : ""
                        }
                    </div>
                    <div>
                        {event.description}
                    </div>
                </div>
            );
        });
    }
}
