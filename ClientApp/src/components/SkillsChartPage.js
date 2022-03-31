import React from 'react';
import { Button } from 'antd';
import SkillsChart from './SkillsChart';
import App from '../App';
import { ExportAsImage } from '../generalUtils/GeneralUtils';

const SkillsChartPage = () => {

    document.title = SkillsChart.Title + " - Resume Viewer";

    let downloadSkillsChart = async () => {
        let ChartContainer = document.getElementById("DownloadableContent");
        ChartContainer.className = "Downloading";
        await ExportAsImage(ChartContainer, App.fullName() + " - " + SkillsChart.Title);
        ChartContainer.className = "";
    }

    let resumeData = App.store.resumeData;
    if (resumeData === null) {
        return (<div className="Loading">
            Loading resume data...
        </div>);
    }

    let href = document.location.href.slice(0, -document.location.search.length);

    return <div className="ChartPage">
        <div id="DownloadableContent" >
            <div className="ChartTitle">
                <span>{SkillsChart.Title}</span><span className="ChartLink">({ href})</span>
            </div>
            <SkillsChart skillsLevelTimeProgress={resumeData.skillsLevelTimeProgress} isAnimationActive={false} />
        </div>
        <div className="ChartFooter">
            <Button key="back" onClick={() => downloadSkillsChart()}>
                Download
            </Button>
        </div>
    </div>;
}

export default SkillsChartPage;
