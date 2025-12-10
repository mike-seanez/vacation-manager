import {VacationAPIDatasource} from '../DataSources/Vacation/VacationAPIDatasource';
import { VacationBalanceDTO, VacationElegibilityDTO, VacationRequestDTO } from "data/DTOs/VacationDTO";

class VacationRepositoryImpl {
    datasource: VacationAPIDatasource;

    constructor() {
        this.datasource = new VacationAPIDatasource();
    }

    async getVacationBalance(userId: number): Promise<VacationBalanceDTO> {
        try {
            const response = await this.datasource.getVacationBalance(userId);
            return response;
        } catch (error) {
            throw new Error('Get Vacation Balance failed');
        }
    }

    async getVacationRequests(vacationRequestId: number): Promise<VacationRequestDTO[]> {
        try {
            const response = await this.datasource.getVacationRequests(vacationRequestId);
            return response;
        } catch (error) {
            throw new Error('Get Vacation Requests failed');
        }
    }

    async createVacationRequest(vacationRequest: VacationRequestDTO): Promise<VacationRequestDTO> {
        try {
            const response = await this.datasource.createVacationRequest(vacationRequest);
            return response;
        } catch (error) {
            throw new Error('Create Vacation Request failed');
        }
    }

    async getAllVacationRequests(): Promise<VacationRequestDTO[]> {
        try {
            const response = await this.datasource.getAllVacationRequests();
            return response;
        } catch (error) {
            throw new Error('Get All Vacation Requests failed');
        }
    }

    async deleteVacationRequest(vacationRequestId: number): Promise<void> {
        try {
            await this.datasource.deleteVacationRequest(vacationRequestId);
        } catch (error) {
            throw new Error('Delete Vacation Request failed');
        }
    }

    async updateVacationRequest(vacationRequest: VacationRequestDTO): Promise<void> {
        try {
            await this.datasource.updateVacationRequest(vacationRequest);
        } catch (error) {
            throw new Error('Update Vacation Request failed');
        }
    }

    async checkVacationEligibility(vacationRequest: VacationRequestDTO): Promise<VacationElegibilityDTO> {
        try {
            const response = await this.datasource.checkVacationEligibility(vacationRequest);
            return response;
        } catch (error) {
            throw new Error('Check Vacation Elegibility failed');
        }
    }

    async getVacationById(vacationId: number): Promise<VacationRequestDTO> {
        try {
            const response = await this.datasource.getVacationById(vacationId);
            return response;
        } catch (error) {
            throw new Error('Get Vacation by ID failed');
        }
    }

    async getVacationsByUserId(userId: number): Promise<VacationRequestDTO[]> {
        try {
            const response = await this.datasource.getVacationsByUserId(userId);
            return response;
        } catch (error) {
            throw new Error('Get Vacations by User ID failed');
        }
    }

    async getActiveVacationsByUserId(userId: number): Promise<VacationRequestDTO[]> {
        try {
            const response = await this.datasource.getActiveVacationsByUserId(userId);
            return response;
        } catch (error) {
            throw new Error('Get Active Vacations by User ID failed');
        }
    }

    async getPendingVacationsByUserId(userId: number): Promise<VacationRequestDTO[]> {
        try {
            const response = await this.datasource.getPendingVacationsByUserId(userId);
            return response;
        } catch (error) {
            throw new Error('Get Pending Vacations by User ID failed');
        }
    }

    async getApprovedVacationsByUserId(userId: number): Promise<VacationRequestDTO[]> {
        try {
            const response = await this.datasource.getApprovedVacationsByUserId(userId);
            return response;
        } catch (error) {
            throw new Error('Get Approved Vacations by User ID failed');
        }
    }

    async getRejectedVacationsByUserId(userId: number): Promise<VacationRequestDTO[]> {
        try {
            const response = await this.datasource.getRejectedVacationsByUserId(userId);
            return response;
        } catch (error) {
            throw new Error('Get Rejected Vacations by User ID failed');
        }
    }

    async acceptVacationRequest(vacationRequestId: number): Promise<void> {
        try {
            await this.datasource.acceptVacationRequest(vacationRequestId);
        } catch (error) {
            throw new Error('Accept Vacation Request failed');
        }
    }

    async rejectVacationRequest(vacationRequestId: number): Promise<void> {
        try {
            await this.datasource.rejectVacationRequest(vacationRequestId);
        } catch (error) {
            throw new Error('Reject Vacation Request failed');
        }
    }

}

export default VacationRepositoryImpl;