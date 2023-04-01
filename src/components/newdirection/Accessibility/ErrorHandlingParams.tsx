export type Answer={
    internalStatus:string;
    [key:string]:any,
}
export const CODE = {
    //post success
    SUCCESS:"00001",
    //data existed
    EXISTED:"00002",
    NOT_EXISTED:"0000201",
    //post failed for many reasons
    FAILED:"00003",
    //post failed because input was null/undefined/empty
    NULL:"00004",
}