export const formatSeconds = (seconds: number) => {
    let hours: number|string = Math.floor(seconds / 3600);
    let minutes: number|string = Math.floor((seconds - (hours * 3600)) / 60);
    var second: number|string = seconds - (hours * 3600) - (minutes * 60);

    if (hours < 10) {
        hours   = "0"+hours;
    }
    if (minutes < 10) {
        minutes = "0"+minutes;
    }
    if (second < 10) {
        second = "0"+second;
    }

    return hours+':'+minutes+':'+second;
}