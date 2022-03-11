import React, { Component } from 'react';
import { RemoveHttp, Period } from '../generalUtils/Utils';

import App from '../App';
import { HorizontalSpacer } from '../generalUtils/Utils';
import { MarkDown } from './MarkDown';
import { ViewControl } from '../generalUtils/ViewControl';

export class SpecificSkillsOrientedEventsList extends Component {
    static displayName = SpecificSkillsOrientedEventsList.name;

    render() {
        let skillTypes = App.FrontEndParameters.skillTypes;

        let skillSetType = this.props.skillSetType;
        let skillSet = skillTypes.find(skillType => skillType.name === skillSetType)?.members ?? [];

        let events =
            this.props.timeLine
                .filter(event => event.eventType === "Job")
                .map(event => {
                    let { career, ...newEvent } = event;
                    newEvent.career = career
                        .map(career => {
                            let { responsibilities, ...newCareer } = career;
                            newCareer.responsibilities = responsibilities
                                .map(responsibility => {
                                    let { disciplines, ...newResponsibility } = responsibility;
                                    newResponsibility.disciplines = disciplines.filter(discipline => skillSet.some(skill => skill === discipline));
                                    newResponsibility.otherDisciplines = disciplines.filter(discipline => !skillSet.some(skill => skill === discipline))
                                    return newResponsibility;
                                });
                            return newCareer;
                        });
                    return newEvent;
                })
                .map(event => ({
                    startDate: Math.min(...event.career.map(career => Date.parse(career.startDate))),
                    event
                }))
                .sort((left, right) => left.startDate === right.startDate ? 0 : (left.startDate < right.startDate ? 1 : -1))
                .map(event => event.event);

        return events.map((event, eventIndex) => {
            return (
                <div key={eventIndex} className="JobTimeLineEvent">
                    <div className="JobTimeLineHeader KeepTogether">
                        <div className="InstitutionHeader">
                            <span className="Institution">{event.institution}</span>
                            <ViewControl visible={event.web}>
                                <span className="InstitutionWeb">
                                    <a href={event.web} rel="noreferrer" target="_blank">({RemoveHttp(event.web)})</a>
                                </span>
                            </ViewControl>
                            <ViewControl visible={event.location}>
                                <span className="Location">{event.location}</span>
                            </ViewControl>
                        </div>
                        <ViewControl visible={event.remarks.length > 0}>
                            <div className="JobRemarks">
                                <ul>
                                    {
                                        event.remarks.map((remark, remarkIndex) => <li key={remarkIndex}><MarkDown>{remark}</MarkDown>.</li>)
                                    }
                                </ul>
                            </div>
                        </ViewControl>
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
                                        <div className="CareerHeader KeepTogether">
                                            <span className="Title">{career.title}</span>
                                            <span className="Period">{Period(career)}</span>
                                        </div>
                                        <ul className="Responsibilities">
                                            {
                                                career.responsibilities.map((responsibility, responsibilityIndex) => {
                                                    return <li key={responsibilityIndex} className={responsibility.disciplines.length > 0 ? "HighlightedResponsibility" : "" }>
                                                        <MarkDown className="JobDescription">
                                                            {
                                                                responsibility.description
                                                            }
                                                        </MarkDown>
                                                        <HorizontalSpacer />
                                                        built using
                                                        <HorizontalSpacer />
                                                        {
                                                            ((() => {
                                                                if (responsibility.disciplines.length === 0) {
                                                                    return responsibility.otherDisciplines.join(", ");
                                                                }
                                                                return <>
                                                                    <span className="HighlightedDisciplines">{responsibility.disciplines.join(", ")}.</span>
                                                                    < ViewControl visible={responsibility.otherDisciplines.length}>
                                                                        <HorizontalSpacer />
                                                                        Also used
                                                                        <HorizontalSpacer />
                                                                        {
                                                                            responsibility.otherDisciplines.join(", ")
                                                                        }.
                                                                    </ViewControl>
                                                                </>;
                                                            }))()
                                                        }
                                                    </li>;
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
