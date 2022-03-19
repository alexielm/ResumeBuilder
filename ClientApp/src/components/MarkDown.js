import React from 'react';
import ReactMarkdown from 'react-markdown'
import { Popover } from 'antd';
import { Data } from '../generalUtils/DataUtils';

const linkComponent = ({ node, ...props }) => {
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
            let reference = Data.ResumeData?.references[parameter.substring(1)];
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

export const MarkDown = ({ children }) =>
    <ReactMarkdown
        components={{
            a: linkComponent,
            p: ({ node, ...props }) => <span className={props.className}>{props.children}</span>
        }}
    >
        {children}
    </ReactMarkdown>