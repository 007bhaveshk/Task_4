import React, { useState } from 'react';
import './ToDoList.css';

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim() === '') return;
    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask('');
  };

  const handleCompleteTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (index) => {
    // Add a class to trigger the deletion effect
    const taskItem = document.getElementById(`task-${index}`);
    taskItem.classList.add('deleting');

    // Remove the task after the effect has played
    setTimeout(() => {
      const updatedTasks = tasks.filter((_, i) => i !== index);
      setTasks(updatedTasks);
    }, 500); // Duration of the CSS transition
  };

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
        />
        <button type="submit" className="add-task-button">Add Task</button>
      </form>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li
            key={index}
            id={`task-${index}`}
            className={`task-item ${task.completed ? 'completed' : ''}`}
          >
            <span className="task-text">{task.text}</span>
            <div className="task-actions">
              <button onClick={() => handleCompleteTask(index)}>
                {task.completed ? 'Undo' : 'Complete'}
              </button>
              <button className="delete-button" onClick={() => handleDeleteTask(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
