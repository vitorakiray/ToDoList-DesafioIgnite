import { Header } from './components/Header';
import { Task } from './components/Task';
import { ChangeEvent, FormEvent, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
import clipboardImg from './assets/Clipboard.svg';
import { PlusCircle } from 'phosphor-react';

import styles from './App.module.css';
import './global.css';

export function App() {
  const [tasks, setTasks] = useState([{
    id: uuidv4(),
    title: 'Primeira tarefa',
    isDone: false,
  }])

  const [newTaskText, setNewTaskText] = useState('');

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    setTasks([{
      id: uuidv4(),
      title: newTaskText,
      isDone: false,
    }, ...tasks]);

    setNewTaskText('');
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('');

    setNewTaskText(event.target.value);
  }

  function deleteTask(taskIdToDelete: string) {
    const taskWithoutDeletedOne = tasks.filter(task => {
      return task.id !== taskIdToDelete;
    })

    setTasks(taskWithoutDeletedOne);
  }

  function handleCheckTask(taskIdToCheck: string) {
    const tasksWithUpdatedTaskChecked = tasks.map(task => {
      if (task.id === taskIdToCheck) {
        return {
          ...task,
          isDone: true
        }
      } else {
        return {...task}
      }
    })

    setTasks(tasksWithUpdatedTaskChecked)
    console.log(tasksWithUpdatedTaskChecked)
  }

  const quantityOfTasks = tasks.length;
  const isQuantityOfTasksZero = quantityOfTasks === 0;

  const numberOfDoneTasks = tasks.filter(task => task.isDone).length;
  const isQuantityOfDoneTasksZero = numberOfDoneTasks === 0;

  return (
    <>
      <Header />

      <div className={styles.wrapper}>

        <form className={styles.taskForm} onSubmit={handleCreateNewTask}>
          <input
            placeholder="Adicione uma nova tarefa"
            value={newTaskText}
            onChange={handleNewTaskChange}
          />
          <button type="submit">Criar <PlusCircle size={16} /></button>
        </form>

        <div className={styles.numberOfTasks}>
          <div>
            <p>Tarefas criadas</p>
            <span>{quantityOfTasks}</span>
          </div>

          <div>
            <p>Concluídas </p>
            <span>{isQuantityOfDoneTasksZero ? '0' : `${numberOfDoneTasks} de ${quantityOfTasks}`}</span>
          </div>
        </div>

        {isQuantityOfTasksZero ?
          <div className={styles.emptyContentBox}>
            <img src={clipboardImg} alt="Imagem de uma prancheta" />
            <p>
              <strong>Você ainda não tem tarefas cadastradas</strong>
              Crie tarefas e organize seus itens a fazer
            </p>
          </div>
          :
          tasks.map(task => (
            <Task
              key={task.id}
              taskId={task.id}
              isDone={task.isDone}
              title={task.title}
              onDeleteTask={deleteTask}
              onCheckTask={handleCheckTask}
            />
          ))
        }



      </div>

    </>
  )
}

