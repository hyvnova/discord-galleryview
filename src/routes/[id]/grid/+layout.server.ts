import type {LayoutServerLoad } from "../$types";

export const load: LayoutServerLoad = async ( { parent }) => {
  // @ts-ignore
  const { images_data } = await parent(); 
    return { images_data };
};