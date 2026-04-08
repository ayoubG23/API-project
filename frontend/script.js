const nameInput=document.getElementById("name");
const priceInput=document.getElementById("price");
document.getElementById("addButton").addEventListener("click",addItem);
function addItem(){
    let name = nameInput.value.trim();
    let price =priceInput.value.trim();
    if(name && price){
        

        //clear input
        
        fetch("http://127.0.0.1:8000/items/",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({"name":name,"price":parseFloat(price)})
        }).then(res=>res.json())
        .then(data=>{
            console.log("Item added:",data);
            let newItem = document.createElement("li");
            newItem.textContent=`${name} :  $${price}`;
            document.getElementById("ItemsList").append(newItem);
            nameInput.value ='';
            priceInput.value ='';
        }).catch(error=>{
            console.error("Error adding item:",error);
        });
    }else{
        alert("Please enter both name and price.")
    }

}