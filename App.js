import React from "react";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer, defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// Estilos del visor
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const App = () => {
  const defaultLayout = defaultLayoutPlugin();

  return (
    <div style={{ height: "100vh" }}>
      {/* Worker necesario para renderizar el PDF */}
      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.6.172/build/pdf.worker.min.js`}>
        <div
          style={{
            border: "1px solid #ccc",
            height: "100%",
            width: "100%",
          }}
        >
          {/* Ruta del archivo PDF */}
          <Viewer fileUrl="/Presentacion_de_servicios_tormaq.pdf" plugins={[defaultLayout]} />
        </div>
      </Worker>
    </div>
  );
};

export default App;
