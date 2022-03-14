import Moment from 'moment';
import html2canvas from "html2canvas";
import queryString from 'query-string';

export function RemoveHttp(url) {
    if (!url) return null;
    return url.replace(/^(https?:|)\/\//, "").replace(/^www\./, "").replace(/\/$/, "");
}


export function Period(event) {
    let startDate = Moment(event.startDate).format("MMM yyyy");
    let endDate = event.endDate ? Moment(event.endDate).format("MMM yyyy") : "Present";
    return startDate + " - " + endDate;
}


export function ClassNames(classNames) {
    return classNames
        .filter(className => className)
        .join(" ");
}

export function HorizontalSpacer() {
    return <span className="HorizontalSpacer">&nbsp;</span>;
}

export function IconSpacer() {
    return <span className="MenuIconSpacer"></span>;
}

export async function ExportAsImage(element, imageFileName) {
    let canvas = await html2canvas(element);
    let image = canvas.toDataURL("image/png", 1.0);

    let fakeLink = window.document.createElement("a");
    fakeLink.style = "display:none;";
    fakeLink.download = imageFileName;

    fakeLink.href = image;

    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);

    fakeLink.remove();
}

export function LoadQueryParameters() {
    let queryParameters = queryString.parse(document.location.search);

    queryParameters.BoolValueOrDefault = (valueName, defaultValue) => {
        let value = queryParameters[valueName];
        if (value) {
            return JSON.parse(value);
        }
        return defaultValue;
    }
    return queryParameters;
}