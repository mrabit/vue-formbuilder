<template>
  <div :class="classes" v-clickoutside="handleClose">
    <div :class="[prefixCls + '-rel']" @click="toggleOpen" ref="reference">
      <input type="hidden" :name="name" :value="currentValue">
      <i-input @on-focus="handleFocus" @on-change="handleInput" :element-id="elementId" ref="input" class="text-ellipsis" :title="displayInputRender" :readonly="!filterable" :disabled="disabled" :value="displayInputRender" :size="size" :placeholder="inputPlaceholder"></i-input>
      <div :class="[prefixCls + '-label']" v-show="filterable && query === ''" @click="handleFocus">{{ displayRender }}</div>
      <Icon type="ios-close" :class="[prefixCls + '-arrow']" v-show="showCloseIcon" @click.native.stop="clearSelect"></Icon>
      <Icon type="arrow-down-b" :class="[prefixCls + '-arrow']"></Icon>
    </div>
    <transition name="slide-up">
      <div class="ivu-select-dropdown cascader-multi" v-show="visible" :class="{ [prefixCls + '-transfer']: transfer }" ref="drop" :data-transfer="transfer" v-transfer-dom v-if="!destroy">
        <div>
          <casMultiPanel :value="queryItem" v-if="((data.length && !filterable) || (filterable && query === ''))" @handleGetSelected="selectedData" @clearQueryItem="queryItem = []" :data="formatData" :multiple="multiple"></casMultiPanel>
          <div :class="[prefixCls + '-dropdown']" v-show="filterable && query !== '' && querySelections.length">
            <ul :class="[selectPrefixCls + '-dropdown-list']">
              <li :key="index" :class="[selectPrefixCls + '-item', {
                                    [selectPrefixCls + '-item-disabled']: item.disabled
                                }]" v-for="(item, index) in querySelections" @click="handleSelectItem(index)" v-html="item.display"></li>
            </ul>
          </div>
          <ul v-show="filterable && query !== '' && !querySelections.length" :class="[prefixCls + '-not-found-tip']">
            <li>暂无数据</li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import casMultiPanel from "./cascader-multi-panel.vue";
import clickoutside from "iview/src/directives/clickoutside";
import TransferDom from "iview/src/directives/transfer-dom";
import {
  oneOf
} from 'iview/src/utils/assist';
import Emitter from 'iview/src/mixins/emitter';
import Locale from 'iview/src/mixins/locale';
import {
  getSelections,
  getSelectItem
} from './utils';

const prefixCls = "ivu-cascader";
const selectPrefixCls = "ivu-select";

export default {
  name: "ICascader",
  mixins: [Emitter, Locale],
  directives: {
    clickoutside,
    TransferDom
  },
  components: {
    casMultiPanel
  },
  data() {
    return {
      prefixCls: prefixCls,
      selectPrefixCls: selectPrefixCls,
      // 可见
      visible: false,
      // 是否销毁,用于清除数据销毁组件重新渲染
      destroy: false,
      // 已选择项
      selected: [],
      // 搜索条件
      query: '',
      // 搜索后需要的数据
      queryItem: []
    };
  },
  props: {
    // 默认数据
    value: {
      type: Array,
      default () {
        return [];
      }
    },
    // 是否搜索
    filterable: {
      type: Boolean,
      default: true
    },
    // 绑定数据
    data: {
      type: Array,
      default () {
        return [];
      }
    },
    // 禁用状态
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否支持清除
    clearable: {
      type: Boolean,
      default: true
    },
    // 尺寸大小
    size: {
      validator(value) {
        return oneOf(value, ["small", "large"]);
      }
    },
    // 是否将弹层放置于 body 内，在 Tabs、带有 fixed 的 Table 列内使用时，建议添加此属性，它将不受父级样式影响，从而达到更好的效果
    transfer: {
      type: Boolean,
      default: false
    },
    name: {
      type: String
    },
    // 给表单元素设置 id
    elementId: {
      type: String
    },
    // 输入框占位符
    placeholder: {
      type: String
    },
    // 是否多选
    multiple: {
      type: Boolean,
      default: false
    },
    separate: {
      type: String,
      default: "/"
    }
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-show-clear`]: this.showCloseIcon,
          [`${prefixCls}-size-${this.size}`]: !!this.size,
          [`${prefixCls}-visible`]: this.visible,
          [`${prefixCls}-disabled`]: this.disabled,
          [`${prefixCls}-not-found`]: this.filterable && this.query !== '' && !this.querySelections.length
        }
      ];
    },
    // 判断是否显示clear按钮
    showCloseIcon() {
      return (
        this.currentValue &&
        this.currentValue.length &&
        this.clearable &&
        !this.disabled
      );
    },
    // 格式化显示数据
    displayRender() {
      let label = [];
      for (let i = 0; i < this.selected.length; i++) {
        label.push(this.selected[i].label);
      }
      return label.join(this.separate);
    },
    displayInputRender() {
      return this.filterable ? '' : this.displayRender;
    },
    // 输入框占位符取值
    inputPlaceholder() {
      return this.currentValue.length ? null : this.placeholder;
    },
    // 当前选择项取所有id
    currentValue() {
      return this.selected.map((k, v) => {
        return k.value;
      });
    },
    // 格式化数据,所有对象加上parentId字段
    formatData() {
      return this.handleFormatData(this.data);
    },
    // 搜索结果
    querySelections() {
      let selections = [];
      if (!this.filterable) return selections;
      getSelections(this.data, null, null, selections);
      selections = selections.filter(item => {
        return item.label ? item.label.indexOf(this.query) > -1 : false;
      }).map(item => {
        item.display = item.display.replace(new RegExp(this.query, 'g'), `<span>${this.query}</span>`);
        return item;
      });
      return selections;
    }
  },
  methods: {
    // 点击搜索结果
    handleSelectItem(index) {
      const item = this.querySelections[index];

      if (item.item.disabled) return false;
      this.query = '';
      this.$refs.input.currentValue = '';
      let temp_data = [];
      getSelectItem(this.data, item.value.split(','), temp_data);
      this.selectedData(temp_data);
      this.queryItem = temp_data;
      this.handleClose();
    },
    handleInput(event) {
      this.query = event.target.value;
      this.onFocus();
    },
    handleFocus(event) {
      this.query = '';
      this.$refs.input.focus();
      // event.target.value = '';
    },
    // 子组件传值
    selectedData(val = []) {
      this.selected = val;
      this.$emit("handleCascaderValue", this.currentValue);
    },
    // 清除选择项
    clearSelect() {
      if (this.disabled) return false;
      this.selectedData();
      this.handleClose();
      // 销毁组件
      this.queryItem = [];
      this.destroy = true;
    },
    // 关闭dropDown
    handleClose() {
      this.visible = false;
    },
    // 页面input点击事件
    toggleOpen() {
      if (this.visible) {
        this.handleClose();
      } else {
        this.onFocus();
      }
    },
    // 显示dropDown
    onFocus() {
      // 禁用状态,不显示dropDown
      if (this.disabled) return;
      this.visible = true;
    },
    handleFormatData(data, parentId) {
      return data.map((v, k) => {
        // if (typeof v['parentId'] != 'undefined') return v;
        v["parentId"] = parentId || 0;
        if (v.children && v.children.length) {
          v.children = this.handleFormatData(v.children, v.value);
        }
        return v;
      });
    }
  },
  watch: {
    // 重新渲染组件
    destroy(val) {
      if (val) {
        this.$nextTick(_ => {
          this.destroy = false;
        });
      }
    }
  },
  mounted() {
    if (!this.value.length) return;
    getSelectItem(this.data, this.value, this.queryItem);
    this.selectedData(this.queryItem);
  }
};

</script>
<style>
.w-full {
  width: 100%;
  user-select: none;
}

.text-ellipsis input {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 20px;
}

.cas-multi-select-input {
  position: relative;
}

.cascader-multi.ivu-select-dropdown {
  max-height: 230px;
}

.cascader-multi .ivu-cascader-menu {
  width: 150px;
  height: 230px;
}

.cas-multi-select-item {
  position: absolute;
  height: 200px;
  width: 80px;
  border: 1px solid #ccc;
}

</style>
