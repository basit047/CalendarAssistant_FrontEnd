import { useState } from "react";

function Todo() {
  //   let tasks = ["Eating", "Exercise", "Sleeping"];

  const [tasks, setTasks] = useState(["Eating", "Exercise", "Sleeping"]);

  const [newTask, setNewTask] = useState("");

  const inputTaskChange = (event: any) => {
    setNewTask(event.target.value);
  };

  function addTask() {
    if (newTask) {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  }
  const deleteTask = (indexValue: number) => {
    let filteredArray = tasks.filter((_, index) => index !== indexValue);
    setTasks(filteredArray);
  };

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <form>
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            What needs to be done?
          </label>
        </h2>
        <input
          type="text"
          id="new-todo-input"
          className="input input__lg"
          name="text"
          autoComplete="off"
          value={newTask}
          onChange={inputTaskChange}
        />
        <button
          type="button"
          onClick={addTask}
          className="btn btn__primary btn__lg"
        >
          Add
        </button>
      </form>
      <div className="filters btn-group stack-exception">
        <button type="button" className="btn toggle-btn" aria-pressed="true">
          <span className="visually-hidden">Show </span>
          <span>all</span>
          <span className="visually-hidden"> tasks</span>
        </button>
        <button type="button" className="btn toggle-btn" aria-pressed="false">
          <span className="visually-hidden">Show </span>
          <span>Active</span>
          <span className="visually-hidden"> tasks</span>
        </button>
        <button type="button" className="btn toggle-btn" aria-pressed="false">
          <span className="visually-hidden">Show </span>
          <span>Completed</span>
          <span className="visually-hidden"> tasks</span>
        </button>
      </div>
      <h2 id="list-heading">{tasks.length} tasks remaining</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {tasks.map((task, index) => (
          <li className="todo stack-small">
            <div className="c-cb">
              <input id="todo-0" type="checkbox" defaultChecked />
              <label className="todo-label" htmlFor="todo-0">
                {task}
              </label>
            </div>
            <div className="btn-group">
              <button type="button" className="btn">
                Edit <span className="visually-hidden">{task}</span>
              </button>
              <button
                type="button"
                className="btn btn__danger"
                onClick={() => deleteTask(index)}
              >
                Delete <span className="visually-hidden">{task}</span>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
