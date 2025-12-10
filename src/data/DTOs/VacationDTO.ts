export interface VacationBalanceDTO {
    id: number;
    user_id: number;
    year: number;
    available_days: number;
    used_days?: number;
    updated_at: string;
};

export interface VacationRequestDTO {
    id: number;
    user_id: number;
    start_date: string;
    end_date: string;
    total_days: number;
    status: string;
    reason?: string;
    response?: string;
    reviewed_by?: number;
    created_at?: string;
    updated_at?: string;
};

export interface VacationElegibilityDTO {
    joinDate: string;
    monthsEmployed: number;
    isElegible: boolean;
    nextEligibilityDate?: null | string;
}