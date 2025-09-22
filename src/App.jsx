import "./App.css";
import Landing from "./pages/Landing/Landing";
import Navbar from "./components/layout/Navbar";
import DotGrid from "./components/shared/DotGrid/DotGrid";
import DomeGallery from "./components/shared/DomeGallery/DomeGallery";

function App() {
    return (
        <div className="App">
            <DotGrid />
            <Navbar />
            <Landing />
            <div
                className="Dome-Container"
                style={{ width: "100vw", height: "100vh" }}
            >
                <DomeGallery />
            </div>
        </div>
    );
}

export default App;
