import { VacationBalanceDTO, VacationElegibilityDTO, VacationRequestDTO } from '../../DTOs/VacationDTO';
import { Http } from '../../../services/http';

export interface VacationDataSource {
    getVacationBalance(): Promise<VacationBalanceDTO>;
    getVacationRequests(userId: number): Promise<VacationRequestDTO[]>;

    createVacationRequest(vacationRequest: VacationRequestDTO): Promise<VacationRequestDTO>;
    getAllVacationRequests(): Promise<VacationRequestDTO[]>;
    deleteVacationRequest(vacationRequestId: number): Promise<void>;
    updateVacationRequest(vacationRequest: VacationRequestDTO): Promise<VacationRequestDTO>;

    checkVacationEligibility(userId: number): Promise<VacationElegibilityDTO>;

    getVacationById(vacationRequestId: number): Promise<VacationRequestDTO>;
    getVacationsByUserId(userId: number): Promise<VacationRequestDTO[]>;
    getActiveVacationsByUserId(userId: number): Promise<VacationRequestDTO[]>;
    getPendingVacationsByUserId(userId: number): Promise<VacationRequestDTO[]>;
    getApprovedVacationsByUserId(userId: number): Promise<VacationRequestDTO[]>;
    getRejectedVacationsByUserId(userId: number): Promise<VacationRequestDTO[]>;

    acceptVacationRequest(vacationRequestId: number): Promise<void>;
    rejectVacationRequest(vacationRequestId: number): Promise<void>;
}

export class VacationAPIDatasource implements VacationDataSource {
    async getVacationBalance(): Promise<VacationBalanceDTO> {
        try {
            const response = await Http.get<VacationBalanceDTO>(`/vacation/balance`);
            return response.data;
        } catch (error) {
            throw new Error('Get Vacation Balance failed');
        }
    }

    async getVacationRequests(userId: number): Promise<VacationRequestDTO[]> {
        try {
            const response = await Http.get<VacationRequestDTO[]>(`/vacation/requests/${userId}`);
            return response.data;
        } catch (error) {
            throw new Error('Get Vacation Requests failed');
        }
    }

    async createVacationRequest(vacationRequest: VacationRequestDTO): Promise<VacationRequestDTO> {
        try {
            const response = await Http.post<VacationRequestDTO>('/vacation/create', vacationRequest);
            return response.data;
        } catch (error) {
            throw new Error('Create Vacation Request failed');
        }
    }

    async getAllVacationRequests(): Promise<VacationRequestDTO[]> {
        try {
            const response = await Http.get<VacationRequestDTO[]>('/vacation/all');
            return response.data;
        } catch (error) {
            throw new Error('Get All Vacation Requests failed');
        }
    }

    async deleteVacationRequest(vacationRequestId: number): Promise<void> {
        try {
            await Http.delete(`/vacation/request/${vacationRequestId}`);
        } catch (error) {
            throw new Error('Delete Vacation Request failed');
        }
    }

    async updateVacationRequest(vacationRequest: VacationRequestDTO): Promise<VacationRequestDTO> {
        try {
            const response = await Http.put<VacationRequestDTO>('/vacation/request', vacationRequest);
            return response.data;
        } catch (error) {
            throw new Error('Update Vacation Request failed');
        }
    }

    async checkVacationEligibility(): Promise<VacationElegibilityDTO> {
        try {
            const response = await Http.get<VacationElegibilityDTO>('/vacation/eligibility');
            return response.data;
        } catch (error) {
            throw new Error('Check Vacation Eligibility failed');
        }
    }

    async getVacationById(vacationRequestId: number): Promise<VacationRequestDTO> {
        try {
            const response = await Http.get<VacationRequestDTO>(`/vacation/${vacationRequestId}`);
            return response.data;
        } catch (error) {
            throw new Error('Get Vacation Request by ID failed');
        }
    }

    async getVacationsByUserId(userId: number): Promise<VacationRequestDTO[]> {
        try {
            const response = await Http.get<VacationRequestDTO[]>(`/vacation/user/${userId}`);
            return response.data;
        } catch (error) {
            throw new Error('Get Vacations by User ID failed');
        }
    }

    async getActiveVacationsByUserId(userId: number): Promise<VacationRequestDTO[]> {
        try {
            const response = await Http.get<VacationRequestDTO[]>(`/vacation/user/${userId}/active`);
            return response.data;
        } catch (error) {
            throw new Error('Get Active Vacations by User ID failed');
        }
    }

    async getPendingVacationsByUserId(userId: number): Promise<VacationRequestDTO[]> {
        try {
            const response = await Http.get<VacationRequestDTO[]>(`/vacation/user/${userId}/pending`);
            return response.data;
        } catch (error) {
            throw new Error('Get Pending Vacations by User ID failed');
        }
    }

    async getApprovedVacationsByUserId(userId: number): Promise<VacationRequestDTO[]> {
        try {
            const response = await Http.get<VacationRequestDTO[]>(`/vacation/user/${userId}/approved`);
            return response.data;
        } catch (error) {
            throw new Error('Get Approved Vacations by User ID failed');
        }
    }


    async getRejectedVacationsByUserId(userId: number): Promise<VacationRequestDTO[]> {
        try {
            const response = await Http.get<VacationRequestDTO[]>(`/vacation/user/${userId}/rejected`);
            return response.data;
        } catch (error) {
            throw new Error('Get Rejected Vacations by User ID failed');
        }
    }

    async acceptVacationRequest(vacationRequestId: number): Promise<void> {
        try {
            await Http.get(`/vacation/accept/${vacationRequestId}`);
        } catch (error) {
            throw new Error('Accept Vacation Request failed');
        }
    }

    async rejectVacationRequest(vacationRequestId: number): Promise<void> {
        try {
            await Http.get(`/vacation/reject/${vacationRequestId}`);
        } catch (error) {
            throw new Error('Reject Vacation Request failed');
        }
    }
}

export default VacationAPIDatasource;
