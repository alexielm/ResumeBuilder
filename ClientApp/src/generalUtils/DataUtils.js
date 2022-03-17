export const Data = {
    QueryParameters: null,
    FrontEndParameters: null,
    ResumeData: null,
    SpecialView: false
}

export function LoadFrontEndParameters() {
    return new Promise(async done => {
        const response = await fetch("api/frontEndParameters");
        Data.FrontEndParameters = await response.json();
        done();
    });
}

export function LoadResumeData() {
    return new Promise(async done => {
        if (Data.ResumeData) {
            return Data.ResumeData;
        }
        const response = await fetch("api/resumeData");
        let resumeData = await response.json();
        Data.ResumeData = resumeData;
        done();
    });
}

export function ClearResumeData() {
    Data.ResumeData = null;
}