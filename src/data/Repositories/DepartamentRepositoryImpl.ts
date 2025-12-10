import { DepartmentAPIDataSource } from '../DataSources/Department/DepartmentAPIDataSource';
import { DepartmentDTO } from '../DTOs/DepartmentDTO';

class DepartmentRepositoryImpl {
    datasource: DepartmentAPIDataSource;

    constructor() {
        this.datasource = new DepartmentAPIDataSource();
    }

    async getDepartments(): Promise<DepartmentDTO[]> {
        try {
            const response = await this.datasource.getDepartments();
            return response;
        } catch (error) {
            throw new Error('Get Departments failed');
        }
    }
        
    async createDepartment(department: DepartmentDTO): Promise<void> {
        try {
            await this.datasource.createDepartment(department);
        } catch (error) {
            throw new Error('Create Department failed');
        }
    }
        
    async deleteDepartment(departmentId: number): Promise<void> {
        try {
            await this.datasource.deleteDepartment(departmentId);
        } catch (error) {
            throw new Error('Delete Department failed');
        }
    }
}

export default new DepartmentRepositoryImpl();
