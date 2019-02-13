const fs = require('fs')
const path = require('path')
const url = require('url')
let str = `export const url = '${process.env.NODE_URL}'
export const host = '${url.parse(process.env.NODE_URL).host}'
export const secret = '4ac67f8080f81c47a654de5c47660489'
export const appId = 'wx5ee275db6cf5da19'
export const appSecret = '4ac67f8080f81c47a654de5c47660489'
export const title = '前端坑太多了'
export const description = '扯淡'
export const keywords = 'Koa2 MongoDB React Webpack'
export const ext = ['.png', '.jpg', '.jpeg', '.gif', '.svg']
export const domain = '${process.env.NODE_DOMAIN}'
`
fs.writeFileSync(path.join(__dirname, '../src/server/utils/config.ts'), str)
