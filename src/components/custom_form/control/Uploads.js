export default (_self, h) => {
  return [
    h('uploadCustom', {
      props: {
        multiple: _self.obj.multiple || false,
        type: 'drag', //支持拖拽
        action: _self.obj.action || "",
        'max-size': _self.obj.maxSize || 2048,
        defaultList: _self.obj.defaultList
      },
      on: {
        handleUploadsValue(arr) {
          if (!_self.obj.name) {
            return false;
          }
          _self.$emit('handleChangeVal', arr)
        }
      }
    })
  ]
}


export const uploadsConf = {
  type: 'uploads',
  config: true,
  action: 'action',
  require: true,
  label: '上传控件',
  maxSize: 2048,
  defaultList: [],
  name: ''
}
