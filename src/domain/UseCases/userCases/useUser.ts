import { useState } from 'react';
import { UserDTO } from '../../../data/DTOs/UserDTO';
import { UserAPIDataSource } from '../../../data/DataSources/User/UserAPIDataSource';

export const useUser = () => {
    const [errorFetchingProfileUsers, setErrorFetchingProfileUsers] = useState<string | null>(null);
    const [loadingFetchProfileUsers, setLoadingFetchProfileUsers] = useState<boolean>(false);

    const getUsers = async (): Promise<UserDTO[]> => {
        setLoadingFetchProfileUsers(true);
        setErrorFetchingProfileUsers(null);
        try {
            const response = await new UserAPIDataSource().getUsers();
            setLoadingFetchProfileUsers(false);
            return response;
        } catch (error) {
            setLoadingFetchProfileUsers(false);
            setErrorFetchingProfileUsers(error.message);
            throw error;
        }
    }

    const getUser = async (userId: number): Promise<UserDTO> => {
        setLoadingFetchProfileUsers(true);
        setErrorFetchingProfileUsers(null);
        try {
            const response = await new UserAPIDataSource().getUser(userId);
            setLoadingFetchProfileUsers(false);
            return response;
        } catch (error) {
            setLoadingFetchProfileUsers(false);
            setErrorFetchingProfileUsers(error.message);
            throw error;
        }
    }

    const updateUser = async (user: UserDTO): Promise<void> => {
        setLoadingFetchProfileUsers(true);
        setErrorFetchingProfileUsers(null);
        try {
            await new UserAPIDataSource().updateUser(user);
            setLoadingFetchProfileUsers(false);
        } catch (error) {
            setLoadingFetchProfileUsers(false);
            setErrorFetchingProfileUsers(error.message);
            throw error;
        }
    }

    const deleteUser = async (userId: number): Promise<void> => {
        setLoadingFetchProfileUsers(true);
        setErrorFetchingProfileUsers(null);
        try {
            await new UserAPIDataSource().deleteUser(userId);
            setLoadingFetchProfileUsers(false);
        } catch (error) {
            setLoadingFetchProfileUsers(false);
            setErrorFetchingProfileUsers(error.message);
            throw error;
        }
    }

    const createUser = async (user: UserDTO): Promise<UserDTO> => {
        setLoadingFetchProfileUsers(true);
        setErrorFetchingProfileUsers(null);
        try {
            const response = await new UserAPIDataSource().createUser(user);
            setLoadingFetchProfileUsers(false);
            return response;
        } catch (error) {
            setLoadingFetchProfileUsers(false);
            setErrorFetchingProfileUsers(error.message);
            throw error;
        }
    }

    const newUsersThisMonth = async (): Promise<number> => {
        setLoadingFetchProfileUsers(true);
        setErrorFetchingProfileUsers(null);
        try {
            const response = await new UserAPIDataSource().getNewUsersThisMonth();
            setLoadingFetchProfileUsers(false);
            return response;
        } catch (error) {
            setLoadingFetchProfileUsers(false);
            setErrorFetchingProfileUsers(error.message);
            throw error;
        }
    }

    return {
        getUsers,
        getUser,
        updateUser,
        deleteUser,
        createUser,
        newUsersThisMonth,
    }; 
};