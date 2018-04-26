import render from "./Render";
import uploadCustom from './components/Uploads/upload';
import preview from './Preview';

const customForm = {
  render,
  uploadCustom,
  preview
};

const install = function(Vue, opts = {}) {
  Vue.component(render.name, render);
  Vue.component(uploadCustom.name, uploadCustom);
  Vue.component(preview.name, preview);
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default Object.assign(customForm, { install });
