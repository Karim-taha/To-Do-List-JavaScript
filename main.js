let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

// Empty array to store the tasks : 
let arrOfTasks = [];

// check if there are any tasks in local storage : 
if(localStorage.getItem("tasks")){
    arrOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

// Trigger Get data from local storage function :  
getDataFromLocalStorage();

// Add Task : 
submit.onclick = function (){
    if(input.value !== ""){
        addTaskToArray(input.value);  // Add Task to array of tasks.
        input.value = "";   // Empty input field.
    }
}

// click on task element (update & delete) : 
tasksDiv.addEventListener("click", (e)=>{
    // Delete Button : 
    if(e.target.classList.contains("del")){
        // remove element from local storage : 
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
        // remove element from page : 
        e.target.parentElement.remove();
    }
        // Task element : 
        if(e.target.classList.contains("task")){
            // Toggle completed for the task : 
            toggleStatusTaskWith(e.target.getAttribute("data-id"));
            // Toggle done class :
            e.target.classList.toggle("done");
        }
        
    

});



function addTaskToArray(taskText){
    // Task data : 
    const task = {
        id        : Date.now(),
        title     : taskText,
        completed : false
    };

    // Push Task to the array of tasks : 
    arrOfTasks.push(task);

    // Add tasks to page : 
    addElementsToPageFrom(arrOfTasks);

    // Add tasks to local sstorage : 
    addDataToLocalStorageFrom(arrOfTasks);

}

function addElementsToPageFrom(arrOfTasks){
    // Empty Tasks div : 
    tasksDiv.innerHTML = "";
    // Looping on arrOfTasks : 
    arrOfTasks.forEach(task => {
        // create main div : 
        let div = document.createElement("div");
        div.className = "task";
        // check if task is done : 
        if(task.completed){
            div.className = "task done";
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));
        // create button for Delete Task : 
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));
        // Append Delete button to main div : 
        div.appendChild(span);
        // Show task div to page : 
        tasksDiv.appendChild(div);
    });
}

function addDataToLocalStorageFrom(arrOfTasks){
    window.localStorage.setItem("tasks", JSON.stringify(arrOfTasks));
}

function getDataFromLocalStorage(){
    let data = window.localStorage.getItem("tasks");
    if(data){
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks);
    }
}

function deleteTaskWith(taskId){
    // for explain only :
    // for(let i =0; i < arrOfTasks.length; i++){
    //     console.log(`${arrOfTasks[i].id} === ${taskId}`);
    // }
    arrOfTasks = arrOfTasks.filter((task) => task.id != taskId);
    addDataToLocalStorageFrom(arrOfTasks);
}

function toggleStatusTaskWith(taskId){
    for(let i =0; i < arrOfTasks.length; i++){
        if(arrOfTasks[i].id == taskId){
            arrOfTasks[i].completed == false ? (arrOfTasks[i].completed = true) : (arrOfTasks[i].completed = false);
        }
    }
    addDataToLocalStorageFrom(arrOfTasks);
}





