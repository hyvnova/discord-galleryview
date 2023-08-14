import axios from 'axios';

async function get_channel(authorization: string, channel_id: string, amount: number = 100) {
    const HEADERS = {
        Authorization: authorization,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
        Accept: 'application/json',
    };

    const images: string[] = [];

    try {
        const channelResponse = await axios.get(`https://discord.com/api/v9/channels/${channel_id}`, {
            headers: HEADERS,
        });


        const channelData = channelResponse.data;
        const channel_name: string = channelData.name;

        let last_id: string | null = null;
        while (true) {
            const params: {
                limit: number;
                before?: string;
            } = { limit: 100 };

            if (last_id) {
                params['before'] = last_id;
            }

            const messagesResponse = await axios.get(`https://discord.com/api/v9/channels/${channel_id}/messages`, {
                headers: HEADERS,
                params: params,
            });


            const messagesData = messagesResponse.data;

            for (const message of messagesData.filter((m: any) => m.attachments)) {
                for (const attachment of message.attachments) {
                    const url = attachment.url.replace(`https://cdn.discordapp.com/attachments/${channel_id}/`, '');

                    images.push(url);

                    if (images.length >= amount) {
                        break;
                    }
                }

                if (images.length >= amount) {
                    break;
                }
            }

            if (messagesData.length < 100) {
                break;
            }

            last_id = messagesData[messagesData.length - 1].id;
            await new Promise((resolve) => setTimeout(resolve, Math.floor(Math.random() * (30 - 15 + 1)) + 15));
        }

        return { images, channel_name };
    } catch (error) {
        // @ts-ignore
        return { error: error.message };
    }
}

export default get_channel;