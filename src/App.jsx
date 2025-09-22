import "./App.css";
import Landing from "./pages/Landing/Landing";
import Navbar from "./components/layout/Navbar";
import DotGrid from "./components/shared/DotGrid/DotGrid";

function App() {
    return (
        <div className="App">
            <DotGrid />
            <Navbar />
            <Landing />
        </div>
    );
}

export default App;
