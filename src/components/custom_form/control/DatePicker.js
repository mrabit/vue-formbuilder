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
  type: 'datepicker',
  // 是否可配置
  config: true,
  // 控件左侧label内容
  label: '时间选择',
  placeholder: '请选择日期',
  // 是否显示行内元素
  inlineBlock: false,
  require: true,
  name: '',
  value: moment()
    .format('YYYY-MM-DD'),
  ruleError: '选项不能为空'
}
