import { Trash } from 'phosphor-react'

import styles from './Task.module.css';

interface TaskProps {
    title: string;
    isDone: boolean;
    taskId: string;
    onDeleteTask: (id: string) => void;
    onCheckTask: (id: string) => void;
}

export function Task({ title, taskId, onDeleteTask, onCheckTask }: TaskProps) {
    function handleDeleteTask() {
        onDeleteTask(taskId);
    }

    function handleCheckTask() {
        onCheckTask(taskId)
    }


    return (
        <div className={styles.taskContainer}>
            <div className={styles.taskContent}>
                <input
                    id={taskId}
                    type="checkbox"
                    onChange={handleCheckTask}
                />
                <label htmlFor={taskId}>{title}</label>
            </div>

            <button className={styles.deleteButton} onClick={handleDeleteTask}>
                <Trash size={24} />
            </button>

        </div>
    )
}