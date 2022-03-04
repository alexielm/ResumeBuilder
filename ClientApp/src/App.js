import React, { Component } from 'react';
import { MainBackground } from './components/MainBackground';
import { ResumeViewer } from './components/ResumeViewer';

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);

        App.runAction = this.runAction.bind(this);
        this.resumeViewer = React.createRef();
    }

    static FrontEndParameters = null;

    componentDidMount() {
        this.populateFrontEndParameters();
    }

    runAction(action) {
        this.resumeViewer.current.test(action);
    }

    async populateFrontEndParameters() {
        const response = await fetch("api/frontEndParameters");
        App.FrontEndParameters = await response.json();
        this.forceUpdate();
    }

    render() {
        return (
            <div className="MainContainer">
                {
                    App.FrontEndParameters === null ?
                        (<div>
                            Loading configuration...
                        </div>) :
                        <ResumeViewer ref={this.resumeViewer} />
                }
                <MainBackground />
            </div>
        );
    }
}
