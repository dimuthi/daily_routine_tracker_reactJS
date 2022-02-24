import { FaTimes } from "react-icons/fa";
const Task = (props) => {
  return (
    <div
      className={`task ${props.task.reminder ? "reminder" : ""}`}
      onDoubleClick={() => props.onToggle(props.task.id)}
    >
      <h3 key={props.key}>
        {props.task.text}{" "}
        <FaTimes
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => props.deleteTask(props.task.id)}
        />
      </h3>
      <p>{props.task.day}</p>
    </div>
  );
};
export default Task;
