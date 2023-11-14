import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Form, Row } from "react-bootstrap";
import CustomButton from "../components/CustomButtom";

interface Task {
  name: string;
  completed: boolean;
}

const TodoApp: React.FC = () => {
  const [taskInput, setTaskInput] = useState<string>("");
  const [todoList, setTodoList] = useState<Task[]>([]);

  const addTask = () => {
    if (taskInput.trim() !== "") {
      const newTask: Task = { name: taskInput, completed: false };
      setTodoList([...todoList, newTask]);
      setTaskInput("");
    }
  };

  const toggleTaskCompletion = (index: number) => {
    const updatedList = [...todoList];
    updatedList[index].completed = !updatedList[index].completed;
    setTodoList(updatedList);
  };

  const deleteTask = (index: number) => {
    const updatedList = todoList.filter((_, i) => i !== index);
    setTodoList(updatedList);
  };

  return (
    <Container>
      <h1>TO DO List</h1>
      <div className="input-group mb-3" style={{ width: 350 }}>
        <Form.Control
          type="text"
          className="form-control"
          placeholder="Informar atividade..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          required
        />
        <div className="input-group-append">
          <CustomButton backgroundColor="#24a0ed" onClick={addTask}>
            Salvar
          </CustomButton>
        </div>
      </div>
      <ul className="list-group">
        {todoList.map((task, index) => (
          <li key={index} className="list-group-item">
            <Row>
              <Col className="d-flex align-items-center">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(index)}
                />
                <span
                  className={`ml-2 ${task.completed ? "text-decoration-line-through" : ""
                    }`}
                >
                  {task.name}
                </span>
              </Col>
              <Col>
                <CustomButton
                  backgroundColor="#FE0000"
                  onClick={() => deleteTask(index)}
                >
                  Remover
                </CustomButton>
              </Col>
            </Row>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default TodoApp;
