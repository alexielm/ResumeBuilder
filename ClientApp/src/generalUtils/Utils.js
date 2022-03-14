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

export function HorizontalSpacer() {
    return <span className="HorizontalSpacer">&nbsp;</span>;
}

export function IconSpacer() {
    return <span className="MenuIconSpacer"></span>;
}

export function GetScreenshotOfElement(element, posX, posY, width, height, callback) {
    html2canvas(element, {
        onrendered: function (canvas) {
            var context = canvas.getContext('2d');
            var imageData = context.getImageData(posX, posY, width, height).data;
            var outputCanvas = document.createElement('canvas');
            var outputContext = outputCanvas.getContext('2d');
            outputCanvas.width = width;
            outputCanvas.height = height;

            var idata = outputContext.createImageData(width, height);
            idata.data.set(imageData);
            outputContext.putImageData(idata, 0, 0);
            callback(outputCanvas.toDataURL().replace("data:image/png;base64,", ""));
        },
        width: width,
        height: height,
        useCORS: true,
        taintTest: false,
        allowTaint: false
    });
}