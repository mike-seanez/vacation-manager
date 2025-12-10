import { BlogAPIDataSource } from "../DataSources/Blog/BlogAPIDataSource";
import { CreateBlog } from "../DTOs/BlogDTO";

class BlogRepositoryImpl {
    datasource: BlogAPIDataSource;

    constructor() {
        this.datasource = new BlogAPIDataSource();
    }

    async getBlogs(): Promise<any> {
        try {
            const response = await this.datasource.getBlogs();
            return response;
        } catch (error) {
            throw new Error('Get Blogs failed');
        }
    }

    async createBlog(Blog: CreateBlog): Promise<any> {
        try {
            const response = await this.datasource.createBlog(Blog);
            return response;
        } catch (error) {
            throw new Error('Create Blog failed');
        }
    }

    async deleteBlog(blogId: number): Promise<void> {
        try {
            await this.datasource.deleteBlog(blogId);
        } catch (error) {
            throw new Error('Delete Blog failed');
        }
    }

    async updateBlogEntry(blogId: number, newName: string): Promise<void> {
        try {
            await this.datasource.updateBlogEntry(blogId, newName);
        } catch (error) {
            throw new Error('Update Blog Entry failed');
        }
    }

    async getBlogEntryById(blogId: number): Promise<any> {
        try {
            const response = await this.datasource.getBlogEntryById(blogId);
            return response;
        } catch (error) {
            throw new Error('Get Blog Entry By Id failed');
        }
    }

}

export default new BlogRepositoryImpl();
