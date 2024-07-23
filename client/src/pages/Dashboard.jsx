import React, { useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const JobsListing = () => {
    const {user } = useAuth();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const api = useAxios({ authRequired: false });

    const fetchJobs = async () => {
        try {
            const response = await api.get('/jobs');
            setLoading(false);
            setJobs(response.data);
        } catch (error) {
          setLoading(false);
            console.error('Error fetching jobs:', error);
        }
    };


    useEffect(() => {
        fetchJobs();
    }, []);
    
    return (
        <div className="jobs-listing-page">
          {
            loading && <Spinner />
          }
            <div className="jobs-container">
                <h2>Available Jobs</h2>
                {jobs.length > 0 ? (
                    <ul className="jobs-list">
                        {jobs.map(job => (
                            <li key={job._id} className="job-card">
                                <h3 className="job-title">{job.title}</h3>
                                <p className="job-description">{job.description}</p>
                                <p className="job-company"><strong>Company:</strong> {job.company}</p>
                                <p className="job-location"><strong>Location:</strong> {job.location}</p>
                                {job.applicants.length > 0 && job.applicants.filter(item => item.userId === user).length > 0 ? <button disabled={true} className="apply-button" style={{opacity: '0.5', cursor: 'not-allowed'}}>Already Applied</button> : <Link to={`/job-apply/${job._id}`} className="apply-button">Apply</Link>}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No jobs available</p>
                )}
            </div>
        </div>
    );
};

export default JobsListing;
