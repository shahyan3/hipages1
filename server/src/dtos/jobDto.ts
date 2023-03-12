export interface JobDto {
    id: number;
    status: string;
    suburb: string;
    postcode: string;
    category: string;
    contact_name: string;
    contact_phone: string;
    contact_email: string;
    price: number;
    description: string;
    created_at: Date;
    updated_at: Date;
}