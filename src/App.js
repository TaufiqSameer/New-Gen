import { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc , getDocs } from "firebase/firestore";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function App() {
  const [device, setDevice] = useState("");
  const [temp, setTemp] = useState(0);
  const [tim, setTime] = useState(new Date().toLocaleTimeString());
  setInterval(() => {
    setTime(new Date().toLocaleTimeString(), 1000);
  });

  const handleSubmit = async () => {
    if (!device) {
      alert("Please enter a device name!");
      return;
    }

    try {
      await addDoc(collection(db, "sensorData"), {
        device: device,
        temperature: temp,
        time: new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString(),
      });
      alert("Data sent to Firebase!");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to send data");
    }
  };

  const handleDownload = async () => {
    const querySnapshot = await getDocs(collection(db, "sensorData"));
    const data = querySnapshot.docs.map((doc) => doc.data());

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "SensorData");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(blob, "data.xlsx");
  };
  return (
    <div>
      <h1>Enter device name</h1>
      <input
        type="text"
        placeholder="Device ur using..."
        value={device}
        onChange={(e) => setDevice(e.target.value)}
      ></input>
      <h1>Enter Temperature</h1>
      <input
        type="range"
        min={0}
        max={100}
        onChange={(e) => setTemp(Number(e.target.value))}
      ></input>
      <h3>{temp}</h3>
      <h2>Current Time</h2>
      <h2>{tim}</h2>
      <button type="submit" onClick={handleSubmit}>
        Sent to database
      </button>
      <button onClick={handleDownload}>Download as Excel</button>
    </div>
    
  );
}

export default App;
