import { Context } from 'koa'
import { KoaMiddlewareInterface, Middleware, Ctx } from 'routing-controllers'
import { render } from '../utils/render'

@Middleware({ type: 'before' })
export class ErrorResponder implements KoaMiddlewareInterface {
    public async use(@Ctx() ctx: Context, next: (err?: any) => Promise<any>) {
        try {
            await next()
        } catch (error) {
            // do something with caught rejection
            await ctx.render('', {
                title: '404',
                html: render({}, ctx.req.url),
                ServerData: {}
            })
            return ctx
        }
    }

}