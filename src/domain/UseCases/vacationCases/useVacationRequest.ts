import VacationAPIDatasource from 'data/DataSources/Vacation/VacationAPIDatasource';
import { VacationRequestDTO } from 'data/DTOs/VacationDTO';
import { useState, useEffect } from 'react';

export const useVacationsRequest = () => {
    const [errorVacationRequest, setErrorVacationRequest] = useState(null);
    const [loadingVacationRequest, setLoadingVacationRequest] = useState(false);
    const [allVacations, setAllVacations] = useState([]);

    const getAllVacations = async () => {
        setLoadingVacationRequest(true);
        setErrorVacationRequest(null);
        try {
            const response = await new VacationAPIDatasource().getAllVacationRequests();
            setLoadingVacationRequest(false);
            return response;
        } catch (error) {
            setErrorVacationRequest(error.message);
            setLoadingVacationRequest(false);
        }
    }

    const getVacationRequest = async (vacationRequestId: number) => {
        setLoadingVacationRequest(true);
        setErrorVacationRequest(null);
        try {
            const response = await new VacationAPIDatasource().getVacationRequests(vacationRequestId);
            setLoadingVacationRequest(false);
            return response;
        } catch (error) {
            setErrorVacationRequest(error.message);
            setLoadingVacationRequest(false);
        }
    }

    const createVacationRequest = async (vacationRequest: VacationRequestDTO) => {
        setLoadingVacationRequest(true);
        setErrorVacationRequest(null);
        try {
            const response = await new VacationAPIDatasource().createVacationRequest(vacationRequest);
            setLoadingVacationRequest(false);
            return response;
        } catch (error) {
            setErrorVacationRequest(error.message);
            setLoadingVacationRequest(false);
        }
    }

    const deleteVacationRequest = async (vacationRequestId: number) => {
        setLoadingVacationRequest(true);
        setErrorVacationRequest(null);
        try {
            await new VacationAPIDatasource().deleteVacationRequest(vacationRequestId);
            setLoadingVacationRequest(false);
        } catch (error) {
            setErrorVacationRequest(error.message);
            setLoadingVacationRequest(false);
        }
    }

    const updateVacationRequest = async (vacationRequest: VacationRequestDTO) => {
        setLoadingVacationRequest(true);
        setErrorVacationRequest(null);
        try {
            await new VacationAPIDatasource().updateVacationRequest(vacationRequest);
            setLoadingVacationRequest(false);
        } catch (error) {
            setErrorVacationRequest(error.message);
            setLoadingVacationRequest(false);
        }
    }

    const checkVacationEligibility = async () => {
        setLoadingVacationRequest(true);
        setErrorVacationRequest(null);
        try {
            const response = await new VacationAPIDatasource().checkVacationEligibility();
            setLoadingVacationRequest(false);
            return response;
        } catch (error) {
            setErrorVacationRequest(error.message);
            setLoadingVacationRequest(false);
        }
    }

    const getVacationsByUserId = async (userId: number) => {
        setLoadingVacationRequest(true);
        setErrorVacationRequest(null);
        try {
            const response = await new VacationAPIDatasource().getVacationsByUserId(userId);
            setLoadingVacationRequest(false);
            return response;
        } catch (error) {
            setErrorVacationRequest(error.message);
            setLoadingVacationRequest(false);
        }
    }

    const acceptVacationRequest = async (vacationRequestId: number) => {
        setLoadingVacationRequest(true);
        setErrorVacationRequest(null);
        try {
            await new VacationAPIDatasource().acceptVacationRequest(vacationRequestId);
            setLoadingVacationRequest(false);
        } catch (error) {
            setErrorVacationRequest(error.message);
            setLoadingVacationRequest(false);
        }
    }

    const rejectVacationRequest = async (vacationRequestId: number) => {
        setLoadingVacationRequest(true);
        setErrorVacationRequest(null);
        try {
            await new VacationAPIDatasource().rejectVacationRequest(vacationRequestId);
            setLoadingVacationRequest(false);
        } catch (error) {
            setErrorVacationRequest(error.message);
            setLoadingVacationRequest(false);
        }
    }

    return {
        errorVacationRequest,
        loadingVacationRequest,
        allVacations,
        getAllVacations,
        getVacationRequest,
        createVacationRequest,
        deleteVacationRequest,
        updateVacationRequest,
        checkVacationEligibility,
        getVacationsByUserId,
        acceptVacationRequest,
        rejectVacationRequest,
    }
}