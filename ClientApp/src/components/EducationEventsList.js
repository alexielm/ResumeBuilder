import React from 'react';
import { RemoveHttp, Period } from '../generalUtils/GeneralUtils';
import { MarkDown } from './MarkDown';

export const EducationEventsList = ({ timeLine }) =>
    timeLine
        .filter(event => event.eventType === "Education")
        .sort((left, right) => left.startDate === right.startDate ? 0 : (left.startDate < right.startDate ? 1 : -1))
        .map((event, eventIndex) => (
            <div key={eventIndex} className="EducationTimeLineEvent">
                <div className="EducationHeader">
                    <span className="Program">{event.program}</span>
                    <span className="Period">{Period(event)}</span>
                </div>
                <div className="InstitutionHeader">
                    <span className="Institution">{event.institution}</span>
                    {
                        event.web ? <span className="InstitutionWeb"><a href={event.web} rel="noreferrer" target="_blank">({RemoveHttp(event.web)})</a></span> : ""
                    }
                    {
                        event.location ? <span className="Location">{event.location}</span> : ""
                    }
                </div>
                <div>
                    {
                        event.achievements.length === 1 ?
                            <ul>
                                <li>
                                    {event.achievements[0]}
                                </li>
                            </ul>
                            :
                            <ul>
                                {event.achievements.map((achievement, achievementIndex) => <li key={achievementIndex}><MarkDown>{achievement}</MarkDown>.</li>)}
                            </ul>
                    }
                </div>
            </div>
        ))
