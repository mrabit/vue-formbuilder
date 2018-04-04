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
const form_item = {
  Input,
  CheckBox,
  Radio,
  Select,
  Text,
  Cascader,
  Title,
  Hr,
  P,
  Uploads
};

export default {
  render(h) {
    var $this = this;
    const arr = (form_item[$this.type] && form_item[$this.type]($this, h)) || [];
    const item_icon = ItemIcon($this, h);

    if (['Title', 'Hr', 'P'].indexOf((this.type)) < 0) {
      let FormItem = {
        class: {
          items: true
        },
        props: {
          label: (this.obj.label || this.type) + '：',
          // required: !!this.obj.name && !!this.obj.require,
          // error: "该项为必填项",
          prop: this.obj.name || 'temp'
        },
        style: {
          display: this.obj.inlineBlock ? 'inline-block' : 'block',
          width: this.obj.inlineBlock ? '33%' : 'auto',
        }
      };

      // if (!!this.obj.name && !!this.obj.require) {
      // FormItem.props['prop'] = this.obj.name;
      // FormItem.props['rules'] = { required: true, message: 'Item ' + ' can not be empty', trigger: 'blur' };
      // }
      console.log(FormItem)
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
    type: {
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
