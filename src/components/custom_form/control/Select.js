export default (_self, h) => {
  return [
    h(
      "Select", {
        props: {
          placeholder: _self.obj.placeholder || "这是一个下拉选项框"
        },
        on: {
          'on-change' (value) {
            if (!_self.obj.name) {
              return false;
            }
            _self.$emit('handleChangeVal', value)
          }
        }
      },
      _self.obj.items.map(v => {
        return h(
          "Option", {
            props: {
              value: v.label_value
            },
          },
          v.label_name
        );
      })
    )
  ];
};

export let selectConf = {
  type: 'select',
  // 是否可配置
  config: true,
  // 控件左侧label内容
  label: '选择框',
  placeholder: '',
  // 是否显示行内元素
  inlineBlock: false,
  require: true,
  items: Array.apply(null, { length: 5 })
    .map((k, v) => {
      return {
        label_value: v + 1,
        label_name: "选项" + (v + 1),
      }
    }),
  name: '',
  ruleError: '请选择'
}
