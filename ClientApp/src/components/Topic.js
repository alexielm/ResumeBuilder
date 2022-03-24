import React from 'react';
import classNames from 'classnames';

const Topic = ({ title, className, children }) => {

    return (
        <div id={title} className={classNames("Topic", className)}>
            <div className="TopicHeader">{title}</div>
            <div className="TopicContent">
                {children}
            </div>
        </div>
    );
}

export default Topic;
