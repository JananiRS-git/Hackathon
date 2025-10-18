import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import ReportForm from "./components/ReportForm";
import IssueCard from "./components/IssueCard";
import { getIssues, updateIssueStatus } from "./services/api";

export default function App() {
  const [user, setUser] = useState(null);
  const [issues, setIssues] = useState([]);

  const fetchIssues = async () => {
    try {
      const res = await getIssues();
      setIssues(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => { fetchIssues(); }, []);

  const handleUpdateStatus = async (id) => {
    try {
      await updateIssueStatus(id, { status: "Resolved" });
      fetchIssues();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  if (!user) return <LoginForm onLogin={setUser} />;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}</h1>
      {user.role === "citizen" && <ReportForm userId={user.id} refreshIssues={fetchIssues}/>}
      <h2 className="text-xl font-bold mt-6 mb-3">All Issues</h2>
      {issues.map((issue) => (
        <IssueCard key={issue.id} issue={issue} onUpdateStatus={handleUpdateStatus}/>
      ))}
    </div>
  );
}
