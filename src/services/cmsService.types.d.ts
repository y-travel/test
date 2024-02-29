// interface ICms Service

interface ICmsService {
	getPosts(postName: string, query?: string): Promise<any>;
	getPage(SectionData: string, query?: string): Promise<any>;
}
