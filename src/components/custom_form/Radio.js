export default (_self, h) => {
  return [
    h("RadioGroup", {
      props: {
        value: "单选框1"
      }
    }, [
      h("Radio", {
        props: {
          label: "单选框1"
        }
      }),
      h("Radio", {
        props: {
          label: "单选框2"
        }
      })
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
}
