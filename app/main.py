from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

class Item(BaseModel):
    name: str
    price: float
   
    
Items = [Item(name="Kiwi", price=5), Item(name="Mango", price=8)]



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
    Items.append(item)
    return item




