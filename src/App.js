import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState, useEffect } from "react";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import Home from "./components/Home";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [buttonText, setButtonText] = useState("Add");
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks/");
    const data = await res.json();
    console.log(data);
    return data;
  };

  const getTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    console.log(data);
    return data;
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const taskFromServer = await getTasks();
      setTasks(taskFromServer);
    };
    fetchTasks();
  }, []);

  const showForm = () => {
    setShowAddTask(!showAddTask);
    //  if(!showAddTask) {
    //   setButtonText(text);
    // }
  };

  const deleteTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });
    res.status === 200
      ? setTasks(tasks.filter((task) => task.id !== id))
      : alert("Error Deleting This Task");
    console.log("delete");
  };

  // const changeButton = () => {
  //   if(!showAddTask) {
  //     setButtonText("Cancel");
  //   }
  // }

  const addTask = async (task) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();

    setTasks([...tasks, data]);
    //(tasks.concat(task));

    // const id = Math.floor(Math.random() * 10000) + 1;
    // const newTask = { id, ...task };
    // setTasks([...tasks, newTask]);
    // console.log(task);
  };

  const toggleReminder = async (id) => {
    const taskToToggle = await getTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();
    setTasks(
      tasks.map((task) =>
        task.id == id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  return (
    <Router>
      <div className="container">
        <Header
          title="Daily Routine"
          onShow={showForm}
          buttonText={showAddTask}
        />
        <Routes>
          <Route
             path='/'
             element={  
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    deleteTask={deleteTask}
                    onToggle={toggleReminder}
                  />
                ) : (
                  <p>No tasks to show</p>
                )}
              </>
            }
          />
          <Route path="/home" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
