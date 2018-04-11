<template>
  <Form ref="formValidate" class="b-a" :label-width="100" :model="formData" @submit.native.prevent>
    <p>未绑定数据字典控件无效</p>
    <renders v-for="(element,index) in template_form" :key="index" :ele="element.ele" :obj="element.obj || {}" :data="formData" @handleChangeVal="val => handleChangeVal(val,element)" :value="formData[element.obj.name]">
    </renders>
    <FormItem>
      <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
      <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
    </FormItem>
  </Form>
</template>
<script>
import renders from "./custom_form/Render";
export default {
  data() {
    return {
      template_form: [],
      formData: {}
    }
  },
  components: {
    renders
  },
  methods: {
    // 控件回填数据
    handleChangeVal(val, element) {
      this.$set(this.formData, element.obj.name, val);
      // this.formData[element.obj.name] = val;
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          debugger;
          this.$Message.success('Success!');
        } else {
          debugger;
          this.$Message.error('Fail!');
        }
      })
    },
  },
  created() {
    this.template_form = [{
      "ele": "Input",
      "obj": {
        "dict": "{\"id\":1,\"parent_name\":null}",
        "name": "name",
        "type": "input",
        "items": [{
          "label_name": null,
          "label_value": null
        }],
        "label": "姓名",
        "config": true,
        "loading": false,
        "require": true,
        "listIndex": 0,
        "maxLength": 20,
        "ruleError": "该字段不能为空",
        "modalTitle": "输入框",
        "inlineBlock": false,
        "parent_name": null,
        "placeholder": null
      }
    }, {
      "ele": "Radio",
      "obj": {
        "dict": "{\"id\":5,\"parent_name\":null}",
        "name": "sex",
        "type": "radio",
        "items": [{
          "label_name": "男",
          "label_value": "1"
        }, {
          "label_name": "女",
          "label_value": "2"
        }],
        "label": "性别",
        "value": null,
        "config": true,
        "loading": false,
        "require": true,
        "listIndex": 1,
        "ruleError": "请选择",
        "modalTitle": "单选框",
        "inlineBlock": false,
        "parent_name": null
      }
    }, {
      "ele": "Select",
      "obj": {
        "dict": "{\"id\":14,\"parent_name\":null}",
        "name": "is_case",
        "type": "select",
        "items": [{
          "label_name": "是",
          "label_value": "1"
        }, {
          "label_name": "否",
          "label_value": "2"
        }],
        "label": "资料补齐",
        "config": true,
        "loading": false,
        "require": true,
        "listIndex": 2,
        "ruleError": "请选择",
        "modalTitle": "选择框",
        "inlineBlock": false,
        "parent_name": null,
        "placeholder": null
      }
    }, {
      "ele": "Input",
      "obj": {
        "dict": "{\"id\":17,\"parent_name\":\"is_case\"}",
        "name": "case",
        "type": "input",
        "items": [{
          "label_name": null,
          "label_value": null
        }],
        "label": "资料",
        "config": true,
        "loading": false,
        "require": true,
        "listIndex": 3,
        "maxLength": 20,
        "ruleError": "该字段不能为空",
        "modalTitle": "输入框",
        "inlineBlock": false,
        "parent_name": "is_case",
        "placeholder": null
      }
    }]
    this.formData = {
      name: '哈哈',
      sex: '2',
      is_case: '2',
      case: '啦啦啦'
    }
  }
}

</script>
<style>


</style>
