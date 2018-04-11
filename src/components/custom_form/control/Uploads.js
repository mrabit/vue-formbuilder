export default (_self, h) => {
  return [
    h('uploadCustom', {
      props: {
        multiple: _self.obj.multiple || false,
        type: 'drag', //支持拖拽
        action: _self.obj.action || "/imageupload",
        'max-size': _self.obj.maxSize || 2048,
        defaultList: _self.obj.value,
        name: 'photo'
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
  // 对应数据库内类型
  type: 'uploads',
  // 是否可配置
  config: true,
  // 上传地址
  action: '/apis/imageupload',
  // 是否必填
  require: true,
  // 控件左侧label内容
  label: '上传控件',
  // 上传文件最大限制
  maxSize: 2048,
  // 绑定的值
  value: [],
  // 表单name
  name: '',
  // 验证错误提示信息
  ruleError: '请上传图片'
}
