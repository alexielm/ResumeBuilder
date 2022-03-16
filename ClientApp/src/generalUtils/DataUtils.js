import App from '../App';

export function LoadResumeData() {
    return new Promise(async done => {
        if (App.ResumeData) {
            return App.ResumeData;
        }
        const response = await fetch("api/resumeData");
        let resumeData = await response.json();
        App.ResumeData = resumeData;
        done(resumeData);
    });
}

export function ClearResumeData() {
    App.ResumeData = null;
}