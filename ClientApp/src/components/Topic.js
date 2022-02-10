import React, { Component } from 'react';

export class Topic extends Component {
    static displayName = Topic.name;

    render() {
        return (
            <div className="Topic">
                <div className="TopicHeader">{ this.props.title }</div>
                <div className="TopicContent">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
