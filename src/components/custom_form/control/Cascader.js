const temp_data = (size, parentIndex, parentName) => {
  if (parentIndex >= 3) {
    return [];
  }
  return Array.apply(null, { length: size })
    .map((k, v) => {
      const name = parentName + (v + 1) + "-";
      return {
        value: name.substring(0, name.length - 1),
        label: name.substring(0, name.length - 1),
        children: temp_data(size, parentIndex + 1, name)
      }
    });
}

export default (_self, h) => {
  return [
    h("Cascader", {
      props: {
        placeholder: _self.obj.placeholder || "这是一个级联选择器",
        data: temp_data(3, 0, '数据'),
        multiple: _self.obj.multiple || false,
        separate: _self.obj.multiple ? "，" : "/"
      },
      on: {
        handleCascaderValue(arr) {
          if (!_self.obj.name) {
            return false;
          }
          _self.$emit('handleChangeVal', arr)
        }
      }
    })
  ];
};

export let cascaderConf = {
  type: 'cascader',
  // 是否可配置
  config: true,
  // 控件左侧label内容
  label: '级联选择',
  placeholder: '',
  // 是否显示行内元素
  inlineBlock: false,
  require: true,
  multiple: false,
  name: ''
}
