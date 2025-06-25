import "../styles/dashboard.css";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="dash">
      <div className="dashboard-form">
        <h1
          style={{
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif", letterSpacing:4,fontSize:"45px"
          }}
        >
          Dashboard
        </h1>
        <h2>Welcome {user && user.name}</h2>
        <h4>Start Creating Tasks</h4>
        <TaskForm />
      </div>
      <TaskList />
    </div>
  );
}
