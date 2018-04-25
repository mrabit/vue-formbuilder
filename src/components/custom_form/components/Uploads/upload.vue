<template>
  <div>
    <Upload ref="upload" :show-upload-list="false" :default-file-list="defaultList" :on-success="handleSuccess" :format="['jpg','jpeg','png']" :max-size="maxSize" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" multiple :type="type" :action="action" :name="name">
      <div style="padding: 20px 0">
        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
        <p>点击或者拖拽文件到此处进行上传</p>
      </div>
    </Upload>
    <ul class="demo-upload-list">
      <li v-for="(item,index) in uploadList" :key="index">
        <template v-if="item.status == 'finished'">
          <p style="display: inline-block">
            <a v-if="!item.visible" :href="item.url" target="_blank">{{item.name}}{{!!item.file_name && (item.name == item.file_name?"":'('+item.file_name+')')}}</a>
            <i-input @on-enter="handleChangeAlias" autofocus placeholder="请设置附件别名" v-else v-model="formData.file_name" style="width: 300px"></i-input>
          </p>
          <p style="float:right">
            <template v-if="!item.visible">
              <span @click="handleAlias(item, index)" class="alias-btn">别名</span>
              <span @click="handleRemove(item)">删除</span>
            </template>
            <span v-else @click="handleChangeAlias">确定</span>
          </p>
        </template>
        <Progress v-else :percent="item.percentage" hide-info></Progress>
      </li>
    </ul>
    <!-- <Modal title="图片属性设定" v-model="visible" @on-ok="handleCloseModal">
      <img :src="image_url" v-if="visible" style="width: 100%">
      <Form :model="formData" :label-width="80" style="margin-top: 24px;">
        <FormItem label="附件别名：">
          <Input v-model="formData.file_name" placeholder="请输入附件别名"></Input>
        </FormItem>
      </Form>
    </Modal> -->
  </div>
</template>
<script>
export default {
  name: "uploadCustom",
  data() {
    return {
      formData: {
        file_name: "",
        index: -1
      },
      imgName: "",
      visible: false,
      uploadList: []
    };
  },
  methods: {
    handleChangeAlias() {
      this.uploadList[this.formData.index]['file_name'] = this.formData.file_name;
      this.uploadList[this.formData.index]['visible'] = false;
      this.$emit('handleUploadsValue', this.uploadList);
      this.formData = {
        file_name: "",
        index: -1
      };
    },
    handleAlias(item, index) {
      // 有上传操作未完成的
      if (this.formData.index != -1) {
        this.$set(this.uploadList[this.formData.index], 'visible', false);
      }
      this.formData = Object.assign({}, this.formData, {
        file_name: item.file_name || "",
        index,
      });
      this.$set(this.uploadList[index], 'visible', true);
    },
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      // 更新uploadList
      this.uploadList = this.$refs.upload.fileList;
    },
    handleSuccess(res, file) {
      file.url = res.items.image_url;
      file.name = res.items.name;
      file.file_name = res.items.name;
      // 更新uploadList
      this.uploadList = this.$refs.upload.fileList;
      this.$emit('handleUploadsValue', this.uploadList);
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
      // 更新uploadList
      this.uploadList = this.$refs.upload.fileList;
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
    },
    name: {
      type: String,
      default: 'photo'
    }
  }
};

</script>
<style>
.demo-upload-list {
  margin-top: 15px;
  display: block;
  line-height: 20px;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  margin-right: 4px;
}

.demo-upload-list .ivu-progress-bg {
  height: 5px !important;
}

.demo-upload-list input {
  padding-top: 0;
  padding-bottom: 0;
  border: 0;
  outline: 0;
  border-bottom: 1px solid #ccc;
  border-radius: 0;
  line-height: 19px;
  height: 18px;
}

.demo-upload-list input:focus {
  box-shadow: inherit;
}

.alias-btn {
  margin-right: 10px
}

</style>
