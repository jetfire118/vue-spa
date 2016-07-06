import Vue from 'vue'

//公共事件名
export const eventKey = {
  ROUTER_CHANGE: 'router-change',
  CHANGE_HEAD: 'change-head'
}

export const alertMsg = function(msg) {
  var tip = new Vue({
    data: {
      msg: msg
    },
    template: '<div class="cp_alertMsg" transition="anm_fade">{{msg}}</div>',
    ready: function() {
      var _this = this;
      setTimeout(function() {
        _this.$destroy(true);
      }, 3000);
    }
  });
  tip.$mount().$appendTo('body');
}
