import React, { Component } from 'react';
import {
    ResponsiveContainer, LineChart, Line, XAxis, YAxis, ReferenceLine, ReferenceArea,
    ReferenceDot, Tooltip, CartesianGrid, Legend, Brush, ErrorBar, AreaChart, Area,
    Label, LabelList
} from 'recharts';
import { scalePow, scaleLog } from 'd3-scale';
import * as _ from 'lodash';

export class Chart extends Component {
    static displayName = Chart.name;

    data = [
        { name: 'Page A', uv: 1000, pv: 2400, amt: 2400, uvError: [75, 20] },
        { name: 'Page B', uv: 300, pv: 4567, amt: 2400, uvError: [90, 40] },
        { name: 'Page C', uv: 280, pv: 1398, amt: 2400, uvError: 40 },
        { name: 'Page D', uv: 200, pv: 9800, amt: 2400, uvError: 20 },
        { name: 'Page E', uv: 278, pv: null, amt: 2400, uvError: 28 },
        { name: 'Page F', uv: 189, pv: 4800, amt: 2400, uvError: [90, 20] },
        { name: 'Page G', uv: 189, pv: 4800, amt: 2400, uvError: [28, 40] },
        { name: 'Page H', uv: 189, pv: 4800, amt: 2400, uvError: 28 },
        { name: 'Page I', uv: 189, pv: 4800, amt: 2400, uvError: 28 },
        { name: 'Page J', uv: 189, pv: 4800, amt: 2400, uvError: [15, 60] },
    ];

    render() {
        return (
            <div>
                <LineChart
                    width={1200}
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
                </LineChart>      </div>
        );
    }
}
