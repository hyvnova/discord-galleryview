
import axios from 'axios';


const HEADER = {
    headers: {
        'Content-Type': 'application/json'
    }
}

type DBObject = {
    [channel_id: string]: {
        channel_name: string;
        images: string[]; // array of image ids = <image_id>/<image_name>
    };
};


const get_db = async () => {
    const response = await axios.get('https://discordgalleryview.ezsnova.repl.co/db/get');
    const db: DBObject = response.data;
    return db;
}

const write_db = async (db: DBObject) => {
    await axios.post('https://discordgalleryview.ezsnova.repl.co/db/set', db, HEADER);
}

const gallery_exists = async (channel_id: string) => {
    let response = await axios.post('https://discordgalleryview.ezsnova.repl.co/db/gallery_exists', { channel_id }, HEADER);
    return response.data;
}

const add_gallery = async (channel_id: string, channel_data: {
    channel_name: string;
    images: string[];
}) => {
    await axios.post('https://discordgalleryview.ezsnova.repl.co/db/add_gallery', { channel_id, channel_data }, HEADER);
}



export { get_db, write_db, gallery_exists, add_gallery };