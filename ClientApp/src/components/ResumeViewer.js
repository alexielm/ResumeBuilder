import React, { Component } from 'react';
import "./ResumeViewer.css";
import EmailIcon from './images/email.svg';
import PhoneIcon from './images/phone.svg';
import { RemoveHttp } from '../generalUtils/Utils';
import { PersonalRemarks } from './PersonalRemarks';
import { Topic } from './Topic';
import { TechnicalSkillsList } from './TechnicalSkillsList';
import { JobsEventsList } from './JobsEventsList';
import { EducationEventsList } from './EducationEventsList';
import { ReferencesList } from './ReferencesList';

export class ResumeViewer extends Component {
    static displayName = ResumeViewer.name;

    constructor(props) {
        super(props);

        this.refreshPage = this.refreshPage.bind(this);

        this.state = {
            resumeData: null
        };
    }

    componentDidMount() {
        this.populateResumeData();
    }

    test(action) {
        switch (action) {
            case "references": {
                alert("Showing references");
                break;
            }
            default: break;
        }
    }

    async populateResumeData() {
        const response = await fetch("api/resumeData");
        const resumeData = await response.json();
        this.setState({ resumeData });
    }

    async refreshPage() {
        await fetch("api/refreshResumeData");
        document.location.reload();
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
                <div className="TopFadeout"></div>
                <div>
                    <div className="Personal">
                        <span className="FullName">{resumeData.firstName} {resumeData.lastName}</span>
                        <div className="ContactInfo">
                            <div><img src={PhoneIcon} className="SamllIcon" alt="phone" />&nbsp;{contact.phone}</div>
                            <div><img src={EmailIcon} className="SamllIcon" alt="email" onDoubleClick={this.refreshPage} />&nbsp;<a href={`mailto:${contact.email}`}>{contact.email}</a></div>
                        </div>
                    </div>
                    <div className="Links">
                        {
                            Object
                                .entries(contact.links)
                                .map(([name, url]) => <span key={name} className="WebLink">{name}: <a href={url} rel="noreferrer" target="_blank">{RemoveHttp(url)}</a></span>)
                        }
                    </div>
                    <Topic title="REMARKS">
                        <PersonalRemarks remarks={resumeData.remarks} />
                    </Topic>
                    <Topic title="TECHNICAL SKILLS">
                        <TechnicalSkillsList timeLine={resumeData.timeLine} />
                    </Topic>
                    <Topic title="WORK EXPERIENCE">
                        <JobsEventsList timeLine={resumeData.timeLine} />
                    </Topic>
                    <Topic title="EDUCATION">
                        <EducationEventsList timeLine={resumeData.timeLine} />
                    </Topic>
                    {
                        resumeData.references
                            ?
                            <Topic title="REFERENCES" className="ReferenceTopic" collapsed="true">
                                <ReferencesList references={resumeData.references} />
                            </Topic>
                            :
                            null
                    }
                </div>
                <div className="BottomFadeout"></div>
            </div>
        );
    }
}
