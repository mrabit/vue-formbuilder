export default (_self, h) => {
  return [
    h('hr', {
      style: {
        'margin-bottom': _self.obj.marginBottom + 'px',
        'margin-top': _self.obj.marginTop + 'px',
      }
    })
  ]
}

export const hrConf = {
  // 是否可配置
  config: true,
  marginTop: 0,
  marginBottom: 24
}
