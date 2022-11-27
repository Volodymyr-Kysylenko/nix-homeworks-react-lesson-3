import { useRef, useState, useEffect } from 'react';
import edit from '../images/edit.svg';
import trash from '../images/trash.svg';

function ToDoItem({ todo, updateTask, removeTask }) {
    const [title, setTitle] = useState(todo.title);
    const [task, setTask] = useState(todo.task);
    const [date, setDate] = useState(new Date(todo.updateDate));
    const [status, setStatus] = useState(todo.status);
    const [taskClass, setTaskClass] = useState('todoItem');
    const [taskHeight, setTaskHeight] = useState('auto');

    let creationDate = new Date(todo.creationDate);

    let titleRef = useRef(title);
    let taskRef = useRef(task);

    useEffect(() => {
        if (todo.status === '2') {
            setTaskClass('todoItem orange');
        } else if (todo.status === '3') {
            setTaskClass('todoItem green');
        } else {
            setTaskClass('todoItem');
        }

        let scrollHeight = parseInt(document.querySelector('.taskInput').scrollHeight);
        console.log(scrollHeight);
        if (scrollHeight > 58) { 
            setTaskHeight(scrollHeight - 4 + 'px');
        } else {
            setTaskHeight('28px');
        }
    }, []);

    function changeTitle(event) {
        let title = event.currentTarget;
        setTitle(title.value);
        updateTask(todo.id, 'title', title.value);
    }

    function blurTitle(event) {
        let value = event.currentTarget.value;
        if (value === titleRef.current) return;
        (value) ? setTitle(value) : setTitle('No title');
        titleRef.current = title;
        setDate(new Date());
        updateTask(todo.id, 'updateDate', new Date().toString());
    }

    function changeTask(event) {
        let task = event.currentTarget;
        setTask(task.value);
        updateTask(todo.id, 'task', task.value);
        task.style.height = '8px';
        task.style.height = (task.scrollHeight) + 'px';
    }

    function blurTask(event) {
        let value = event.currentTarget.value;

        if (value === taskRef.current) return;

        (value) ? setTask(value) : setTask('No description');

        taskRef.current = title;

        setDate(new Date());
        updateTask(todo.id, 'updateDate', new Date().toString());
    }

    function statusChange(event) {
        let status = event.target.value;
        setStatus(status);

        if (status === '2') {
            setTaskClass('todoItem orange');
        } else if (status === '3') {
            setTaskClass('todoItem green');
        } else {
            setTaskClass('todoItem');
        }

        setDate(new Date());
        updateTask(todo.id, 'status', status);
    }

    return (
        <div
            className={taskClass}
            key={todo.id} >
            <div className='title'>
                <img 
                    src={edit} 
                    alt='Edit' />
                <input
                    className='titleInput'
                    value={title}
                    onChange={changeTitle}
                    onBlur={blurTitle}
                />
            </div>
            <div className='task'>
                <img 
                    src={edit} 
                    alt='Edit' />
                <textarea
                    className='taskInput'
                    style={{ height: taskHeight }}
                    value={task}
                    onChange={changeTask}
                    onBlur={blurTask}
                />
            </div>
            <div className='bottom'>
                <select
                    value={status}
                    onChange={statusChange}
                    data-color={status}
                >
                    <option value='1'>Open</option>
                    <option value='2'>In Progress</option>
                    <option value='3'>Done</option>
                </select>
                <div>
                    <div>
                        Create: {creationDate.toLocaleDateString('uk-UA') + ' ' + creationDate.toLocaleTimeString('uk-UA')}
                    </div>
                    <div>
                        Update: {date.toLocaleDateString('uk-UA') + ' ' + date.toLocaleTimeString('uk-UA')}
                    </div>
                </div>
            </div>
            <div 
                className='delete' 
                onClick={() => removeTask(todo.id)}>
                <img 
                    src={trash} 
                    alt='Delete' />
            </div>
        </div>
    )
}

export default ToDoItem;