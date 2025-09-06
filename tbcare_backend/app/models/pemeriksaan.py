from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, DECIMAL, Boolean
from sqlalchemy.orm import relationship
from app.database import Base

class Pemeriksaan(Base):
    __tablename__ = "pemeriksaan"

    id_pemeriksaan = Column(Integer, primary_key=True, index=True, autoincrement=True)
    id_pasien = Column(Integer, ForeignKey("pasien.id_pasien"))
    id_dokter = Column(Integer, ForeignKey("dokter.id_dokter"))
    tanggal_pemeriksaan = Column(DateTime, nullable=False)

    tinggi_badan = Column(DECIMAL(5, 2))
    berat_badan = Column(DECIMAL(5, 2))
    detak_jantung = Column(Integer)
    suhu_tubuh = Column(DECIMAL(5, 2))

    durasi_batuk = Column(Integer)
    hemoptisis = Column(Boolean)
    penurunan_berat_badan = Column(Boolean)
    demam = Column(Boolean)
    keringat_malam = Column(Boolean)
    merokok_7_hari_terakhir = Column(Boolean)

    diagnosis_dokter = Column(String(50))
    diagnosis_ml_final = Column(String(50))
