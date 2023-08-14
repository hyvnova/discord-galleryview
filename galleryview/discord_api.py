from random import randint
from typing import List, TypedDict
import requests, time


class Ok(TypedDict):
    images: List[str]
    channel_name: str


class Error(TypedDict):
    message: str


def get_channel(authorization: str, channel_id: str, amount: int = 100) -> Ok | Error:
    # headers for API requests
    HEADERS = {
        "Authorization": authorization,
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
        "Accept": "application/json",
    }

    images: List[str] = []

    # Getting channel name
    response = requests.get(
        f"https://discord.com/api/v9/channels/{channel_id}",
        headers=HEADERS,
    )

    if response.status_code != 200:
        return {"message": f"Error retrieving channel name: {response.text}"}

    data = response.json()
    channel_name: str = data["name"]

    # Getting images
    last_id = None
    while True:
        params = {"limit": 100}

        if last_id:
            params["before"] = last_id

        response = requests.get(
            f"https://discord.com/api/v9/channels/{channel_id}/messages",
            headers=HEADERS,
            params=params,
        )

        if response.status_code != 200:
            print(f"Error retrieving messages: {response.text}")
            return None

        data = response.json()

        for message in filter(lambda m: m.get("attachments"), data):
            for attachment in message["attachments"]:
                url = attachment["url"].removeprefix(
                    f"https://cdn.discordapp.com/attachments/{channel_id}/"
                )

                images.append(url)

                if len(images) >= amount:
                    break

            if len(images) >= amount:
                break

        print(f"Images retrieved: {len(images)}/{amount}        ", end="\r")

        if len(data) < 100:
            break

        last_id = data[-1]["id"]
        time.sleep(randint(15, 30) / 100)

    return {"images": images, "channel_name": channel_name}
