
const itemsArray = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : []

var checkedArray = localStorage.getItem("check") ? JSON.parse(localStorage.getItem("check")) : []

const addbtn = document.querySelector("#userinput img");

checkedArray.sort(function(a, b){return a-b});

addbtn.addEventListener("click", ()=>{
    const inputBox = document.querySelector("#userinput input");
    addTask(inputBox);
});

function addTask(inputBox){
    if (inputBox.value === ''){
        alert("You must write something!");
    }
    else{
        console.log(inputBox.value);
        itemsArray.push(inputBox.value);
        localStorage.setItem("tasks", JSON.stringify(itemsArray));
        location.reload();
    }
}

function showTask(checkedArray){
    let items = "";
    for (let i=0; i<itemsArray.length; i++){
        if (checkedArray.includes(i)){
            items += `<li class="task done"><button class="remove"><img src="images/cancel.png" alt=""></button><img src="images/correct.png">${itemsArray[i]}</li>`;
        }
        else{
            items += `<li class="task"><button class="remove"><img src="images/cancel.png" alt=""></button><img src="images/neutral.png">${itemsArray[i]}</li>`;
        }
        
    }
    document.querySelector("ul").innerHTML = items;
    activateDoneListeners();
    activateDeleteListeners();
}

function activateDeleteListeners(){
    let rmvBtn = document.querySelectorAll(".remove");
    rmvBtn.forEach((rb, i) => {
        rb.addEventListener("click", (e)=>{
            e.stopPropagation();
            deleteTask(i);
        })

        rb.addEventListener("mouseover", () => {
            document.querySelectorAll(".task")[i].classList.add("cancel");
        })
    
        rb.addEventListener("mouseout", () => {
            document.querySelectorAll(".task")[i].classList.remove("cancel");
        })
    });
}

function activateDoneListeners(){
    for(let i = 0; i<itemsArray.length; i++){
        document.querySelectorAll(".task")[i].addEventListener("click", ()=>{
            if (checkedArray.includes(i)){
                index = checkedArray.indexOf(i);
                checkedArray.splice(index, 1);
                localStorage.setItem("check", JSON.stringify(checkedArray));
                location.reload(); 
            }
            else{
                checkedArray.push(i);
                localStorage.setItem("check", JSON.stringify(checkedArray));
                location.reload();
            }
            
        })
    }
}

function deleteTask(i){

    if (checkedArray.includes(i)){
        index = checkedArray.indexOf(i);
        checkedArray.splice(index, 1);
    }

    for (let j = 0; j<checkedArray.length; j++){
        if (checkedArray[j]>i){
            checkedArray[j] -= 1;
        }
    }
    localStorage.setItem("check", JSON.stringify(checkedArray));


    itemsArray.splice(i, 1);
    localStorage.setItem("tasks", JSON.stringify(itemsArray));
    location.reload();
}

window.onload = function(){
    showTask(checkedArray);
}
