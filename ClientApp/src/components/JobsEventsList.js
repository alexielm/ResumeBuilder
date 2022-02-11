import React, { Component } from 'react';
import { RemoveHttp, Period } from "../generalUtils/Utils";

export class JobsEventsList extends Component {
    static displayName = JobsEventsList.name;

    constructor(props) {
        super(props);
        this.state = {
            events: this.props.timeLine
                .filter(event => event.eventType === "Job")
                .map(event => ({
                    startDate: Math.min(...event.career.map(career => Date.parse(career.startDate))),
                    event
                }))
                .sort((left, right) => left.startDate === right.startDate ? 0 : (left.startDate < right.startDate ? 1 : -1))
                .map(event => event.event)
        };
    }

    render() {
        return this.state.events.map((event, eventIndex) => {
            return (
                <div key={eventIndex} className="JobTimeLineEvent">
                    <div className="InstitutionHeader">
                        <span className="Institution">{event.institution}</span>
                        {
                            event.web ? <span className="InstitutionWeb"><a href={event.web} rel="noreferrer" target="_blank">({RemoveHttp(event.web)})</a></span> : ""
                        }
                        {
                            event.location ? <span className="Location">{event.location}</span> : ""
                        }
                    </div>
                    {
                        event.career
                            .map(career => ({
                                startDate: Date.parse(career.startDate),
                                career
                            }
                            ))
                            .sort((left, right) => left.startDate === right.startDate ? 0 : (left.startDate < right.startDate ? 1 : -1))
                            .map(career => career.career)
                            .map((career, careerIndex) => {
                                return (
                                    <div key={careerIndex} className="Career">
                                        <div className="CareerHeader">
                                            <span className="Title">{career.title}</span>
                                            <span className="Period">{Period(career)}</span>
                                        </div>
                                        <ul className="Responsibilities">
                                            {
                                                career.responsibilities.map((responsibility, responsibilityIndex) => {
                                                    return <li key={responsibilityIndex}>{responsibility}</li>;
                                                })
                                            }
                                        </ul>
                                    </div>
                                );
                            })
                    }
                </div>
            );
        });
    }
}
