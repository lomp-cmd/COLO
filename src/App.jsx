import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Bitte eine Datei auswählen!");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      // Wir nutzen Replicate API via Serverless-Proxy
      const response = await axios.post("/api/colorize", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResult(response.data.output_url); // URL des kolorierten Bildes
    } catch (err) {
      console.error(err);
      alert("Fehler beim Kolorieren!");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">🎨 Linienzeichnung Kolorierer</h1>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        {loading ? "Koloriere..." : "Kolorieren"}
      </button>

      {result && (
        <div className="mt-6">
          <img src={result} alt="Ergebnis" className="rounded-lg shadow-lg max-w-md" />
        </div>
      )}
    </div>
  );
}

export default App;
