from sqlalchemy import Column, Integer, String, Boolean, Date, DateTime, ForeignKey, DECIMAL, text
from sqlalchemy.orm import relationship, Mapped, mapped_column
from typing import List
from .database import Base

class Dokter(Base):
    """
    Model SQLAlchemy untuk tabel Dokter.
    """
    __tablename__ = "Dokter"
    id_dokter: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    nama: Mapped[str] = mapped_column(String(255), nullable=False)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(255), nullable=False)
    rumah_sakit: Mapped[str | None] = mapped_column(String(255))
    
    pemeriksaan: Mapped[List["Pemeriksaan"]] = relationship(back_populates="dokter")

class Pasien(Base):
    """
    Model SQLAlchemy untuk tabel Pasien.
    """
    __tablename__ = "Pasien"
    id_pasien: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    nik: Mapped[str] = mapped_column(String(20), unique=True, nullable=False)
    nama: Mapped[str] = mapped_column(String(255), nullable=False)
    tanggal_lahir: Mapped[Date | None] = mapped_column(Date)
    jenis_kelamin: Mapped[str | None] = mapped_column(String(20))
    alamat: Mapped[str | None] = mapped_column(String(255))
    riwayat_tb: Mapped[bool | None] = mapped_column(Boolean)
    riwayat_tb_paru: Mapped[bool | None] = mapped_column(Boolean)
    riwayat_tb_ekstrapulmonal: Mapped[bool | None] = mapped_column(Boolean)
    riwayat_tb_tidak_diketahui: Mapped[bool | None] = mapped_column(Boolean)

    pemeriksaan: Mapped[List["Pemeriksaan"]] = relationship(back_populates="pasien")

class Pemeriksaan(Base):
    """
    Model SQLAlchemy untuk tabel Pemeriksaan.
    Ini adalah tabel relasi utama antara Pasien dan Dokter.
    """
    __tablename__ = "Pemeriksaan"
    
    id_pemeriksaan: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    id_pasien: Mapped[int] = mapped_column(ForeignKey("Pasien.id_pasien"))
    id_dokter: Mapped[int] = mapped_column(ForeignKey("Dokter.id_dokter"))
    tanggal_pemeriksaan: Mapped[DateTime] = mapped_column(DateTime, nullable=False)

    # Data fisik
    tinggi_badan: Mapped[float | None] = mapped_column(DECIMAL(5, 2))
    berat_badan: Mapped[float | None] = mapped_column(DECIMAL(5, 2))
    detak_jantung: Mapped[int | None] = mapped_column(Integer)
    suhu_tubuh: Mapped[float | None] = mapped_column(DECIMAL(5, 2))

    # Gejala yang dilaporkan
    durasi_batuk: Mapped[int | None] = mapped_column(Integer)
    hemoptisis: Mapped[bool | None] = mapped_column(Boolean)
    penurunan_berat_badan: Mapped[bool | None] = mapped_column(Boolean)
    demam: Mapped[bool | None] = mapped_column(Boolean)
    keringat_malam: Mapped[bool | None] = mapped_column(Boolean)

    # Riwayat gaya hidup
    merokok_7_hari_terakhir: Mapped[bool | None] = mapped_column(Boolean)

    # Diagnosis
    diagnosis_dokter: Mapped[str | None] = mapped_column(String(50))
    diagnosis_ml_final: Mapped[str | None] = mapped_column(String(50))

    pasien: Mapped["Pasien"] = relationship(back_populates="pemeriksaan")
    dokter: Mapped["Dokter"] = relationship(back_populates="pemeriksaan")
    audio: Mapped[List["Audio"]] = relationship(back_populates="pemeriksaan")


class Audio(Base):
    """
    Model SQLAlchemy untuk tabel Audio.
    Menyimpan metadata audio.
    'url_file' menyimpan link ke file audio di Cloud Storage.
    """
    __tablename__ = "Audio"

    id_audio: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    id_pemeriksaan: Mapped[int] = mapped_column(ForeignKey("Pemeriksaan.id_pemeriksaan"), nullable=False)
    nama_file: Mapped[str] = mapped_column(String(255), nullable=False)
    url_file: Mapped[str] = mapped_column(String(255), nullable=False)
    diagnosis_ml_per_audio: Mapped[str | None] = mapped_column(String(50))
    waktu_unggah: Mapped[DateTime] = mapped_column(DateTime, nullable=False)

    pemeriksaan: Mapped["Pemeriksaan"] = relationship(back_populates="audio")