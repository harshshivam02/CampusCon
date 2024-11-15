import React, { useState, useEffect } from 'react';
import { Search, MapPin } from 'lucide-react';

function JobSearchAndDetails() {
    const [query, setQuery] = useState('');
    const [location, setLocation] = useState('');
    const [jobs, setJobs] = useState([]);
    const [selectedJobId, setSelectedJobId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchJobs = async () => {
        const url = `https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=20cae983&app_key=9d9229d509375b4b05f80184a5637dce&what=${query}&where=${location}`;
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const result = await response.json();
            setJobs(result.results || []);
        } catch (error) {
            setError(error.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    const handleJobClick = (jobId) => {
        setSelectedJobId(selectedJobId === jobId ? null : jobId);
    };

    useEffect(() => {
        if (query || location) {
            fetchJobs();
        }
    }, [query, location]);

    return (
        <div className="flex min-h-screen bg-gray-50 p-5">
            {/* Sidebar */}
            <div className="w-1/4 bg-white p-5">
                <h2 className="text-lg font-bold">Sidebar</h2>
                {/* Sidebar content here */}
            </div>

            {/* Job Search and Details */}
            <div className="w-3/4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ml-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                    Job Search
                </h2>

                <div className="space-y-4 mb-8">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search for jobs..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md 
                                     bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 
                                     focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        />
                    </div>
                    <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Enter location..."
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md 
                                     bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 
                                     focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        />
                    </div>
                    <button
                        onClick={fetchJobs}
                        className="w-full bg-blue-600 text-white py-2 px-6 rounded-md 
                                 hover:bg-blue-700 transition-colors duration-300 focus:outline-none 
                                 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Search Jobs
                    </button>
                </div>

                {loading ? (
                    <div className="text-center text-blue-600 text-lg">Loading...</div>
                ) : error ? (
                    <div className="bg-red-500 text-white p-3 rounded-md text-center">
                        Error: {error}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {jobs.length > 0 ? (
                            jobs.map((job) => (
                                <div
                                    key={job.id}
                                    className="bg-gray-50 p-4 rounded-lg cursor-pointer transform transition-all 
                                             duration-300 hover:bg-gray-100 hover:-translate-y-1 hover:shadow-md"
                                    onClick={() => handleJobClick(job.id)}
                                >
                                    <h4 className="text-lg font-semibold text-blue-600">
                                        {job.title}
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                        {job.company.display_name}
                                    </p>
                                    <p className="text-sm text-gray-600 flex items-center gap-1">
                                        <MapPin className="w-4 h-4" />
                                        {job.location.display_name}
                                    </p>

                                    {selectedJobId === job.id && (
                                        <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-600 
                                                      transform transition-all duration-300">
                                            <p className="mb-2">{job.description}</p>
                                            <p className="mb-2">
                                                <strong>Category:</strong> {job.category.label}
                                            </p>
                                            <p className="mb-4">
                                                <strong>Contract Type:</strong> {job.contract_type || 'N/A'}
                                            </p>
                                            <a
                                                href={job.redirect_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-block bg-blue-600 text-white py-2 px-6 rounded-md 
                                                         hover:bg-blue-700 transition-colors duration-300"
                                            >
                                                Apply Now
                                            </a>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-grey-600">
                                No jobs found for this query and location.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default JobSearchAndDetails;
