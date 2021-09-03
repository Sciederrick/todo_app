import Vue from 'vue'
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {faPlus, faEllipsisH, faEllipsisV, faUserCircle, faTasks, faCalendarAlt, faMoon, faTimes, faSun, faHourglassHalf, faCheckCircle, faExclamationCircle, faSpinner, faAngleLeft, faAngleRight, faClipboardList} from '@fortawesome/free-solid-svg-icons'
library.add(faPlus, faEllipsisH, faEllipsisV, faUserCircle, faTasks, faCalendarAlt, faMoon, faTimes, faSun, faHourglassHalf, faCheckCircle, faExclamationCircle, faSpinner, faAngleLeft, faAngleRight, faClipboardList)

Vue.component('fa-icon', FontAwesomeIcon)
