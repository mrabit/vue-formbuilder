export default (_self, h) => {
  return [
    h("Input", {
      props: {
        placeholder: _self.obj.placeholder || "这是一个输入框",
        maxlength: parseInt(_self.obj.maxLength) || 20,
        value: _self.obj.value || ""
      },
      on: {
        "on-change": function(val) {
          if (!_self.obj.name) {
            return false;
          }
          _self.obj.value = event.currentTarget.value;
          _self.$emit('handleChangeVal', val.currentTarget.value)
        }
      }
    })
  ];
};


export let inputConf = {
  // 对应数据库内类型
  type: 'input',
  // 是否可配置
  config: true,
  // 控件左侧label内容
  label: '输入框',
  placeholder: '',
  // 是否显示行内元素
  inlineBlock: false,
  // 是否必填
  require: true,
  // 最大长度
  maxLength: 20,
  // 选项内数据
  items: [{ "label_value": null, "label_name": "" }],
  value: '',
  // 表单name
  name: '',
  // 验证错误提示信息
  ruleError: '该字段不能为空',
  // 是否关联字段
  relation: false,
  // 关联字段name
  relation_name: '',
  // 关联字段value
  relation_value: '',
  // 是否被渲染
  visibility: true
}
