const fs = require('fs')
const path = require('path')
const url = require('url')
let str = `export const url = '${process.env.NODE_URL}'
export const host = '${url.parse(process.env.NODE_URL).host}'
export const secret = '4ac67f8080f81c47a654de5c47660489'
export const appId = 'wx5ee275db6cf5da19'
export const appSecret = '4ac67f8080f81c47a654de5c47660489'
export const title = '关注前端最新资讯，分享前端开发的工作乐趣 - zKeyword | web前端开发'
export const description = 'web前端开发，专注前端开发，关注用户体验，分享前端开发的工作乐趣。'
export const keywords = '前端, 前端开发, web前端, web前端开发, 前端开发工程师, 前端资讯, javascript, seo, html5, css3, 用户体验'
export const ext = ['.png', '.jpg', '.jpeg', '.gif', '.svg']
export const domain = '${process.env.NODE_DOMAIN}'
`
fs.writeFileSync(path.join(__dirname, '../src/server/utils/config.ts'), str)
