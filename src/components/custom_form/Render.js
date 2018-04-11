import ItemIcon from './ItemIcon';
import Input from './control/Input';
import CheckBox from './control/CheckBox';
import Radio from './control/Radio';
import Select from './control/Select';
import Text from './control/Text';
import Cascader from './control/Cascader';
import Title from './control/Title';
import Hr from './control/Hr';
import P from './control/P';
import Uploads from './control/Uploads';
import DatePicker from './control/DatePicker';
import Address from './control/Address';

import trigger from './config/trigger';

const form_item = {
  Title,
  Hr,
  P,
  Input,
  Select,
  Radio,
  CheckBox,
  DatePicker,
  Cascader,
  Address,
  Uploads,
  Text,
};

const display = (val) => {
  // 关联组件值未定义
  if (typeof val === 'undefined') return true;
  return val == 1;
}

export default {
  render(h) {
    var $this = this;
    const arr = (form_item[this.ele] && form_item[this.ele](this, h)) || [];
    // 拥有绑定的值，需回填到控件
    this.$set(this.obj, 'value', typeof this.value !== "undefined" ? this.value : this.obj.value);
    // 显示配置按钮并且控件允许被配置
    const item_icon = this.configIcon && this.obj.config ? ItemIcon(this, h) : [];
    // 非 Title Hr P 需要FormItem
    if (['Title', 'Hr', 'P'].indexOf((this.ele)) < 0) {
      // 关联的组件判断不展示
      if (!display(this.data[this.obj.parent_name])) return;
      let FormItem = {
        class: {
          'items': true,
          'ivu-form-item-required': !!this.obj.name && !!this.obj.require
        },
        props: {
          label: (this.obj.label || this.ele) + '：',
          prop: this.obj.name || 'temp',
          rules: {
            required: !!this.obj.name && !!this.obj.require,
            message: this.obj.ruleError || '该字段不能为空',
            trigger: trigger[this.obj.type],
            validator: (rule, value, callback) => {
              if (!!this.obj.name && !!this.obj.require && (value === '' || typeof value === 'undefined')) {
                callback(new Error('该项为必填项'));
              } else {
                callback();
              }
            }
          },
        },
        style: {
          display: this.obj.inlineBlock ? 'inline-block' : 'block',
          width: this.obj.inlineBlock ? '33%' : 'auto',
        }
      };
      return h(
        "FormItem", FormItem,
        arr.concat(item_icon)
      );
    } else {
      return h(
        "div", {
          style: {
            'position': 'relative'
          },
          class: {
            items: true
          },
        },
        arr.concat(item_icon)
      );
    }

  },
  props: {
    // 当前控件的类型
    ele: {
      type: String,
      default: "Input"
    },
    // 当前控件的配置
    obj: {
      type: Object,
      default () {
        return {};
      }
    },
    // 当前控件的index,config 和 delete 会用到
    index: {
      type: Number,
      default: 0
    },
    // 整个表单的数据
    data: {
      type: Object,
      default () {
        return {}
      }
    },
    // 是否显示配置按钮
    configIcon: {
      type: Boolean,
      default: false
    },
    // 当前控件绑定的值 方便数据回填
    value: [String, Number, Array]
  }
}
