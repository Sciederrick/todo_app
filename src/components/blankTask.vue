<template>
  <div>
    <myTodos/>
    <div v-if=false id="blank" class="flex flex-col items-center space-y-64">
      <h1 class="page-title">Lets give us some Tasks!</h1>
      <a href="/add" role="button" class="btn btn-blank-task">Task</a>
    </div>
  </div>
</template>

<script>
import myTodos from './myTodos';

export default {
  components: {
    myTodos
  },
  data(){
    return {

    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
