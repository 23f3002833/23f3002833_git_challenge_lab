
import Home from "./components/Home.js"          
import Heading from "./components/Header.js"          
import Footer from "./components/Footer.js"          

const routes = [
  { path: '/', component: Home },
]

// To let the application know that the above array consists of Vue routes, we need to create VueRouter object below

const router = new VueRouter({
    routes     // Indicates by-default, routes: routes
})

// Now to let the Vue object know the presence of VueRouter, we need to mention that within Vue object  
const app = new Vue({
    el: "#app",
    router,     // Indicates by-default, router: router
    template:      // since "navbar" and "footer" are defined tags of html, we replaced it with different tags to be able to define them separately
    // "router-view" is like a placeholder for the router-links defined above
    `   
        <div style="padding:10px; padding-top: 10px; padding-bottom: 10px">
            <div class="container-xxl">
                <heading></heading>
                <router-view></router-view>
                <foot></foot>        
            </div>
        </div>
    `,
    data:{
        
    },
    components:{   // Now to let the Vue object know about the other routes that are not defined within VueRouter, we need to mention them here
        "heading": Heading,
        "foot": Footer
    },
})