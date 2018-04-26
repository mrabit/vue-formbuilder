import title from './control/Title';
import hr from './control/Hr';
import p from './control/P';

import area from './config/area'

const form_item = {
  title,
  hr,
  p
};

// 获取地区控件值
function getAddressValue(address, area, code = 0, str = "") {
  // 最后一步
  if (code == address.length - 1) return str + address[code];
  for (let i in area) {
    if (area[i].value == address[code]) {
      str = str + getAddressValue(address, area[i].children, code + 1, area[i].label);
      break;
    }
  }
  return str;
}

// 获取控件值
const getObjValue = (ele, obj) => {
  // 当控件为'input', 'text', 'datepicker',返回本身value
  const arr = [
    'input', 'text', 'datepicker'
  ]
  if (arr.indexOf(ele) >= 0 || !obj.value) {
    return obj.value;
  }

  if (ele === "address") {
    return getAddressValue(obj.value, area);
  }

  const items = obj.items;
  const value = obj.value;

  return items.filter(k => {
    return k.label_value == value;
  })[0].label_name;
}

export default {
  name: 'preview',
  render(h) {
    // 非 Title Hr P 
    if (['title', 'hr', 'p'].indexOf((this.ele.toLowerCase())) < 0) {
      // 关联的组件判断是否展示
      if (!this.obj.visibility) {
        return h('span');
      }
      return h('p', {
        style: {
          // 是否显示行内元素
          display: this.obj.inlineBlock ? 'inline-block' : 'block',
          // 行内元素width为30%
          width: this.obj.inlineBlock ? '33%' : 'auto',
          'margin-bottom': '24px'
        }
      }, [
        h('label', { style: { 'width': '100px' }, class: { 'text-right': true } }, this.obj.label + "："),
        h('span', getObjValue(this.ele.toLowerCase(), this.obj)),
      ])
    } else {
      // 获取当前控件渲染
      const arr = (form_item[this.ele.toLowerCase()] && form_item[this.ele.toLowerCase()](this, h)) || [];
      return arr[0];
    }
  },
  props: {
    // 当前控件的类型
    ele: {
      type: String,
      default: "input"
    },
    // 当前控件的配置
    obj: {
      type: Object,
      default () {
        return {};
      }
    },
  }
}
