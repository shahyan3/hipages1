import { db } from "../config/db";

import { Job } from "../models/job";
import { Suburb } from "../models/suburb";
import { Category } from "../models/category";

export const getJobs = async (): Promise<Job[]> => {
    const jobs = await db.query(
        `SELECT jobs.id, jobs.status, suburbs.name AS suburb, suburbs.postcode, categories.name AS category, 
    jobs.contact_name, jobs.contact_phone, jobs.contact_email, jobs.price, jobs.description, jobs.created_at, jobs.updated_at
    FROM jobs
    INNER JOIN suburbs ON jobs.suburb_id = suburbs.id
    INNER JOIN categories ON jobs.category_id = categories.id`, []);

    return jobs.map((job) => {
        const suburb = new Suburb(job.suburb, job.postcode);
        const category = new Category(job.category);
        return new Job(
            job.id,
            job.status,
            suburb,
            category,
            job.contact_name,
            job.contact_phone,
            job.contact_email,
            job.price,
            job.description,
            new Date(job.created_at),
            new Date(job.updated_at)
        );
    });
};

// To improve: interpolating the id within the query string opens up for sql injections! pass in params 
export const updateJobsAccepted = async (id: number): Promise<Job[]> => {
    try {
        if (await db.query(`SELECT * FROM jobs WHERE id = ${id}`, [])) {
            await db.query(`UPDATE jobs SET status = "accepted" WHERE id = ${id}`, []);
        }
        const res = await getJobs();
        return res
    } catch (error) {
        console.log('error: ', error)
        throw error
    }
}
// To improve: interpolating the id within the query string opens up for sql injections! pass in params 
export const updateJobsDeclined = async (id: number): Promise<Job[]> => {
    try {
        if (await db.query(`SELECT * FROM jobs WHERE id = ${id}`, [])) {
            await db.query(`UPDATE jobs SET status = "declined" WHERE id = ${id}`, []);
        }
        const res = await getJobs();
        return res
    } catch (error) {
        console.log('error: ', error)
        throw error
    }
}