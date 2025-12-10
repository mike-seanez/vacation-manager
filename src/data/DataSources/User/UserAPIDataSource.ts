import { UserDTO } from "../../DTOs/UserDTO";
import { Http } from "../../../services/http";


export interface UserDataSource {
    getUser(userId: number): Promise<UserDTO>;
    updateUser(user: UserDTO): Promise<UserDTO>;
    deleteUser(userId: number): Promise<void>;
    createUser(user: UserDTO): Promise<UserDTO>;
    getUsers(): Promise<UserDTO[]>;
}

export class UserAPIDataSource implements UserDataSource {
    async getUser(userId: number): Promise<UserDTO>{
        const res = await Http.get<UserDTO>(`/user/${userId}`);
        return res.data;
    }
    async updateUser(user: UserDTO): Promise<UserDTO>{
        const res = await Http.put<UserDTO>(`/user/update/${user.id}`, user);
        return res.data;
    }
    async deleteUser(userId: number): Promise<void>{
        await Http.delete(`/user/delete/${userId}`);
    }
    async createUser(user: UserDTO): Promise<UserDTO>{
        const res = await Http.post<UserDTO>('/user/register', user);
        return res.data;
    }
    async getUsers(): Promise<UserDTO[]>{
        const res = await Http.get<UserDTO[]>('/user/all');
        return res.data;
    }

    async getNewUsersThisMonth(): Promise<number>{
        const res = await Http.get<number>('/user/new-this-month');
        return res.data;
    }
    
}