import React, { Component } from 'react';
import { MarkDown } from './MarkDown';

export class ReferencesList extends Component {
    static displayName = ReferencesList.name;

    render() {
        return <ul>
            {this.props.references.map((reference, referenceIndex) => <li key={referenceIndex}><MarkDown>{reference}</MarkDown></li>)}
        </ul>;
    }
}
