import React, { useCallback, useState, useEffect, useMemo } from "react";
import { Tabs, TabList, Tab, TabPanel } from "../../components/Tabs";
import { useMountedCheck } from "../../hooks/useMountCheck";
import { Api, Job } from '../../service/api'
import { JobCard } from "./components/JobCard";

const JobsPage = () => {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [jobs, setJobs] = useState<Job[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const jobsData = await getJobs();
                setJobs(jobsData);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    // This is just an example. Perhaps not a very useful hook for this particular feature. But let's say we wanted to ensure the component is mounted 
    // before we mutate state, we could use this hook to ensure this componet is mounted before we set some state.
    // const isMountedCheck = useMountedCheck()
    // if(useMountedCheck.isStillMounted) {
    //     setSomeState([])
    // }

    const getJobs = useCallback(() => {
        return Api.Job.GetJobs()
    }, [])

    const updateJobAcceptedById = (id: number, job: Job) => {
        return Api.Job.UpdateJobAcceptedById(id, job)
    }

    const updateJobDeclinedById = (id: number, job: Job) => {
        return Api.Job.UpdateJobDeclinedById(id, job)
    }

    const handleTabClick = (index: number) => {
        setActiveTabIndex(index);
    }
    
    const handleAccept = async (id: number) => {
        // Note: Not using === equality here for a reason.
        // Specifically* using == to compare j.id (number) and id (string).  
        // why? javascript will first coerce param's id to a number (because a value returned from mouse click is a string), and then apply equality check accurately.
        const acceptedJob = jobsList.find(j => j.id == id)
        
        if(!acceptedJob) return

        try {
            const updatedJobsData = await updateJobAcceptedById(acceptedJob.id, acceptedJob);
            setJobs(updatedJobsData)
        } catch (error) {
            console.error(error);
        }
    }
    const handleDecline = async (id: number) => {
        // Note: Not using === equality here for a reason.
        // Specifically* using == to compare j.id (number) and id (string).  
        // why? javascript will first coerce param's id to a number (because a value returned from mouse click is a string), and then apply equality check accurately.
        const declinedJob = jobsList.find(j => j.id == id)
        
        if(!declinedJob) return

        try {
            const updatedJobsData = await updateJobDeclinedById(declinedJob.id, declinedJob);
            setJobs(updatedJobsData)
        } catch (error) {
            console.error(error);
        }
    } 

    const jobsList = useMemo(() => jobs.filter(j => j.status !== 'declined'), [jobs]) 

    return (
        <Tabs>
            <TabList activeTabIndex={activeTabIndex} onTabClick={handleTabClick}>
                <Tab index={0} isActive={activeTabIndex === 0} onClick={() => handleTabClick(0)}>
                    Invited
                </Tab>
                <Tab index={1} isActive={activeTabIndex === 1} onClick={() => handleTabClick(1)}>
                    Accepted
                </Tab>
            </TabList>
            {
                jobsList.map((j, i) => (
                    <TabPanel key={i} index={j.status === 'new' ? 0 : 1} isActive={activeTabIndex === 0}>
                        <JobCard
                            invited={j.status === 'new' ? true : false} 
                            contantName={j.contact_name} 
                            createdAt={j.created_at}
                            suburb={j.suburb}
                            postcode={j.postcode}
                            category={j.category} 
                            id={j.id} 
                            description={j.description} 
                            handleAccept={handleAccept} 
                            handleDecline={handleDecline}
                            price={j.price}
                            phone={j.contact_phone}
                            email={j.contact_email}
                        />
                    </TabPanel>
                ))
            }
        </Tabs>
    );
}

export default JobsPage;
