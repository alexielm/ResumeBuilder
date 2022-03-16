import React, { Component } from 'react';
import App from '../App';
import { LoadResumeData } from '../generalUtils/DataUtils';
import { SkillsChart } from './SkillsChart';

export class SkillsChartPage extends Component {
    static displayName = SkillsChartPage.name;

    constructor(props) {
        super(props);

        document.title = SkillsChart.Title + " - Resume Viewer";
    }

    async componentDidMount() {
        await LoadResumeData();
        this.forceUpdate();
    }



    render() {
        let resumeData = App.ResumeData;
        if (resumeData === null) {
            return (<div className="Loading">
                Loading resume data...
            </div>);
        }
        return (
            <SkillsChart standAlong={true} skillsLevelTimeProgress={resumeData.skillsLevelTimeProgress} />
        );
    }
}
