import React, { Component } from 'react';
import { RemoveHttp } from "../generalUtils/UrlUtils";
import { Topic } from './Topic';
import { EventsList } from './EventsList';
import "./ResumeViewer.css";

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
            <div className="ResumeViewerBody">
                <div className="Personal">
                    <span className="FullName">{resumeData.firstName} {resumeData.lastName}</span>
                    <div className="ContactInfo">
                        <div>{contact.phone}</div>
                        <div><a href={`mailto:${contact.email}`}>{contact.email}</a></div>
                    </div>
                </div>
                <div className="Links">
                    {
                        //Object.entries(contact.links).map((name, link) => <span className="WebLink">{name}: <a href={link}>{RemoveHttp(link)}</a></span>)
                        Object.entries(contact.links)
                            .map(link => ({
                                name: link[0],
                                url: link[1]
                            }))
                            .map(link => <span key={link.name} className="WebLink">{link.name}: <a href={link.url}>{RemoveHttp(link.url)}</a></span> )
                    }
                </div>
                <Topic title="WORK EXPERIENCE">
                    <EventsList source={resumeData.timeLine} />
                </Topic>

            </div>
        );
    }
}
