export default function IssueCard({ issue, onUpdateStatus }) {
  return (
    <div className="border p-4 rounded mb-3">
      <h3 className="font-bold text-lg">{issue.title}</h3>
      <p>{issue.description}</p>
      <p>Status: <span className={issue.status === "Resolved" ? "text-green-600" : "text-red-600"}>{issue.status}</span></p>
      {issue.image && <img src={`http://127.0.0.1:5000/static/uploads/${issue.image}`} alt="issue" className="w-32 mt-2"/>}
      <p>Reported by: {issue.user}</p>
      <button className="mt-2 bg-blue-600 text-white p-1 rounded" onClick={()=>onUpdateStatus(issue.id)}>
        Mark as Resolved
      </button>
    </div>
  );
}
