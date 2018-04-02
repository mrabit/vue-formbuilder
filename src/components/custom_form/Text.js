export default (_self, h) => {
  return [
    h("Input", {
      attrs: {
        type: "textarea",
        placeholder: _self.obj.placeholder || "这是一个文本域"
      },
      props: {
        rows: _self.obj.maxRows || 5
      }
    })
  ];
};

export let textConf = {
  // 是否可配置
  config: true,
  // 控件左侧label内容
  label: '文本域',
  placeholder: '',
  // 是否显示行内元素
  inlineBlock: false,
  require: true,
  // 文本域行高 
  maxRows: 5,
}
