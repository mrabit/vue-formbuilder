<template>
  <div>
    <div class="demo-upload-list" v-for="(item,index) in uploadList" :key="index">
      <template v-if="item.status === 'finished'">
        <img :src="item.url">
        <div class="demo-upload-list-cover">
          <Icon type="ios-eye-outline" @click.native="handleView(item,index)"></Icon>
          <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
        </div>
      </template>
      <template v-else>
        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
      </template>
    </div>
    <Upload ref="upload" :show-upload-list="false" :default-file-list="defaultList" :on-success="handleSuccess" :format="['jpg','jpeg','png']" :max-size="maxSize" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" multiple :type="type" action="action" style="display: inline-block;width:58px;">
      <div style="width: 58px;height:58px;line-height: 58px;">
        <Icon type="camera" size="20"></Icon>
      </div>
    </Upload>
    <Modal title="图片属性设定" v-model="visible" @on-ok="handleCloseModal">
      <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
      <Form :model="formData" :label-width="80" style="margin-top: 24px;">
        <FormItem label="附件别名：">
          <Input v-model="formData.file_name" placeholder="请输入附件别名"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
export default {
  name: "uploadCustom",
  data() {
    return {
      formData: {
        file_name: "",
        index: 0
      },
      imgName: "",
      visible: false,
      uploadList: []
    };
  },
  methods: {
    handleCloseModal() {
      this.uploadList[this.formData.index]['file_name'] = this.formData.file_name;
      this.$emit('handleUploadsValue', this.uploadList);
    },
    handleView(item, index) {
      this.formData = Object.assign({}, this.formData, {
        file_name: item.file_name || "",
        index
      });
      this.imgName = item.name;
      this.visible = true;
    },
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess(res, file) {
      file.url =
        "https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar";
      file.name = "7eb99afb9d5f317c912f08b5212fd69a";
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc: "文件：" +
          file.name +
          "格式不正确, 请选择 jpg/png."
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "超出最大限制",
        desc: "文件：" + file.name + "超出设定最大限制" + this.maxSize + "kb"
      });
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < 5;
      if (!check) {
        this.$Notice.warning({
          title: "一次最多选择五个文件进行上传."
        });
      }
      return check;
    }
  },
  mounted() {
    this.uploadList = this.$refs.upload.fileList;
  },
  props: {
    defaultList: { //默认
      type: Array,
      default () {
        return [];
      }
    },
    maxSize: { //文件大小
      type: Number,
      default: 2048
    },
    action: { //提交地址
      type: String,
      default: ''
    },
    type: { //支持拖拽
      type: String,
      default: 'select'
    }
  }
};

</script>
<style>
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}

.demo-upload-list img {
  width: 100%;
  height: 100%;
}

.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}

.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}

.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}

</style>
