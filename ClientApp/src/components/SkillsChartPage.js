import React from 'react';
import SkillsChart from './SkillsChart';

const SkillsChartPage = () => {
    document.title = SkillsChart.Title + " - Resume Viewer";

    let resumeData = this.props.resumeData;
    if (resumeData === null) {
        return (<div className="Loading">
            Loading resume data...
        </div>);
    }
    return (
        <SkillsChart standAlong={true} skillsLevelTimeProgress={resumeData.skillsLevelTimeProgress} />
    );
}

export default SkillsChartPage;
