const nameInput=document.getElementById("name");
const priceInput=document.getElementById("price");
document.getElementById("addButton").addEventListener("click",addItem);
function addItem(){
    let name = nameInput.value.trim();
    let price =priceInput.value.trim();
    if(name && price){
        let newItem = document.createElement("li");
        newItem.textContent=`${name} :  $${price}`;
        document.getElementById("ItemsList").append(newItem);

        //clear input
        nameInput.value ='';
        priceInput.value ='';
    }else{
        alert("Please enter both name and price.")
    }
}