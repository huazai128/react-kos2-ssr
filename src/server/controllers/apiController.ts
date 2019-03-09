import { Controller, Get, Put, Patch, Post, Delete, Param, Ctx } from 'routing-controllers'
import { userId } from '../utils/config'
import { getUserInfo } from '../service/user'

@Controller("/api")
export class ApiControll {
  @Get("/user/login")
  async getUserInfo (@Ctx() ctx:any) {
    const id =  ctx.session.userId || userId;
    if(!id) return "赶紧登录去!"
    const res = await getUserInfo(id);
    console.log(res, 'res======')
    // const 
  }
} 