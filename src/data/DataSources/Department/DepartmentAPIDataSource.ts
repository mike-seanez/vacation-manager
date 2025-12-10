import { Http } from '../../../services/http';
import { DepartmentDTO } from '../../DTOs/DepartmentDTO';

export class DepartmentAPIDataSource {

    async getDepartments(): Promise<DepartmentDTO[]> {
        const endpoint = `/department/all`;

        try {
            const response = await Http.get<DepartmentDTO[]>(endpoint);            
            return response.data;

        } catch (error) {
            throw new Error('getDepartments failed');
        }
    }

    async createDepartment(Department: DepartmentDTO): Promise<void> {
        const endpoint = `/department/create`;

        try {
            await Http.post(endpoint, Department);
        } catch (error) {
            throw new Error('createDepartment failed');
        }
    }

    async deleteDepartment(DepartmentId: number): Promise<void> {
        const endpoint = `/department/delete/${DepartmentId}`;

        try {
            await Http.delete(endpoint);
        } catch (error) {
            throw new Error('deleteDepartment failed');
        }
    }
}