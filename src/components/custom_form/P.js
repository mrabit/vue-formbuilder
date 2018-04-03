export default (_self, h) => {
  return [
    h('p', {
      style: {
        'margin-bottom': _self.obj.marginBottom + 'px',
        'margin-top': _self.obj.marginTop + 'px',
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
  color: '#000',
  marginTop: 0,
  marginBottom: 24
}
