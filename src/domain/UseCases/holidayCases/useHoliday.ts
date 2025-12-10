import { HolidayAPIDataSource } from '../../../data/DataSources/Holiday/HolidayAPIDatasource';
import { HolidayDTO } from '../../../data/DTOs/HolidayDTO';
import { useState } from 'react';

export const useHoliday = () => {
    const [errorHoliday, setErrorHoliday] = useState(null);
    const [loadingHoliday, setLoadingHoliday] = useState(false);

    const getHolidays = async () => {
        setLoadingHoliday(true);
        try {
            const response = await new HolidayAPIDataSource().getHolidays();
            setLoadingHoliday(false);
            return response;
        } catch (error) {
            setLoadingHoliday(false);
            setErrorHoliday(error);
        }
    }

    const createHoliday = async (holiday: HolidayDTO) => {
        setLoadingHoliday(true);
        try {
            const response = await new HolidayAPIDataSource().createHoliday(holiday);
            setLoadingHoliday(false);
            return response;
        } catch (error) {
            setLoadingHoliday(false);
            setErrorHoliday(error);
        }
    }

    const deleteHoliday = async (holidayId: number) => {
        setLoadingHoliday(true);
        try {
            await new HolidayAPIDataSource().deleteHoliday(holidayId);
            setLoadingHoliday(false);
        } catch (error) {
            setLoadingHoliday(false);
            setErrorHoliday(error);
        }
    }

    const updateHoliday = async ( holiday: HolidayDTO, holidayId: number) => {
        setLoadingHoliday(true);
        try {
            const response = await new HolidayAPIDataSource().updateHoliday(holiday, holidayId);
            setLoadingHoliday(false);
            return response;
        } catch (error) {
            setLoadingHoliday(false);
            setErrorHoliday(error);
        }
    }

    const getHoliday = async (holidayId: number) => {
        setLoadingHoliday(true);
        try {
            const response = await new HolidayAPIDataSource().getHoliday(holidayId);
            setLoadingHoliday(false);
            return response;
        } catch (error) {
            setLoadingHoliday(false);
            setErrorHoliday(error);
        }
    }
    
    return {
        getHolidays,
        createHoliday,
        deleteHoliday,
        updateHoliday,
        getHoliday,
        errorHoliday,
        loadingHoliday,
    }
}

