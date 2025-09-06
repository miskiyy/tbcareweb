from sqlalchemy import Column, Integer, String, Date, Text, Boolean, Enum
from app.database import Base

class Pasien(Base):
    __tablename__ = "pasien"

    id_pasien = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nik = Column(String(20), unique=True, nullable=False)
    nama = Column(String(255), nullable=False)
    tanggal_lahir = Column(Date, nullable=True)
    jenis_kelamin = Column(Enum("Laki-laki", "Perempuan", name="jenis_kelamin"), nullable=True)
    alamat = Column(Text, nullable=True)

    riwayat_tb = Column(Boolean, default=False)
    riwayat_tb_paru = Column(Boolean, default=False)
    riwayat_tb_ekstrapulmonal = Column(Boolean, default=False)
    riwayat_tb_tidak_diketahui = Column(Boolean, default=False)
