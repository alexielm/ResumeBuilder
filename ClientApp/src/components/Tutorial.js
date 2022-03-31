import { Component } from 'react';
import { Button, Checkbox } from 'antd';
import moment from 'moment';

import MouseCursor from './images/cursor.png';
import { IconSpacer } from '../generalUtils/GeneralUtils';

const expiresInDayds = 5;

class Tutorial extends Component {
    static displayName = Tutorial.name;

    stopAnimation = this.endAnimation;
    dontShowAgain = true;

    componentDidMount() {
        this.initializeAnaimation();

        if (!window.MobileView) {
            let whenPlayNext = moment(parseInt(window.localStorage.tutorialDoneExpiration ?? 0));
            if (moment().isAfter(whenPlayNext)) {
                this.startAnaimation();
            }
        }
    }

    componentWillUnmount() {
        this.startAnaimation();
    }

    wait(timeOut) {
        return new Promise((done, cancelled) => {
            this.stopAnimation = () => {
                clearTimeout(timeoutHanlder);
                this.stopAnimation = this.endAnimation;
                cancelled();
            }
            let timeoutHanlder = setTimeout(() => {
                this.stopAnimation = this.endAnimation;
                done();
            }, timeOut);
        })
    }

    initializeAnaimation() {
        this.tutorialContainer = document.querySelector(".TutorialContainer");

        this.mouseCursor = document.querySelector(".MouseCursor");

        this.resumeViewerBody = document.querySelector(".ResumeViewerBody");
        this.resumeViewerBody.scrollTop = 0;
        let resumeViewerBodyRect = this.resumeViewerBody.getBoundingClientRect();
        this.scrollOffset = resumeViewerBodyRect.height / 3;

        this.chartSwitch = document.querySelector(".ChartSwitch ");
        this.experienceSwitch = document.querySelector(".ExperienceSwitch");
        this.workExperienceDropDown = document.querySelector(".WorkExperienceDropDown");
        this.printIcon = document.querySelector(".PrintIcon");
    }

    async startAnaimation() {
        this.tutorialContainer.style.display = "block";
        this.scrollTo(0);

        try {
            await this.wait(500);
            this.tutorialContainer.style.opacity = 1;
            await this.wait(1000);
            await this.moveCursorTo(this.chartSwitch);
            await this.wait(500);
            await this.moveCursorTo(this.experienceSwitch);
            await this.wait(500);
            await this.scrollTo(this.workExperienceDropDown);
            await this.moveCursorTo(this.workExperienceDropDown);
            await this.wait(500);

            await this.scrollTo(this.printIcon);
            await this.moveCursorTo(this.printIcon);
            await this.wait(2000);
        }
        catch (error) {
            if (error) {
                console.log(error);
            }
        }
        finally {
            this.endAnimation();
        }
    }

    scrollTo(value) {
        if (isNaN(value)) {
            let rect = value.getBoundingClientRect();
            value = rect.top - this.scrollOffset;
        }
        this.resumeViewerBody.scroll({
            top: value,
            behavior: "smooth"
        });
        return this.wait(1000);
    }

    moveCursorTo = (element) => {
        let rect = element.getBoundingClientRect();
        this.mouseCursor.style.left = (rect.left) + "px";
        this.mouseCursor.style.top = (rect.top + rect.height - 4) + "px";
        return this.wait(500);
    }

    endAnimation = () => {
        this.tutorialContainer.style.opacity = 0;
        this.wait(500).then(_ => this.tutorialContainer.style.display = "none");
        if (this.dontShowAgain) {
            window.localStorage.tutorialDoneExpiration = moment().add(expiresInDayds, "days").valueOf();
        }
        else {
            window.localStorage.removeItem("tutorialDoneExpiration");
        }
    }

    dontShowAgainChanged = (event) => {
        this.dontShowAgain = event.target.checked;
    }

    render() {
        return (
            <div className="TutorialContainer" onClick={event => { if (event.target === this.tutorialContainer) { this.stopAnimation(); } }}>
                <div className="MouseCursor">
                    <img src={MouseCursor} alt="mouse cursor" />
                </div>
                <div className="TutotialControl">
                    <span className="TutorialLabel">Resume Builder - Tutorial</span>
                    <IconSpacer />
                    <Checkbox defaultChecked={this.dontShowAgain} onChange={this.dontShowAgainChanged}>Don't show it again</Checkbox>
                    <IconSpacer />
                    <Button type="primary" shape="round" size="small" onClick={() => this.stopAnimation()}>Stop</Button>
                </div>
            </div>
        );
    }
}

export default Tutorial;
