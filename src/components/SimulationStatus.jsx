import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = 'http://localhost:8080/api/v1/simulation/status'; // Ensure correct backend URL

function SimulationStatus() {
    const [status, setStatus] = useState({});
    const [error, setError] = useState(null);

    // Polling interval in milliseconds
    const POLLING_INTERVAL = 2000; // Poll every 2 seconds

    useEffect(() => {
        let intervalId;

        const fetchStatus = async () => {
            try {
                const response = await axios.get(API_URL);
                setStatus(response.data);
                setError(null); // Clear any previous errors
            } catch (error) {
                console.error('Error fetching simulation status:', error);
                setError('Failed to fetch simulation status.');
            }
        };

        // Initial fetch and set up polling
        fetchStatus();
        intervalId = setInterval(fetchStatus, POLLING_INTERVAL);

        // Cleanup polling on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="simulation-status">
            <h3>Simulation Status</h3>
            {error && <p className="text-danger">{error}</p>}
            <ul className="list-group">
                <li className="list-group-item">Tickets Added: {status.ticketsAdded || 0}</li>
                <li className="list-group-item">Tickets Sold: {status.ticketsSold || 0}</li>
                <li className="list-group-item">Tickets Left: {status.ticketsLeft || 0}</li>
            </ul>
        </div>
    );
}

export default SimulationStatus;
