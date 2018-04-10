<template>
  <div class="inline">
    <ul class="ivu-cascader-menu">
      <CheckboxGroup v-model="checkBoxGroup" @on-change="handleCheckBoxChange">
        <li class="ivu-cascader-menu-item" v-for="(item, index) in data" :key="index" :class="{'ivu-cascader-menu-item-active': (!item.parentId && selected == index )|| (!multiple && selected == index)}">
          <span v-if="item.parentId && multiple">
                <Checkbox :value="checkBoxGroup.indexOf(index) >= 0" @click.native.stop="handleCheckBoxClick" :label="index" class="w-full">{{item.label}}
                    <i class="ivu-icon ivu-icon-ios-arrow-right" v-if="item.children && item.children.length"></i>
                </Checkbox>
            </span>
          <span v-else>
                <p @click="handleClick(index)">
                    {{item.label}}
                    <i class="ivu-icon ivu-icon-ios-arrow-right" v-if="item.children && item.children.length"></i>
                </p>
            </span>
        </li>
      </CheckboxGroup>
    </ul>
    <casMultiPanel :value="value" @handleGetSelected="selectedData" v-if="children.length" :data="children.length && children" :multiple="multiple"></casMultiPanel>
  </div>
</template>
<script>
import Emitter from 'iview/src/mixins/emitter';
export default {
  name: "casMultiPanel",
  mixins: [Emitter],
  props: {
    data: {
      type: Array,
      default () {
        return [];
      }
    },
    multiple: {
      type: Boolean,
      default: false
    },
    value: {
      type: Array,
      default () {
        return [];
      }
    }
  },
  data() {
    return {
      // 当前已选择项
      checkBoxGroup: [],
      // 子组件数据
      children: [],
      // 一级组件被选中高亮
      selected: -1
    };
  },
  watch: {
    // 重新渲染组件
    data(val) {
      this.checkBoxGroup = [];
      this.handleCheckBoxChange([]);
      this.selected = -1;
    }
  },
  methods: {
    // 获取选择项数据
    selectedData(val = []) {
      // 获取当前组件内选择的值
      const arr = this.checkBoxGroup.map((v, k) => {
        return {
          label: this.data[v].label,
          value: this.data[v].value,
          parentId: this.data[v].parentId,
        };
      });
      // 合并子组件传递的参数,并emit到父组件
      this.$emit("handleGetSelected", arr.concat(val));
    },
    //   防止时间冒泡到父组件handleClose事件
    handleCheckBoxClick() {},
    // checkGroup变更事件,返回已选中的数组
    handleCheckBoxChange(arr) {
      // 清空记录
      this.children = [];
      // 遍历选择的数据
      arr.map((k, v) => {
        // 存在children字段则记录
        if (this.data[k].children && this.data[k].children.length) {
          // 记录数据并渲染到子组件
          Array.prototype.push.apply(this.children, this.data[k].children);
        }
      });
      // 触发父组件emit
      this.selectedData();
    },
    // 一级组件点击事件
    handleClick(index) {
      this.selected = index;
      this.checkBoxGroup = [index];
      this.handleCheckBoxChange([index]);
    }
  },
  created() {
    // 回填数据
    this.$nextTick(_ => {
      this.value.map(v => {
        this.data.map((val, k) => {
          if (v.value !== val.value) return;
          if (v.parentId && this.multiple) {
            Array.prototype.push.apply(this.checkBoxGroup, [k]);
            this.handleCheckBoxChange(this.checkBoxGroup);
          } else {
            this.handleClick(k);
          }
        })
      })
    })
  }
};

</script>
<style>
.inline {
  display: inline-block;
}

</style>
