const unixToHMS = (unix) => {
    let date = new Date(unix * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    // let seconds = "0" + date.getSeconds();

    let formattedTime = hours + ':' + minutes.substr(-2);

    return formattedTime;
};

module.exports = { unixToHMS };