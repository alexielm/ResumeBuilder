import Moment from 'moment';

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