export declare type KoaCtx = {
    method: string;
    params?: any;
    path: string;
};
export declare type KoaNext = (ctx: KoaCtx, next?: KoaNext) => any;
export declare class Router {
    private handlers;
    get(path: string, cb: KoaNext): this;
    post(path: string, cb: KoaNext): this;
    put(path: string, cb: KoaNext): this;
    routes(): (ctx: KoaCtx) => any;
    private register(handler);
}
