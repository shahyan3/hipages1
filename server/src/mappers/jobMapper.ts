import { JobDto } from "../dtos/jobDto";
import { Job } from "../models/job";

export const toJobDto = (data: Job): JobDto => {
    return {
        id: data.id,
        status: data.status,
        suburb: data.suburb.name,
        postcode: data.suburb.postcode,
        category: data.category.name,
        contact_name: data.contact_name,
        contact_phone: data.contact_phone,
        contact_email: data.contact_email,
        price: data.price,
        description: data.description,
        created_at: new Date(data.created_at),
        updated_at: new Date(data.updated_at),
    };
};

export const toJobDtos = (data: Job[]): JobDto[] => data.length > 0 ? data.map(toJobDto) : [];
