import React from "react";
import { AuthenticatedRoute } from "./components/AuthenticatedRoute";
import JobsPage from "./pages/jobs/JobsPage";

function App() {

  return (
    <div className="App">
      <AuthenticatedRoute>
      <JobsPage/>
      </AuthenticatedRoute>
    </div>
  );
}

export default App;
