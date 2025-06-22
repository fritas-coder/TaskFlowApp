import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../features/tasks/taskSlice";
import "../styles/taskForm.css";

export default function TaskForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    completed: false,
  });
  const dispatch = useDispatch();

  const onChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      return alert("Title is required");
    }

    // if (!formData.completed) {
    //   return alert("Please mark the task as completed before submitting.");
    // }

    console.log("Submitting formData:", formData);
    dispatch(createTask(formData));
    setFormData({ title: "", description: "", completed: false });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group1">
        <input
          type="text"
          name="title"
          value={formData.title}
          placeholder="Task title"
          onChange={onChange}
          required
        />
      </div>
      <div className="form-group1">
        <textarea
          type="text"
          name="description"
          value={formData.description}
          placeholder="Description"
          onChange={onChange}
        />
      </div>
      <label>
        <input
          type="checkbox"
          name="completed"
          checked={formData.completed}
          onChange={onChange}
          required
        />
        Mark as completed
      </label>
      <button type="submit">Add Task</button>
    </form>
  );
}
