import React from 'react';
import { Button } from 'antd';
import SkillsChart from './SkillsChart';
import App from '../App';
import { ExportAsImage } from '../generalUtils/GeneralUtils';

const SkillsChartPage = () => {
    document.title = SkillsChart.Title + " - Resume Viewer";

    let downloadSkillsChart = async () => {
        let ChartContainer = document.getElementById("ChartContainer");
        await ExportAsImage(ChartContainer, App.fullName() + " - " + SkillsChart.Title);
    }

    let resumeData = App.store.resumeData;
    console.log(resumeData);

    if (resumeData === null) {
        return (<div className="Loading">
            Loading resume data...
        </div>);
    }
    return <div className="ChartPage">
        <div className="ChartTitle">
            {SkillsChart.Title}
        </div>
        <SkillsChart skillsLevelTimeProgress={resumeData.skillsLevelTimeProgress} />
        <div className="ChartFooter">
            <Button key="back" onClick={() => downloadSkillsChart()}>
                Download
            </Button>
        </div>
    </div>;
}

export default SkillsChartPage;
