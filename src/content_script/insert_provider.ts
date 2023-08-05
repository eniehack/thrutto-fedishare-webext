import browser from "webextension-polyfill";

let script = document.createElement("script");
script.setAttribute("async", "false");
script.setAttribute("type", "text/javascript");
script.setAttribute("src", browser.runtime.getURL("../provider.js"));
document.head.appendChild(script);

console.log("done");