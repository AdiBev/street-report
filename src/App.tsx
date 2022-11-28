import { OlMap } from "./components/ol/OlMap";
import OSM from "ol/source/OSM";
import { OlTileLayer } from "./components/ol/OlTileLayer";
import { useGeographic } from "ol/proj";

function App() {
  useGeographic();
  return (
    <div className="App" style={{ width: "100vw", height: "100vh" }}>
      <OlMap>
        <OlTileLayer source={new OSM()} />
      </OlMap>
    </div>
  );
}

export default App;
