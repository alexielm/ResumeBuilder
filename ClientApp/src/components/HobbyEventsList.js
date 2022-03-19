import React from 'react';
import { MarkDown } from './MarkDown';
import { ViewControl } from '../generalUtils/ViewControl';

export const HobbyEventsList = ({ timeLine }) =>
    timeLine
        .filter(event => event.eventType === "Hobby")
        .map((event, eventIndex) => (
            <div key={eventIndex} className="HobbyTimeLineEvent">
                <div className="HobbyTitle">
                    {event.title}
                </div>
                <div className="HobbySet">
                    <div className="HobbyRemarks">
                        {
                            event.remarks.map((remark, remarkIndex) => <div key={remarkIndex}><MarkDown>{remark}</MarkDown>.</div>)
                        }
                    </div>
                    <ViewControl visible={event.disciplines.length}>
                        <div className="JobEnviroment">
                            Environment: {
                                event.disciplines.sort().join(", ")
                            }
                        </div>
                    </ViewControl>
                </div>
            </div>
        ))
