import browser from "webextension-polyfill";
import { EXT, MessageRequestPayload, MessageResponsePayload } from "../lib/messagetype";
import { getServerList } from "../lib/storage";
import { Mastodon } from "../lib/mastodon";
import { Misskey } from "../lib/misskey";
import { Server } from "../lib/server";

let script = document.createElement("script");
script.setAttribute("async", "false");
script.setAttribute("type", "text/javascript");
script.setAttribute("src", browser.runtime.getURL("../provider.js"));
document.head.appendChild(script);

window.addEventListener("message", async (msg: MessageEvent<MessageRequestPayload>) => {
    if (msg.source !== window) return;
    if (!msg.data) return;
    if (msg.data.ext !== EXT) return;

    let serverConfig = await getServerList();
    switch (msg.data.method) {
        case "getShareLink":
            let resp: MessageResponsePayload;        
            if (Object.assign(serverConfig).length === 0)
            {
                resp = { id: msg.data.id, ext: EXT, response: {error: "storage uninitialized", status: "error"} };
                window.postMessage(
                    resp,
                    msg.origin
                );
                return;
            }
            let server: Server;
            switch (serverConfig.type)
            {
                case "misskey":
                    server = new Misskey(serverConfig.url, msg.data.params.text, msg.data.params.url);
                    break;
                case "mastodon":
                    server = new Mastodon(serverConfig.url, msg.data.params.text, msg.data.params.url);
                    break;
                default:
                    return;
            }
            resp = { 
                id: msg.data.id,
                ext: EXT,
                response: {
                    status: "ok",
                    body: server.getShareLink().toString(),
                },
            }
            window.postMessage(
                resp,
                msg.origin
            );
            break;
        default:
            resp = { id: msg.data.id, ext: EXT, response: {error: "unknown method name called", status: "error" }};
            window.postMessage(
                resp,
                msg.origin
            );
            break;
    }
})

console.log("done");