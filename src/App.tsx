
import { Header } from './components/Header';

import clipboardImg from './assets/Clipboard.svg';
import { PlusCircle } from 'phosphor-react';

import styles from './App.module.css';
import './global.css';
import { Task } from './components/Task';
import { ChangeEvent, FormEvent, useState } from 'react';

export function App() {
  const [tasks, setTasks] = useState([''])

  const [newTaskText, setNewTaskText] = useState('');

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    setTasks([...tasks, newTaskText]);

    setNewTaskText('');
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('');

    setNewTaskText(event.target.value);
  }

  return (
    <>
      <Header />

      <div className={styles.wrapper}>
        <form className={styles.taskForm} onSubmit={handleCreateNewTask}>
          <textarea
            placeholder="Adicione uma nova tarefa"
            value={newTaskText}
            onChange={handleNewTaskChange}
          />
          <button type="submit">Criar <PlusCircle size={16} /></button>
        </form>

        <div className={styles.numberOfTasks}>
          <p>Tarefas criadas <span>{tasks.length}</span></p>
          <p>Concluídas <span>0</span></p>
        </div>

        {tasks.map(task => (
          <Task
            task={task}
          />
        ))}

        <div className={styles.emptyContentBox}>
          <img src={clipboardImg} alt="Imagem de uma prancheta" />
          <p>
            <strong>Você ainda não tem tarefas cadastradas</strong>
            Crie tarefas e organize seus itens a fazer
          </p>
        </div>
      </div>

    </>
  )
}

