export interface MarvelApiResponse {
    data: {
        results: {
            name: string;
            thumbnail: {
                path: string;
                extension: string;
            }
        }
    }
}