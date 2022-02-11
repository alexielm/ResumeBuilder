import { Component } from 'react';

export class Remarks extends Component {
    static displayName = Remarks.name;

    //constructor(props) {
    //    super(props);
    //}

    render() {
        return (
            <ul>
                {
                    this.props.remarks.map((remark, remarkIndex) => <li key={remarkIndex}>{remark}</li>)
                }
            </ul>
        );
    }
}
