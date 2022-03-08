import React, { Component, Fragment } from 'react';
import { Popover, Modal } from 'antd';
import "./ResumeViewer.css";


import PhoneIcon from './images/phone.svg';
import EmailIcon from './images/email.svg';
import PrintIcon from './images/print.svg';
import ChartIcon from './images/chart.svg';

import App from '../App';
import { RemoveHttp } from '../generalUtils/Utils';
import { ViewControl } from '../generalUtils/ViewControl';
import { PersonalRemarks } from './PersonalRemarks';
import { Topic } from './Topic';
import { TechnicalSkillsList } from './TechnicalSkillsList';
import { JobsEventsList } from './JobsEventsList';
import { EducationEventsList } from './EducationEventsList';
import { SkillsChart } from './SkillsChart';

export class ResumeViewer extends Component {
    static displayName = ResumeViewer.name;

    constructor(props) {
        super(props);

        this.refreshPage = this.refreshPage.bind(this);
        this.printPage = this.printPage.bind(this);

        this.openSkillsChart = this.openSkillsChart.bind(this);
        this.closeSkillsChart = this.closeSkillsChart.bind(this);

        this.openExperienceChart = this.openExperienceChart.bind(this);
        this.closeExperienceChart = this.closeExperienceChart.bind(this);

        this.state = {
            skillsChartVisible: false,
            experienceChartVisible: false
        }
    }

    componentDidMount() {
        this.populateResumeData();
    }

    async populateResumeData() {
        const response = await fetch("api/resumeData");
        let resumeData = await response.json();
        App.ResumeData = resumeData;
        document.title = `${resumeData.firstName} ${resumeData.lastName} Resume`;
        this.forceUpdate();
    }

    async refreshPage() {
        document.title = "Resume Viewer";
        App.ResumeData = null;
        await fetch("api/refreshResumeData");
        document.location.reload();
    }

    printPage() {
        window.print();
    }

    openSkillsChart() {
        this.setState({
            skillsChartVisible: true
        });
    }

    closeSkillsChart() {
        this.setState({
            skillsChartVisible: false
        });
    }

    openExperienceChart() {
        this.setState({
            experienceChartVisible: true
        });
    }

    closeExperienceChart() {
        this.setState({
            experienceChartVisible: false
        });
    }

    render() {
        let resumeData = App.ResumeData;
        if (resumeData === null) {
            return (<div>
                Loading resume data...
            </div>);
        }
        let contact = resumeData.contact;
        return (
            <Fragment>
                <div className="ResumeViewerBody MainContent">
                    <div className="TopFadeout"></div>
                    <div>
                        <div className="AboutPerson KeepTogether">
                            <div className="Personal">
                                <span className="FullName">{resumeData.firstName}&nbsp;{resumeData.lastName}</span>
                                <Popover placement="right" content="Click to print">
                                    <img src={PrintIcon} className="PrintIcon" alt="print" onClick={this.printPage} />
                                </Popover>
                                <div className="ContactInfo">
                                    <div><img src={PhoneIcon} className="SmallIcon" alt="phone" />&nbsp;{contact.phone}</div>
                                    <div><img src={EmailIcon} className="SmallIcon" alt="email" onDoubleClick={this.refreshPage} />&nbsp;<a href={`mailto:${contact.email}`}>{contact.email}</a></div>
                                </div>
                            </div>
                            <div className="Links">
                                {
                                    Object
                                        .entries(contact.links)
                                        .map(([name, url]) => <span key={name} className="WebLink">{name}: <a href={url} rel="noreferrer" target="_blank">{RemoveHttp(url)}</a></span>)
                                }
                            </div>
                        </div>
                        <Topic title="REMARKS" className="KeepTogether">
                            <PersonalRemarks remarks={resumeData.remarks} />
                        </Topic>
                        <Topic
                            title={<>
                                TECHNICAL SKILLS
                                <Popover placement="right" content="Click to view skills chart">
                                    <img src={ChartIcon} className="ChartIcon" alt="chart" onClick={this.openSkillsChart} />
                                </Popover>
                            </>}
                            className="KeepTogether"
                        >
                            <TechnicalSkillsList timeLine={resumeData.timeLine} />
                        </Topic>
                        <Topic
                            title={<>
                                WORK EXPERIENCE
                                <Popover placement="right" content="Click to view experience chart">
                                    <img src={ChartIcon} className="ChartIcon" alt="chart" onClick={this.openExperienceChart} />
                                </Popover>
                            </>}
                        >
                            <JobsEventsList timeLine={resumeData.timeLine} />
                        </Topic>
                        <Topic title="EDUCATION" className="KeepTogether">
                            <EducationEventsList timeLine={resumeData.timeLine} />
                        </Topic>
                    </div>
                    <div className="BottomFadeout"></div>
                </div>
                <ViewControl visible={this.state.skillsChartVisible}>
                    <Modal
                        visible={true}
                        title="Technical Skills"
                        width={1040}
                        okButtonProps={{
                            style: {
                                display: "none"
                            }
                        }}


                        onCancel={this.closeSkillsChart}
                        cancelText="Close"
                        cancelButtonProps={{
                            type: "default"
                        }}
                    >
                        <SkillsChart />
                    </Modal>
                </ViewControl>
            </Fragment>
        );
    }
}
