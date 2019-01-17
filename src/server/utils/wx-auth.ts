// import * as jwt from 'koa-jwt'
import * as request from 'request'
import * as querystring from 'querystring'
// import * as jsonwebtoken from 'jsonwebtoken'
import { appId, appSecret, secret } from './config' 

interface dataType {
  access_token: string;
  create_at: number;
  expires_in: number;
  openId: string;
  [key:string]: any;
}
/**
 * 微信授权登录以及过期失效
 */
export default class WxAuth {
  private data: dataType;
  constructor(data){
    this.data = data;
  }
  // 验证token是否过期
  public isValid(): boolean{
    console.log(this.data.access_token)
    return !!this.data.access_token && (new Date().getTime()) < (this.data.create_at + this.data.expires_in * 1000);
  }
  /**
   * 根据openID获取用户的token
   * @param openId 
   */
  public getToken (openId: string){
    return this.data[openId]
  }
  /**
   * 根据openId保存token
   * @param openId 用户openID
   * @param token 用户token
   */
  public saveToken(openId:string, token:string){
    this.data[openId] = token;
  }
  /**
   * 获取授权页面的URL地址
   * @param redirect_uri 授权后要跳转的地址
   * @param scope 作用范围，值为snsapi_userinfo和snsapi_base，前者用于弹出，后者用于跳转
   * @param state 开发者可提供的数据
   */
  public getAuthorizeURL(redirect_uri:string, scope?:string, state?:string):Promise<any>{
    return new Promise((resolve, reject) => {
      const url = 'https://open.weixin.qq.com/connect/oauth2/authorize'
      const info = {
        appId: appId,
        redirect_uri: redirect_uri,
        scope: scope || 'snsapi_base',
        state: state || '',
        response_type: 'code'
      }
      resolve(url + '?' + querystring.stringify(info) + '#wechat_redirect')
    })
  }
  /**
   * 处理token，更新过期时间
   * @param data 
   */
  public processToken(data: dataType): dataType{
    data.create_at = new Date().getTime();
    this.saveToken(data.openid,data.access_token);
    return this.data;
  }
  /**
   * 根据授权获取到的code，换取access_token和openid
   * @param code 
   */
  public getAccessToken(code: string):Promise<any>{
    return new Promise((resolve, reject) => {
      const url = 'https://api.weixin.qq.com/sns/oauth2/access_token'
      const info = {
        appid: appId,
        secret: appSecret,
        code: code,
        grant_type: 'authorization_code'
      }
      request.post(url, {form:info},(err, res, body) => {
        if(err){
          reject(err)
        } else {
          const data = JSON.parse(body);
          resolve(this.processToken(data));
        }
      })
    })
  }
  /**
   * 根据refresh token，刷新access token，调用getAccessToken后才有效
   * @param refreshToken 
   */
  public refreshAccessToken(refreshToken: string):Promise<any>{
    return new Promise((resolve, reject) => {
      const url = 'https://api.weixin.qq.com/sns/oauth2/refresh_token';
      var info = {
          appid: appId,
          grant_type: 'refresh_token',
          refresh_token: refreshToken
      };
      request.post(url,{form:info},(err, res, body) => {
        if(err){
          reject(err)
        }else{
          const data = JSON.parse(body);
          resolve(this.processToken(data))
        }
      })
    })
  }
  /**
   * 根据openid，获取用户信息
   * 当access_token无效时，自动通过refresh token获取新的access token。然后再获取用户信息
   * @param openId 
   */
  public async getUser(openId: string): Promise<any>{
    const token = this.getToken(openId);
    console.log(token, 'token=====')
    if(!token){
      const error = new Error('No token for ' + openId + ', please authorize first.');
      error.name = 'NoOAuthTokenError';
		  throw error;
    }
    let newToken;
    if(this.isValid()){
      newToken = token;
    } else {
      console.log(this.data.refresh_token, 'refresh_token')
      const refToken = await this.refreshAccessToken(this.data.refresh_token);
      newToken = refToken.data.access_token
    }
    return await this._getUser(openId,newToken);
  }
  /**
   * 获取用户信息
   * @param openid 
   * @param accessToken token
   * @param lang 语言
   */
  private async _getUser(openId:string, accessToken: string,lang?:string): Promise<any>{
    return new Promise((resolve, reject) => {
      const url = "https://api.weixin.qq.com/sns/userinfo";
      const info = {
        access_token: accessToken,
        openid: openId,
        lang:lang||'zh_CN'
      }
      request.post(url,{form:info},(err, res, body) => {
        if(err){
          reject(err)
        }else{
          console.log(body, 'body =======')
          resolve(JSON.parse(body));
        }
      })
    })
  }
  /**
   * 根据code获取用户信息
   * @param code 
   */
  public async getUserByCode(code: string){
    const { data } = await this.getAccessToken(code);
	  return await this.getUser(data.openid);
  }
}