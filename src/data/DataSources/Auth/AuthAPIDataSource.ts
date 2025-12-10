import { Http } from '../../../services/http';
import { JWTResponseDTO } from '../../DTOs/AuthDTO';
import * as CryptoJS from 'crypto-js';

export class AuthAPIDataSource {

    async getSecretKey(): Promise<string> {
        const endpoint = '/login/secretKey';
        try {
            const response = await Http.get<any>(endpoint);
            const obfuscatedKey =  response.data.encryptionKey;
            return obfuscatedKey.replace("XyZ", "").split("").reverse().join("");
        } catch (error) {
            throw new Error('Failed to fetch secret key');
        }
    }

    async login(email: string, password: string): Promise<any> {
        const endpoint = '/login/';
        
        const secret = await this.getSecretKey();
        const passwordCrypt= CryptoJS.AES.encrypt(password, secret).toString();
        password = passwordCrypt;
        const payload = {
            email,
            password
        };

        try {
            const response = await Http.post<JWTResponseDTO>(endpoint, payload);
            return this.mapToModel(response.data);

        } catch (error) {
            throw new Error('Login failed');
        }
    }


    // async logout(): Promise<void> {
    //     const endpoint = '/auth/logout';

    //     try {
    //         // await Http.post<LogoutDTO>(endpoint);
            
    //     } catch (error) {
    //         throw new Error('Logout failed');
    //     }
    // }

    mapToModel(dto: JWTResponseDTO): string {
        return dto.JWT
    }

}