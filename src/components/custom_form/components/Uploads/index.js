import uploadCustom from "./upload";

const iViewUpload = {
  uploadCustom
};

const install = function(Vue, opts = {}) {
  Vue.component(uploadCustom.name, uploadCustom);
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default Object.assign(iViewUpload, { install });
