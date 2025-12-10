import { Http } from '../../../services/http';
import { ForgotPasswordDTO } from '../../DTOs/ForgotPasswordDTO';

export class ForgotPasswordAPIDataSource {
    async forgotPassword(email: string) {
        const endpoint = '/login/forgotPassword';
        const payload = {
            email,
        } as ForgotPasswordDTO;

        try {
            const response = await Http.post<any>(endpoint, payload);
            return response.data;

        } catch (error) {
            throw new Error('Forgot password failed');
        }
    }

}