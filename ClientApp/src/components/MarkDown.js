import React from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown'
import { Popover } from 'antd';


const MarkDown = ({ children, resumeData }) => {

    let linkComponent = ({ node, href, children }) => {
        let parameter = decodeURIComponent(href);
        switch (parameter.charAt(0)) {
            case "#": return (
                <a href="about:blank" onClick={event => {
                    event.preventDefault();
                    let element = document.getElementById(parameter.substring(1));
                    element.scrollIntoView({ behavior: "smooth", inline: "nearest" });
                }}>{children}</a>
            );
            case "^": {
                let reference = resumeData?.references[parameter.substring(1)];
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
                                children
                                    ?
                                    children
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
                }}>{children}</a>
            );
        }

    }

    return <ReactMarkdown
        resumeData={resumeData}
        components={{
            a: linkComponent,
            p: ({ node, ...props }) => <span className={props.className}>{props.children}</span>
        }}
    >
        {children}
    </ReactMarkdown>
}

const mapStateToProps = state => state;
export default connect(mapStateToProps)(MarkDown);
