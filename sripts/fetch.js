// API to obtain data 
const api = 'https://reqres.in/api/users?delay=2'

function btn() {
    const container = document.getElementById("contBtn")
    container.innerHTML =
        `<div class="row my-4 justify-content-evenly mx-auto">
            <div class="col-md-3">
                <button class="btn btn-info form-control col-md-4" id="btnUser" onclick="readUser()">Obtener usuarios</button>
            </div>
        </div>`
}

// Spiner function to change the button and show that data is being loading 
function spiner() {
    const container = document.getElementById("contBtn");
    //const user = JSON.parse(localStorage.getItem("users"));
    //user && user.time > Date.now() ?
        //btn():
        container.innerHTML =
            `<div class="row my-4 justify-content-evenly mx-auto">
                <div class="col-md-3">
                    <button class="btn btn-info form-control -md-4" type="button" disabled>
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Cargando...
                </div>
            </div>`
        //setTimeout(() => btn(), 2300);
}

// Reading data function to read either from local data or API 
function readUser() {
    const user = JSON.parse(localStorage.getItem("userData"));
    user && user.time > Date.now() ?
        displayUsers(user.usersData) :
        fetchRequest();
}

// Fetch function to obtain data from API 
function fetchRequest() {
    spiner();
    fetch(api)
        .then(response => response.json())
        .then(users => {
            usersToLocalStorage(users.data);
            displayUsers(users.data);
        })
        .catch(error => {
            console.log(error);
        })
        .finally( ()=>{
            btn(); // Aparece el botón
        });
        
    //setTimeout(() => btn(), 2400);
}

// Saving data function to save data to local storage 
function usersToLocalStorage(data) {
    const users = {
        usersData: [...data],
        time: Date.now() + 60000  //Obtain local time and add 1 min.
    }
    localStorage.setItem("userData", JSON.stringify(users)); //To convert object to JSON: JSON.stringify(object)
}

// display constant to display each user
const displayUser = ({ avatar, id, email, first_name, last_name }) => {
    return `<div class="container overflow-hidden text-center my-3">
                <div class="row">
                    <div class="col md-3 "></div>
                    <div class="col-sm-7 bg-light p-3 border">
                        <div class="row">
                            <div class="col-md-4 my-2">
                                <img src="${avatar}" class="rounded-2 mx-auto" style="width: 140px"></img>
                            </div>
                            <div class="col ms-md-auto">
                                <div class="row-md-1">
                                    <p class="text-center">Id: ${id}</p>
                                </div>
                                <div class="row-md-4">
                                    <p class="text-center">Email: ${email}</p>
                                </div>
                                <div class="row-md-3">
                                    <p class="text-center">First Name: ${first_name}</p>
                                </div>
                                <div class="row-md-3">
                                    <p class="text-center">Last Name: ${last_name}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col md-3 "></div>
                </div>
            </div>`
}

// Display function to print all users info 
function displayUsers(data) {
    const container = document.getElementById("contUser")
    data.forEach(user => container.innerHTML += displayUser(user));
}