import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { refreshResumeData } from '../action';

import classNames from 'classnames';
import { notification, Switch, Menu, Dropdown, Popover, Modal, Button } from 'antd';
import { DownOutlined, CheckOutlined } from '@ant-design/icons';
import { ExportAsImage } from '../generalUtils/GeneralUtils';

import "./ResumeViewer.css";

import PhoneIcon from './images/phone.svg';
import EmailIcon from './images/email.svg';
import PrintIcon from './images/print.svg';
import ChartIcon from './images/chart.svg';

import { VerticalAlignment, HorizontalSpacer, IconSpacer, RemoveHttp } from '../generalUtils/GeneralUtils';
import ViewControl from '../generalUtils/ViewControl';
import { PersonalRemarks } from './PersonalRemarks';
import Topic from './Topic';
import TechnicalSkillsList from './TechnicalSkillsList';
import JobsOrientedEventsList from './JobsOrientedEventsList';
import SkillOrientedEventsList from './SkillOrientedEventsList';
import SpecificSkillsOrientedEventsList from './SpecificSkillsOrientedEventsList';
import HobbyEventsList from './HobbyEventsList';
import EducationEventsList from './EducationEventsList';
import SkillsChart from './SkillsChart';
import Tutorial from './Tutorial';

import { viewerMode } from '../generalUtils/ViewerMode';

const { SubMenu } = Menu;

class ResumeViewer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showYearsOfExperience: this.props.frontEndParameters.showYearsOfExperience,
            experienceViewerType: this.getExperienceViewerType(this.props.frontEndParameters.workExperienceViewType),
            printHobbiesSection: true,
            skillsChartVisible: false,
            personTitle: null,
            personTitleOptions: null
        }

        console.log(props.queryParameters);
        console.log(props.queryParameters.specialView);

        viewerMode.specialView = props.queryParameters.specialView;
        console.log(viewerMode.specialView)
    }

    async componentDidMount() {
        this.updatePersonTitle(this.props.resumeData);
    }

    updatePersonTitle(resumeData) {
        let titles = [...new Set(resumeData.timeLine
            .filter(event => event.eventType === "Job")
            .map(event => event.career)
            .flat()
            .sort((left, right) => left.startDate === right.startDate ? 0 : (left.startDate < right.startDate ? 1 : -1))
            .map(career => career.title)
        )];

        this.setState(
            {
                personTitle: titles[0],
                personTitleOptions: <Menu>
                    {
                        titles.map((title, titleIndex) => <Menu.Item key={titleIndex} onClick={() => this.setState({ personTitle: title }, this.updatePageTitle)}>
                            {title}
                        </Menu.Item>)
                    }
                </Menu>
            },
            this.updatePageTitle
        );
    }

    refreshPage = async (event) => {
        if (event.altKey && event.ctrlKey && event.shiftKey) {
            window.localStorage.removeItem("tutorialDoneExpiration");
        }
        document.title = "Resume Viewer";
        this.props.refreshResumeData();
    }

    printPage = (event) => window.print();

    openSkillsChart = () => this.setState({
        skillsChartVisible: true
    });

    closeSkillsChart = () => this.setState({
        skillsChartVisible: false
    });

    toggleYearsOfExperienceView = () => this.setState({
        showYearsOfExperience: !this.state.showYearsOfExperience
    });

    togglePrintHobbiesSection = () => this.setState({
        printHobbiesSection: !this.state.printHobbiesSection
    });


    getExperienceViewerType(workExperienceViewType) {
        let viewTypeDividerIndex = workExperienceViewType.indexOf("|");
        if (viewTypeDividerIndex < 0) {
            return {
                type: workExperienceViewType,
                parameter: ""
            }
        }
        return {
            type: workExperienceViewType.substring(0, viewTypeDividerIndex),
            parameter: workExperienceViewType.substring(viewTypeDividerIndex + 1),
        }
    }

    workExperience(resumeData) {
        let experienceViewerType = this.state.experienceViewerType;
        switch (experienceViewerType.type) {
            case "Jobs": return <JobsOrientedEventsList timeLine={resumeData.timeLine} />;
            case "Skills": return <SkillOrientedEventsList timeLine={resumeData.timeLine} />;
            case "SpecificSkill": return <SpecificSkillsOrientedEventsList timeLine={resumeData.timeLine} skillSetType={experienceViewerType.parameter} />;
            default: return `Invalid viewer type: ${experienceViewerType.type}`;
        }
    }

    setWorkExperienceViewType = (type, parameter) => {
        this.setState(
            {
                experienceViewerType: {
                    type,
                    parameter
                }
            },
            this.updatePageTitle
        );
    }


    updatePageTitle = () => {
        let resumeData = this.props.resumeData;
        document.title = `${resumeData.firstName} ${resumeData.lastName} Resume - ${this.state.personTitle}${(() => {
            let experienceViewerType = this.state.experienceViewerType;
            switch (experienceViewerType.type) {
                case "Jobs": return " - Jobs Priority";
                case "Skills": return " - Skills Priority";
                case "SpecificSkill": return " - Organized by " + experienceViewerType.parameter;
                default: return "";
            }
        })()}`;

    }

    workExperienceViewTypeDescriptor = () => {
        let experienceViewerType = this.state.experienceViewerType;
        switch (experienceViewerType.type) {
            case "Jobs": return "";
            case "Skills": return "";
            case "SpecificSkill": return <span className="JobTimeLineFilteType">
                <HorizontalSpacer />
                (Organized by {
                    experienceViewerType.parameter
                } skills)
            </span>;
            default: return "";
        }
    }

    workExperienceMenuIcon(type, parameter) {
        if ((this.state.experienceViewerType.type === type) && ((parameter === undefined) || (this.state.experienceViewerType.parameter === parameter))) {
            return <CheckOutlined />;
        }
        return <IconSpacer />;
    }

    workExperienceViewerTypeMenu = () => {
        let skillTypes = this.props.frontEndParameters.skillTypes;

        return <Menu>
            <Menu.Item key="skillsOriented" icon={this.workExperienceMenuIcon("Skills")} onClick={() => this.setWorkExperienceViewType("Skills")}>
                Skills Oriented View
            </Menu.Item>
            <Menu.Item key="jobOriented" icon={this.workExperienceMenuIcon("Jobs")} onClick={() => this.setWorkExperienceViewType("Jobs")}>
                Jobs Oriented View
            </Menu.Item>
            <Menu.Divider />
            <SubMenu key="specificSkill" icon={this.workExperienceMenuIcon("SpecificSkill")} title="Specific Skill Oriented">
                {
                    skillTypes.map(skill =>
                        <Menu.Item key={skill.name} icon={this.workExperienceMenuIcon("SpecificSkill", skill.name)} onClick={() => this.setWorkExperienceViewType("SpecificSkill", skill.name)}>
                            {skill.name}
                        </Menu.Item>)
                }
            </SubMenu>
        </Menu>
    }

    fullName() {
        return this.props.resumeData.firstName + " " + this.props.resumeData.lastName;
    }

    downloadSkillsChart = async () => {
        let chartModalContent = document.getElementById("ChartModalContent");
        let previousClassName = chartModalContent.className;
        chartModalContent.className = previousClassName + " Downloading";
        await ExportAsImage(chartModalContent, this.fullName() + " - " + SkillsChart.Title);
        chartModalContent.className = previousClassName;
    }

    tryToUnlock = (event) => {
        event.preventDefault();
        if (event.altKey && event.ctrlKey && event.shiftKey) {
            viewerMode.specialView = !viewerMode.specialView;
            notification.open({
                description: <div style={{ textAlign: "center" }}>Special Links {viewerMode.specialView ? "Enabled" : "Disabled"}</div>,
                duration: 1
            });
            this.forceUpdate();
        }
    }

    render() {
        let resumeData = this.props.resumeData;
        if (resumeData === null) {
            return (<div className="Loading">
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
                                <span className="FullName" onDoubleClick={this.tryToUnlock}>{this.fullName()}</span>
                                <Popover placement="right" content="Click to print">
                                    <img src={PrintIcon} className="PrintIcon" alt="print" onClick={this.printPage} />
                                </Popover>
                                <div className="PersonTitle">
                                    <Popover placement="right" content="Change title">
                                        <Dropdown overlay={this.state.personTitleOptions} trigger={['click']}>
                                            <span>
                                                {this.state.personTitle}
                                                <HorizontalSpacer />
                                                <DownOutlined className="PersonTitleDropDown" style={VerticalAlignment(-2)} />
                                            </span>
                                        </Dropdown>
                                    </Popover>
                                </div>
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
                                <ViewControl visible={this.props.frontEndParameters.skillTrend && resumeData.skillsLevelTimeProgress?.length}>
                                    <Popover placement="right" content="Click to view skill's historical trend chart">
                                        <img src={ChartIcon} className="ChartIcon" alt="chart" onClick={this.openSkillsChart} />
                                    </Popover>
                                </ViewControl>
                                <div className="TopicRightControl">
                                    <Popover placement="left" content="Show or hide years of experience">
                                        <Switch className="ExperienceSwitch" size="small" defaultChecked={this.state.showYearsOfExperience} onClick={this.toggleYearsOfExperienceView} />
                                    </Popover>
                                </div>
                            </>}
                            className="KeepTogether"
                        >
                            <TechnicalSkillsList showYearsOfExperience={this.state.showYearsOfExperience} skillsLevelTimeProgress={resumeData.skillsLevelTimeProgress} timeLine={resumeData.timeLine} />
                        </Topic>
                        <Topic
                            title={<>
                                <Popover placement="left" content="Change Work Experience visualization style">
                                    <Dropdown overlay={this.workExperienceViewerTypeMenu()} trigger={['click']}>
                                        <a className="ant-dropdown-link" href="about:blank" onClick={e => e.preventDefault()}>
                                            MOST RELEVANT WORK EXPERIENCES
                                            <this.workExperienceViewTypeDescriptor />
                                            <HorizontalSpacer />
                                            <DownOutlined className="WorkExperienceDropDown" style={VerticalAlignment(-2)} />
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
                                    HOBBY PROJECTS
                                    <ViewControl visible={!this.state.printHobbiesSection}>
                                        &nbsp;(This section is not going to be printed)
                                    </ViewControl>
                                    <div className="TopicRightControl">
                                        <Popover placement="left" content="Include this section when printing or not">
                                            <Switch className="HobbiesSwitch" size="small" defaultChecked={this.state.printHobbiesSection} onClick={this.togglePrintHobbiesSection} />
                                        </Popover>
                                    </div>
                                </>}

                                className={classNames("KeepTogether", { "HiddenTopic": !this.state.printHobbiesSection })}>
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
                        className="ChartDialog"
                        visible={true}
                        width={1400}
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
                        footer={[
                            <Button key="back" onClick={() => this.downloadSkillsChart()}>
                                Download
                            </Button>,
                            <Button key="submit" type="primary" onClick={this.closeSkillsChart}>
                                Close
                            </Button>,
                        ]}
                    >
                        <SkillsChart skillsLevelTimeProgress={resumeData.skillsLevelTimeProgress} />
                    </Modal>
                </ViewControl>
                <Tutorial />
            </Fragment >
        );
    }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps, { refreshResumeData })(ResumeViewer);
