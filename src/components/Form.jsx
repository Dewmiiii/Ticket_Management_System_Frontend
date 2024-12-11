import axios from "axios";
import { useState } from "react";
import "../App.css";

function Form() {
    const [config, setConfig] = useState({
        totalTickets: '',
        ticketReleaseRate: '',
        customerRetrievalRate: '',
        maxTicketCapacity: '',
        numVendors: '',
        numCustomers: '',
    });

    const [errors, setErrors] = useState({}); // State for validation errors

    const handleChange = (e) => {
        const { name, value } = e.target;
        setConfig({ ...config, [name]: value });

        // Validate inputs immediately
        validateField(name, value);
    };

    // Validation rules
    const validateField = (name, value) => {
        let error = '';
        if (!value) {
            error = `${name} is required.`;
        } else if (['totalTickets', 'ticketReleaseRate', 'customerRetrievalRate', 'maxTicketCapacity', 'numVendors', 'numCustomers'].includes(name)) {
            if (value <= 0) {
                error = `${name} must be a positive number.`;
            }
        }

        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    const validateForm = () => {
        const newErrors = {};
        Object.keys(config).forEach((key) => {
            validateField(key, config[key]);
            if (!config[key]) {
                newErrors[key] = `${key} is required.`;
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const handleStart = async (e) => {
        e.preventDefault();
        if (!validateForm()) return; // Stop if form is invalid
        try {
            const response = await axios.post("http://localhost:8080/api/v1/simulation/post", config);
            console.log('Simulation started:', response.data);
            alert('Simulation started successfully!');
        } catch (error) {
            console.error('Error starting simulation:', error);
            alert('Failed to start simulation.');
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!validateForm()) return; // Stop if form is invalid
        try {
            const response = await axios.post("http://localhost:8080/api/v1/simulation/save-config", config);
            console.log('Configuration saved:', response.data);
            alert('Configuration saved successfully!');
        } catch (error) {
            console.error('Error saving configuration:', error);
            alert('Failed to save configuration.');
        }
    };

    const handleStop = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/v1/simulation/stop-simulation");
            console.log('Simulation stopped:', response.data);
            alert('Simulation stopped successfully!');
        } catch (error) {
            console.error('Error stopping simulation:', error);
            alert('Failed to stop simulation.');
        }
    };

    return (
        <div>
            <h1>Ticket Management System</h1>
            <form className="mt-4">
                <h2>Configuration</h2>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="totalTickets" className="form-label">Total Tickets</label>
                        <input
                            type="number"
                            className="form-control"
                            name="totalTickets"
                            placeholder="Enter total tickets"
                            value={config.totalTickets}
                            onChange={handleChange}
                        />
                        {errors.totalTickets && <small className="text-danger">{errors.totalTickets}</small>}
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="ticketReleaseRate" className="form-label">Ticket Release Rate</label>
                        <input
                            type="number"
                            className="form-control"
                            name="ticketReleaseRate"
                            placeholder="Enter ticket release rate"
                            value={config.ticketReleaseRate}
                            onChange={handleChange}
                            
                        />
                        {errors.ticketReleaseRate && <small className="text-danger">{errors.ticketReleaseRate}</small>}
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="customerRetrievalRate" className="form-label">Customer Retrieval Rate</label>
                        <input
                            type="number"
                            className="form-control"
                            name="customerRetrievalRate"
                            placeholder="Enter customer retrieval rate"
                            value={config.customerRetrievalRate}
                            onChange={handleChange}
                        />
                        {errors.customerRetrievalRate && <small className="text-danger">{errors.customerRetrievalRate}</small>}
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="maxTicketCapacity" className="form-label">Max Ticket Capacity</label>
                        <input
                            type="number"
                            className="form-control"
                            name="maxTicketCapacity"
                            placeholder="Enter maximum ticket capacity"
                            value={config.maxTicketCapacity}
                            onChange={handleChange}
                        />
                        {errors.maxTicketCapacity && <small className="text-danger">{errors.maxTicketCapacity}</small>}
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="numVendors" className="form-label">Number of Vendors</label>
                        <input
                            type="number"
                            className="form-control"
                            name="numVendors"
                            placeholder="Enter number of vendors"
                            value={config.numVendors}
                            onChange={handleChange}
                        />
                        {errors.numVendors && <small className="text-danger">{errors.numVendors}</small>}
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="numCustomers" className="form-label">Number of Customers</label>
                        <input
                            type="number"
                            className="form-control"
                            name="numCustomers"
                            placeholder="Enter number of customers"
                            value={config.numCustomers}
                            onChange={handleChange}
                        />
                        {errors.numCustomers && <small className="text-danger">{errors.numCustomers}</small>}
                    </div>
                </div>
                <div className="d-flex justify-content-between mt-4">
                    <button type="button" className="btn btn-primary me-2" onClick={handleStart}>
                        Start Simulation
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={handleSave}>
                        Save Configuration
                    </button>
                    <button type="button" className="btn btn-danger" onClick={handleStop}>
                        Stop Simulation
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Form;
