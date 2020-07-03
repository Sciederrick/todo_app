<template>
  <div>
    <myTodos/>
    <div v-if="allTodos.length==0" class="flex flex-col items-center space-y-64">
      <h1 class="page-title">No Tasks Yet, Lets make some!</h1>
      <a href="/add" role="button" class="btn btn-blank-task">Task</a>
    </div>
  </div>
</template>

<script>
import myTodos from './myTodos'
import { mapGetters } from 'vuex'

export default {
  components: {
    myTodos
  },
  computed: mapGetters(['allTodos'])
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
