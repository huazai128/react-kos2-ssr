import { Controller, Ctx, Get, Param, UseBefore, UseAfter } from 'routing-controllers'
import { minify } from 'html-minifier'
import * as rp from 'request-promise'
import { render } from '../utils/render'
import { url, title } from '../utils/config'
import { ErrorResponder } from '../middleware/errorMiddleware'

@Controller()
@UseBefore(ErrorResponder)
export class UserController {
    @Get('/')
    async getHome(@Ctx() ctx: any) {
      const ServerData = { url: ctx.req.url }
      await ctx.render('client', { // 
        title:"大大",
        html: minify(render(ServerData, ctx.req.url)),
        ServerData
      })
      return ctx
    }

    @Get('/index')
    async getIndex(@Ctx() ctx: any) {
      const ServerData = { url: ctx.req.url }
      await ctx.render('client', { // 
        title:"嘻哈====",
        html: minify(render(ServerData, ctx.req.url)),
        ServerData
      })
      return ctx
    }
    @Get('/login')
    async login(@Ctx() ctx: any){
      const ServerData = { url: ctx.req.url }
      await ctx.render('client', { // 
        title:"喜欢",
        html: minify(render(ServerData, ctx.req.url)),
        ServerData
      })
      return ctx
    }
}