<template>
  <div class="flex flex-col justify-center">
    <div v-for="(count, index) in counts" :key="index">
      <div class="mx-auto flex flex-col w-3/4 shadow-lg p-4" :data-taskbox="count">
        <div class="flex flex-row justify-around">
          <textarea name="todo" rows="1" cols="80" class="input"></textarea>
          <button type="button" @click='remove' class="btn bg-transparent text-indigo-700"><i class="far fa-trash-alt"></i></button>
        </div>
        <div class=" flex flex-row justify-around">
          <input type="datetime-local" name="calendar" class="input w-3/4 border-0">
          <button type="button" name="confirm" class="btn"><i class="fas fa-check"></i></button>
        </div>
      </div>
    </div>
    <div class="">
      <button type="button" @click="add" class="float-left w-8 border rounded-lg bg-indigo-700 text-white"><i class="fas fa-plus"></i></button>
      <button type="button" @click="remove" class="float-right w-8 border rounded-lg bg-indigo-700 text-white"><i class="fas fa-minus"></i></button>
    </div>
  </div>
</template>

<script>

export default {
  data(){
    return{
      counts: 1
    }
  },
  methods:{
    add(){
      this.counts++;
    },
    remove(){
      this.counts--;
    }
  }
}
</script>

<style>
</style>
