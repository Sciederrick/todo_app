import Home from '@/views/Home.vue'
import AddTask from '@/components/AddTask.vue'
import Calendar from '@/components/Calendar.vue'
import Settings from '@/components/Settings.vue'

export default [
  {
    path:'/',
    name:'home',
    component:Home,
    children:[
      {
        path:'AddTask',
        name:'addTask',
        component:AddTask
      },
      {
        path:'Calendar',
        name:'calendar',
        component:Calendar
      },
      {
        path:'Settings',
        name:'settings',
        component:Settings
      }
    ]
  }
]
