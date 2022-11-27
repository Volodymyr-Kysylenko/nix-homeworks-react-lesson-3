import { useState } from 'react';

function ToDoForm(props) {
    const [title, setTitle] = useState('');
    const [task, setTask] = useState('');

    function changeTitle(event) {
        setTitle(event.currentTarget.value);
    }

    function changeTask(event) {
        setTask(event.currentTarget.value);
    }

    function addTask(event) {
        event.preventDefault();
        props.add(title, task);
        props.close();
        setTask('');
        setTitle('');
    }

    return (
        <div className='formPopup'>
            <h2>
                Add new task:
            </h2>
            <form className='toDoForm' onSubmit={addTask}>
                <label>
                    Title
                </label>
                <input
                    value={title}
                    type='text'
                    onChange={changeTitle}
                    placeholder="Title"
                />
                <label>
                    Description
                </label>
                <textarea
                    value={task}
                    type='text'
                    onChange={changeTask}
                    placeholder='Description'
                />
                <button>Add Task</button>
            </form>
            <button
                className='closeToDoFormButton'
                onClick={() => props.close()}>
                ×
            </button>
        </div>
    )
}

export default ToDoForm;