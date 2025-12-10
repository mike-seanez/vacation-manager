import { BlogAPIDataSource } from "data/DataSources/Blog/BlogAPIDataSource";
import { BlogDTO, CreateBlog } from "data/DTOs/BlogDTO";
import { useState } from "react";

export const useBlog = () => {
    const [errorBlog, setErrorBlog] = useState(null);
    const [loadingBlog, setLoadingBlog] = useState(false);

    const getBlogs = async () => {
        setLoadingBlog(true);
        try {
            const response = await new BlogAPIDataSource().getBlogs();
            setLoadingBlog(false);
            return response;
        } catch (error) {
            setLoadingBlog(false);
            setErrorBlog(error);
        }
    }

    const createBlog = async (blog: CreateBlog) => {
        setLoadingBlog(true);
        try {
            const response = await new BlogAPIDataSource().createBlog(blog);
            setLoadingBlog(false);
            return response;
        } catch (error) {
            setLoadingBlog(false);
            setErrorBlog(error);
        }
    }

    const deleteBlog = async (blogId: number) => {
        setLoadingBlog(true);
        try {
            await new BlogAPIDataSource().deleteBlog(blogId);
            setLoadingBlog(false);
        } catch (error) {
            setLoadingBlog(false);
            setErrorBlog(error);
        }
    }

    const updateBlogEntry = async (blogId: number, blog: BlogDTO) => {
        setLoadingBlog(true);
        try {
            const response = await new BlogAPIDataSource().updateBlogEntry(blogId, blog);
            setLoadingBlog(false);
            return response;
        } catch (error) {
            setLoadingBlog(false);
            setErrorBlog(error);
        }
    }

    const getBlogEntryById = async (blogId: number) => {
        setLoadingBlog(true);
        try {
            const response = await new BlogAPIDataSource().getBlogEntryById(blogId);
            setLoadingBlog(false);
            return response;
        } catch (error) {
            setLoadingBlog(false);
            setErrorBlog(error);
        }
    }

    return {
        getBlogs,
        createBlog,
        deleteBlog,
        updateBlogEntry,
        getBlogEntryById,
        errorBlog,
        loadingBlog,
    }
}
