export function get(url: string): Promise<HttpResponse> {
	throw new Error("Not implemented");
}

export interface HttpResponse {
	statusCode: number;
	headers: string;
	content: string;
}