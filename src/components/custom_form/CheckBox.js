export default (_self, h) => {
  return [
    h("CheckboxGroup", [
      h("Checkbox", {
        props: {
          label: "复选框1"
        },
        attrs: {
          checked: true
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
}
