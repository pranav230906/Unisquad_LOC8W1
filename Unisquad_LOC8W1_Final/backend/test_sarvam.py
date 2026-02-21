import httpx
import asyncio

async def test():
    try:
        r = await httpx.AsyncClient().post(
            'https://api.sarvam.ai/speech-to-text-translate',
            headers={'api-subscription-key': 'sk_9u34s8kg_Tq0mHJVyyyzOq0vuVwK7dk8J'},
            files={'file': ('a.webm', b'empty data', 'audio/webm')},
            data={'prompt': '', 'model': 'saaras:v1'}
        )
        print("Status code:", r.status_code)
        print("Response text:", r.text)
    except Exception as e:
        print("Error:", e)

asyncio.run(test())
