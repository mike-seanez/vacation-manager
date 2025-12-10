export interface WorkPermitsDTO {
    id: number;
    user_id: number;
    permit_date: string;
    start_date: string;
    end_date: string;
    reason?: string;
    status?: string;
    reviewed_by?: number;
    created_at?: string;
    updated_at?: string;
}
