import moment from 'moment';
export default (_self, h) => {
  return [
    h('DatePicker', {
      props: {
        placeholder: _self.obj.placeholder || "请选择日期",
        type: 'date',
        format: 'yyyy年MM月dd日',
        value: _self.obj.value || ""
      },
      on: {
        "on-change" (arr) {
          if (!_self.obj.name) {
            return false;
          }
          _self.$emit('handleChangeVal', arr)
        }
      }
    })
  ]
}


export let datePickerConf = {
  // 对应数据库内类型
  type: 'datepicker',
  // 是否可配置
  config: true,
  // 控件左侧label内容
  label: '时间选择',
  placeholder: '请选择日期',
  // 是否显示行内元素
  inlineBlock: false,
  // 是否必填
  require: true,
  // 表单name
  name: '',
  // 绑定的值
  value: moment()
    .format('YYYY-MM-DD'),
    // 验证错误提示信息
  ruleError: '选项不能为空'
}
