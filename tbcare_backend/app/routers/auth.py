from fastapi import APIRouter, Depends, HTTPException
from app.services.firebase import verify_token

router = APIRouter()

@router.post("/verify")
def verify_user(token: str):
    try:
        user_data = verify_token(token)
        return {"status": "ok", "user": user_data}
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")
