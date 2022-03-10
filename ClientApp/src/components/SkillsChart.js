import React, { Component } from 'react';
import Enumerable from 'linq';
import moment from 'moment';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, Tooltip } from 'recharts';

export class SkillsChart extends Component {
    static displayName = SkillsChart.name;

    constructor(props) {
        super(props);

        this.chartYAxisFormatter = this.chartYAxisFormatter.bind(this);
        this.chartTooltipBuilder = this.chartTooltipBuilder.bind(this);
    }

    colors = ["#4f5bd5", "#feda75", "#962fbf", "#d62976", "#fa7e1e", "#fba8d2", "#a8d2fb", "#7fff00", "#0058ed", "#f58874", "#00eaff", "#829192", "#800000", "#cbfa14"];

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
                    <span>{this.chartYAxisFormatter(skill.value)}({skill.value})</span>
                </div>)
            }
        </div>
    }

    render() {
        let currentYear = moment().year();
        let currentQuinquennium = currentYear - (currentYear % 5);
        let startingQuinquennium = currentQuinquennium - 20;

        let ticks = Enumerable
            .range(0, 6)
            .select(index => {
                let year = startingQuinquennium + (index * 5);
                if (year > currentQuinquennium) {
                    return currentYear;
                }
                return year;
            })
            .toArray();

        let skillsLevelTimeProgress = this.props.skillsLevelTimeProgress;

        let skillLines = [...new Set(skillsLevelTimeProgress
            .map(skills => Object.keys(skills))
            .flat()
            .filter(skill => skill !== "year")
        )];

        return (
            <div>
                <LineChart
                    width={1000}
                    height={280}
                    data={skillsLevelTimeProgress}
                    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                >
                    <Legend
                        layout="vertical"
                        verticalAlign="top"
                        align="left"
                        wrapperStyle={{
                            paddingRight: "24px",
                        }}
                    />
                    <XAxis dataKey="year" type="number" domain={[startingQuinquennium, currentYear]} ticks={ticks} />
                    <YAxis tickFormatter={this.chartYAxisFormatter} domain={[0, 100]} />
                    <Tooltip content={this.chartTooltipBuilder} />
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    {
                        skillLines.map((skill, skillIndex) => <Line key={skill} connectNulls={true} type="monotone" dataKey={skill} stroke={this.colors[skillIndex]} />)
                    }
                </LineChart>
            </div>
        );
    }
}