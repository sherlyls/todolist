import React, { useState } from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { nanoid } from "nanoid";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Complete: (task) => task.completed
}

const FILTER_NAME = Object.keys(FILTER_MAP);
console.log(FILTER_NAME, "difilter")


function App(props) {
  const [tasks, setTasks] = useState(props.tasks)
  const [filter, setFilter] = useState('All')

  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false }
    setTasks([...tasks, newTask])
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed }
      }
      return task;
    })
    setTasks(updatedTasks)
    console.log(id, "ya")
  }

  function editTask(id, newName) {
    const editTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name : newName}
      }
      return task;
    })
    setTasks(editTaskList)
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id)
    setTasks(remainingTasks)
  }

  const taskList = tasks?.map((task) => (
    <Todo
      key={task.id}
      id={task.id}
      name={task.name}
      completed={task.completed}
      toggleTaskCompleted={toggleTaskCompleted}
      editTask = {editTask}
      deleteTask = {deleteTask}
       />)
  )

  const filterList = FILTER_NAME?.map((name) =>  (
    <FilterButton 
      key={name} 
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
      />
  ))
  
  const taskNoun = taskList.length != 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${taskNoun} remaining`;

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">

        {taskList}
      </ul>
    </div>
  );
}

export default App;

