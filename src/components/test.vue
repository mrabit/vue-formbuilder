<template>
  <Form ref="formDynamic" :model="formDynamic" :label-width="80" style="width: 300px">
    <FormItem v-for="(item, index) in formDynamic.items" v-if="item.status" :key="index" :label="'Item ' + item.index" :prop="'items.' + index + '.value'" :rules="{required: true, message: 'Item ' + item.index +' can not be empty', trigger: 'blur'}">
      <Row>
        <Col span="18">
        <Input type="text" v-model="item.value" placeholder="Enter something..."></Input>
        </Col>
        <Col span="4" offset="1">
        <Button type="ghost" @click="handleRemove(index)">Delete</Button>
        </Col>
      </Row>
    </FormItem>
    <FormItem>
      <Row>
        <Col span="12">
        <Button type="dashed" long @click="handleAdd" icon="plus-round">Add item</Button>
        </Col>
      </Row>
    </FormItem>
  </Form>
</template>
<script>
export default {
  data() {
    return {
      index: 1,
      formDynamic: {
        items: [{
          value: '',
          index: 1,
          status: 1
        }]
      }
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!');
        } else {
          this.$Message.error('Fail!');
        }
      })
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    handleAdd() {
      this.index++;
      this.formDynamic.items.push({
        value: '',
        index: this.index,
        status: 1
      });
    },
    handleRemove(index) {
      this.formDynamic.items[index].status = 0;
    }
  }
}

</script>
