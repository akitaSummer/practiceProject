import {Request, Response} from "express";
import { controller, get, post } from '../decorator/index'
import { getResponseData } from '../utils/util'

interface BodyRequest extends Request {
  body: {
    [key: string]: string | undefined
  }
}

@controller('/api')
export class LoginController {

  static isLogin(req: BodyRequest): boolean {
    return !!(req.session ? req.session.login : false)
  }

  @get('/isLogin')
  isLogin(req: BodyRequest, res: Response): void {
    const isLogin = LoginController.isLogin(req)
    const result = getResponseData<responseResult.isLogin>(isLogin)
    res.json(result)
  }

  @get('/logout')
  logout(req: BodyRequest, res: Response): void {
    if (req.session) {
      req.session.login = undefined
    }
    const result = getResponseData<responseResult.logout>(true)
    res.json(result)
  }

  @post('/login')
  login(req: BodyRequest, res: Response): void {
    const { password } = req.body
    const isLogin = LoginController.isLogin(req)
    if (isLogin) {
      res.json(getResponseData(true, '已经登陆过'))
    } else {
      if (password === '1234' && req.session) {
        req.session.login = true
        const result = getResponseData<responseResult.login>(true)
        res.json(result)
      } else {
        const result = getResponseData<responseResult.login>(false, '登录失败')
        res.json(result)
      }
    }
  }
}
