import React, { Component } from 'react';
import Enumerable from 'linq';
import moment from 'moment';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

export class SkillsChart extends Component {
    static displayName = SkillsChart.name;

    constructor(props) {
        super(props);

        let currentYear = moment().year();
        let currentQuinquennium = currentYear - (currentYear % 5);
        let startingQuinquennium = currentQuinquennium - (20);
        this.data = Enumerable
            .range(0, 6)
            .select(index => {
                try {
                    return {
                        ...Object.fromEntries(
                            this.skills.map(member => [member, Math.random() * 100])
                        ),
                        date: (_ => {
                            let year = startingQuinquennium + (index * 5);
                            if (year > currentQuinquennium) {
                                return currentYear;
                            }
                            return year;
                        })()
                    };
                }
                finally {
                }
            })
            .toArray();
    }

    skills = ["Delphi", "JavaScript", "C#", "JQuery", "React", "Microsoft SQL", "Interbase"];
    colors = ["#4f5bd5", "#962fbf", "#d62976", "#fa7e1e", "#feda75", "#fba8d2", "#a8d2fb", "#7fff00", "#0058ed", "#f58874", "#00eaff", "#829192", "#800000", "#cbfa14"];

    chartYAxisFormatter(tickValue) {
        if (tickValue < 10) return "Novice";
        if (tickValue <= 25) return "Advanced Beginner";
        if (tickValue <= 50) return "Competent";
        if (tickValue <= 75) return "Proficient";
        return "Expert";
    }

    render() {
        return (
            <div>
                <LineChart
                    width={1000}
                    height={400}
                    data={this.data}
                    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                >
                    <XAxis dataKey="date" type="numeric" />
                    <YAxis tickFormatter={this.chartYAxisFormatter } />
                    <Legend layout="vertical" verticalAlign="top" align="left" />
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    {
                        this.skills.map((skill, skillIndex) => <Line key={skill} type="monotone" dataKey={skill} stroke={this.colors[skillIndex]} />)
                    }
                </LineChart>
            </div>
        );
    }
}