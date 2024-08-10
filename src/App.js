import React from 'react';
import Scene from './components/Scene'; // Import the Scene component from the components folder
import './css/App.css'; // Import the CSS file for styling

const App = () => {
  return (
    // Container div that takes up the full viewport height and width
    <div style={{ height: '100vh', width: '100vw' }}>
      <Scene /> {/* Render the Scene component inside the container */}
    </div>
  );
};

export default App; // Export the App component for use in other parts of the application
