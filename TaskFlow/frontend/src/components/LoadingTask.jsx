import "../styles/loadingTask.css";

export default function LoadingTask() {
  return (
    <div style={{alignItems:"center",textAlign:"center",}}>
      <h3>
        Loading tasks<span className="dots">...</span>
      </h3>
    </div>
  );
}
