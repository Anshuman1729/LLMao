import asyncio
import os
from typing import Optional

SARVAM_API_KEY: Optional[str] = os.getenv("SARVAM_API_KEY")

# TTS response cache: hash(text) → audio bytes
_tts_cache: dict[int, bytes] = {}


async def text_to_speech(text: str) -> bytes:
    cache_key = hash(text)
    if cache_key in _tts_cache:
        return _tts_cache[cache_key]

    audio_bytes = await asyncio.to_thread(_sync_tts, text)
    _tts_cache[cache_key] = audio_bytes
    return audio_bytes


def _sync_tts(text: str) -> bytes:
    if not SARVAM_API_KEY:
        # Return a silent WAV (44 bytes header, no audio data) for dev without key
        return _silent_wav()

    try:
        from sarvamai import SarvamAI
        from sarvamai.play import save
        import io

        client = SarvamAI(api_subscription_key=SARVAM_API_KEY)
        audio = client.text_to_speech.convert(
            target_language_code="en-IN",
            text=text,
            model="bulbul:v3",
            speaker="ritu",
        )
        # sarvamai.play.save writes to a file path; capture bytes via BytesIO workaround
        buf = io.BytesIO()
        save(audio, buf)
        buf.seek(0)
        return buf.read()
    except Exception:
        return _silent_wav()


def _silent_wav() -> bytes:
    """Minimal valid WAV file with no audio — used as fallback."""
    import struct
    num_samples = 8000  # 0.5s of silence at 16kHz
    data_size = num_samples * 2  # 16-bit samples
    header = struct.pack(
        "<4sI4s4sIHHIIHH4sI",
        b"RIFF", 36 + data_size, b"WAVE",
        b"fmt ", 16, 1, 1, 16000, 32000, 2, 16,
        b"data", data_size,
    )
    return header + b"\x00" * data_size
