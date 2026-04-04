from fastapi import FastAPI

class Item:
    def __init__(self,name,price):
         self.name : str = name 
         self.price : float = price 
    
Items = [Item("A",5),Item("B",8)]


app = FastAPI()
@app.get("/")
def read_root():
	return {"message": "Hello World"}


@app.get("/items/")
def read_items():
     return Items

@app.get("/add/{name}/{price}")
def add_item(name: str,price: float):
    Items.append(Item(name,price))
    return Item(name,price)



