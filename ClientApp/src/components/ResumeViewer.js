import React, { Component, Fragment } from 'react';
import { Switch, Menu, Dropdown, Popover, Modal } from 'antd';
import { DownOutlined, CheckOutlined } from '@ant-design/icons';

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
import { JobsOrientedEventsList } from './JobsOrientedEventsList';
import { SkillOrientedEventsList } from './SkillOrientedEventsList';
import { HobbyEventsList } from './HobbyEventsList';
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

        this.toggleYearsOfExperienceView = this.toggleYearsOfExperienceView.bind(this);
        this.togglePrintHobbiesSection = this.togglePrintHobbiesSection.bind(this);
        this.setWorkExperienceViewType = this.setWorkExperienceViewType.bind(this);
        this.workExperienceViewypeMenu = this.workExperienceViewypeMenu.bind(this);

        this.state = {
            showYearsOfExperience: App.FrontEndParameters.showYearsOfExperience,
            workExperienceViewType: App.FrontEndParameters.workExperienceViewType,
            printHobbiesSection: true,
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

    workExperience(resumeData) {
        switch (this.state.workExperienceViewType) {
            case "Jobs": return <JobsOrientedEventsList timeLine={resumeData.timeLine} />;
            case "Skills": return <SkillOrientedEventsList timeLine={resumeData.timeLine} />;
            default: return `Invalid 'workExperienceViewType: ${this.state.workExperienceViewType}`;
        }
    }

    toggleYearsOfExperienceView() {
        this.setState({
            showYearsOfExperience: !this.state.showYearsOfExperience
        });
    }

    togglePrintHobbiesSection() {
        this.setState({
            printHobbiesSection: !this.state.printHobbiesSection
        });
    }

    setWorkExperienceViewType(workExperienceViewType) {
        this.setState({ workExperienceViewType })
    }

    workExperienceViewypeMenu() {
        return <Menu>
            <Menu.Item key="0" onClick={() => this.setWorkExperienceViewType("Skills")}>
                Skills Oriented View
                &nbsp;
                {
                    this.state.workExperienceViewType === "Skills" ? <CheckOutlined className="UpAlignedIcon" /> : ""
                }
            </Menu.Item>
            <Menu.Item key="1" onClick={() => this.setWorkExperienceViewType("Jobs")}>
                Jobs Oriented View
                &nbsp;
                {
                    this.state.workExperienceViewType === "Jobs" ? <CheckOutlined className="UpAlignedIcon" /> : ""
                }
            </Menu.Item>
        </Menu>
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
                                <ViewControl visible={App.FrontEndParameters.skillTrend && resumeData.skillsLevelTimeProgress?.length}>
                                    <Popover placement="right" content="Click to view skills historical thrend chart">
                                        <img src={ChartIcon} className="ChartIcon" alt="chart" onClick={this.openSkillsChart} />
                                    </Popover>
                                </ViewControl>
                                <div className="TopicRightControl">
                                    <Popover placement="left" content="Show or hide years of experience">
                                        <Switch size="small" defaultChecked={this.state.showYearsOfExperience} onClick={this.toggleYearsOfExperienceView} />
                                    </Popover>
                                </div>
                            </>}
                            className="KeepTogether"
                        >
                            <TechnicalSkillsList showYearsOfExperience={this.state.showYearsOfExperience} skillsLevelTimeProgress={resumeData.skillsLevelTimeProgress} timeLine={resumeData.timeLine} />
                        </Topic>
                        <Topic
                            title={<>
                                <Popover placement="left" content="Change the Work Experience visualization style">
                                    <Dropdown overlay={this.workExperienceViewypeMenu()} trigger={['click']}>
                                        <a className="ant-dropdown-link" href="about:blank" onClick={e => e.preventDefault()}>
                                            WORK EXPERIENCE <DownOutlined className="UpAlignedIcon" />
                                        </a>
                                    </Dropdown>
                                </Popover>
                            </>}
                        >
                            {this.workExperience(resumeData)}
                        </Topic>
                        <ViewControl visible={resumeData.timeLine.some(event => event.eventType === "Hobby")}>
                            <Topic
                                title={<>
                                    HOBBY PROJECT
                                    <ViewControl visible={!this.state.printHobbiesSection}>
                                        &nbsp;(This section is not going to be printed)
                                    </ViewControl>
                                    <div className="TopicRightControl">
                                        <Popover placement="left" content="Include this section when printing or not">
                                            <Switch size="small" defaultChecked={this.state.printHobbiesSection} onClick={this.togglePrintHobbiesSection} />
                                        </Popover>
                                    </div>
                                </>}

                                className={`KeepTogether ${this.state.printHobbiesSection ? "" : "HiddenTopic"}`}>
                                <HobbyEventsList timeLine={resumeData.timeLine}
                                />
                            </Topic>
                        </ViewControl>
                        <Topic title="EDUCATION" className="KeepTogether">
                            <EducationEventsList timeLine={resumeData.timeLine} />
                        </Topic>
                    </div>
                    <div className="BottomFadeout"></div>
                </div>
                <ViewControl visible={this.state.skillsChartVisible}>
                    <Modal
                        visible={true}
                        title="Most Relevant Technical Skills Historical Thrend"
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
                        <SkillsChart skillsLevelTimeProgress={resumeData.skillsLevelTimeProgress} />
                    </Modal>
                </ViewControl>
            </Fragment>
        );
    }
}
