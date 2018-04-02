export default (_self, h) => {
  return [
    h('p', {
      style: {
        'margin-bottom': '24px',
        'color': _self.obj.color || "#000"
      },
      domProps: {
        innerHTML: _self.obj.label || "文本标签"
      }
    })
  ]
}

export const pConf = {
  config: true,
  label: '文本标签',
  color: '#000'
}
