export default (_self, h) => {
  return [
    h('al-cascader', {
      style: {
        width: '200px',
        display: 'inline-block'
      },
      props: {
        placeholder: _self.obj.placeholder || "这是一个级联选择器",
        level: 2,
        value: _self.obj.value || []
      },
      on: {
        "on-change" (arr) {
          if (!_self.obj.name) {
            return false;
          }
          _self.obj.value = arr;
          _self.$emit('handleChangeVal', arr);
        }
      }
    })
  ]
}
export let addressConf = {
  type: 'address',
  // 是否可配置
  config: true,
  // 控件左侧label内容
  label: '详细地址',
  placeholder: '',
  // 是否显示行内元素
  inlineBlock: false,
  require: true,
  multiple: true,
  name: '',
  value: [],
  ruleError: '请选择并输入详细地址'
}
