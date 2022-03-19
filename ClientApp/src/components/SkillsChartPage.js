import React from 'react';
import { Data } from '../generalUtils/DataUtils';
import { SkillsChart } from './SkillsChart';

export const SkillsChartPage = () => {
    document.title = SkillsChart.Title + " - Resume Viewer";

    let resumeData = Data.ResumeData;
    if (resumeData === null) {
        return (<div className="Loading">
            Loading resume data...
        </div>);
    }
    return (
        <SkillsChart standAlong={true} skillsLevelTimeProgress={resumeData.skillsLevelTimeProgress} />
    );
}
