import React, { Component } from 'react';
import "./ResumeViewer.css";

import { RemoveHttp } from "../generalUtils/Utils";
import { Topic } from './Topic';
import { TechnicalSkillsList } from './TechnicalSkillsList';
import { JobsEventsList } from './JobsEventsList';
import { EducationEventsList } from './EducationEventsList';

export class ResumeViewer extends Component {
    static displayName = ResumeViewer.name;

    constructor(props) {
        super(props);
        this.state = {
            resumeData: null
        };
    }

    componentDidMount() {
        this.populateResumeData();
    }

    async populateResumeData() {
        const response = await fetch('api/resumeData');
        const resumeData = await response.json();
        this.setState({ resumeData });
    }

    render() {
        let resumeData = this.state.resumeData;
        if (resumeData === null) {
            return (<div>
                Loading resume data...
            </div>);
        }
        let contact = resumeData.contact;
        return (
            <div className="ResumeViewerBody MainContent">
                <div className="Personal">
                    <span className="FullName">{resumeData.firstName} {resumeData.lastName}</span>
                    <div className="ContactInfo">
                        <div>{contact.phone}</div>
                        <div><a href={`mailto:${contact.email}`}>{contact.email}</a></div>
                    </div>
                </div>
                <div className="Links">
                    {
                        Object
                            .entries(contact.links)
                            .map(([name, url]) => <span key={name} className="WebLink">{name}: <a href={url} rel="noreferrer" target="_blank">{RemoveHttp(url)}</a></span> )
                    }
                </div>
                <Topic title="TECHNICAL SKILLS">
                    <TechnicalSkillsList timeLine={resumeData.timeLine} />
                </Topic>
                <Topic title="WORK EXPERIENCE">
                    <JobsEventsList timeLine={resumeData.timeLine} />
                </Topic>
                <Topic title="EDUCATION">
                    <EducationEventsList timeLine={resumeData.timeLine} />
                </Topic>

            </div>
        );
    }
}
