<template>
  <div>
    <myTodos v-if="anyTask"/>
    <div v-if="!anyTask" id="blank" class="flex flex-col items-center space-y-64">
      <h1 class="page-title">Lets give us some Tasks!</h1>
      <a href="/add" role="button" class="btn btn-blank-task">Task</a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import myTodos from './myTodos';

export default {
  components: {
    myTodos
  },
  data(){
    return {

    }
  },
  computed: mapGetters(['anyTask'])
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
