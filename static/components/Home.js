export default {
    data:function(){
        return{            
            "Users_Data": '',         
            "status_code":0, 
            formData:{
                Roll_No: "",
                Name:"",
                Level:"",
                CGPA: null,
            }, 
            "message":"" 
        }
    },
    mounted(){
        this.All_Users()
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
                                    
                                    <div class="nav-item dropdown d-flex">
                                        &nbsp; &nbsp;                                    

                                        <input type="submit" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" class="btn btn-success" value=" + Add " style="border-radius: 50px;" />

                                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">

                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Fill details:</h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>

                                                    <div class="modal-body">
                                                        
                                                        <div class="mb-3">
                                                            <label for="name" class="col-form-label"><i><b>Name:</b></i></label>
                                                            <input type="text" v-model="formData.Name" class="form-control" id="name">
                                                        </div>

                                                        <div class="mb-3">
                                                            <label for="roll" class="col-form-label"><i><b>Roll No:</b></i></label>
                                                            <input type="text" v-model="formData.Roll_No" class="form-control" id="roll">
                                                        </div>

                                                        <div class="mb-3">
                                                            <label for="lvl" class="col-form-label"><i><b>Education Level:</b></i></label>
                                                            <input type="text" v-model="formData.Level" class="form-control" id="lvl">
                                                        </div>

                                                        <div class="mb-3">
                                                            <label for="cgpa" class="col-form-label"><i><b>CGPA:</b></i></label>
                                                            <input type="number" v-model="formData.CGPA" class="form-control" id="cgpa">
                                                        </div>                                                            
                                                        
                                                    </div>

                                                    <div class="modal-footer">                                    
                                                        <button type="button" @click="Add" class="btn btn-primary">Add</button>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>                                    
                                </div>
                            </div>
                        </nav>
                    </template>
                </div>

                <div class="row border mt-2">
                    <template>
                        
                        <h3>⚫<i>All Registered Users</i></h3>
                        <hr>
                        <div class="mx-2 mt-2 text-danger text-center fs-4">
                            <p>{{message}}</p>
                        </div>
                        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-5 g-3 px-3 mx-1">

                            <div v-for="(x, index) in Users_Data" :key="index" >

                                <div class="card h-100 col" style="width: 15rem; background-color: rgba(248, 255, 249,1)">

                                    <img src="../static/Pictures/User_Profile_Pic.avif" class="card-img-top" alt="...">
                                    <div class="card-body">
                                        <h3 class="card-title"><u><i>{{ x.Name }}</i></u></h3>
                                        <p class="card-text"><b>Roll No:</b> {{ x.Roll_No }}</p>
                                        <p class="card-text"><b>Level:</b> {{ x.Level }}</p>
                                        <p class="card-text"><b>CGPA:</b> {{ x.CGPA }}</p>
                                    </div>

                                </div>

                            </div>

                        </div>
                    </template>
                </div>
            </div>
        `, 
    methods:{
        All_Users(){

            fetch("/api/all_users",{
                method: "GET",      // Method type
                headers: {
                    "Content-Type": "application/json",       //Telling the backend to treat the data provided as JSON type 
                }
            })
                .then(response => response.json())
                .then(data => {
                    this.Users_Data = data                    
                })

        },

        Add(){
            fetch("/api/add/new_user",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",       //Telling the backend to treat the data provided as JSON type 
            },
            body:
                JSON.stringify(this.formData)
            })
            .then(response => {
                this.status_code = response.status
                return response.json()})
            .then(data => {
                if(this.status_code >= 400){
                    const modalEl = document.getElementById('exampleModal');    // Get the modal element
                    
                    const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);   // Get or create the Bootstrap modal instance
                    
                    modal.hide();
                    this.message = `(${data.message})`
                }
                else{
                    this.message = ""
                    const modalEl = document.getElementById('exampleModal');    // Get the modal element
                    
                    const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);   // Get or create the Bootstrap modal instance
                    
                    modal.hide();     // Hide/close the modal after booking           
                    window.location.reload();                             

                }
            })  
        }
    }  
    
} 

