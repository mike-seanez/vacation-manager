import { useState } from 'react';
import VacationAPIDatasource from 'data/DataSources/Vacation/VacationAPIDatasource';
import { VacationBalanceDTO } from 'data/DTOs/VacationDTO';

export const useVacationsBalance = () => {
    const [errorVacationBalance, setErrorVacationBalance] = useState(null);
    const [loadingVacationBalance, setLoadingVacationBalance] = useState(false);
    const [vacationBalance, setVacationBalance] = useState<VacationBalanceDTO>(null);

    const getVacationBalance = async () => {
        setLoadingVacationBalance(true);
        setErrorVacationBalance(null);
        try {
            const response = await new VacationAPIDatasource().getVacationBalance();
            setLoadingVacationBalance(false);
            setVacationBalance(response);
            return response;
        } catch (error) {
            setErrorVacationBalance(error.message);
            setLoadingVacationBalance(false);
        }
    }

    return {
        errorVacationBalance,
        loadingVacationBalance,
        vacationBalance,
        getVacationBalance
    }
}
