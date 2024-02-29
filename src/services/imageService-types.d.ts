interface IImageService {
	getThumbnail(item: any): string;
	getImage(item: any): string;
	getDefaultImage(name: string, scope?: string): string;
}
