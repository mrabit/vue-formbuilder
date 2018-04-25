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
    h("cascaderMulti", {
      props: {
        placeholder: _self.obj.placeholder || "这是一个级联选择器",
        data: temp_data(3, 0, '数据'),
        multiple: _self.obj.multiple || false,
        separate: _self.obj.multiple ? "，" : "/",
        filterable: true,
        value: _self.obj.value || []
      },
      on: {
        "on-change" (arr) {
          if (!_self.obj.name) {
            return false;
          }
          _self.obj.value = arr;
          _self.$emit('handleChangeVal', arr)
        }
      }
    })
  ];
};

export let cascaderConf = {
  // 对应数据库内类型
  type: 'cascader',
  // 是否可配置
  config: true,
  // 控件左侧label内容
  label: '级联选择',
  placeholder: '',
  // 是否显示行内元素
  inlineBlock: false,
  // 是否必填
  require: true,
  // 是否多选
  multiple: false,
  // 表单name
  name: '',
  // 绑定的值
  value: [],
  // 验证错误提示信息
  ruleError: '该选项不能为空',
  // 是否关联字段
  relation: false,
  // 关联字段name
  relation_name: '',
  // 关联字段value
  relation_value: '',
  // 是否被渲染
  visibility: true
}
