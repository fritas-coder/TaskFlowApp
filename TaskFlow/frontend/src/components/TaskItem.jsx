import { formatDistanceToNow } from "date-fns";
import { useDispatch } from "react-redux";
import { deleteTask } from "../features/tasks/taskSlice";

export default function TaskItem({ task }) {
  const dispatch = useDispatch();
  return (
    <div className="taskItem">
      <li className="task-item">
        <span className="title">
          <h3>{task.title}:</h3>
          <button onClick={() => dispatch(deleteTask(task._id))} title="bin">🗑</button>
        </span>
          {task.description && <p>{task.description}</p>}
        <span style={{display:"flex",justifyContent:"space-between",fontSize:12,fontWeight:"bolder"}}>
          <p>
            Date: {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
          </p>
          <p>Status: {task.completed ? "Completed" : "Not Completed"}</p>
        </span>
      </li>
    </div>
  );
}
