import _ from 'lodash'

export default new class {
    
    async getforwardMsg (e, message, {
    recallMsg = 0,
    info,
    fkmsg,
    isxml,
    xmlTitle,
    oneMsg,
    anony,
    shouldSendMsg = true
  } = {}) {
    let forwardMsg = []
    if (_.isEmpty(message)) throw Error('[cunyx-plugin][sendforwardMsg][Error]发送的转发消息不能为空')
    let add = (msg) => forwardMsg.push(
      {
        message: msg,
        nickname: info?.nickname ?? (e.bot ?? Bot).nickname,
        user_id: info?.user_id ?? (e.bot ?? Bot).uin
      }
    )
    oneMsg ? add(message) : message.forEach(item => add(item))
    if (e.isGroup) {
      forwardMsg = await e.group.makeForwardMsg(forwardMsg)
    } else {
      forwardMsg = await e.friend.makeForwardMsg(forwardMsg)
    }

    if (isxml && typeof (forwardMsg.data) !== 'object') {
      forwardMsg.data = forwardMsg.data.replace('<?xml version="1.0" encoding="utf-8"?>', '<?xml version="1.0" encoding="utf-8" ?>')
    }

    if (xmlTitle) {
      if (typeof (forwardMsg.data) === 'object') {
        let detail = forwardMsg.data?.meta?.detail
        if (detail) {
          detail.news = [{ text: xmlTitle }]
        }
      } else {
        forwardMsg.data = forwardMsg.data
          .replace(/\n/g, '')
          .replace(/<title color="#777777" size="26">(.+?)<\/title>/g, '___')
          .replace(/___+/, `<title color="#777777" size="26">${xmlTitle}</title>`)
      }
    }
    if (shouldSendMsg) {
      let msgRes = await this.reply(e, forwardMsg, false, {
        anony,
        fkmsg,
        recallMsg
      })
      return msgRes
    } else {
      return forwardMsg
    }
  }
}
  