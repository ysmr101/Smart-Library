from fastapi import APIRouter
app = APIRouter()
@app.post("/users/register", tags=["user"])
async def register():
    return {"message": "Hello Wasdasdasdasdasdorld"}

