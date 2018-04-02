export default (_self, h) => {
  return [
    h(
      "Select", {
        props: {
          placeholder: _self.obj.placeholder || "这是一个下拉选项框"
        }
      },
      Array.apply(null, {
        length: 5
      })
      .map(function(k, v) {
        return h(
          "Option", {
            props: {
              value: "选项" + (v + 1)
            }
          },
          "选项" + (v + 1)
        );
      })
    )
  ];
};

export let selectConf = {
  // 是否可配置
  config: true,
  // 控件左侧label内容
  label: '选择框',
  placeholder: '',
  // 是否显示行内元素
  inlineBlock: false,
  require: true,
}
