import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTasks, resetTask } from "../features/tasks/taskSlice";
import LoadingTask from "../components/LoadingTask"
import TaskItem from "./TaskItem";

export default function TaskList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { tasks, isLoading, isError, message } = useSelector(
    (state) => state.tasks
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    dispatch(getTasks());

    return () => {
      dispatch(resetTask());
    };
  }, [navigate, dispatch, user]);

  if (isLoading)
    return <LoadingTask/>;

  if (isError) return <p>Error:{message}</p>;

  return (
    <div className="taskList">
      <div style={{ textAlign: "center", alignItems: "center" }}>
        <h2>Your Tasks</h2>{" "}
      </div>
      {tasks.length === 0 ? (
        <div style={{ textAlign: "center", alignItems: "center" }}>
          {" "}
          <p>No Task Found</p>
        </div>
      ) : (
        <ul>
          {tasks.map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </ul>
      )}
    </div>
  );
}
