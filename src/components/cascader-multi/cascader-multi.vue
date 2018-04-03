<template>
  <div :class="classes" v-clickoutside="handleClose">
    <div :class="[prefixCls + '-rel']" @click="toggleOpen" ref="reference">
      <input type="hidden" :name="name" :value="currentValue">
      <i-input :element-id="elementId" ref="input" class="text-ellipsis" :title="displayRender" :readonly="true" :disabled="disabled" :value="displayRender" :size="size" :placeholder="inputPlaceholder"></i-input>
      <Icon type="ios-close" :class="[prefixCls + '-arrow']" v-show="showCloseIcon" @click.native.stop="clearSelect"></Icon>
      <Icon type="arrow-down-b" :class="[prefixCls + '-arrow']"></Icon>
    </div>
    <transition name="slide-up">
      <div class="ivu-select-dropdown cascader-multi" v-show="visible" v-if="!destroy" :class="{ [prefixCls + '-transfer']: transfer }" ref="drop" :data-transfer="transfer" v-transfer-dom>
        <div>
          <casMultiPanel v-if="data.length" @handleGetSelected="selectedData" :data="formatData" :multiple="multiple" :componentId="componentId"></casMultiPanel>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import casMultiPanel from "./cascader-multi-panel.vue";
import clickoutside from "iview/src/directives/clickoutside";
import TransferDom from "iview/src/directives/transfer-dom";
const prefixCls = "ivu-cascader";
const selectPrefixCls = "ivu-select";
export default {
  name: "Cascader",
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
      selected: []
    };
  },
  props: {
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
          [`${prefixCls}-visible`]: this.visible,
          [`${prefixCls}-disabled`]: this.disabled
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
    // 生出组件唯一标示,用于区分组件
    componentId() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
        c
      ) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }
  },
  methods: {
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
      return data.map((k, v) => {
        k["parentId"] = parentId || 0;
        if (k.children && k.children.length) {
          k.children = this.handleFormatData(k.children, k.value);
        }
        return k;
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
