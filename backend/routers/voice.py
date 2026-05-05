from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import io

from services.sarvam import text_to_speech

router = APIRouter()


class TTSRequest(BaseModel):
    text: str


@router.post("/api/voice/tts")
async def tts_endpoint(req: TTSRequest):
    audio_bytes = await text_to_speech(req.text)
    return StreamingResponse(
        io.BytesIO(audio_bytes),
        media_type="audio/wav",
        headers={"Cache-Control": "no-store"},
    )
