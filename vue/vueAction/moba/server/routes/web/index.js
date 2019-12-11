module.exports = app => {
  const router = require('express').Router()
  const mongoose = require('mongoose')
  const Article = mongoose.model('Article')
  const Category = mongoose.model('Category')
  router.get('/news/init', async (req, res) => {
    const parent = await Category.findOne({
      name: '新闻分类'
    })
    const cats = await Category.find().where({parent}).lean()
    const newsTitles = ["狄某有话说 | 如何拥有好队友，快来get匹配新姿势！", "体验服爆料 | 不想匹配那个Ta，我有一个小方法！", "王者音乐课 | 稷下学子流行风向标，星之队队长曜墙裂推荐！", "狄某有话说 | 客服团队小知识，局内反馈就找Ta！", "预约赢永久皮肤，天生BUFF再升级！", "8月1日全服不停机更新公告", "7月30日全服不停机更新公告", "净化游戏环境声明及处罚公告（7月24日-7月29日）", "7月30日“演员”惩罚名单", "7月30日外挂专项打击公告", "世界冠军杯 集卡赢壕礼活动公告", "炎炎夏日全新活动周 峡谷激战得好礼", "助力世冠赛 心愿单升级回馈公告", "夏日福利继续领 限定皮肤返场", "【稷下的神秘档案】活动公告", "世冠四强出炉 8月2日半决赛拉开战幕", "你是赛评师：QG2：4不敌RNG.M止步世冠，他们这次是否只是差点运气？", "世冠总决赛门票已售罄，8月10日不见不散，感恩有你！", "世冠总决赛落地深圳大运，多重福利邀你8月10日现场观赛！", "虎牙明星大腿杯S2赛季全新升级，争锋相对谁能脱颖而出成为最强大腿"]
    const newsList = newsTitles.map(title => {
      const randomCats = cats.splice(0).sort((a, b) => {
        Math.random() - 0.5
      })
      return {
        category: randomCats.slice(0, 2),
        title
      }
    })
    await Article.deleteMany({})
    await Article.insertMany(newsList)
    res.send(newsList)
  })

  app.use('/web/api', router)
}

// 新闻列表接口
router.get('/news/list', async (request, response) => {
  // // populate不能控制多个分类中单一分类的文章数量
  // const parent = await Category.findOne({
  //   name: '新闻分类'
  // }).populate({
  //   path: 'children',
  //   populate: {
  //     path: 'newsList'
  //   }
  // }).lean()

  // 聚合查询
  const parent = await Category.findOne({
    name: '新闻分类'
  })
  const cats = await Category.aggregate([
    {$match: {parent: parent._id}},
    {
      $lookup: {
        from: 'articles',
        localField: '_id', // 本地键
        foreignField: 'categories', // 外地键(article中的键名)
        as: 'newsList'
      }
    },
    {
      $addFields: {
        newsList: {$slice: ['$newsList', 5]}
      }
    }
  ])
  const subCats = cats.map(v => v._id)
  cats.unshift({
    name: '热门',
    newsList: await Article.find().where({categories: {$in: subCats}}).populate('categories').limit(5).lean()
  })

  cats.map(cat => {
    cat.newsList.map(news => {
      news.categoryName = (cat.name === '热门' ? news.categories[0].name : cat.name)
      return news
    })
    return cat
  })

  response.send(cats)
})
