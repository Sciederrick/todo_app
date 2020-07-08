<template>
  <div class="flex flex-col mx-2 my-4 justify-center">
    <div v-if="appLoading" class="app load z-20"><i class="fas fa-tasks text-6xl"></i></div>
    <form>
      <div class="mx-auto flex flex-col w-full md:w-3/4 shadow-lg p-4 bg-transparent">
        <div class="flex flex-col lg:flex-row justify-around">
          <textarea name="todo" rows="1" cols="80" class="input w-full lg:w-2/3" v-model="newTodo.title"></textarea>
          <input type="datetime-local" name="calendar" class="input w-1/2 md:w-1/3 lg:w-1/4 border" v-model="newTodo.datetime">
        </div>
        <div class=" flex flex-row justify-between">
          <button @click.prevent="storeTask" name="confirm" class="btn border-r-2 border-l-2 border-green-500 bg-transparent text-green-800 lg:ml-4">SUBMIT</button>
          <button type="reset" class="btn bg-transparent text-red-800 lg:mr-4" tabindex="-1"><i class="far fa-trash-alt"></i></button>
        </div>
      </div>
    </form>
    <myTodos/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import myTodos from './myTodos';

export default {
  components: {
    myTodos
  },
  data(){
    return{
      appLoading: false,
      newTodo: {
        title: '',
        datetime: ''
      }
    }
  },
  computed: mapGetters(['allTodos']),
  methods:{
    ...mapActions(['addTodo']),
    storeTask(){
      this.appLoading = true;
      this.addTodo(this.newTodo);
    },
  },
  watch: {
    allTodos(){
      this.appLoading = false
    }
  }
}
</script>

<style>
</style>
