
type KoaCtx = {
  method: string,
  params?: any,
}

type KoaNext = Function


export class Router {

  private middlewares = []

  routes() {
    return (ctx: KoaCtx, next: KoaNext) => {
      return next()
    }
  }
}
