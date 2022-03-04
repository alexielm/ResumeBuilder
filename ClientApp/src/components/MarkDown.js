import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown'
import App from '../App';

export class MarkDown extends Component {
    static displayName = MarkDown.name;

    linkHandler(href) {
        let parameter = decodeURIComponent(href);
        switch (parameter.charAt(0)) {
            case "#": return event => {
                event.preventDefault();
                let element = document.getElementById(parameter.substring(1));
                element.scrollIntoView({ behavior: "smooth", inline: "nearest" });
            }
            case "^": return event => {
                event.preventDefault();
                App.runAction(parameter.substring(1));
            }
            default: return event => {
                event.preventDefault();
                window.open(href, "_blank");
            }
        }
    }

    render() {
        return <ReactMarkdown
            linkTarget_="_blank"
            components={{
                a: ({ node, ...props }) => <a href="about:blank" onClick={this.linkHandler(props.href)}>{props.children}</a>
            }}
        >{this.props.children}</ReactMarkdown>;
    }
}
