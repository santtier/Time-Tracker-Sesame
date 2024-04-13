import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/tailwind.css'
import '@/assets/style.css'
import App from '@/App.vue'
import clickOutside from '@/diirectives/clickOutside'

const pinia = createPinia()
const app = createApp(App)

app.directive('click-outside', clickOutside);
app.use(pinia)
app.mount('#app')
