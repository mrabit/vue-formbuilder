export default (_self, h) => {
  return [
    h("RadioGroup", {
      props: {
        value: _self.obj.value || "1"
      },
      on: {
        'on-change' (value) {
          console.log(value);
          _self.obj = Object.assign(_self.obj, {
            value
          })
          _self.$emit('handleChangeVal', value)
        }
      }
    }, [
      h("Radio", {
        props: {
          label: "1"
        }
      }, "单选框1"),
      h("Radio", {
        props: {
          label: "2"
        }
      }, "单选框2")
    ])
  ];
};

export let radioConf = {
  // 是否可配置
  config: true,
  // 控件左侧label内容
  label: '单选框',
  // 是否显示行内元素
  inlineBlock: false,
  require: true,
  value: ''
}
