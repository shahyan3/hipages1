import { JobDto } from "../dtos/jobDto";
import { toJobDtos } from "../mappers/jobMapper";
import { getJobs, updateJobsAccepted, updateJobsDeclined } from "../repositories/jobRepository";

export const getJobDtos = async (): Promise<JobDto[]> => {
    const jobs = await getJobs();
    return toJobDtos(jobs);
};

export const updateJobStatusAcceptedDtos = async (id: number): Promise<JobDto[]> => {
    const jobs = await updateJobsAccepted(id);
    return toJobDtos(jobs);
};

export const updateJobStatusDeclineddDtos = async (id: number): Promise<JobDto[]> => {
    const jobs = await updateJobsDeclined(id);
    return toJobDtos(jobs);
};

