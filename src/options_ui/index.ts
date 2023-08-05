import browser from "webextension-polyfill";

const saveOptions = (e: SubmitEvent) =>
{
    e.preventDefault();
    let server_type: string | undefined;
    (document.getElementsByName("server_type") as NodeListOf<HTMLInputElement>).forEach(t =>
    {
        if (t.checked) {
            server_type = t.value;
        }
    })
    if (typeof server_type === "undefined")
    {
        return
    }
    console.log((document.getElementById("server_url") as HTMLInputElement).value)
    browser.storage.sync.set({
        server: {
            type: server_type,
            url: new URL((document.getElementById("server_url") as HTMLInputElement).value),
        }
    });
}

const restoreOptions = () => {
    const restore = (result: Record<string, any>) =>
    {
        console.log(result);
        if (Object.keys(result).length === 0)
        {
            return;
        }
        else if ( typeof result.server.type === "undefined" || typeof result.server.url === "undefined" )
        {
            throw new Error("invalid strage schema")
        }
        setCurrentChoice(result.server.type);
        (document.getElementById("server_url") as HTMLInputElement).value = result.server.url.toString();
    }
    const setCurrentChoice = (server_type: string) =>
    {
        (document.getElementsByName("server_type") as NodeListOf<HTMLInputElement>).forEach(t =>
        {
            if (t.value === server_type)
            {
                t.checked = true;
            }
        });
    }
    const onError = (err: Error) =>
    {
        console.error(`Error: ${err}`)
    }
    let storage = browser.storage.sync.get("server");
    storage.then(restore, onError)
}

document.addEventListener("DOMContentLoaded", restoreOptions)
document.getElementById("form")?.addEventListener("submit", saveOptions);