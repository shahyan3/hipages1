
export type Job = {
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

const api = Object.freeze({
    Job: {
        GetJobs: async (): Promise<Job[]> => {
            const response = await fetch('http://localhost:8080/api/jobs');
            if (!response.ok) {
              throw new Error('Failed to fetch jobs');
            }
            return response.json();
          },    
          UpdateJobAcceptedById: async (id: number, data: Job): Promise<Job[]> => {
            const response = await fetch(`http://localhost:8080/api/jobs/accepted`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });

            if (!response.ok) {
              throw new Error(`Failed to update job with id ${id}`);
            }
            return response.json();
          },  
          UpdateJobDeclinedById: async (id: number, data: Job): Promise<Job[]> => {
            const response = await fetch(`http://localhost:8080/api/jobs/declined`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });

            if (!response.ok) {
              throw new Error(`Failed to update job with id ${id}`);
            }
            return response.json();
          },           
          DeleteJob: () => { },
          CreateJob: () => { }
    },
    User: {
        GetUsers: () => { }
    }
})

export const Api: Readonly<typeof api> = api