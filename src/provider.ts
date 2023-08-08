import { EXT, MessageResponsePayload, Msg } from "./lib/messagetype";

type fediverse = {
    _msg: Msg,
    meta: {
        apiVersion: "eniehack/v0.1.0"
    },
    getShareLink(text: string, url?: string): Promise<string>;
    __call<T>(method: string, params: Object): Promise<T>;
}

declare global {
    interface Window {
        fediverse: fediverse
    }
}

window.fediverse = {
    _msg: {},
    meta: {
        apiVersion: "eniehack/v0.1.0"
    },
    async getShareLink(text: string, url?: string): Promise<string> {
        return window.fediverse.__call("getShareLink", {text, url});
    },
    async __call<T>(method: string, params: Object): Promise<T> {
        return new Promise((resolve, reject) => {
            let id = Math.random().toString().slice(4);
            window.fediverse._msg[id] = { resolve, reject };
            window.postMessage(
                {id, ext: EXT, method, params },
                "*"
            )
        })
    }
}

window.addEventListener("message", (msg: MessageEvent<MessageResponsePayload>) => {
    if (
        !msg.data ||
        msg.data.ext !== EXT ||
        !msg.data.response ||
        !window.fediverse._msg[msg.data.id]
    )
        return;

    if (msg.data.response.status === "error") {
        window.fediverse._msg[msg.data.id].reject(msg.data.response.error);
    } else {
        window.fediverse._msg[msg.data.id].resolve(msg.data.response.body);
    }

    delete window.fediverse._msg[msg.data.id]
})
