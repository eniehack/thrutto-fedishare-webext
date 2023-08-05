import browser from "webextension-polyfill";
import { EXT, MessageRequestPayload, MessageResponsePayload } from "../lib/messagetype";

let script = document.createElement("script");
script.setAttribute("async", "false");
script.setAttribute("type", "text/javascript");
script.setAttribute("src", browser.runtime.getURL("../provider.js"));
document.head.appendChild(script);

window.addEventListener("message", async (msg: MessageEvent<MessageRequestPayload>) => {
    if (msg.source !== window) return;
    if (!msg.data) return;
    if (msg.data.ext !== EXT) return;

    switch (msg.data.method) {
        case "getShareLink":
            let resp: MessageResponsePayload;
            let serverConfig = await browser.storage.sync.get("server");
            if (Object.assign(serverConfig).length === 0)
            {
                resp = { id: msg.data.id, ext: EXT, status: "error", body: "storage uninitialized" };
                window.postMessage(
                    resp,
                    msg.origin
                );
                return;
            }
            let share_url = new URL(serverConfig.server.url);
            switch (serverConfig.server.type)
            {
                case "misskey":
                    share_url.searchParams.set("text", msg.data.params.text);
                    if (typeof msg.data.params.url !== "undefined") {
                        share_url.searchParams.set("url", msg.data.params.url);
                    }
                    break;
                case "mastodon":
                    share_url.searchParams.set("text", msg.data.params.text);
                    if (typeof msg.data.params.url !== "undefined") {
                        share_url.searchParams.set("url", msg.data.params.url);
                    }
                    break;
                default:
                    break;
            }
            resp = { 
                id: msg.data.id,
                ext: EXT,
                status: "ok",
                body: share_url,
            }
            window.postMessage(
                resp,
                msg.origin
            );
            break;
        default:
            resp = { id: msg.data.id, ext: EXT, status: "error", body: "unknown method name called" };
            window.postMessage(
                resp,
                msg.origin
            );
            break;
    }

    
    
})

console.log("done");