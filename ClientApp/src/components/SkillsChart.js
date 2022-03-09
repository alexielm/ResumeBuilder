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

    skills = ["Delphi", "JavaScript", "C#", "JQuery", "React", "Microsoft SQL", "Interbase"];
    colors = ["#4f5bd5", "#962fbf", "#d62976", "#fa7e1e", "#feda75", "#fba8d2", "#a8d2fb", "#7fff00", "#0058ed", "#f58874", "#00eaff", "#829192", "#800000", "#cbfa14"];

    chartYAxisFormatter(tickValue) {
        if (tickValue < 12.5) return "Novice";
        if (tickValue < 37.5) return "Advanced Beginner";
        if (tickValue <= 62.5) return "Competent";
        if (tickValue <= 87.5) return "Proficient";
        return "Expert";
    }

    chartTooltipBuilder(tooltipElement) {
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
        let startingQuinquennium = currentQuinquennium - (20);

        let skills = this.props.skillTypes
            .filter(skillType => skillType.name === "Languages")
            .map(skillType => skillType.members)
            .flat();

        let disciplineDatesSet = this.props.timeLine
            .filter(event => event.eventType === "Job")
            .map(event =>
                event.career.map(career => (
                    {
                        startYear: moment(career.startDate).year(),
                        endYear: moment(career.endDate).year(),
                        disciplinesSet: career.disciplinesSet
                    }
                ))
            )
            .flat()
            .sort((left, right) => left.startYear === right.startYear ? 0 : (left.startYear < right.startYear ? 1 : -1));


        let data = Enumerable
            .range(0, 6)
            .select(index => {
                try {
                    let year = (_ => {
                        let year = startingQuinquennium + (index * 5);
                        if (year > currentQuinquennium) {
                            return currentYear;
                        }
                        return year;
                    })();

                    let disciplines = disciplineDatesSet
                        .find(datesSet => (year >= datesSet.startYear) && (year <= datesSet.endYear))
                        ?.disciplinesSet ?? [];

                    console.log(disciplines);

                    return {
                        ...Object.fromEntries(
                            skills.map(member => {
                                return [member, disciplines[member]];
                            })
                        ),
                        year
                    };
                }
                finally {
                }
            })
            .toArray();

        let ticks = data.map(row => row.year);

        let topSkills = skills.splice(0, 10);

        return (
            <div>
                <LineChart
                    width={1000}
                    height={280}
                    data={data}
                    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                >
                    <XAxis dataKey="year" type="number" domain={[startingQuinquennium, currentYear]} ticks={ticks} />
                    <YAxis tickFormatter={this.chartYAxisFormatter} domain={[0,100]} />
                    <Tooltip content={this.chartTooltipBuilder} />
                    <Legend
                        layout="vertical"
                        verticalAlign="top"
                        align="left"
                        wrapperStyle={{
                            paddingRight: "24px",
                        }}
                    />
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    {
                        topSkills.map((skill, skillIndex) => <Line key={skill} type="monotone" dataKey={skill} stroke={this.colors[skillIndex]} />)
                    }
                </LineChart>
            </div>
        );
    }
}