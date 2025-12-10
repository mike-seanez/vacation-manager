import { HolidayDTO } from '../DTOs/HolidayDTO';
import { HolidayAPIDataSource } from '../DataSources/Holiday/HolidayAPIDatasource';

class HolidayRepositoryImpl {
    datasource: HolidayAPIDataSource;

    constructor() {
        this.datasource = new HolidayAPIDataSource();
    }

    async getHolidays(): Promise<HolidayDTO[]> {
        try {
            const response = await this.datasource.getHolidays();
            return response;
        } catch (error) {
            throw new Error('Get Holidays failed');
        }
    }
        
    async createHoliday(holiday: HolidayDTO): Promise<void> {
        try {
            await this.datasource.createHoliday(holiday);
        } catch (error) {
            throw new Error('Create Holiday failed');
        }
    }
        
    async deleteHoliday(holidayId: number): Promise<void> {
        try {
            await this.datasource.deleteHoliday(holidayId);
        } catch (error) {
            throw new Error('Delete Holiday failed');
        }
    }
        
    async getHoliday(holidayId: number): Promise<HolidayDTO> {
        try {
            const response = await this.datasource.getHoliday(holidayId);
            return response;
        } catch (error) {
            throw new Error('Get Holiday failed');
        }
    }
        
    async updateHoliday(holiday: HolidayDTO, holidayId: number): Promise<void> {
        try {
            await this.datasource.updateHoliday(holiday, holidayId);
        } catch (error) {
            throw new Error('Update Holiday failed');
        }
    }
}

export default new HolidayRepositoryImpl();
