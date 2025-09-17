export default {
    data:function(){
        return{                        
            "message":"",
            "status_code": 0
        }
    },
    mounted(){
        this.prepare_summary_charts()
    },

    template: 
        `   <div>
                <div class="row border">
                    <template>                
                        <nav class="navbar navbar-expand">
                            <div class="container-fluid">
                                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                                </button>
                                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                                        <li class="nav-item">
                                            <router-link class="nav-link active" aria-current="page" to="/">Home &nbsp;</router-link>
                                        </li>
                                        
                                        <li class="nav-item">
                                            <router-link class="nav-link" to="/summary">Summary</router-link>
                                        </li>                                                      
                                    </ul>                                                                            
                                </div>
                            </div>
                        </nav>
                    </template>
                </div>

                <div class="row border mt-2">
                    <template>
                        
                        <h3>⚫<i>Summary Chart</i></h3>
                        <hr>
                        <div class="mx-2 mt-2 text-danger text-center fs-4">
                            <p>{{message}}</p>
                            <div style="text-align: center;">
                                <img src="./static/Pictures/Summary_chart.png" class="card-img-top" style="width: 1020px; height: 550px;" alt="...">
                            </div>
                        </div>
                        
                    </template>
                </div>
            </div>
        `, 
    methods:{
        prepare_summary_charts(){

            fetch("/user/api/get_summary_data",{
                method: "GET",      // Method type
                headers: {
                    "Content-Type": "application/json",       //Telling the backend to treat the data provided as JSON type 
                }
            })
                .then(response => {
                    this.status_code=response.status
                    return response.json()})
                .then(data=>{
                    if(this.status_code >= 400){
                        this.message = data.message
                    }
                    else{

                    }
                })
        },
    }  
    
} 

