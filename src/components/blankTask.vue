<template>
  <div>
    <myTodos v-if="availableTasks"/>
    <div v-if="!availableTasks" id="blank" class="flex flex-col items-center space-y-64">
      <h1 class="page-title">Hey Tasker!</h1>
      <a href="#/add" role="button" class="btn btn-blank-task">Task</a>
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
      availableTasks: true
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
