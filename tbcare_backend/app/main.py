from fastapi import FastAPI
from app.database import Base, engine
from app.routers import users, pasien

Base.metadata.create_all(bind=engine)

app = FastAPI(title="TB Care API")

app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(pasien.router, prefix="/pasien", tags=["Pasien"])

@app.get("/")
async def root():
    return {"message": "Hello from FastAPI 🚀"}
