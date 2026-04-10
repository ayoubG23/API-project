from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

class Item(BaseModel):
    name: str
    price: float
    id:int
   
    
Items = [Item(name="Kiwi", price=5,id=1 ), Item(name="Mango", price=8,id=2 )]



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # Allow all origins for development 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def read_root():
	return {"message": "Hello World"}


@app.get("/items/")
def read_items():
     return Items

@app.post("/items/")
def add_item(item: Item):
    newItem = Item(name=item.name, price=item.price, id=len(Items)+1)
    Items.append(newItem)
    return newItem

@app.put("/items/")
def change_item(item : Item):
     for i in Items :
          if i.id == item.id :
               i.price=item.price 
               i.name=item.name 
               return i
     return {"message": "item not found"}
     




