import type { LayoutServerLoad } from './$types';
import {get_db} from '$lib/server/db';

export const load: LayoutServerLoad = async ({ params }) => {
    let channel_id = params.id;

    let images_data: {
        url: string;
        name: string;
    }[] = [];

    // load raw image data from database at: src/lib/server/db.json
    try {
        const db = await get_db();

        let channel_data: {
            channel_name: string;
            images: string[]; // array of image ids = <image_id>/<image_name>
        } = db[channel_id];


        // convert image ids to discord urls
        let preffix = `https://cdn.discordapp.com/attachments/${channel_id}/`;

        for (let image of channel_data.images) {
            let [image_id, image_name] = image.split('/');
            images_data.push({
                url: preffix + image_id + '/' + image_name,
                name: image_name,
            });
        }

        return {
            images_data: images_data,
            channel_name: channel_data.channel_name,
        };

    } catch (error) {
        console.error('Error reading or fetching DB:', error);
        return {
            images_data: [],
            channel_name: 'An error occured',
        };
    }

};