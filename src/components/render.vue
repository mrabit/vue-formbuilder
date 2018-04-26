<template>
  <Form ref="formValidate" class="b-a" :label-width="100" :model="formData" @submit.native.prevent>
    <p>未绑定数据字典控件无效</p>
    <renders v-for="(element,index) in template_form" :key="index" :index="index" :ele="element.ele" :obj="element.obj || {}" :data="formData" @handleChangeVal="val => handleChangeVal(val,element)" @changeVisibility="changeVisibility" :value="formData[element.obj.name]" :sortableItem="template_form">
    </renders>
    <FormItem>
      <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
      <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
  data() {
    return {
      template_form: [],
      formData: {}
    }
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
          window.localStorage.setItem('template_form', JSON.stringify(this.template_form));
          this.$Message.success('Success!');
          this.$router.push('/preview');
        } else {
          this.$Message.error('Fail!');
        }
      })
    },
    // 更改当前渲染字段是否显示
    changeVisibility(index, visibility) {
      this.$set(this.template_form[index].obj, 'visibility', visibility);
    }
  },
  created() {
    this.template_form = JSON.parse(localStorage.getItem('template_form') || '[]');
    for (let i in this.template_form) {
      this.$set(this.formData, this.template_form[i].obj.name, this.template_form[i].obj.value);
    }
  }
}

</script>
<style>


</style>
