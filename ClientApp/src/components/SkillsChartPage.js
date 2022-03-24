import React from 'react';
import { connect } from 'react-redux';
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

const mapStateToProps = state => state;
export default connect(mapStateToProps)(SkillsChartPage);
