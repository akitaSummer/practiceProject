import { NextFunction, Request, Response} from "express";
import { controller, get, use } from '../decorator/index'
import { getResponseData } from "../utils/util";
import Analyzer from "../utils/analyzer";
import Crowller from "../utils/crowller";
import path from "path";
import fs from "fs";

interface BodyRequest extends Request {
  body: {
    [key: string]: string | undefined
  }
}

const checkLogin = (req: Request, res: Response, next: NextFunction): void => {
  const isLogin = !!(req.session ? req.session.login : false)
  console.log('isLogin middleware')
  if (isLogin) {
    next()
  } else {
    const result = getResponseData<null>(null, '请先登录')
    res.json(result)
  }
}

const test = (req: Request, res: Response, next: NextFunction): void => {
  console.log('test middleware')
  next()
}

@controller('/api')
export class CrowllerController {
  @get('/getData')
  @use(checkLogin)
  getData(req: BodyRequest, res: Response): void {
    const url = 'http://www.dell-lee.com/'
    const analyzer = Analyzer.getInstance()
    const crowller: Crowller = new Crowller(url, analyzer)
    const result = getResponseData<responseResult.getData>(true)
    res.json(result)
  }
  @get('/showData')
  @use(checkLogin)
  @use(test)
  showData(req: BodyRequest, res: Response): void {
    try {
      const position = path.resolve(__dirname, '../../data/course.json')
      const result = fs.readFileSync(position, 'utf8')
      const send = getResponseData<responseResult.showData>(JSON.parse(result))
      res.json(result)
    } catch (e) {
      const result = getResponseData<responseResult.showData>(false, '数据不存在')
      res.json(result)
    }
  }
}
