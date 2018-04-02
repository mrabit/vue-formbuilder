export default (_self, h) => {
  return [
    h('h' + (_self.obj.level || 3), {
      style: {
        'margin-bottom': '24px',
      },
      domProps: {
        innerHTML: _self.obj.label || "Title"
      }
    })
  ]
}

export let titleConf = {
  // 是否可配置
  config: true,
  // 控件文本显示内容
  label: '标题',
  // h标签等级（1-6）
  level: 3,
  hasLine: true
}
