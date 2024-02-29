import { api } from 'boot/axios';
/**
 * we use it cos server base url move to a subfolder and it can help us to be free from changing base path of server
 * @returns
 */
//TODO: clean, create type
const defaultImages: any = {
	hotel: 'hotel.jpg',
	package: 'package.jpg',
	noImage: 'noimage_fa.avif',
};

const getImageBaseUrl = () => api.defaults.baseURL;

const getThumbnail = (item: any) =>
	item?.formats?.thumbnail?.url ? `${getImageBaseUrl()}${item?.formats?.thumbnail?.url}` : Utils.helper.isNilOrEmpty(item) ? undefined : item;

const getImage = (item: any) => (item?.url ? `${getImageBaseUrl()}${item?.url}` : Utils.helper.isNilOrEmpty(item) ? undefined : item);

const getDefaultImage = (name: string, scope = '') => `./${scope}/${defaultImages[name]}`;

export { getThumbnail, getImage, getDefaultImage };
