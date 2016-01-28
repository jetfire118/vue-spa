<template>
  <div class="news-view" :class="{ loading: !items.length }">
    <!-- item list -->
    <item
      v-for="item in items"
      :item="item"
      :index="$index | formatItemIndex"
      track-by="id">
    </item>
    <!-- navigation -->
    <div class="nav" v-show="items.length > 0">
      <a v-if="page > 1" :href="'#/news/' + (page - 1)">&lt; prev</a>
      <a v-if="page < 4" :href="'#/news/' + (page + 1)">more...</a>
    </div>
    <div v-for="list in y.advertList"><img :src="list.imagPath"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue'
import store from '../store'
import Item from './Item.vue'
import api from '../api'

export default {

  name: 'NewsView',

  components: {
    Item
  },

  data () {
    return {
      page: 1,
      items: []
    }
  },
  route: {
      waitForData: true,
      //切换视图前获取数据
      data () {
          return Promise.all([Vue.http.get(api.homelist), Vue.http.get(api.cityQueryNew)]).then(([x, y]) => ({x: x.data, y: y.data}))
      }
  },

  created () {

  },

  destroyed () {
  },

  methods: {
    update () {

    }
  },

  filters: {
    formatItemIndex (index) {
      return (this.page - 1) * store.storiesPerPage + index + 1
    }
  }
}
</script>
