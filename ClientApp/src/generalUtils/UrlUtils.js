export function RemoveHttp(url) {
    return url.replace(/^(https?:|)\/\//, "").replace(/\/$/, "");
}
