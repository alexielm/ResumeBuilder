import React, { Component, Fragment } from 'react';

import classNames from 'classnames';
import { notification, Switch, Menu, Dropdown, Popover } from 'antd';
import { ZoomInOutlined, DownOutlined, CheckOutlined } from '@ant-design/icons';

import "./ResumeViewer.css";

import PhoneIcon from './images/phone.svg';
import EmailIcon from './images/email.svg';
import PrintIcon from './images/print.svg';

import { VerticalAlignment, HorizontalSpacer, IconSpacer, RemoveHttp } from '../generalUtils/GeneralUtils';
import ViewControl from '../generalUtils/ViewControl';
import { ViewSwitch, Then, Else } from '../generalUtils/ViewSwitch';
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
import { viewerMode } from '../generalUtils/GlobalStore';
import App from '../App';

const { SubMenu } = Menu;

class ResumeViewer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showYearsOfExperience: App.store.frontEndParameters.showYearsOfExperience,
            experienceViewerType: this.getExperienceViewerType(App.store.frontEndParameters.workExperienceViewType),
            printHobbiesSection: true,
            printChartSection: true,
            personTitle: null,
            personTitleOptions: null,
            highlightedSkill: null
        }

        viewerMode.specialView = App.store.queryParameters.specialView;
    }

    async componentDidMount() {
        this.updatePersonTitle(App.store.resumeData);
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
        App.store.refreshResumeData();
    }

    printPage = (event) => window.print();

    toggleYearsOfExperienceView = () => this.setState({
        showYearsOfExperience: !this.state.showYearsOfExperience
    });

    togglePrintHobbiesSection = (printHobbiesSection) => this.setState({ printHobbiesSection });

    togglePrintChartSection = (printChartSection) => this.setState({ printChartSection });

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
        let resumeData = App.store.resumeData;
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
        let skillTypes = App.store.frontEndParameters.skillTypes;

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
        let resumeData = App.store.resumeData;
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
                                <span className="FullName" onDoubleClick={this.tryToUnlock}>{App.fullName()}</span>
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
                                {SkillsChart.Title}
                                <ViewSwitch value={this.state.printChartSection}>
                                    <Then>
                                        <Popover placement="right" content="Open chart page for LinkedIn background image download">
                                            <HorizontalSpacer />
                                            <a className="ZoomInOutButton" href="?page=skillsChart" target="_blank">
                                                <ZoomInOutlined className="ZoomInOutlinedIcon" />
                                            </a>
                                        </Popover>
                                    </Then>
                                    <Else>
                                        <HorizontalSpacer />
                                        (This section is not going to be printed)
                                    </Else>
                                </ViewSwitch>
                                <div className="TopicRightControl">
                                    <Popover placement="left" content="Include this section when printing or not">
                                        <span className="PrintableLabel">Printable:</span>
                                        <Switch className="ChartSwitch" size="small" defaultChecked={this.state.printChartSection} onClick={this.togglePrintChartSection} />
                                    </Popover>
                                </div>
                            </>}
                            className={classNames("ChartTopic KeepTogether", { "HiddenTopic": !this.state.printChartSection })}>
                            <SkillsChart skillsLevelTimeProgress={resumeData.skillsLevelTimeProgress} onHighlightSkill={highlightedSkill => this.setState({ highlightedSkill })} />
                        </Topic>
                        <Topic
                            title={<>
                                TECHNICAL SKILLS
                                <div className="TopicRightControl">
                                    <Popover placement="left" content="Show or hide years of experience">
                                        <span className="PrintableLabel">Years:</span>
                                        <Switch className="ExperienceSwitch" size="small" defaultChecked={this.state.showYearsOfExperience} onClick={this.toggleYearsOfExperienceView} />
                                    </Popover>
                                </div>
                            </>}
                            className="KeepTogether"
                        >
                            <TechnicalSkillsList showYearsOfExperience={this.state.showYearsOfExperience} skillsLevelTimeProgress={resumeData.skillsLevelTimeProgress} timeLine={resumeData.timeLine} highlightedSkill={this.state.highlightedSkill} />
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
                                            <span className="PrintableLabel">Printable:</span>
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
                <Tutorial />
            </Fragment >
        );
    }
}

export default ResumeViewer;
