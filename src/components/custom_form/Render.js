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
  if (typeof val === 'undefined') return 'block';
  return val == 1 ? 'block' : 'none';
}

export default {
  render(h) {
    var $this = this;
    const arr = (form_item[this.ele] && form_item[this.ele](this, h)) || [];
    const item_icon = ItemIcon(this, h);
    if (['Title', 'Hr', 'P'].indexOf((this.ele)) < 0) {
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
          display: this.obj.inlineBlock ? 'inline-block' : display(this.data[this.obj.parent_name]),
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
    ele: {
      type: String,
      default: "Input"
    },
    index: {
      type: Number,
      default: 0
    },
    obj: {
      type: Object,
      default () {
        return {};
      }
    },
    data: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
