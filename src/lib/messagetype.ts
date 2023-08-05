export type MessageType = "getShareLink";
export const EXT = "suruttofedishare";

type getShareLinkBody = URL;
type getShareLinkRequestBody = {
    text: string,
    url: string | undefined,
}

export type MessageResponsePayload = {
    id: string,
    ext: string,
    status: "ok" | "error",
    body: getShareLinkBody | string,
}

export type MessageRequestPayload = {
    id: string,
    ext: string,
    method: MessageType,
    params: getShareLinkRequestBody,
}

export type Msg = Record<string, MsgValue>;

type MsgValue = {
    resolve: (value: Object | PromiseLike<Object | undefined> | undefined) => void,
    reject: (reason?: any) => void
}