import browser from "webextension-polyfill";

type fediverseShareV1 = {
    meta: {
        apiVersion: "v1"
    },
    getServerInfo(): Promise<Object | undefined>;
}

declare global {
    interface Window {
        fediverseShareV1: fediverseShareV1
    }
}

window.fediverseShareV1 = {
    meta: {
        apiVersion: "v1"
    },
    async getServerInfo(): Promise<Object | undefined>
    {
        let serverConfig = await browser.storage.sync.get("server");
        if (typeof serverConfig === "undefined" || serverConfig === null)
        {
            return undefined;
        }
        return {
            url: serverConfig["url"],
            type: serverConfig["type"]
        };
    }
}
