
import Form from "./components/Form"
import SimulationStatus from "./components/SimulationStatus"


function App() {
  return (
    
      <div className="main-wrapper">
            {/* Configuration Form */}
            <div className="container">
                <Form />
            </div>

            {/* Simulation Status on the Right */}
            <div className="simulation-status">
                <SimulationStatus />
            </div>
        </div>   
      
    
  );
}

export default App;
