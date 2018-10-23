import lateralSpreads from './lateralSpreads';

lateralSpreads.install = function(Vue) {
  Vue.component(ElDialog.name, ElDialog);
};

export default lateralSpreads;