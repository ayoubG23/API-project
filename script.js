const BASE_URL =
  window.location.hostname === "localhost"// use localhost for development, render.com for production
    ? "http://localhost:8000"
    : "https://api-project-fmr5.onrender.com";

const nameInput=document.getElementById("name");
const priceInput=document.getElementById("price");
let currentEditId = null;

document.getElementById("addButton").addEventListener("click",addItem);
document.getElementById("saveButton").addEventListener("click", () => saveEdit(currentEditId));

window.onload = function() {
    showItems();
}


function showItems(){
    fetch(`${BASE_URL}/items/`)
        .then(res => res.json())
        .then(data => {
            const itemsList = document.getElementById("ItemsList");
            itemsList.innerHTML = "";
            data.forEach(item => {
                itemsList.appendChild(createListItem(item));
            });
        })
        .catch(error => console.error("Error fetching items:", error));
}

function createListItem(item){
    let listItem = document.createElement("li");
    listItem.textContent = `${item.name} : $${item.price}`;
    let editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => editItem(item));
    listItem.appendChild(editButton);
    return listItem;
}

function editItem(item){
    currentEditId = item.id;
    document.getElementById("editName").value = item.name;
    document.getElementById("editPrice").value = item.price;
    document.getElementById("overlay").classList.add("active");
}

function saveEdit(id){
    let name = document.getElementById("editName").value.trim();
    let price = document.getElementById("editPrice").value.trim();
    if(name && price){
        fetch(`${BASE_URL}/items/`,{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({"name":name,"price":parseFloat(price),id})
        }).then(res=>res.json())
        .then(data=>{
            showItems();
            document.getElementById("editName").value ='';
            document.getElementById("editPrice").value ='';
            document.getElementById("overlay").classList.remove("active");
        }).catch(error => console.error("Error editing item :" , error));
    }
}





function addItem(){
    let name = nameInput.value.trim();
    let price =priceInput.value.trim();
    if(name && price){
        fetch(`${BASE_URL}/items/`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({"name":name,"price":parseFloat(price),"id":0})
        }).then(res=>res.json())
        .then(data=>{
            console.log("Item added:",data);
            showItems();
            //clear input fields
            nameInput.value ='';
            priceInput.value ='';
        }).catch(error=>{
            console.error("Error adding item:",error);
        });
    }else{
        alert("Please enter both name and price.")
    }

    


}