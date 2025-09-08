# app/database.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os

# Railway kasih DATABASE_URL di env var
DATABASE_URL = os.getenv("DATABASE_URL", "mysql://root:OWAKGUUYHmmwmmdPUqRTckQDTrbsjYGs@mysql.railway.internal:3306/railway")
DATABASE_URL = os.getenv("DATABASE_URL", "mysql+pymysql://root:Smiski77!@localhost/tbcare")

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependency untuk ambil session di endpoint
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
