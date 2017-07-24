class Router {

  constructor() {
    this.handlers = []
  }

  get(path, cb) {
    return this.register({ method: 'GET', path, cb })
  }

  post(path, cb) {
    return this.register({ method: 'POST', path, cb })
  }

  put(path, cb) {
    return this.register({ method: 'PUT', path, cb })
  }

  delete(path, cb) {
    return this.register({ method: 'DELETE', path, cb })
  }

  routes() {
    const dict1 = this.handlers.reduce((prev, cur) => {
      if (!prev[cur.method]) {
        prev[cur.method] = []
      }
      prev[cur.method].push(cur)
      return prev
    }, {})

    const dict2 = {}
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
        groups: handlers.map(h => ({ cb: h.cb })),
      }
    })

    return (ctx) => {
      const h = dict2[ctx.method]
      if (h) {
        const { groups } = h
        let groupIndex = -1 // initial value
        ctx.path.replace(h.re, (match, ...args) => {
          for (let i = 0; i < groups.length; ++i) {
            if (args[i]) {
              groupIndex = i
              break
            }
          }
          return match // doesn't change anything
        })

        if (groupIndex >= 0) {
          return groups[groupIndex].cb(ctx)
        }
      }
    }
  }

  register(handler) {
    this.handlers.push(handler)
    return this
  }
}

exports.Router = Router
