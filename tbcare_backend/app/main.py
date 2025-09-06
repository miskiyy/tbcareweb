# app/main.py
from fastapi import FastAPI
from . import models
from .database import engine

app = FastAPI()

# create tables
models.Base.metadata.create_all(bind=engine)

@app.get("/")
def root():
    return {"message": "TBcare API is running!"}
