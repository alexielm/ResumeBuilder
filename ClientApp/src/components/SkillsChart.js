import React, { Component } from 'react';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export class SkillsChart extends Component {
    static displayName = SkillsChart.name;

    constructor(props) {
        super(props);

        this.chartYAxisFormatter = this.chartYAxisFormatter.bind(this);
        this.chartTooltipBuilder = this.chartTooltipBuilder.bind(this);

        this.data = props.skillsLevelTimeProgress;

        this.state = {
            highlightedSkill: null
        }
    }


    colors = ["#4f5bd5", "#0058ed", "#962fbf", "#d62976", "#fa7e1e", "#fba8d2", "#a8d2fb", "#7fff00", "#829192", "#f58874", "#00eaff", "#feda75", "#800000", "#cbfa14"];

    chartYAxisFormatter(tickValue) {
        if (tickValue < 12.5) return "Novice";
        if (tickValue < 37.5) return "Advanced Beginner";
        if (tickValue <= 62.5) return "Competent";
        if (tickValue <= 87.5) return "Proficient";
        return "Expert";
    }

    chartTooltipBuilder(tooltipElement) {
        if (!tooltipElement.payload) {
            return null;
        }
        return <div className="ToolTipPanel">
            <div>Year: {tooltipElement.label}</div>
            {
                tooltipElement.payload.map((skill, skillIndex) => <div key={skillIndex} style={{ color: skill.color }}>
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
        let startingQuinquennium = 1995;
        let currentYear = 2022;
        let xTicks = this.data.map(row => row.year);
        let yTicks = [0, 25, 50, 75, 100];

        let skillLines = [...new Set(this.data.map(row => {
            let { year, ...others } = row;
            return Object.keys(others);
        }).flat()
        )];

        return (
            <div className="ChartContainer">
                <div className="LegendPanel">
                    <ul className="LegendList">
                        {
                            skillLines.map((tick, tickIndex) =>
                                <li key={tick} style={{ color: this.colors[tickIndex] }} onMouseEnter={() => this.highlistLine(skillLines[tickIndex])} onMouseLeave={() => this.highlistLine(null)}>
                                    {skillLines[tickIndex]}
                                </li>
                            )
                        }
                    </ul>
                </div>
                <LineChart
                    className="ChartPanel"
                    width={910}
                    height={280}
                    data={this.data}
                >
                    <XAxis dataKey="year" type="number" domain={[startingQuinquennium, currentYear]} ticks={xTicks} />
                    <YAxis tickFormatter={this.chartYAxisFormatter} domain={[0, 100]} ticks={yTicks} width={80} />
                    <Tooltip content={this.chartTooltipBuilder} />
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    {
                        skillLines.map((skill, skillIndex) => <Line key={skill} connectNulls={true} isAnimationActive={true} type="monotone" dataKey={skill} stroke={this.colors[skillIndex]} strokeWidth={skill === this.state.highlightedSkill ? 3 : undefined} />)
                    }
                </LineChart>
            </div >
        );
    }
}