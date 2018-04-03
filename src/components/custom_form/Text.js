export default (_self, h) => {
  return [
    h("Input", {
      attrs: {
        type: "textarea",
        placeholder: _self.obj.placeholder || "这是一个文本域",
        value: _self.obj.value,
        maxlength: _self.obj.maxLength || 200
      },
      props: {
        rows: _self.obj.maxRows || 5
      },
      on: {
        "on-change" (event) {
          if (!_self.obj.name) {
            _self.$Notice.warning({
              title: '请选择该控件绑定的字段',
              desc: '该控件尚未绑定字段，请选择绑定.'
            });
          }
          _self.obj.value = event.currentTarget.value;
          _self.$emit('handleChangeVal', event.currentTarget.value)
        }
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
  maxLength: 200,
  require: true,
  // 文本域行高 
  maxRows: 5,
  value: ""
}
