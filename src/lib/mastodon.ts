import { Server } from "./server";

export class Mastodon implements Server {
    server: URL;
    text: string;
    url?: string;

    constructor(server: URL, text: string, url?: string) {
        this.server = server;
        this.text = text;
        this.url = url;
    }

    public getShareLink() : URL {
        let share_url = new URL(this.server);
        share_url.pathname = "/share";
        share_url.searchParams.set("text", this.text);
        if (typeof this.url !== "undefined") {
            share_url.searchParams.set("url", this.url);
        }
        return share_url;
    }
}