<template>
<div class="fixed inset-0 h-screen w-screen overflow-x-hidden flex flex-col items-center justify-center bg-teal-lightest font-sans bg-yellow-500 bg-opacity-75 z-10">
  <!-- Calendar -->
  <div class="md:mx-20 antialised">
    <!-- Header -->
    <div class="bg-transparent mb-1 font-bold text-lg lg:text-2xl antialised text-white">{{year}}&nbsp;{{MONTH_NAMES[month]}}</div>
    <div class="grid grid-flow-row grid-cols-7 grid-rows-1 gap-1 lg:gap-2 mb-2">
      <div 
        v-for="day in DAYS" :key="day"
        class="w-12 md:w-20 lg:w-32 xl:w-40 border text-center font-bold py-2 bg-white"
        >
        {{day}}
      </div>
    </div>
    <!-- Body -->
    <div class="grid grid-flow-row grid-cols-7 grid-rows-5 gap-1 lg:gap-2">
      <div 
        v-for="i in getNoOfDays" :key="i"
        class="w-12 md:w-20 lg:w-32 xl:w-40 border text-center font-semibold py-2 bg-white text-gray-700"
        >
        {{i}}
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default{
  data(){
    return{
      MONTH_NAMES: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      DAYS: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      year: '',
      month: ''
    }
  },
  computed: {
    getNoOfDays() {      
      const d = new Date(this.year, this.month + 1, 0).getDate() //Get the number of days in a specific month
      return d
    }
  },
  methods: {
    initDate() {
      let today = new Date()
      this.month = today.getMonth()
      this.year = today.getFullYear()
    },
  },
  created() {
    this.initDate()
  }
}
</script>
