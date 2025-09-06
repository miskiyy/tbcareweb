from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from app.database import Base

class Audio(Base):
    __tablename__ = "audio"

    id_audio = Column(Integer, primary_key=True, index=True, autoincrement=True)
    id_pemeriksaan = Column(Integer, ForeignKey("pemeriksaan.id_pemeriksaan"))
    nama_file = Column(String(255), nullable=False)
    url_file = Column(String(255), nullable=False)
    diagnosis_ml_per_audio = Column(String(50))
    waktu_unggah = Column(DateTime, nullable=False)