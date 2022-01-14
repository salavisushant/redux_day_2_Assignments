import {useEffect,useState} from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import "./styles.css"

import {
    editTodoForm,
    getTodoError,
  getTodoLoading,
  getTodoSuccess,
    removeTodo,
  toggleTodoLoading,
  toggleTodoSucces,
} from "../redux/Action";


export const Todo = () => {
    
    const { loading, todos, error } = useSelector((state) => ({
        loading: state.loading,
        todos: state.todos,
        error: state.error,
    }));

    const dispatch = useDispatch();

    useEffect (() => {
        getTodoList()
    }, [])
    
    async function getTodoList() {
        try {
            dispatch(getTodoLoading());
            const data = await fetch(`http://localhost:3001/todos`).then((d) => d.json());
            dispatch(getTodoSuccess(data));
        } catch (e) {
            dispatch(getTodoError(e));
        }
    }

    const handleDelete = async (id) => {
        let res = await fetch(`http://localhost:3001/todos/${id}`, {
            method: "DELETE",
            headers: {"Content-type":"application/json"},
        });
        console.log(res);
        getTodoList();
        dispatch(removeTodo(id))
    }

    const handleToggle = async (id) => {
        dispatch(toggleTodoSucces(id));
        var data;
        todos.map((todo) => (todo.id === id ? (data = todo) : data))
        dispatch(getTodoLoading())
        let res = await fetch(`http://localhost:3001/todos/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
        });
        console.log(todos);
        getTodoList();
    };

    const [edit, setEdit] = useState("");
    const [setid, setSetid] = useState("");

    const handleEdit = (id, data) => {
    let input = document.getElementById("input");
    input.innerText = data;
    let cont = document.getElementById("editCont");
    cont.style.display = "block";
    setSetid(id);
    console.log(id, data, setid);
  };

    const handleEditData = async (setid, edit) => {
        dispatch(editTodoForm(edit, setid));
        console.log(setid, edit);
        dispatch(getTodoLoading());

        var payload = {
            status: false,
            title: edit,
            id: setid
        }
        let res = await fetch(`http://localhost:3001/todos/${setid}`, {
            method: 'PUT',
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json"
            }
        });
        getTodoList()
    }

      return loading ? (
    <h1>
      <h1>Loading....</h1>
    </h1>
  ) : error ? (
    <h1>
      <h1>Something went wrong</h1>
    </h1>
  ) : (
    <div >
      <div className="todolist">
        <h1>Todo List</h1>
        <Link to="/">
          <h1>To Homepage</h1>
        </Link>
      </div>
      <div id="editCont">
        <h4 id="input">a</h4>
        <input
            className="edit-input"
          type="text"
          onChange={(e) => setEdit(e.target.value)}
          value={edit}
          
        />
        <br />
        <button className="btn" onClick={() => handleEditData(setid, edit)}>
          Change Todo
        </button>
      </div>
      {todos.map((i) =>
        i.status ? (
              <div
            style={{marginTop:"5%", backgroundColor: "#92c7a3"}} 
            className="listOfTodo"
            key={i.id}
          >
            <h3 className="oneTodo">Title : {i.title}</h3>
            <h3 className="oneTodo">
                Status : {i.status ? "Done" : "Not Done"} 
            </h3>
            <button className="btn" onClick={() => handleDelete(i.id)}>
              Delete 
            </button>
            <button className="btn" onClick={() => handleEdit(i.id, i.title)}>
              Edit 
            </button>
            <button className="btn" onClick={() => handleToggle(i.id)}>
              Toggle 
            </button>
          </div>
        ) : (
          <div
            className="listOfTodo"
            key={i.id}
            style={{ backgroundColor: "#d7621a" }}
          >
            <h3 className="oneTodo">Title : {i.title}</h3>
            <h3 className="oneTodo">
              Status : {i.status ? "Done" : "Not Done"} 
            </h3>
            <button className="btn" onClick={() => handleDelete(i.id)}>
              Delete 
            </button>
            <button className="btn" onClick={() => handleEdit(i.id, i.title)}>
              Edit 
            </button>
            <button className="btn" onClick={() => handleToggle(i.id)}>
              Toggle 
            </button>
          </div>
        )
      )}
    </div>
  );

           
}
