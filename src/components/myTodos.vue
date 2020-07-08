<template>
  <div class="mt-2 py-2 mx-auto lg:w-4/5">
    <div v-if="appReady" class="app init"><i class="fas fa-tasks text-6xl"></i></div>
    <div v-if="appLoading" class="app load z-20"><i class="fas fa-tasks text-6xl"></i></div>
    <div class="mx-2 mb-6 flex flex-col flex-wrap justify-center items-stretch  flex-grow md:flex-row md:justify-start">
      <div v-for="todo in allTodos" :key="todo._id" class="relative p-2 border border-4 border-white bg-red-200 md:w-1/3 lg:w-1/4">
        {{todo.title}}
        <button @click.prevent="deleteTask(todo._id)" class="btn absolute bottom-0 right-0 bg-transparent text-red-800" style="cursor:pointer;"><i class="far fa-trash-alt"></i></button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data(){
    return {
      appLoading: false
    }
  },
  methods: {
    ...mapActions(['fetchTodos']),
    deleteTask(id){
      this.appLoading = true;
      this.$store.dispatch('deleteTodo', id);
    }
  },
  computed: {
    ...mapGetters(['allTodos']),
    appReady(){
      if(this.allTodos.length > 1){
        return false
      }else{
        return true
      }
    }
  },
  watch: {
    allTodos(){
      this.appLoading = false
    }
  },
  created(){
    this.fetchTodos();
  }
}
</script>
