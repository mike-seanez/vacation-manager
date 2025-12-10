import { WorkPermitsDTO } from '../../DTOs/WorkPermitsDTO';
import { Http } from '../../../services/http';

export interface WorkPermitesDataSource {
    createWorkPermit: (workPermit: WorkPermitsDTO) => Promise<WorkPermitsDTO>;
    getAllWorkPermits: () => Promise<WorkPermitsDTO[]>;
    getWorkPermitById: (id: number) => Promise<WorkPermitsDTO>;
    updateWorkPermit: (id: number, workPermit: WorkPermitsDTO) => Promise<WorkPermitsDTO>;
    deleteWorkPermit: (id: number) => Promise<void>;
    getPendingWorkPermitsByUserId: () => Promise<WorkPermitsDTO[]>;
    getApprovedWorkPermitsByUserId: () => Promise<WorkPermitsDTO[]>;
    getWorkPermitsByUserId: () => Promise<WorkPermitsDTO[]>;
    acceptWorkPermit: (id: number) => Promise<WorkPermitsDTO>;
    rejectWorkPermit: (id: number) => Promise<WorkPermitsDTO>;
}

export class WorkPermitsAPIDatasource implements WorkPermitesDataSource {
    async createWorkPermit(workPermit: WorkPermitsDTO): Promise<WorkPermitsDTO> { 
        try {
            const response = await Http.post<WorkPermitsDTO>('/workPermit/create', workPermit);
            return response.data;
        } catch (error) {
            throw new Error(`Error creating work permit: ${error}`);
        }
    }

    async getAllWorkPermits(): Promise<WorkPermitsDTO[]> {
        try {
            const response = await Http.get<WorkPermitsDTO[]>('/workPermit/all');
            return response.data;
        } catch (error) {
            throw new Error(`Error getting all work permits: ${error}`);
        }
    }

    async getWorkPermitById(id: number): Promise<WorkPermitsDTO> {
        try {
            const response = await Http.get<WorkPermitsDTO>(`/workPermit/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(`Error getting work permit by id: ${error}`);
        }
    }

    async updateWorkPermit(id: number, workPermit: WorkPermitsDTO): Promise<WorkPermitsDTO> {
        try {
            const response = await Http.put<WorkPermitsDTO>(`/workPermit/${id}`, workPermit);
            return response.data;
        } catch (error) {
            throw new Error(`Error updating work permit: ${error}`);
        }
    }

    async deleteWorkPermit(id: number): Promise<void> {
        try {
            await Http.delete(`/workPermit/delete/${id}`);
        } catch (error) {
            throw new Error(`Error deleting work permit: ${error}`);
        }
    }

    async getPendingWorkPermitsByUserId(): Promise<WorkPermitsDTO[]> {
        try {
            const response = await Http.get<WorkPermitsDTO[]>('/workPermit/pending');
            return response.data;
        } catch (error) {
            throw new Error(`Error getting pending work permits by user id: ${error}`);
        }
    }

    async getApprovedWorkPermitsByUserId(): Promise<WorkPermitsDTO[]> {
        try {
            const response = await Http.get<WorkPermitsDTO[]>('/workPermit/approved');
            return response.data;
        } catch (error) {
            throw new Error(`Error getting approved work permits by user id: ${error}`);
        }
    }

    async getWorkPermitsByUserId(): Promise<WorkPermitsDTO[]> {
        try {
            const response = await Http.get<WorkPermitsDTO[]>('/workPermit/user');
            return response.data;
        } catch (error) {
            throw new Error(`Error getting work permits by user id: ${error}`);
        }
    }

    async acceptWorkPermit(id: number): Promise<WorkPermitsDTO> {
        try {
            const response = await Http.put<WorkPermitsDTO>(`/workPermit/accept/${id}`, {});
            return response.data;
        } catch (error) {
            throw new Error(`Error accepting work permit: ${error}`);
        }
    }

    async rejectWorkPermit(id: number): Promise<WorkPermitsDTO> {
        try {
            const response = await Http.put<WorkPermitsDTO>(`/workPermit/reject/${id}`, {});
            return response.data;
        } catch (error) {
            throw new Error(`Error rejecting work permit: ${error}`);
        }
    }
}
