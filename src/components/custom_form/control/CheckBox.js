export default (_self, h) => {
  return [
    h("CheckboxGroup", {
      props: {
        value: _self.obj.value || []
      },
      on: {
        'on-change' (arr) {
          if (!_self.obj.name) {
            return false;
          }
          _self.obj.value = arr;
          _self.$emit('handleChangeVal', arr)
        }
      }
    }, _self.obj.items.map(v => {
      return h("Checkbox", {
        props: {
          label: v.label_value
        }
      }, v.label_name)
    }))
  ];
};

export let checkBoxConf = {
  type: 'checkbox',
  // 是否可配置
  config: true,
  // 控件左侧label内容
  label: '多选框',
  // 是否显示行内元素
  inlineBlock: false,
  require: true,
  value: [],
  items: [{ "label_value": "1", "label_name": "单选框1" }, { "label_value": "2", "label_name": "单选框2" }],
  name: '',
  ruleError: '该选项不能为空'
}
