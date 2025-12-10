export interface BlogDTO {
    id: number;
    createdAt: string;
    name: string;
    updatedAt: string;
    userId: number;
    countPhotos?: number;
    countVideos?: number;
}


export interface CreateBlog {
    name: string;
    userId: number;
}

export interface BlogByPublication {
    BlogId: number;
    name: string;
    postIsInBlog: boolean;
}