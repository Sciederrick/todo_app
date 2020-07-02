<template>
  <nav class="py-2 bg-red-500 shadow-lg">
    <ul class="flex flex-row justify-around items-center font-extrabold text-bold">
      <li><router-link to="/"><i class="fas fa-home"></i></router-link></li>
      <li><router-link to="/add">ADD</router-link></li>
      <li><router-link to="/todos">TODOS</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>
