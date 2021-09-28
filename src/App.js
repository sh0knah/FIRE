import logo from './logo.svg';
import './App.css';
import Fire from './Fire'


function App() {

   return (
    <div className="App">
      <header className="App-header">
        <img src='./planner.png' className="App-logo" alt="logo" />
        <div className="App-title">
          Fire Calculator
        </div>
      </header>
      <div className="App-body">
        <Fire />
      </div>
    </div>
  );
}

export default App;
