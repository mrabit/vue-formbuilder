export default (_self, h) => {
  return [
    h("Input", {
      props: {
        placeholder: _self.obj.placeholder || "这是一个输入框"
      }
    })
  ];
};


export let inputConf = {
  // 是否可配置
  config: true,
  // 控件左侧label内容
  label: '输入框',
  placeholder: '',
  // 是否显示行内元素
  inlineBlock: false,
  require: true,
}
