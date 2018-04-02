<template>
  <div class="container">
    <Row>
      <Col span="12" class="sortable_container">
      <Form :label-width="80">
        <draggable :clone="cloneData" element="span" :list="list" :options="dragOptions1">
          <transition-group class="list-group" type="transition" :name="'flip-list'" tag="div">
            <renders v-for="(element,index) in list" :key="index" :type="element.type" :obj="element.obj || {}"></renders>
          </transition-group>
        </draggable>
      </Form>
      </Col>
      <Col span="12" class="sortable_item">
      <Form :label-width="80">
        <draggable element="span" :list="list2" :options="dragOptions2">
          <transition-group class="list-group" type="transition" :name="'flip-list'" tag="div">
            <renders @handleRemoveEle="removeEle" @handleConfEle="confEle" v-for="(element,index) in list2" :key="index" :type="element.type" :index="index" :obj="element.obj || {}">
            </renders>
          </transition-group>
        </draggable>
      </Form>
      </Col>
      <Modal @on-ok="handleOk" @on-cancel="handleCancel" v-model="showModal" :title="'配置' + modalFormData.label + '属性'" :mask-closable="false">
        <Form :label-width="80" :model="modalFormData" ref="modalFormData">
          <FormItem label="控件名称：" v-if="typeof modalFormData.label != 'undefined'">
            <Input v-model="modalFormData.label" placeholder="请输入控件名称："></Input>
          </FormItem>
          <FormItem label="文本：" v-if="typeof modalFormData.Text != 'undefined'">
            <Input v-model="modalFormData.Text" placeholder="请输入文本："></Input>
          </FormItem>
          <FormItem label="placeholder：" v-if="typeof modalFormData.placeholder != 'undefined'">
            <Input v-model="modalFormData.placeholder" placeholder="请输入placeholder："></Input>
          </FormItem>
          <FormItem label="是否必填：" v-if="typeof modalFormData.require != 'undefined'">
            <Checkbox v-model="modalFormData.require">必填</Checkbox>
          </FormItem>
          <FormItem label="行内元素：" v-if="typeof modalFormData.inlineBlock != 'undefined'">
            <Checkbox v-model="modalFormData.inlineBlock">是</Checkbox>
          </FormItem>
          <FormItem label="显示行数：" v-if="typeof modalFormData.maxRows != 'undefined'">
            <Slider v-model="modalFormData.maxRows" :min="2" :max="10"></Slider>
          </FormItem>
          <FormItem label="标题大小：" v-if="typeof modalFormData.level != 'undefined'">
            <InputNumber :max="6" :min="1" v-model="modalFormData.level"></InputNumber>
          </FormItem>
          <FormItem label="字体颜色：" v-if="typeof modalFormData.color != 'undefined'">
            <ColorPicker format="rgb" v-model="modalFormData.color" />
          </FormItem>
        </Form>
      </Modal>
    </Row>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import renders from "./custom_form/Render";
import formList from "./custom_form/FormList";

// const modalFormData_default = {
//   label: '',
//   listIndex: 0,
//   require: false,
//   placeholder: ''
// };
export default {
  name: "hello",
  components: {
    draggable,
    renders
  },
  data() {
    return {
      list: formList,
      list2: [],
      showModal: false,
      // 深拷贝对象，防止默认空对象被更改
      modalFormData: {}
    };
  },
  methods: {
    // https://github.com/SortableJS/Vue.Draggable#clone
    // 克隆,深拷贝对象
    cloneData(original) {
      // 深拷贝对象，防止默认空对象被更改
      return Object.assign({}, original);
    },
    // modal点击确定执行事件
    handleOk() {
      const index = this.modalFormData.listIndex;
      this.list2[index].obj = Object.assign({},
        this.list2[index].obj,
        this.modalFormData
      );
      this.handleCancel();
    },
    // modal点击取消执行事件，清空当前modal内容
    handleCancel() {
      this.modalFormData = {};
    },
    // 显示modal,配置被克隆控件
    confEle(index) {
      const list_temp = Object.assign({}, this.list2[index]);
      for (let i in list_temp.obj) {
        this.modalFormData[i] = list_temp.obj[i];
      }
      this.modalFormData.listIndex = index;
      this.showModal = true;
    },
    // 删除克隆控件
    removeEle(index) {
      this.list2.splice(index, 1);
    }
  },
  computed: {
    dragOptions1() {
      return {
        animation: 0,
        ghostClass: "ghost",
        // 分组
        group: {
          name: "shared",
          pull: "clone",
          revertClone: false
        },
        // 禁止拖动排序
        sort: false
      };
    },
    dragOptions2() {
      return {
        animation: 0,
        ghostClass: "ghost",
        group: {
          // 只允许放置shared的控件,禁止pull
          put: ["shared"]
        }
      };
    }
  }
};

</script>
<style>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list-group {
  min-height: 200px;
  border: 1px solid #ccc;
  padding: 20px !important;
}

.items,
.items * {
  cursor: move;
}

/* 配置按钮默认位置 */

.items .item-icon {
  transition: all 2s ease;
  position: absolute;
  top: -18px;
  right: 0px;
  opacity: 0;
  max-height: 0;
  overflow: hidden;
}

/* form对象下配置按钮位置 */

.ivu-form-item.items .item-icon {
  top: -25px;
}

/* 配置按钮样式 */

.item-icon i {
  cursor: pointer !important;
  margin-right: 5px;
}

/* 克隆对象才显示配置按钮 */

.sortable_item .items:hover .item-icon {
  transition: inherit;
  opacity: 1;
  max-height: 50px;
}

</style>
