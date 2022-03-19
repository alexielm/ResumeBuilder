import React, { Component } from 'react';
import { ZoomInOutlined } from '@ant-design/icons';
import Enumerable from 'linq';
import moment from 'moment';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { VerticalAlignment, HorizontalSpacer } from '../generalUtils/GeneralUtils';
import { ViewControl } from '../generalUtils/ViewControl';

export class SkillsChart extends Component {
    static displayName = SkillsChart.name;

    static Title = "Most Relevant Technical Skills - Historical Trend";

    constructor(props) {
        super(props);

        this.data = props.skillsLevelTimeProgress;

        this.state = {
            highlightedSkill: null
        }

        let totalQuinquenniums = 5;
        let currentYear = moment().year();
        let currentQuinquennium = currentYear - (currentYear % 5);
        let startingQuinquennium = currentQuinquennium - (5 * totalQuinquenniums);
        if (currentQuinquennium !== currentYear) totalQuinquenniums++;
        this.xTicks = Enumerable
            .range(0, totalQuinquenniums + 1)
            .select(index => {
                let year = startingQuinquennium + (index * 5);
                if (year > currentQuinquennium) {
                    return currentYear;
                }
                return year;
            })
            .toArray();

        this.xDomain = [Math.min(...this.xTicks), Math.max(...this.xTicks)];

        this.yTicks = [0, 25, 50, 75, 100];

        this.topSkills = [...new Set(
            this.data.map(
                row => {
                    let { year, ...others } = row;
                    return Object.keys(others);
                })
                .flat()
                .map(skill => ({
                    skill,
                    lastKnownLevel: this.data.map(row => row[skill]).filter(level => level).slice(-1)[0]
                }))
                .sort(this.fieldSorter(["-lastKnownLevel", "skill"]))
                .map(item => item.skill)
        )];
    }

    fieldSorter(fields) {
        return (left, right) => {
            return fields
                .map(property => {
                    var direction = 1;
                    if (property[0] === "-") {
                        direction = -1;
                        property = property.substring(1);
                    }
                    if (left[property] > right[property]) return direction;
                    if (left[property] < right[property]) return -direction;
                    return 0;
                })
                .reduce((current, value) => {
                    return current ? current : value;
                }, 0);
        };
    }

    //From: https://coolors.co/gradient-palette/ffa600-003f5c?number=12
    colors = ["#ff8c00", "#e81123", "#ec008c", "#68217a", "#00188f", "#00bcf2", "#00b294", "#009e49", "#bad80a", "#fff100"];


    chartYAxisFormatter = (tickValue) => {
        if (tickValue < 12.5) return "Novice";
        if (tickValue < 37.5) return "Advanced Beginner";
        if (tickValue <= 62.5) return "Competent";
        if (tickValue <= 87.5) return "Proficient";
        return "Expert";
    }

    chartTooltipBuilder = (tooltipElement) => {
        if (!tooltipElement.payload) {
            return null;
        }
        return <div className="ToolTipPanel">
            <div>Year: {tooltipElement.label}</div>
            {
                tooltipElement.payload
                    .sort(this.fieldSorter(["-value", "name"]))
                    .map((skill, skillIndex) => <div key={skillIndex} style={{ color: skill.color }}>
                        <span>{skill.name}: </span>
                        <span>{this.chartYAxisFormatter(skill.value)}</span>
                    </div>)
            }
        </div>
    }

    highlistLine(highlightedSkill) {
        this.setState({
            highlightedSkill
        });
    }

    render() {
        return (
            <div id="ChartModalContent" className="ChartModalContent">
                <div className="ant-modal-header">
                    <div className="ant-modal-title" id="rcDialogTitle1">
                        {
                            SkillsChart.Title
                        }
                        <ViewControl visible={!this.props.standAlong}>
                            <HorizontalSpacer />
                            <a className="ZoomInOutButton" href="?page=skillsChart" target="_blank">
                                <ZoomInOutlined style={VerticalAlignment(-3)} />
                            </a>
                        </ViewControl>
                    </div>
                </div>
                <div className="ChartContainer">
                    <div className="LegendPanel">
                        <div className="LegendTitle" >
                            Legend
                        </div>
                        <ul className="LegendList">
                            {
                                this.topSkills.map((tick, tickIndex) =>
                                    <li key={tick} style={{ color: this.colors[tickIndex] }} onMouseEnter={() => this.highlistLine(this.topSkills[tickIndex])} onMouseLeave={() => this.highlistLine(null)}>
                                        <span>{this.topSkills[tickIndex]}</span>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                    <div className="ChartPanel">
                        <ResponsiveContainer width="100%" height={275}>
                            <LineChart
                                className="ChartPanel"
                                data={this.data}
                            >
                                <XAxis dataKey="year" type="number" ticks={this.xTicks} domain={this.xDomain} />
                                <YAxis tickFormatter={this.chartYAxisFormatter} ticks={this.yTicks} domain={[0, 100]} width={80} />
                                <Tooltip content={this.chartTooltipBuilder} />
                                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                                {
                                    this.topSkills.map((skill, skillIndex) => <Line key={skill} connectNulls={true} isAnimationActive={true} type="monotone" dataKey={skill} stroke={this.colors[skillIndex]} strokeWidth={skill === this.state.highlightedSkill ? 3 : undefined} />)
                                }
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        );
    }
}