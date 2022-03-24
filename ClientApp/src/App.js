import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAll, parseQueryParamter } from './action';

import './custom.css'

import { ViewSwitch, Then, Else } from './generalUtils/ViewSwitch';
import ViewControl from './generalUtils/ViewControl';
import MainBackground from './components/MainBackground';
import ResumeViewer from './components/ResumeViewer';
import SkillsChartPage from './components/SkillsChartPage';

class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);

        props.parseQueryParamter();
    }

    componentDidMount() {
        this.props.fetchAll();
    }

    render() {
        switch (this.props.queryParameters?.page) {
            case "skillsChart": {
                return (
                    <div>
                        <SkillsChartPage />
                    </div>
                );
            }
            default: return (
                <div className="MainContainer">
                    <ViewSwitch value={((this.props.frontEndParameters === null) || (this.props.resumeData === null))}>
                        <Then>
                            <div className="Loading">
                                Loading application configuration...
                            </div>
                        </Then>
                        <Else>
                            <ResumeViewer />
                        </Else>
                    </ViewSwitch>
                    <ViewControl visible={!window.MobileView}>
                        <MainBackground />
                    </ViewControl>
                </div>
            );
        }
    }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps, { fetchAll, parseQueryParamter })(App);
