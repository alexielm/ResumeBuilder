import React, { Component } from 'react';
import { ClassNames } from '../generalUtils/GeneralUtils';

export class Topic extends Component {
    static displayName = Topic.name;

    render() {
        return (
            <div id={this.props.title} className={ClassNames(["Topic", this.props.className])}>
                <div className="TopicHeader">{this.props.title}</div>
                <div className="TopicContent">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
