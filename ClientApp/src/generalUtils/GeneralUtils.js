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
    return <span className="Period">&nbsp;{startDate} - {endDate}</span>;
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

function parseValue([key, value]) {
    try {
        return [key.trim(), JSON.parse(value)];
    }
    catch {
        return [key.trim(), value?.trim()];
    }
}

export function LoadQueryParameters() {
    return Object.fromEntries(
        Object.entries(queryString.parse(document.location.search))
            .map(parseValue)
    );
}

export function VerticalAlignment(top) {
    return {
        position: "relative",
        top: top + "px"
    }
}