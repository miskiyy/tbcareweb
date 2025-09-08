from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app import models
from app.schemas.pasien import PasienCreate, PasienOut

router = APIRouter()

@router.post("/", response_model=PasienOut)
def create_pasien(pasien: PasienCreate, db: Session = Depends(get_db)):
    db_pasien = db.query(models.Pasien).filter(models.Pasien.nik == pasien.nik).first()
    if db_pasien:
        raise HTTPException(status_code=400, detail="NIK sudah terdaftar")

    new_pasien = models.Pasien(**pasien.dict())
    db.add(new_pasien)
    db.commit()
    db.refresh(new_pasien)
    return new_pasien

@router.get("/", response_model=list[PasienOut])
def get_all_pasien(db: Session = Depends(get_db)):
    return db.query(models.Pasien).all()
