import Moment from 'moment';

export function RemoveHttp(url) {
    return url.replace(/^(https?:|)\/\//, "").replace(/\/$/, "");
}


export function Period(event) {
    let startDate = Moment(event.startDate).format("MMM yyyy");
    let endDate = event.endDate ? Moment(event.endDate).format("MMM yyyy") : "Present";
    return startDate + " - " + endDate;
}

