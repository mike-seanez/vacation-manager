import { useState } from "react";
import { WorkPermitsAPIDatasource } from "../../../data/DataSources/WorkPermits/WorkPermitsAPIDatasource";
import { WorkPermitsDTO } from "../../../data/DTOs/WorkPermitsDTO";

export const useWorkPermit = () => {
    const [loadingWorkPermits, setLoadingWorkPermits] = useState(false);
    const [errorWorkPermits, setErrorWorkPermits] = useState('');

    const getWorkPermits = async () => {
        setLoadingWorkPermits(true);
        setErrorWorkPermits('');
        try {
            const workPermits = await new WorkPermitsAPIDatasource().getAllWorkPermits();
            setLoadingWorkPermits(false);
            return workPermits;
        } catch (error) {
            setLoadingWorkPermits(false);
            setErrorWorkPermits(error.message);
        }
    }

    const createWorkPermit = async (workPermit: WorkPermitsDTO) => {
        setLoadingWorkPermits(true);
        setErrorWorkPermits('');
        try {
            const workPermitCreated = await new WorkPermitsAPIDatasource().createWorkPermit(workPermit);
            setLoadingWorkPermits(false);
            return workPermitCreated;
        } catch (error) {
            setLoadingWorkPermits(false);
            setErrorWorkPermits(error.message);
        }
    }

    const getWorkPermitById = async (id: number) => {
        setLoadingWorkPermits(true);
        setErrorWorkPermits('');
        try {
            const workPermit = await new WorkPermitsAPIDatasource().getWorkPermitById(id);
            setLoadingWorkPermits(false);
            return workPermit;
        } catch (error) {
            setLoadingWorkPermits(false);
            setErrorWorkPermits(error.message);
        }
    }


    const updateWorkPermit = async (id: number, workPermit: WorkPermitsDTO) => {
        setLoadingWorkPermits(true);
        setErrorWorkPermits('');
        try {
            const workPermitUpdated = await new WorkPermitsAPIDatasource().updateWorkPermit(id, workPermit);
            setLoadingWorkPermits(false);
            return workPermitUpdated;
        } catch (error) {
            setLoadingWorkPermits(false);
            setErrorWorkPermits(error.message);
        }
    }

    const deleteWorkPermit = async (id: number) => {
        setLoadingWorkPermits(true);
        setErrorWorkPermits('');
        try {
            await new WorkPermitsAPIDatasource().deleteWorkPermit(id);
            setLoadingWorkPermits(false);
        } catch (error) {
            setLoadingWorkPermits(false);
            setErrorWorkPermits(error.message);
        }
    }

    const getPendingWorkPermitsByUserId = async () => {
        setLoadingWorkPermits(true);
        setErrorWorkPermits('');
        try {
            const workPermits = await new WorkPermitsAPIDatasource().getPendingWorkPermitsByUserId();
            setLoadingWorkPermits(false);
            return workPermits;
        } catch (error) {
            setLoadingWorkPermits(false);
            setErrorWorkPermits(error.message);
        }
    }

    const getApprovedWorkPermitsByUserId = async () => {
        setLoadingWorkPermits(true);
        setErrorWorkPermits('');
        try {
            const workPermits = await new WorkPermitsAPIDatasource().getApprovedWorkPermitsByUserId();
            setLoadingWorkPermits(false);
            return workPermits;
        } catch (error) {
            setLoadingWorkPermits(false);
            setErrorWorkPermits(error.message);
        }
    }

    const getWorkPermitsByUserId = async () => {
        setLoadingWorkPermits(true);
        setErrorWorkPermits('');
        try {
            const workPermits = await new WorkPermitsAPIDatasource().getWorkPermitsByUserId();
            setLoadingWorkPermits(false);
            return workPermits;
        } catch (error) {
            setLoadingWorkPermits(false);
            setErrorWorkPermits(error.message);
        }
    }

    const acceptWorkPermit = async (id: number) => {
        setLoadingWorkPermits(true);
        setErrorWorkPermits('');
        try {
            const workPermit = await new WorkPermitsAPIDatasource().acceptWorkPermit(id);
            setLoadingWorkPermits(false);
            return workPermit;
        } catch (error) {
            setLoadingWorkPermits(false);
            setErrorWorkPermits(error.message);
        }
    }

    const rejectWorkPermit = async (id: number) => {
        setLoadingWorkPermits(true);
        setErrorWorkPermits('');
        try {
            const workPermit = await new WorkPermitsAPIDatasource().rejectWorkPermit(id);
            setLoadingWorkPermits(false);
            return workPermit;
        } catch (error) {
            setLoadingWorkPermits(false);
            setErrorWorkPermits(error.message);
        }
    }

    return {
        getWorkPermits,
        createWorkPermit,
        getWorkPermitById,
        updateWorkPermit,
        deleteWorkPermit,
        getPendingWorkPermitsByUserId,
        getApprovedWorkPermitsByUserId,
        getWorkPermitsByUserId,
        acceptWorkPermit,
        rejectWorkPermit,
    }

}