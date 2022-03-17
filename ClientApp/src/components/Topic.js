import React, { Component } from 'react';
import classNames from 'classnames';

export class Topic extends Component {
    static displayName = Topic.name;

    render() {
        return (
            <div id={this.props.title} className={classNames("Topic", this.props.className)}>
                <div className="TopicHeader">{this.props.title}</div>
                <div className="TopicContent">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
