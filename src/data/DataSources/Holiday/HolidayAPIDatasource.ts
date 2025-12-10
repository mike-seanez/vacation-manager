import { Http } from '../../../services/http';
import { HolidayDTO } from '../../DTOs/HolidayDTO';

export class HolidayAPIDataSource {
    async getHolidays(): Promise<HolidayDTO[]> {
        const endpoint = `/holiday/all`;

        try {
            const response = await Http.get<HolidayDTO[]>(endpoint);            
            return response.data;
        } catch (error) {
            throw new Error('getHolidays failed');
        }
    }

    async createHoliday(holiday: HolidayDTO): Promise<void> {
        const endpoint = `/holiday/create`;

        try {
            await Http.post(endpoint, holiday);
        } catch (error) {
            throw new Error('createHoliday failed');
        }
    }

    async deleteHoliday(holidayId: number): Promise<void> {
        const endpoint = `/holiday/delete/${holidayId}`;

        try {
            await Http.delete(endpoint);
        } catch (error) {
            throw new Error('deleteHoliday failed');
        }
    }

    async getHoliday(holidayId: number): Promise<HolidayDTO> {
        const endpoint = `/holiday/${holidayId}`;

        try {
            const response = await Http.get<HolidayDTO>(endpoint);            
            return response.data;
        } catch (error) {
            throw new Error('getHoliday failed');
        }
    }

    async updateHoliday(holiday: HolidayDTO, holidayId: number): Promise<void> {
        const endpoint = `/holiday/update/${holidayId}`;

        try {
            await Http.put(endpoint, holiday);
        } catch (error) {
            throw new Error('updateHoliday failed');
        }
    }
}