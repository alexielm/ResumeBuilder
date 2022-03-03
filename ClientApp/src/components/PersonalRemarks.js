import { Component } from 'react';

export class PersonalRemarks extends Component {
    static displayName = PersonalRemarks.name;

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
