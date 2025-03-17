import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

const app = createApp(App)

app.config.globalProperties.$axios = axios.create({
    baseURL: 'http://localhost:3000',
})

app.use(router)

app.mount('#app')