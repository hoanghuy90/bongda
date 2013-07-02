function Novanet() { }
Novanet.prototype.getBrowser = function () {
    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var browserName = navigator.appName;
    var fullVersion = '' + parseFloat(navigator.appVersion);
    var majorVersion = parseInt(navigator.appVersion, 10);
    var nameOffset, verOffset, ix;
    var browsers = new Array();
    browsers[0] = "0";
    browsers[1] = "0";
    // In Opera, the true version is after "Opera" or after "Version"
    if ((verOffset = nAgt.indexOf("Opera")) != -1) {
        browserName = "1";
        fullVersion = nAgt.substring(verOffset + 6);
        if ((verOffset = nAgt.indexOf("Version")) != -1)
            fullVersion = nAgt.substring(verOffset + 8);
    }
    // In MSIE, the true version is after "MSIE" in userAgent
    else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
        browserName = "2";
        fullVersion = nAgt.substring(verOffset + 5);
    }
    // In Chrome, the true version is after "Chrome" 
    else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
        browserName = "3";
        fullVersion = nAgt.substring(verOffset + 7);
    }
    // In Safari, the true version is after "Safari" or after "Version" 
    else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
        browserName = "4";
        fullVersion = nAgt.substring(verOffset + 7);
        if ((verOffset = nAgt.indexOf("Version")) != -1)
            fullVersion = nAgt.substring(verOffset + 8);
    }
    // In Firefox, the true version is after "Firefox" 
    else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
        browserName = "5";
        fullVersion = nAgt.substring(verOffset + 8);
    }
    // In most other browsers, "name/version" is at the end of userAgent 
    else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) <
        (verOffset = nAgt.lastIndexOf('/'))) {
        browserName = nAgt.substring(nameOffset, verOffset);
        fullVersion = nAgt.substring(verOffset + 1);
        if (browserName.toLowerCase() == browserName.toUpperCase()) {
            browserName = navigator.appName;
        }
    }
    // trim the fullVersion string at semicolon/space if present
    if ((ix = fullVersion.indexOf(";")) != -1)
        fullVersion = fullVersion.substring(0, ix);
    if ((ix = fullVersion.indexOf(" ")) != -1)
        fullVersion = fullVersion.substring(0, ix);

    majorVersion = parseInt('' + fullVersion, 10);
    if (isNaN(majorVersion)) {
        fullVersion = '' + parseFloat(navigator.appVersion);
        majorVersion = parseInt(navigator.appVersion, 10);
    }
    browsers[0] = browserName;
    browsers[1] = majorVersion;
    return browsers;
};
Novanet.prototype.getOS = function () {
    var osName = "0";
    if (navigator.appVersion.indexOf("Win") != -1) osName = "1"; //OSName="Windows";
    if (navigator.appVersion.indexOf("Mac") != -1) osName = "2"; //OSName="MacOS";
    if (navigator.appVersion.indexOf("X11") != -1) osName = "3"; //OSName="UNIX";
    if (navigator.appVersion.indexOf("Linux") != -1) osName = "4"; //OSName="Linux";
    return osName;
};
Novanet.prototype.init = function (width, height, zoneid, nnc) {
    var browser = this.getBrowser();
    var browserName = browser[0];
    var browserVer = browser[1];
    var osName = this.getOS();
    var refer = encodeURIComponent(document.referrer);
    var historyLength = history.length;
    var host = encodeURIComponent(window.location.hostname);
    var url = encodeURIComponent(window.location.href);
    var osVer = "0";

    var q = 'zone=' + zoneid + '&url=' + url + '&host=' + host + '&ref=' + refer + '&hl=' +
				historyLength + '&br=' + browserName + '&brver=' + browserVer + '&osname=' + osName +
				'&osver=' + osVer + '&width=' + width + '&height=' + height + '&time=' + (new Date()).getMilliseconds() ;
    var gci = '<div id="novanetzone' + zoneid + '" style="display:block;overflow:hidden;margin:auto;text-align:center;width:'
                + width + 'px;height:' + height + 'px;"><iframe id="novanetbanner' + zoneid +
				'" scrolling="no" frameborder="0" allowtransparency="true" style="margin:0;padding:0;" width="' +
				width + '" height="' + height + '" src="' + 'http://' + 'static.novanet.vn/adloader.htm?' + q + '"></iframe></div>';
	var s2 = ''; // '<iframe id="gatracking' + zoneidid + '" scrolling="no" frameborder="0" allowtransparency="true" style="margin:0;padding:0;" width="0" height="0" src="' + 'http://' + 'novanet.vn/ga.htm?' + q + '"></iframe>';
    document.write(gci);
};

 var temp = new Novanet(); temp.init(300, 250, 1075, 212338504636337); ﻿