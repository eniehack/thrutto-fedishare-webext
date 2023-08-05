import { Msg, EXT, MessageResponsePayload } from "./lib/messagetype";

type fediverseShareV1 = {
    _msg: Msg
    meta: {
        apiVersion: "v1"
    },
    getServerInfo(text: string, url?: string): Promise<Object | undefined>;
}

declare global {
    interface Window {
        fediverseShareV1: fediverseShareV1
    }
}

window.fediverseShareV1 = {
    _msg: {},
    meta: {
        apiVersion: "v1"
    },
    async getServerInfo(text: string, url?: string): Promise<Object | undefined>
    {
        return new Promise((resolve, reject) => {
            let id = Math.random().toString().slice(4);
            this._msg[id] = { resolve, reject };
            window.postMessage(
                {id, ext: EXT, method: "getShareLink", params: {text, url}},
                "*"
            )
        })
    }
}

window.addEventListener("message", (msg: MessageEvent<MessageResponsePayload>) => {
    if (
        !msg.data ||
        msg.data.ext !== EXT ||
        !window.fediverseShareV1._msg[msg.data.id]
    )
        return;

    if (typeof msg.data.body === "string")
    {
        window.fediverseShareV1._msg[msg.data.id].reject(msg.data.body);
    }
    else
    {
        window.fediverseShareV1._msg[msg.data.id].resolve(msg.data.body);
    }

    delete window.fediverseShareV1._msg[msg.data.id]
})
