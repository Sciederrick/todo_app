<template>
<div class="fixed inset-0 h-screen w-screen overflow-x-hidden flex flex-col items-center justify-center font-sans bg-yellow-700 bg-opacity-75 z-10">
  <!-- Calendar -->
  <div class="md:mx-20 md: md:border md:rounded md:border-white md:bg-blue-900 md:bg-opacity-75 md:p-2 antialised">
    <!-- Header -->
    <div class="flex justify-between bg-transparent mb-1 font-bold text-lg lg:text-2xl antialised text-white">
      <span>{{year}}&nbsp;{{MONTH_NAMES[month]}}</span>
      <div class="border rounded-lg px-1" style="padding-top: 2px;">
        <button 
          type="button"
          class="leading-none rounded-lg transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 items-center focus:outline-none" 
          :class="{'cursor-not-allowed opacity-25': month == 0 }"
          :disabled="month == 0 ? true : false"
          @click="month--">
          <svg class="h-6 w-6 text-gray-500 inline-flex leading-none"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>  
        </button>
        <div class="border-r inline-flex h-6"></div>		
        <button 
          type="button"
          class="leading-none rounded-lg transition ease-in-out duration-100 inline-flex items-center cursor-pointer hover:bg-gray-200 p-1 focus:outline-none" 
          :class="{'cursor-not-allowed opacity-25': month == 11 }"
          :disabled="month == 11 ? true : false"
          @click="month++">
          <svg class="h-6 w-6 text-gray-500 inline-flex leading-none"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>									  
        </button>
      </div>
    </div>
    <div class="grid grid-flow-row grid-cols-7 grid-rows-1 gap-1 lg:gap-2 mb-2">
      <div 
        v-for="day in DAYS" :key="day"
        class="w-12 md:w-20 lg:w-32 border text-center font-bold py-2 bg-white rounded shadow"
        >
        {{day}}
      </div>
    </div>
    <!-- Body -->
    <div class="grid grid-flow-row grid-cols-7 grid-rows-5 gap-1 lg:gap-2">
      <div 
        v-for="i in getNoOfDays" :key="i"
        class="h-20 w-12 md:w-20 lg:w-32 border text-center font-semibold py-2 bg-white text-gray-700 rounded shadow overflow-hidden"
        >
        {{i}}
        <ul 
          v-if="events"
          class="text-xs font-mono text-gray-500 text-left underline pl-2">
            <li v-for="event in events" :key="event._id">
              <span 
                v-if="event.deadline.split('-')[0] == year 
                && event.deadline.split('-')[1] == month + 1
                && event.deadline.split('-')[2] == i"
                :class="[event.priority == 'Critical' ? 'text-red-600' : event.priority == 'Important' ? 'text-yellow-600' : 'text-blue-400']"
                >
                  {{event.title|capLength(12)}}
              </span>
            </li> 
        </ul>
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
      month: '',
      events: []
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
    initEvents() {
      let todos = this.$store.getters.allTodos
      let events = []
      let temp = {}
      todos.forEach(el => {
        temp.deadline = el.deadline.split('T')[0]
        el.todos.forEach(el => {
          temp.title = el.title
          temp.priority = el.priority
          temp.tag = el.tag
          temp._id = el._id
        })
        events.push(temp)
        temp = {}
      })
      this.events = [...events]
    },
    fetchEvents() {
      this.$store.dispatch('fetchTodos')
    }
  },
  created() {
    this.initDate()
  },
  beforeMount() {
    this.fetchEvents()
    this.initEvents()
  },
  filters: {
    capLength(str, length) {
      return str.substr(0, length).concat('...')
    }
  },
}
</script>
