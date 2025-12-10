import { Http } from '../../../services/http';
import { BlogByPublication, BlogDTO, CreateBlog } from '../../DTOs/BlogDTO';

export class BlogAPIDataSource {

    async getBlogs(): Promise<BlogDTO[]> {
        const endpoint = `/blog/all`;

        try {
            const response = await Http.get<BlogDTO[]>(endpoint);            
            return response.data;

        } catch (error) {
            throw new Error('getBlogs failed');
        }
    }

    async createBlog(params: CreateBlog): Promise<BlogDTO> {
        const endpoint = `/blog/create`;
        try {
            const response = await Http.post<BlogDTO>(endpoint, { ...params });
            return response.data;
        } catch (error) {
            throw new Error('createBlog failed');
        }
    }

    async deleteBlog(blogId: number): Promise<void> {
        const endpoint = `/blog/delete/${blogId}`;
        try {
            await Http.delete(endpoint);
        } catch (error) {
            throw new Error('deleteBlog failed');
        }
    }

    async updateBlogEntry(blogId: number, blog: BlogDTO): Promise<void> {
        const endpoint = `/blog/update/${blogId}`;
        try {
            await Http.put(endpoint, { ...blog });
        } catch (error) {
            throw new Error('updateBlogEntry failed');
        }
    }

    async getBlogEntryById(blogId: number): Promise<BlogByPublication[]> {
        const endpoint = `/blog/${blogId}`;
        try {
            const response = await Http.get<BlogByPublication[]>(endpoint);
            return response.data;
        } catch (error) {
            throw new Error('getBlogEntryById failed');
        }
    }

}