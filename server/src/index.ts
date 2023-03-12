import * as express from 'express';
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser')

import { getJobs, updateJobStatusAccepted, updateJobStatusDeclined } from "./controllers/jobController";


const server = express();
const port = 8080;

server.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

const app = express();
// middleware to parse incoming requests
app.use(bodyParser.json());
app.use(cors());


app.get("/api/jobs", getJobs);
app.put("/api/jobs/accepted", updateJobStatusAccepted);
app.put("/api/jobs/declined", updateJobStatusDeclined);

server.use(app)