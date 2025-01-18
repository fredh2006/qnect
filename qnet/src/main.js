import { createApp } from 'vue'
import '../src/style.css';

import App from './App.vue'
import router from './router'
import '@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.min.css';


const app = createApp(App)

app.use(router)

app.mount('#app')
