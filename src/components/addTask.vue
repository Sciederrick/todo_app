<template>
  <div class="flex flex-col mx-2 justify-center">
    <div v-for="(count, index) in counts" :key="index">
      <form>
        <div class="mx-auto flex flex-col w-full md:w-3/4 shadow-lg p-4 my-2 bg-red-300" :data-taskbox="count">
          <div class="flex flex-row justify-around">
            <textarea name="todo" rows="1" cols="80" class="input" v-model="newTodo.title"></textarea>
            <button type="button" @click='remove' class="btn bg-transparent text-red-800" tabindex="-1"><i class="far fa-trash-alt"></i></button>
          </div>
          <div class=" flex flex-row justify-around">
            <input type="datetime-local" name="calendar" class="input w-3/4 border-0" v-model="newTodo.datetime">
            <button @click.prevent="storeTask" name="confirm" class="btn bg-transparent"><i class="fas fa-check"></i></button>
          </div>
        </div>
      </form>
    </div>
    <div class="px-8">
      <button type="button" @click="add" class="dec-inc-taskbox float-left">todo</button>
      <button type="button" @click="remove" class="dec-inc-taskbox float-right">less</button>
    </div>
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
      counts: 1,
      newTodo: {
        title: '',
        datetime: ''
      }
    }
  },
  methods:{
    add(){
      this.counts++;
    },
    remove(){
      this.counts--;
    },
    ...mapActions(['addTodo']),
    storeTask(){
      this.title =
      this.addTodo(this.newTodo);
    }
  }
}
</script>

<style>
</style>
