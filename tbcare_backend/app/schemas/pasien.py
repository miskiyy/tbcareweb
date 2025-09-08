from pydantic import BaseModel
from datetime import date

class PasienBase(BaseModel):
    nik: str
    nama: str
    tanggal_lahir: date
    jenis_kelamin: str
    alamat: str
    riwayat_tb: bool
    riwayat_tb_paru: bool
    riwayat_tb_ekstrapulmonal: bool
    riwayat_tb_tidak_diketahui: bool

class PasienCreate(PasienBase):
    pass

class PasienOut(PasienBase):
    class Config:
        orm_mode = True