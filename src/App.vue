<template>
  <div id="app" class="bg-white font-mono md:text-lg lg:text-xl">
    <app-header/>
      <router-view></router-view>
  </div>
</template>

<script>
import header from './components/header.vue';

export default {
  components: {
    'app-header': header
  }
}
</script>

<style>
@import 'assets/tailwind.css';
/* width */
::-webkit-scrollbar {
  width: 10px;
}
/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}
/* Handle */
::-webkit-scrollbar-thumb {
  background-color: #F0F0F0;
  border-radius: 10px;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background-color: #F56565;
}
</style>
