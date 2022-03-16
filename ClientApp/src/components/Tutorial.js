import { Component } from 'react';
import { Button, Checkbox } from 'antd';
import moment from 'moment';

import MouseCursor from './images/cursor.png';
import { IconSpacer } from '../generalUtils/GeneralUtils';

const expiresInDayds = 5;

export class Tutorial extends Component {


    static displayName = Tutorial.name;

    constructor(props) {
        super(props);

        this.moveCursorTo = this.moveCursorTo.bind(this);
        this.endAnimation = this.endAnimation.bind(this);
        this.dontShowAgainChanged = this.dontShowAgainChanged.bind(this);

        this.stopAnimation = this.endAnimation;

        this.dontShowAgain = true;
    }

    componentDidMount() {
        this.initializeAnaimation();

        if (!window.MobileView) {
            let whenPlayNext = moment(parseInt(window.localStorage.tutorialDoneExpiration ?? 0));
            if (moment().isAfter(whenPlayNext)) {
                this.startAnaimation();
            }
        }
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

        this.printIcon = document.querySelector(".PrintIcon");
        this.personTitleDropDown = document.querySelector(".PersonTitleDropDown");
        this.experienceSwitch = document.querySelector(".ExperienceSwitch");
        this.workExperienceDropDown = document.querySelector(".WorkExperienceDropDown");
        this.chartIcon = document.querySelector(".ChartIcon");
        this.hobbiesSwitch = document.querySelector(".HobbiesSwitch");
    }

    startAnaimation() {
        this.tutorialContainer.style.display = "block";

        this.wait(500)
            .then(_ => { this.tutorialContainer.style.opacity = 1; })
            .then(_ => this.wait(1000))
            .then(_ => this.moveCursorTo(this.experienceSwitch))
            .then(_ => this.wait(500))
            .then(_ => this.moveCursorTo(this.chartIcon))
            .then(_ => this.wait(500))
            .then(_ => this.scrollTo(this.workExperienceDropDown))
            .then(_ => this.moveCursorTo(this.workExperienceDropDown))
            .then(_ => this.wait(500))
            //.then(_ => this.scrollTo(this.hobbiesSwitch))
            //.then(_ => this.moveCursorTo(this.hobbiesSwitch))
            //.then(_ => this.wait(500))
            //.then(_ => this.scrollTo(this.personTitleDropDown))
            //.then(_ => this.moveCursorTo(this.personTitleDropDown))
            //.then(_ => this.wait(500))
            .then(_ => this.scrollTo(this.printIcon))
            .then(_ => this.moveCursorTo(this.printIcon))
            .then(_ => this.wait(2000))
            .finally(_ => this.endAnimation())
            .catch(error => {
                if (error) {
                    console.log(error);
                }
            });
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

    moveCursorTo(element) {
        let rect = element.getBoundingClientRect();
        this.mouseCursor.style.left = (rect.left) + "px";
        this.mouseCursor.style.top = (rect.top + rect.height - 4) + "px";
        return this.wait(500);
    }

    endAnimation() {
        this.tutorialContainer.style.opacity = 0;
        this.wait(500).then(_ => this.tutorialContainer.style.display = "none");
        if (this.dontShowAgain) {
            window.localStorage.tutorialDoneExpiration = moment().add(expiresInDayds, "days").valueOf();
        }
        else {
            window.localStorage.removeItem("tutorialDoneExpiration");
        }
    }

    dontShowAgainChanged(event) {
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
