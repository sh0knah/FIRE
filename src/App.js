import logo from './logo.svg';
import './App.css';
import Fire from './Fire'


function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Fire />
      </header>
    </div>
  );
}

export default App;
