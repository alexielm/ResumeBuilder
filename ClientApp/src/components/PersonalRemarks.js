import { Component } from 'react';
import { MarkDown } from './MarkDown';

export class PersonalRemarks extends Component {
    static displayName = PersonalRemarks.name;

    render() {
        return (
            <ul>
                {
                    this.props.remarks.map((remark, remarkIndex) => <li key={remarkIndex}><MarkDown>{remark}</MarkDown></li>)
                }
            </ul>
        );
    }
}
