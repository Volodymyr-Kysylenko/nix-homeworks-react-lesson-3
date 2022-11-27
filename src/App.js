import { useState } from 'react';

import ToDoForm from './components/ToDoForm';
import ToDoItem from './components/ToDoItem';

function App() {
  const [todos, setTodos] = useState([
    {
      id: Math.random().toString(36).substring(2, 12),
      title: 'Клікни на мене, щоб відредагувати',
      task: 'Клікни на мене, щоб відредагувати, розміри цього поля будуть адаптовуватись',
      status: '3',
      creationDate: new Date(2022, 10, 15, 18, 23, 0).toString(),
      updateDate: new Date(2022, 10, 26, 12, 45, 0).toString()
    },
    {
      id: Math.random().toString(36).substring(2, 12),
      title: 'Покормити кота',
      task: 'Не забути покормити кота сусідів. Він їсть тільки відбірну мраморну телятину з Голандії',
      status: '1',
      creationDate: new Date(2022, 10, 12, 13, 23, 0).toString(),
      updateDate: new Date(2022, 10, 25, 13, 23, 0).toString()
    },
    {
      id: Math.random().toString(36).substring(2, 12),
      title: 'Почати ходити в спортзал',
      task: 'З понеділка точно почну',
      status: '2',
      creationDate: new Date(2022, 10, 17, 6, 35, 0).toString(),
      updateDate: new Date(2022, 10, 24, 6, 35, 0).toString()
    },
    {
      id: Math.random().toString(36).substring(2, 12),
      title: 'Зробити домашнє завдання по React',
      task: 'Cподіваюсь, світло не вимкнуть знову',
      status: '3',
      creationDate: new Date(2022, 10, 6, 23, 23, 0).toString(),
      updateDate: new Date(2022, 10, 23, 23, 23, 0).toString()
    }
  ]);

  const [filter, setFilter] = useState(false);
  const [createParam, setCreateParam] = useState(null);
  const [updateParam, setUpdateParam] = useState(null);

  const [form, setForm] = useState(false);

  function addTodos(title, task) {
    const newItem = {
      id: Math.random().toString(36).substring(2, 12),
      title:  (title === '') ? 'New task' : title,
      task: (task === '') ? 'New task' : task,
      status: '1',
      creationDate: new Date().toString(),
      updateDate: new Date().toString(),
    }

    setTodos([newItem, ...todos]);
    setFilter(false);
    clearSorting();
  }

  function removeTask(id) {
    setTodos([...todos.filter((todo) => todo.id !== id)])
  }

  function closeFrom() {
    setForm('');
  }

  function updateTask(id, prop, val) {
    setTodos([
      ...todos.map((todo) =>
        todo.id === id ? { ...todo, [prop]: val } : { ...todo }
      )
    ]);
    clearSorting();
  }

  function clearSorting() {
    document.querySelectorAll('.sort button').forEach(el => el.classList = []);
  }

  function sortCreation(event) {
    setUpdateParam(null);

    const create = event.currentTarget;
    const update = create.nextElementSibling;

    create.classList.add('active');
    update.classList.remove('active');

    create.classList.remove('newest');
    create.classList.remove('oldest');
    update.classList.remove('newest');
    update.classList.remove('oldest');

    let array = [...todos];
    array.sort((a, b) => {
      let x = Date.parse(a.creationDate);
      let y = Date.parse(b.creationDate);
      if (createParam === null || createParam === 'oldest') {
        setCreateParam('newest');
        create.classList.add('newest');
        return y - x;
      } else {
        setCreateParam('oldest');
        create.classList.add('oldest');
        return x - y;
      }
    });

    setTodos(array);
  }

  function sortUpdate(event) {
    setCreateParam(null);

    const update = event.currentTarget;
    const create = update.previousElementSibling;

    update.classList.add('active');
    create.classList.remove('active');

    update.classList.remove('newest');
    update.classList.remove('oldest');
    create.classList.remove('newest');
    create.classList.remove('oldest');

    let array = [...todos];
    array.sort((a, b) => {
      let x = Date.parse(a.updateDate);
      let y = Date.parse(b.updateDate);
      if (updateParam === null || updateParam === 'oldest') {
        setUpdateParam('newest');
        update.classList.add('newest');
        return y - x;
      } else {
        setUpdateParam('oldest');
        update.classList.add('oldest');
        return x - y;
      }
    });

    setTodos(array);
  }

  function showForm() {
    setForm(
      <div className='wrapper'>
        <ToDoForm add={addTodos} close={closeFrom} />
      </div>
    )
  }

  return (
    <div className='app'>
      <div className='showToDoForm'>
        <h1>
          Todo List
        </h1>
        <button
          className='showToDoFormButton'
          onClick={showForm}>
          + Add New Task
        </button>
      </div>
      <div className='control'>
        <div className='filter'>
          <span>
            Filter by:
          </span>
          <button onClick={() => setFilter(false)} className={(filter === false) ? 'active' : ''}>
            All Tasks
          </button>
          <button onClick={() => setFilter('1')} className={(filter === '1') ? 'active' : ''}>
            Open Tasks
          </button>
          <button onClick={() => setFilter('2')} className={(filter === '2') ? 'active' : ''}>
            In Progress Tasks
          </button>
          <button onClick={() => setFilter('3')} className={(filter === '3') ? 'active' : ''}>
            Done Tasks
          </button>
        </div>
        <div className='sort'>
          <span>
            Sort by:
          </span>
          <button onClick={sortCreation}>
            Creation Date
          </button>
          <button onClick={sortUpdate}>
            Update Date
          </button>
        </div>
      </div>
      {todos.map((todo) => {
        if (filter === false) {
          return (
            <ToDoItem
              key={todo.id}
              todo={todo}
              updateTask={updateTask}
              removeTask={removeTask}
            />
          )
        } else {
          if (todo.status === filter) {
            return (
              <ToDoItem
                key={todo.id}
                todo={todo}
                updateTask={updateTask}
                removeTask={removeTask}
              />
            )
          }
        }
      })}
      {form}
    </div>
  );
}

export default App;
