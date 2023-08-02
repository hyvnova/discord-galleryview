"""
This bot's porpuse is to act as a "link" between a discord channel and the web app.
Objetive is to allow users "create" a gallery view of all the media in a channel, to do the bot requests the app to create a galler while the media is lazy uploaded to the app.
"""

from typing import Tuple, List
import discord, os, requests
from dotenv import load_dotenv

load_dotenv()  # load all the variables from the env file
bot = discord.Bot()

API_URL = "http://192.168.1.151:5000/"


@bot.event
async def on_ready():
    print(f"{bot.user} is ready and online!")


# test command
@bot.slash_command(name="hello", description="Say hello to the bot")
async def hello(ctx):
    await ctx.respond("Hey!")


# create gallery command
@bot.slash_command(
    name="create", description="Create a gallery of all the media in the channel"
)
async def create_gallery(
    ctx: discord.ApplicationContext,
    limit: discord.Option(int, "Limit of messages to get", required=False, default=100),
):
    await ctx.respond("Creating gallery...", ephemeral=True)
    msg = await ctx.send(
        embed=discord.Embed(description="Creating gallery...", color=0x2F3136)
    )

    # get data
    channel_id = ctx.channel_id
    channel_name = ctx.channel.name

    # get images
    images: List[Tuple[str, str]] = []

    async for message in ctx.channel.history(limit=None):
        if not message.attachments:
            continue

        for att in filter(
            lambda a: a.filename.lower().endswith(
                (".png", ".jpg", ".jpeg", ".tiff", ".bmp", ".gif", '.webp' )
            ),
            message.attachments,
        ):
            images.append((att.url, att.filename.split(".")[0]))

            if len(images) >= limit:
                break

    # make request
    response = requests.post(
        API_URL + "api/create_gallery",
        json={
            "channel_id": channel_id,
            "channel_name": channel_name,
            "images": images,
        },
    )

    # check if request was successful
    if response.status_code != 200:
        await msg.edit(
            embed=discord.Embed(description="Error creating gallery.", color=0x2F3136)
        )
        return

    # get gallery url
    gallery_url = response.json()["gallery_url"]

    await msg.edit(
        embed=discord.Embed(
            title="Gallery created",
            description=f"View gallery at `{gallery_url}`",
            url=gallery_url,
            color=0x2F3136,
        )
    )


# get gallery command
@bot.slash_command(
    name="gallery", description="Get the gallery associated with the channel"
)
async def get_gallery(ctx):
    await ctx.respond("Getting gallery...", ephemeral=True)
    msg = await ctx.send(
        embed=discord.Embed(description="Getting gallery...", color=0x2F3136)
    )

    # get data
    channel_id = ctx.channel_id

    # make request
    response = requests.get(API_URL + "gallery/" + channel_id)

    # check if request was successful
    if response.status_code != 200:
        await msg.edit(
            embed=discord.Embed(description="Error getting gallery.", color=0x2F3136)
        )
        return
    elif response.status_code == 404:
        await msg.edit(
            embed=discord.Embed(
                description="Gallery not found. Create one with `/create`",
                color=0x2F3136,
            )
        )
        return

    # get gallery url
    gallery_url = API_URL + "gallery/" + channel_id

    await msg.edit(
        embed=discord.Embed(
            title="Gallery",
            description=f"View gallery at `{gallery_url}`",
            url=gallery_url,
            color=0x2F3136,
        )
    )


bot.run(os.getenv("TOKEN"))  # run the bot with the token
