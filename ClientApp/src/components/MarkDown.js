import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown'
import { Popover } from 'antd';
import App from '../App';

export class MarkDown extends Component {
    static displayName = MarkDown.name;

    constructor(props) {
        super(props);

        this.referenceComponents = this.referenceComponents.bind(this);
        this.linkComponent = this.linkComponent.bind(this);
    }


    referenceComponents(referenceName) {
    }

    linkComponent({ node, ...props }) {
        let href = props.href;
        let parameter = decodeURIComponent(href);
        switch (parameter.charAt(0)) {
            case "#": return (
                <a href="about:blank" onClick={event => {
                    event.preventDefault();
                    let element = document.getElementById(parameter.substring(1));
                    element.scrollIntoView({ behavior: "smooth", inline: "nearest" });
                }}>{props.children}</a>
            );
            case "^": {
                let reference = App.ResumeData?.references[parameter.substring(1)];
                let popOverContent = reference.content.map((line, lineIndex) => <MarkDown key={lineIndex}>{line}</MarkDown>)

                return (
                    <Popover
                        overlayStyle={{
                            maxWidth: "500px"
                        }}
                        trigger="click"
                        title={reference.title}
                        content={popOverContent}
                    >
                        <a href="about:blank" onClick={event => event.preventDefault()}>
                            {
                                props.children
                                    ?
                                    props.children
                                    :
                                    reference.title
                            }
                        </a>
                    </Popover>
                );
            }
            default: return (
                <a href="about:blank" onClick={event => {
                    event.preventDefault();
                    window.open(href, "_blank");
                }}>{props.children}</a>
            );
        }

    }

    render() {
        return <ReactMarkdown
            components={{
                a: this.linkComponent
            }}
        >{this.props.children}</ReactMarkdown>;
    }
}
