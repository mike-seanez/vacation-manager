import { UserAPIDataSource } from '../DataSources/User/UserAPIDataSource';
import { UserDTO } from '../DTOs/UserDTO';

class UserRepositoryImpl {
    datasource: UserAPIDataSource;

    constructor() {
        this.datasource = new UserAPIDataSource();
    }

    async getUsers(): Promise<UserDTO[]> {
        try {
            const response = await this.datasource.getUsers();
            return response;
        } catch (error) {
            throw new Error('Get Users failed');
        }
    }
        
    async getUser(userId: number): Promise<UserDTO> {
        try {
            const response = await this.datasource.getUser(userId);
            return response;
        } catch (error) {
            throw new Error('Get User failed');
        }
    }
        
    async updateUser(user: UserDTO): Promise<void> {
        try {
            await this.datasource.updateUser(user);
        } catch (error) {
            throw new Error('Update User failed');
        }
    }
        
    async deleteUser(userId: number): Promise<void> {
        try {
            await this.datasource.deleteUser(userId);
        } catch (error) {
            throw new Error('Delete User failed');
        }
    }
        
    async createUser(user: UserDTO): Promise<UserDTO> {
        try {
            const response = await this.datasource.createUser(user);
            return response;
        } catch (error) {
            throw new Error('Create User failed');
        }
    }
}

export default UserRepositoryImpl;
