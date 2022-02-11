import Moment from 'moment';

export function RemoveHttp(url) {
    return url.replace(/^(https?:|)\/\//, "").replace(/^www\./, "").replace(/\/$/, "");
}


export function Period(event) {
    let startDate = Moment(event.startDate).format("MMM yyyy");
    let endDate = event.endDate ? Moment(event.endDate).format("MMM yyyy") : "Present";
    return startDate + " - " + endDate;
}

export function TimeLineFilter(timeLine, filterBy) {
    let events = timeLine
        .filter(event => event.eventType === filterBy)
        .map(event => ({
            first: 0,//Math.min(event.career.map(career => career.startDate)),
            event
        }));
      
    
    
//    .sort((left, right) => left.startDate === right.startDate ? 0 : (left.startDate < right.startDate ? 1 : -1));
    console.log(events);
    return events.map(event => event.event);
}


