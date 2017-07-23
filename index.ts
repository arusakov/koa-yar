
export type KoaCtx = {
  method: string,
  params?: any,
  path: string,
}

export type KoaNext = (ctx: KoaCtx, next?: KoaNext) => any

type Handler = {
  method: string,
  path: string,
  cb: KoaNext,
}

type HandlersDict = {
  [index: string]: Handler[],
}

type HandlersDict2 = {
  [index: string]: {
    re: RegExp,
    callbacks: KoaNext[],
  },
}

export class Router {

  private handlers: Handler[] = []

  get(path: string, cb: KoaNext) {
    return this.register({ method: 'GET', path, cb })
  }

  post(path: string, cb: KoaNext) {
    return this.register({ method: 'POST', path, cb })
  }

  put(path: string, cb: KoaNext) {
    return this.register({ method: 'PUT', path, cb })
  }

  routes() {
    const dict1 = this.handlers.reduce((prev, cur) => {
      if (!prev[cur.method]) {
        prev[cur.method] = []
      }
      prev[cur.method].push(cur)
      return prev
    }, {} as HandlersDict)

    const dict2 = {} as HandlersDict2
    Object.keys(dict1).forEach((method) => {
      const handlers = dict1[method]
      const reAsString = '/' + handlers
        .map(h => h.path
            .replace(/^\//, '') // remove first slash
            .replace(/\//g, '\\/')
        )
        .map(s => '(' + s + ')') // group in regexp
        .join('|');


      dict2[method] = {
        re: new RegExp(reAsString, 'i'),
        callbacks: handlers.map(h => h.cb),
      }      
    })

    return (ctx: KoaCtx) => {
      const h = dict2[ctx.method]
      if (h) {
        let handlerIndex = 0 // initial value
        ctx.path.replace(h.re, function (match) {
          for (let i = 1; i <= h.callbacks.length; ++i) {
            if (arguments[i]) {
              handlerIndex = i
              break
            }
          }
          return match // doesn't change anything
        })

        if (handlerIndex) {
          return h.callbacks[handlerIndex - 1](ctx)
        }
      }      
    }
  }

  private register(handler: Handler) {
    this.handlers.push(handler)
    return this
  }
}
