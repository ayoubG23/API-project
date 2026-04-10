const nameInput=document.getElementById("name");
const priceInput=document.getElementById("price");

document.getElementById("addButton").addEventListener("click",addItem);


window.onload = function() {
    showItems();
}


function showItems(){
    fetch("http://127.0.0.1:8000/items/")
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
    listItem.setAttribute("id",item.id);
    listItem.textContent = `${item.name} : $${item.price}`;
    let editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => editItem(item.id));
    listItem.appendChild(editButton);
    return listItem;
}


function editItem(id){
    let name = nameInput.value.trim();
    let price =priceInput.value.trim();
    if(name && price){
        fetch("http://127.0.0.1:8000/items/",{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({"name":name,"price":parseFloat(price),id})
        }).then(res=>res.json())
        .then(data=>{
            showItems();
            nameInput.value ='';
            priceInput.value ='';
        }).catch(error => console.error("Error editing item :" , error));
    }
}





function addItem(){
    let name = nameInput.value.trim();
    let price =priceInput.value.trim();
    if(name && price){
        

        
        
        fetch("http://127.0.0.1:8000/items/",{
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