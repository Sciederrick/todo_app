<template>
  <div class="flex flex-col mx-2 justify-center">
    <form>
      <div class="mx-auto flex flex-col w-full md:w-3/4 shadow-lg p-4 my-2 bg-red-300">
        <div class="flex flex-col lg:flex-row justify-around">
          <textarea name="todo" rows="1" cols="80" class="input w-full lg:w-2/3" v-model="newTodo.title"></textarea>
          <input type="datetime-local" name="calendar" class="input w-1/2 md:w-1/3 lg:w-1/4 border" v-model="newTodo.datetime">
        </div>
        <div class=" flex flex-row justify-between">
          <button @click.prevent="storeTask" name="confirm" class="btn bg-transparent lg:ml-4"><i class="fas fa-check"></i></button>
          <button type="button" class="btn bg-transparent text-red-800 lg:mr-4" tabindex="-1"><i class="far fa-trash-alt"></i></button>
        </div>
      </div>
    </form>
    <myTodos/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import myTodos from './myTodos';
export default {
  components: {
    myTodos
  },
  data(){
    return{
      newTodo: {
        title: '',
        datetime: ''
      }
    }
  },
  methods:{
    ...mapActions(['addTodo']),
    storeTask(){
      this.addTodo(this.newTodo);
    }
  }
}
</script>

<style>
</style>
