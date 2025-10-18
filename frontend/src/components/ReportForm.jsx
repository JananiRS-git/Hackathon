import { useState } from "react";
import { reportIssue } from "../services/api";

export default function ReportForm({ userId, refreshIssues }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    if (image) formData.append("image", image);

    try {
      await reportIssue(formData);
      alert("Issue reported!");
      setTitle(""); setDescription(""); setLatitude(""); setLongitude(""); setImage(null);
      refreshIssues();
    } catch (err) {
      alert("Failed to report issue.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-6 p-6 border rounded">
      <h2 className="text-xl font-bold mb-4">Report Civic Issue</h2>
      <input type="text" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} className="w-full p-2 mb-3 border" required/>
      <textarea placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)} className="w-full p-2 mb-3 border" required></textarea>
      <input type="text" placeholder="Latitude" value={latitude} onChange={(e)=>setLatitude(e.target.value)} className="w-full p-2 mb-3 border" required/>
      <input type="text" placeholder="Longitude" value={longitude} onChange={(e)=>setLongitude(e.target.value)} className="w-full p-2 mb-3 border" required/>
      <input type="file" onChange={(e)=>setImage(e.target.files[0])} className="mb-3"/>
      <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">Submit</button>
    </form>
  );
}
