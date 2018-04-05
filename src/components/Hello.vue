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
      <Form :label-width="80" :model="formData" :rules="ruleValidate">
        <draggable element="span" :list="list2" :options="dragOptions2">
          <transition-group class="list-group" type="transition" :name="'flip-list'" tag="div">
            <renders @handleRemoveEle="removeEle" @handleConfEle="confEle" v-for="(element,index) in list2" :key="index" :type="element.type" :index="index" :obj="element.obj || {}" :data="formData" @handleChangeVal="val => changeVal(val,element)">
            </renders>
          </transition-group>
        </draggable>
      </Form>
      </Col>
      <Modal v-model="showModal" :title="'配置' + modalFormData.modalTitle + '属性'" :mask-closable="false">
        <Form class="form_content" :label-width="80" :model="modalFormData" ref="modalFormData">
          <FormItem label="控件名称：" v-if="typeof modalFormData.label != 'undefined'">
            <Input v-model="modalFormData.label" placeholder="请输入控件名称"></Input>
          </FormItem>
          <FormItem label="数据字典：" v-if="showModal">
            <Select v-model="modalFormData.dict" filterable @on-change="handleDataDictChange">
              <Option :disabled="dataDictSelected.indexOf(item.id) >= 0" v-for="item in dataDictList" :value="item.id" :key="item.id">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem label="name属性：" v-if="typeof modalFormData.name != 'undefined'">
            <Input v-model="modalFormData.name" placeholder="" disabled></Input>
          </FormItem>
          <FormItem label="placeholder：" v-if="typeof modalFormData.placeholder != 'undefined'">
            <Input v-model="modalFormData.placeholder" placeholder="请输入placeholder"></Input>
          </FormItem>
          <FormItem label="上传地址：" v-if="typeof modalFormData.action != 'undefined'">
            <Input v-model="modalFormData.action" placeholder="请输入上传地址"></Input>
          </FormItem>
          <FormItem label="最大长度：" v-if="typeof modalFormData.maxLength != 'undefined'">
            <Input v-model="modalFormData.maxLength" placeholder="请输入文本限制最大长度">
            </Input>
          </FormItem>
          <FormItem label="最大限制：" v-if="typeof modalFormData.maxSize != 'undefined'">
            <InputNumber :formatter="value => `${value}kb`" :parser="value => value.replace('kb', '')" v-model="modalFormData.maxSize" placeholder="请输入上传文件最大限制">
            </InputNumber>
          </FormItem>
          <FormItem label="上边距：" v-if="typeof modalFormData.marginTop != 'undefined'">
            <InputNumber :formatter="value => `${value}px`" :parser="value => value.replace('px', '')" v-model="modalFormData.marginTop" placeholder="请输入标签上边距">
            </InputNumber>
          </FormItem>
          <FormItem label="下边距：" v-if="typeof modalFormData.marginBottom != 'undefined'">
            <InputNumber :formatter="value => `${value}px`" :parser="value => value.replace('px', '')" v-model="modalFormData.marginBottom" placeholder="请输入标签下边距">
            </InputNumber>
          </FormItem>
          <FormItem label="是否必填：" v-if="typeof modalFormData.require != 'undefined'">
            <Checkbox v-model="modalFormData.require">必填</Checkbox>
          </FormItem>
          <FormItem label="是否多选：" v-if="typeof modalFormData.multiple != 'undefined'">
            <Checkbox v-model="modalFormData.multiple">多选</Checkbox>
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
            <ColorPicker v-model="modalFormData.color" />
          </FormItem>
        </Form>
        <div slot="footer">
          <Button type="text" @click="handleCancel">取消</Button>
          <Button type="primary" :loading="modalFormData.loading" @click="handleOk">确定</Button>
        </div>
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
      // 颜色选择器bug，对象下color不更新      
      modalFormData: {
        color: '',
        loading: false
      },
      formData: {},
      dataDict: []
    };
  },
  methods: {
    handleDataDictChange(val) {
      this.$set(this.modalFormData, 'loading', true);
      this.$http.get(`/label/${val}`).then(d => {
        this.modalFormData = Object.assign({}, this.modalFormData, {
          name: d.data.name,
          loading: false
        });
      });
    },
    changeVal(val, element) {
      this.formData[element.obj.name] = val;
    },
    // https://github.com/SortableJS/Vue.Draggable#clone
    // 克隆,深拷贝对象
    cloneData(original) {
      // 添加一个modal标题
      original.obj.modalTitle = original.obj.label || "";
      // 深拷贝对象，防止默认空对象被更改
      // return Object.assign({}, original);
      return JSON.parse(JSON.stringify(original));
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
      this.showModal = false;
      setTimeout(_ => {
        this.modalFormData = {
          color: '',
          loading: false
        };
      }, 500)
    },
    // 显示modal,配置被克隆控件
    confEle(index) {
      const list_temp = Object.assign({}, this.list2[index]);
      for (let i in list_temp.obj) {
        this.modalFormData[i] = list_temp.obj[i];
      }
      // 配置项中未找到color，删除modalFormData中自带color属性
      if (!list_temp.obj['color']) delete this.modalFormData.color;
      // 设置被配置控件的index，便于完成配置找到相应对象赋值
      this.modalFormData.listIndex = index;
      // Vue 不能检测到对象属性的添加或删除
      this.modalFormData = Object.assign({}, this.modalFormData);
      this.showModal = true;
    },
    // 删除克隆控件
    removeEle(index) {
      this.list2.splice(index, 1);
    }
  },
  computed: {
    ruleValidate() {
      const rule_arr = this.list2.filter(v => {
        return v.obj.name && v.obj.require
      });
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('该项为必填项'));
        } else {
          callback();
        }
      };
      let rule_temp = {
        temp: [{
          validator: validatePass,
          trigger: 'blur'
        }]
      };
      for (let i in rule_arr) {
        rule_temp[rule_arr[i]['obj']['name']] = [{
          validator: validatePass,
          trigger: 'blur'
        }]
      }
      return rule_temp;
    },
    dataDictSelected() {
      return this.list2.map(v => {
        return v.obj.dict || -1;
      })
    },
    dataDictList() {
      return this.dataDict.filter(v => {
        return v.type == this.modalFormData.type;
      })
    },
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
  },
  created() {
    this.$http.get('/label').then(d => {
      this.dataDict = d.data.items;
    })
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

.form_content .ivu-form-item:last-child {
  margin-bottom: 0;
}

</style>
