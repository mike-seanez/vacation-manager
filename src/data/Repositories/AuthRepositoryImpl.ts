import { AuthAPIDataSource } from '../DataSources/Auth/AuthAPIDataSource';

class AuthRepositoryImpl {
    datasource: AuthAPIDataSource;

    constructor() {
        this.datasource = new AuthAPIDataSource();
    }

    async login(username: string, password: string): Promise<any> {
        try {
            const response = await this.datasource.login(username, password);
            return response;
        } catch (error) {
            throw new Error('Login failed');
        }
    }

    async logout(): Promise<void> {
        try {
            // await Http.post<LogoutDTO>(endpoint);
            // remove token from local storage
            console.warn('logout not implemented');
        } catch (error) {
            throw new Error('Logout failed');
        }
    }
}

export default new AuthRepositoryImpl();