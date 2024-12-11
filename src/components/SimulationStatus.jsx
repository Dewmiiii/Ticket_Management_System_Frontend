import axios from "axios";
import { useEffect,useState } from "react";

const API_URL = 'http://localhost:8081/api/v1/simulation/status';

function SimulationStatus() {
    const [status, setStatus] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await axios.get(API_URL);
                setStatus(response.data);
            } catch (error) {
                console.error('Error fetching simulation status:', error);
                setError('Failed to fetch simulation status.');
            }
        };

        fetchStatus();
    }, []);

    if (error) {
        return <p className="text-danger">{error}</p>;
    }

    return (
        <div className="mt-4">
            <h3>Simulation Status</h3>
            <ul className="list-group">
                <li className="list-group-item">Tickets Added: {status.ticketsAdded || 0}</li>
                <li className="list-group-item">Tickets Sold: {status.ticketsSold || 0}</li>
                <li className="list-group-item">Tickets Left: {status.ticketsLeft || 0}</li>
            </ul>
        </div>
    );
}

export default SimulationStatus;