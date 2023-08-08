import browser from "webextension-polyfill";

export const getServerList = async (): Promise<Record<string, any>> => {
    let storage = await browser.storage.sync.get("server");
    return storage["server"];
}