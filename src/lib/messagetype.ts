export type MessageType = "getShareLink" | "getServerList";
export const EXT = "suruttofedishare";

type getShareLinkRequestBody = {
    text: string,
    url: string | undefined,
}

export type MessageResponsePayload = {
    id: string,
    ext: string,
    response: MessageSuccessResponseBody | MessageErrorResponseBody,
}

export type MessageSuccessResponseBody = {
    status: "error"
    error: string,
}

export type MessageErrorResponseBody = {
    status: "ok",
    body: string,
}

export type MessageRequestPayload = {
    id: string,
    ext: string,
    method: MessageType,
    params: getShareLinkRequestBody,
}

export type ServerInfo = { type: string, url: URL }

export type Msg = Record<string, MsgValue>;

type MsgValue = {
    resolve: (value: any | PromiseLike<any>) => void;
    reject: (reason?: any) => any;
}