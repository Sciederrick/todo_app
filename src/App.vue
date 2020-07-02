<template>
  <div id="app" class="bg-white font-mono">
    <app-header v-if="anyTask"/>
      <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import header from './components/header.vue'
export default {
  components: {
    'app-header': header
  },
  data() {
    return {

    }
  },
  computed: mapGetters(['anyTask'])
}
</script>

<style>
@import 'assets/tailwind.css';
</style>
