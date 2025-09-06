from sqlalchemy import Column, Integer, String
from app.database import Base

class Dokter(Base):
    __tablename__ = "dokter"

    id_dokter = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nama = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    rumah_sakit = Column(String(255), nullable=True)
