const apiAddress = 'http://localhost:3000';

const apiProxyConf = {
    "target": apiAddress,
    "secure": false,
    "logLevel": "debug"
}

module.exports = {
    "/images/*" : apiProxyConf,
    "/add-image*" : apiProxyConf

}
