import React from 'react';
import { RemoveHttp, Period } from '../generalUtils/GeneralUtils';

import { HorizontalSpacer } from '../generalUtils/GeneralUtils';
import MarkDown from './MarkDown';
import ViewControl from '../generalUtils/ViewControl';
import { SpecialLinks } from './SpecialLinks';

import App from '../App';

const SpecificSkillsOrientedEventsList = ({ timeLine, skillSetType }) => {

    let skillTypes = App.store.frontEndParameters.skillTypes;
    let skillSet = skillTypes.find(skillType => skillType.name === skillSetType)?.members ?? [];

    return timeLine
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
        .map(event => event.event)
        .map((event, eventIndex) => {
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
                                            {Period(career)}
                                        </div>
                                        <ul className="Responsibilities">
                                            {
                                                career.responsibilities.map((responsibility, responsibilityIndex) => {
                                                    return <li key={responsibilityIndex} className={responsibility.disciplines.length > 0 ? "HighlightedResponsibility" : ""}>
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
                                                                    {
                                                                        SpecialLinks(responsibility.specialLinks)
                                                                    }
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

export default SpecificSkillsOrientedEventsList;
