import { useState } from "react";
import { DepartmentAPIDataSource } from "../../../data/DataSources/Department/DepartmentAPIDataSource";
import { DepartmentDTO } from "../../../data/DTOs/DepartmentDTO";

export const useDepartment = () => {
    const [errorDepartment, setErrorDepartment] = useState(null);
    const [loadingDepartment, setLoadingDepartment] = useState(false);

    const getDepartments = async () => {
        setLoadingDepartment(true);
        try {
            const response = await new DepartmentAPIDataSource().getDepartments();
            setLoadingDepartment(false);
            return response;
        } catch (error) {
            setLoadingDepartment(false);
            setErrorDepartment(error);
        }
    }

    const createDepartment = async (department: DepartmentDTO) => {
        setLoadingDepartment(true);
        try {
            const response = await new DepartmentAPIDataSource().createDepartment(department);
            setLoadingDepartment(false);
            return response;
        } catch (error) {
            setLoadingDepartment(false);
            setErrorDepartment(error);
        }
    }

    const deleteDepartment = async (departmentId: number) => {
        setLoadingDepartment(true);
        try {
            const response = await new DepartmentAPIDataSource().deleteDepartment(departmentId);
            setLoadingDepartment(false);
            return response;
        } catch (error) {
            setLoadingDepartment(false);
            setErrorDepartment(error);
        }
    }

    return {
        getDepartments,
        createDepartment,
        deleteDepartment,
        errorDepartment,
        loadingDepartment,
    }

}
