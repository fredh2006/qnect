import { createApp } from 'vue'
import '../src/style.css';

import App from './App.vue'
import router from './router'
import '@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.min.css';



const app = createApp(App)

// app.use(new 
//     Auth0Plugin,
//     {
//       domain: 'dev-j3m4k7dwiqywttol.us.auth0.com',
//       clientId: 'On2JJoTgtQVYaWxHvqxhn2LBBAwm6EqX',
//       authorizationParams: {
//         redirect_uri: window.location.origin,
//       },
//     },
// );
// app.use(
//     createAuth0({
//       domain: "dev-j3m4k7dwiqywttol.us.auth0.com",
//       clientId: "On2JJoTgtQVYaWxHvqxhn2LBBAwm6EqX",
//       authorizationParams: {
//         redirect_uri: 'http://localhost:5173/groq'
//       }
//     })
//   );

app.use(router);

app.mount('#app');
