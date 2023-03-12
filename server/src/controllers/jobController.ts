import { Request, Response } from "express";
import { JobDto } from "../dtos/jobDto";
import { getJobDtos, updateJobStatusAcceptedDtos, updateJobStatusDeclineddDtos } from "../services/jobService";

export const getJobs = async (_req: Request, res: Response): Promise<void> => {
    // Call permissionService for permission check: e.g. can user view job... 

    // return results
    const jobs = await getJobDtos();
    res.status(200).json(jobs);
};

// Improve: get a request query param with status accepted or decline. Currently not very robust i.e. too specific?
export const updateJobStatusAccepted = async (_req: Request, res: Response): Promise<void> => {
    // Call permissionService for permission check: e.g. can user update job...

    const job = _req.body

    // do validation of the payload here...
    if (!job) res.status(500)

    // update
    const updatedJobs = await updateJobStatusAcceptedDtos(job.id); // get the list of jobs
    res.json(updatedJobs); // return the updated jo
}

export const updateJobStatusDeclined = async (_req: Request, res: Response): Promise<void> => {
    // Call permissionService for permission check: e.g. can user update job...

    const job = _req.body

    // do validation of the payload here...
    if (!job) res.status(500)

    // update
    const updatedJobs = await updateJobStatusDeclineddDtos(job.id); // get the list of jobs
    res.json(updatedJobs); // return the updated job
}