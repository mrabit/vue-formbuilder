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
  if (code == address.length - 1 && code == 3) return str + address[code];
  for (let i in area) {
    if (area[i].value == address[code]) {
      str = str + getAddressValue(address, area[i].children, code + 1, area[i].label);
      break;
    }
  }
  return str;
}

function getCascaderValue(address, area, code = 0, str = "") {
  // 最后一步
  for (let i in area) {
    if (area[i].value == address[code]) {
      str = (str ? str + " > " : "") + getCascaderValue(address, area[i].children, code + 1, area[i].label);
      break;
    }
  }
  return str;
}

function getSelectValue(value, items) {
  return items.filter(v => {
    return v.label_value == value;
  })
}

function getCheckBoxValue(value, items) {
  return items.filter(v => {
    return value.indexOf(v.label_value) >= 0;
  })
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

  if (ele === "cascader") {
    return getCascaderValue(obj.value, obj.items);
  }

  const items = obj.items;
  const value = obj.value;
  if (ele == "select" || ele == "radio") {
    return (getSelectValue(value, items)[0] || {})
      .label_name;;
  }

  if (ele == "checkbox") {
    let str = "";
    getCheckBoxValue(value, items)
      .forEach(v => {
        str += (v.label_name + ",");
      })
    return str.substring(0, str.length - 1);
  }

  return (items[value] || {})
    .label_name || "";
}

export default {
  name: 'preview',
  render(h) {
    // 关联的组件判断是否展示
    if (!this.obj.visibility) {
      return h('span');
    }
    // 非 Title Hr P 
    if (['title', 'hr', 'p'].indexOf(this.ele.toLowerCase()) < 0) {
      let control;
      if (this.ele.toLowerCase() != "uploads") {
        control = h('span', getObjValue(this.ele.toLowerCase(), this.obj));
      } else {
        control = h('ul', { class: { 'pull-left': true }, style: { 'list-style': 'none' } },
          this.obj.value.map(v => {
            return h('li', [h('a', {
              attrs: {
                target: '_blank',
                href: v.url
              }
            }, v.file_name)]);
          })
        )
      }
      return h('div', {
        class: {
          'clearfix': true
        },
        style: {
          // 是否显示行内元素
          display: this.obj.inlineBlock ? 'inline-block' : 'block',
          // 行内元素width为30%
          width: this.obj.inlineBlock ? '33%' : 'auto',
          'margin-bottom': '24px'
        }
      }, [
        h('label', { class: { 'text-right': true, 'pull-left': this.ele.toLowerCase() == "uploads" } }, this.obj.label + "："),
        control,
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
    labelWidth: {
      type: Number,
      default: 100
    }
  }
}
