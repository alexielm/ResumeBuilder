import React, { Component } from 'react';

import {
    LineChart, Line, XAxis,
    Tooltip, CartesianGrid
//    ResponsiveContainer,  YAxis, ReferenceLine, ReferenceArea,
//    ReferenceDot, Legend, Brush, ErrorBar, AreaChart, Area,
//    Label, LabelList
} from 'recharts';


export class SkillsChart extends Component {
    static displayName = SkillsChart.name;

    data = [
        { name: '1995', uv: 1000, pv: 2400, amt: 2400, uvError: [75, 20] },
        { name: '2000', uv: 300, pv: 4567, amt: 2400, uvError: [90, 40] },
        { name: '2005', uv: 280, pv: 1398, amt: 2400, uvError: 40 },
        { name: '2010', uv: 200, pv: 9800, amt: 2400, uvError: 20 },
        { name: '2015', uv: 278, pv: null, amt: 2400, uvError: 28 },
        { name: '2020', uv: 189, pv: 4800, amt: 2400, uvError: [90, 20] }
    ];

    render() {
        return (
            <div>
                <LineChart
                    width={1000}
                    height={400}
                    data={this.data}
                    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                >
                    <XAxis dataKey="name" />
                    <Tooltip />
                    <CartesianGrid stroke="#f5f5f5" />
                    <Line type="monotone" dataKey="uv" stroke="red" yAxisId={0} />
                    <Line type="monotone" dataKey="pv" stroke="green" yAxisId={1} />
                    <Line type="monotone" dataKey="amt" stroke="blue" yAxisId={2} />
                    <Line type="monotone" dataKey="uvError" stroke="yellow" yAxisId={3} />
                </LineChart>
            </div>
        );
    }
}
