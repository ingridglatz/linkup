import { createApp } from 'vue'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faImage } from '@fortawesome/free-regular-svg-icons'

library.add(faImage)

createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
