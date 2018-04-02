import Input from './Input';
import CheckBox from './CheckBox';
import Radio from './Radio';
import Select from './Select';
import Text from './Text';
import Cascader from './Cascader';
import Title from './Title';
import Hr from './Hr';
import P from './P';
import Uploads from './Uploads';
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
    let icons = [];
    // 配置按钮
    if (!!$this.obj.config) {
      icons.push(h('Icon', {
        props: {
          type: 'gear-a',
        },
        nativeOn: {
          click() {
            $this.$emit('handleConfEle', $this.index);
          }
        }
      }));
    }
    // 删除按钮
    icons.push(h('Icon', {
      props: {
        type: 'minus-round'
      },
      nativeOn: {
        click() {
          $this.$emit('handleRemoveEle', $this.index);
        }
      }
    }));
    const item_icon = h('div', {
      class: {
        'item-icon': true
      }
    }, icons);

    if (['Title', 'Hr', 'P'].indexOf((this.type)) < 0) {
      return h(
        "FormItem", {
          // nativeOn: {
          //   "!click" (event) {
          //     event.stopPropagation()
          //   }
          // },
          class: {
            items: true
          },
          props: {
            label: (this.obj.label || this.type) + '：'
          },
          style: {
            display: this.obj.inlineBlock ? 'inline-block' : 'block',
            width: this.obj.inlineBlock ? '33%' : 'auto',
          }
        },
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
    }
  }
}
