<template>
  <div id="app" class="bg-white font-mono md:text-lg lg:text-xl">
    <app-header/>
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
