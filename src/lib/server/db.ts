import { readFile, writeFile } from 'fs/promises'; // Import the required file system module

type DBObject = {
    [channel_id: string]: {
        channel_name: string;
        images: string[]; // array of image ids = <image_id>/<image_name>
    };
};


const get_db = async () => {
    const rawData = await readFile('./src/lib/server/db.json', 'utf8');
    // Parse the JSON data
    const parsedData:DBObject = JSON.parse(rawData);
    
    return parsedData;
}

const write_db = async (db: DBObject) => {
    await writeFile('./src/lib/server/db.json', JSON.stringify(db, null, 2));
}

export { get_db, write_db };