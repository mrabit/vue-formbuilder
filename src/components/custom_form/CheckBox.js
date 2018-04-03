export default (_self, h) => {
  return [
    h("CheckboxGroup", {
      props: {
        value: _self.obj.value || []
      },
      on: {
        'on-change' (arr) {
          _self.obj.value = arr;
          _self.$emit('handleChangeVal', arr)
        }
      }
    }, [
      h("Checkbox", {
        props: {
          label: "复选框1"
        }
      }),
      h("Checkbox", {
        props: {
          label: "复选框2"
        }
      })
    ])
  ];
};

export let checkBoxConf = {
  // 是否可配置
  config: true,
  // 控件左侧label内容
  label: '多选框',
  // 是否显示行内元素
  inlineBlock: false,
  require: true,
  value: []
}
