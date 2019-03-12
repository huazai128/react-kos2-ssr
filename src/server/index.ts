import 'reflect-metadata'
import { join } from 'path'
import * as Koa from 'koa'
// import * as jwt from 'koa-jwt'
import * as json from 'koa-json'
import * as views from 'koa-views'
import * as helmet from 'koa-helmet'
import * as logger from 'koa-logger'
import * as koaStatic from 'koa-static'
import * as koaSession from 'koa-session'
import * as bodyParser from 'koa-bodyparser'
import { useKoaServer } from 'routing-controllers'
import { whiteList } from './middleware/whiteListMiddleware'
import MongClient from './utils/mongodb'
// import { secret } from './utils/config'

const port = parseInt(process.env.NODE_POST, 10) || 3001

// 链接数据库
MongClient.connect();
    
const server = new Koa()
server.use(helmet())
server.use(json())
server.use(logger())
server.use(bodyParser())
server.use(whiteList())
server.use(koaStatic(`${__dirname}/../../public`))
server.use(views(join(__dirname, '../../public'), {
    extension: 'html',
    map: { html: 'ejs' }
}))
//全局路由除了path 以外都需要携带token去请求
// server.use(jwt({secret:secret}).unless({
//   path: [/^\/*/] 
//   // path: [/^\/login/] 
// }))
server.keys = ['react-koa2-ssr']
server.use(koaSession({
    key: 'koa:sess',
    maxAge: 86400000,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: false
}, server))

// 绑定路由
const app = useKoaServer(server, {
    controllers: [__dirname + '/controllers/*{.js,.ts,.tsx}'],
    // defaultErrorHandler: false
})
app.listen(port)
console.log(`Koa application is up and running on port ${port}`)
