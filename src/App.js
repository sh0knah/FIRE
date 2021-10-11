import './App.css';
import Fire from './Fire'


function App() {

   return (
    <div className="App">
      <header className="App-header">
        <img src='./planner.png' className="App-logo" alt="logo" />
        <div className="App-title">
          FIRE Calculator
        </div>
      </header>
      <div className="App-body">
        <Fire />
      </div>
    </div>
  );
}

export default App;
