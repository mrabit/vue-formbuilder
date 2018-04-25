import render from "./Render";
import uploadCustom from './components/Uploads/upload';

const customForm = {
  render,
  uploadCustom
};

const install = function(Vue, opts = {}) {
  Vue.component(render.name, render);
  Vue.component(uploadCustom.name, uploadCustom);
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default Object.assign(customForm, { install });
