export const emojiArray = [
  '/::)', // 微笑
  '/::~', // 撇嘴
  '/::B', // 色
  '/::|', // 发呆
  '/:8-)', // 得意
  '/::<', // 流泪
  '/::$', // 害羞
  '/::X', // 闭嘴
  '/::Z', // 睡
  "/::'(", // 大哭
  '/::-|', // 尴尬
  '/::@', // 发怒
  '/::P', // 调皮
  '/::D', // 呲牙
  '/::O', // 惊讶
  '/::(', // 难过
  '/::+', // 酷
  '/:--b', // 冷汗
  '/::Q', // 抓狂
  '/::T', // 吐
  '/:,@P', // 偷笑
  '/:,@-D', // 可爱
  '/::d', // 白眼
  '/:,@o', // 傲慢
  '/::g', // 饥饿
  '/:|-)', // 困
  '/::!', // 惊恐
  '/::L', // 流汗
  '/::>', // 憨笑
  '/::,@', // 大兵
  '/:,@f', // 努力
  '/::-S', // 咒骂
  '/:?', // 疑问
  '/:,@x', // 嘘
  '/:,@@', // 晕
  '/::8', // 折磨
  '/:,@!', // 衰
  '/:!!!', // 骷髅
  '/:xx', // 敲打
  '/:bye', // 再见
  '/:wipe', // 擦汗
  '/:dig', // 抠鼻
  '/:handclap', // 鼓掌
  '/:&-(', // 溴大了
  '/:B-)', // 坏笑
  '/:<@', // 左哼哼
  '/:@>', // 右哼哼
  '/::-O', // 哈欠
  '/:>-|', // 鄙视
  '/:P-(', // 委屈
  "/::'|", // 快哭了
  '/:X-)', // 阴险
  '/::*', // 亲亲
  '/:@x', // 吓
  '/:8*', // 可怜
  '/:pd', // 菜刀
  '/:<W>', // 西瓜
  '/:beer', // 啤酒
  '/:basketb', // 篮球
  '/:oo', // 乒乓
  '/:coffee', // 咖啡
  '/:eat', // 饭
  '/:pig', // 猪头
  '/:rose', // 玫瑰
  '/:fade', // 凋谢
  '/:showlove', // 示爱
  '/:heart', // 爱心
  '/:break', // 心碎
  '/:cake', // 蛋糕
  '/:li', // 闪电
  '/:bome', // 炸弹
  '/:kn', // 刀
  '/:footb', // 足球
  '/:ladybug', // 瓢虫
  '/:shit', // 便便
  '/:moon', // 月亮
  '/:sun', // 太阳
  '/:gift', // 礼物
  '/:hug', // 拥抱
  '/:strong', // 强
  '/:weak', // 弱
  '/:share', // 握手
  '/:v', // 胜利
  '/:@)', // 抱拳
  '/:jj', // 勾引
  '/:@@', // 拳头
  '/:bad', // 差劲
  '/:lvu', // 爱你
  '/:no', // No
  '/:ok', // Ok
  '/:love', // 爱情
  '/:<L>', // 飞吻
  '/:jump', // 跳舞
  '/:shake', // 发抖
  '/:<O>', // 怄火
  '/:circle', // 转圈
  '/:kotow', // 磕头
  '/:turn', // 回头
  '/:skip', // 跳绳
  '/:oY', // 挥手
  '/:#-0', // 激动
  '/:hiphot', // 街舞 // hiphot doesnot work!
  '/:kiss', // 献吻
  '/:<&', // 左太极
  '/:&>'] // 右太极

const regStr = "/::\\)|/::~|/::B|/::\\||/:8-\\)|/::<|/::\\$|/::X|/::Z|/::'\\(|/::-\\||/::@|/::P|/::D|/::O|/::\\(|/::\\+|/:--b|/::Q|/::T|/:,@P|/:,@-D|/::d|/:,@o|/::g|/:\\|-\\)|/::!|/::L|/::>|/::,@|/:,@f|/::-S|/:\\?|/:,@x|/:,@@|/::8|/:,@!|/:!!!|/:xx|/:bye|/:wipe|/:dig|/:handclap|/:&-\\(|/:B-\\)|/:<@|/:@>|/::-O|/:>-\\||/:P-\\(|/::'\\||/:X-\\)|/::\\*|/:@x|/:8\\*|/:pd|/:<W>|/:beer|/:basketb|/:oo|/:coffee|/:eat|/:pig|/:rose|/:fade|/:showlove|/:heart|/:break|/:cake|/:li|/:bome|/:kn|/:footb|/:ladybug|/:shit|/:moon|/:sun|/:gift|/:hug|/:strong|/:weak|/:share|/:v|/:@\\)|/:jj|/:@@|/:bad|/:lvu|/:no|/:ok|/:love|/:<L>|/:jump|/:shake|/:<O>|/:circle|/:kotow|/:turn|/:skip|/:oY|/:#-0|/:hiphot|/:kiss|/:<&|/:&>"

export function transformEmoji (message) {
  if (!message) {
    return ''
  }
  message = message.replace(/[\n]/ig, '<br/>')
  const reg = new RegExp(regStr, 'g')
  message = message.replace(reg, function (r) {
    if (emojiArray.indexOf(r) > -1) {
      return `<img class="emojiMsg" code="${r}" src="./static/wechatEmoji/${emojiArray.indexOf(r)}.png" oncontextmenu="return false"/>`
    } else {
      return message
    }
  })
  const linkReg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|#|\/|%|-|:)+)/g
  message = message.replace(linkReg, '<a href="$1$2" class="custom-link" target="_blank">$1$2</a>')
  return message
}
