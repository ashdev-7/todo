import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const App = () => {
  const [todo, setTodo] = useState(""); // Text of todos
  const [todos, setTodos] = useState([]); // Array holds todos
  const [showFinished, setshowFinished] = useState(true) ;

 useEffect(()=>{
  let todoString = localStorage.getItem("todos")
  if(todoString){
  let todos = JSON.parse(localStorage.getItem("todos"))
  setTodos(todos)
  }
 }, [])

 const saveToLS = (params) => {
  localStorage.setItem("todos", JSON.stringify(todos))
}
const toggleFinished = (e)=> {
  setshowFinished(!showFinished)
}


  const handleEdit = (e, id) => {
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    // delete after edit(actually add new and delete old happening)
    let index = todos.findIndex(item=>{
      return item.id === id
     })
     let newTodos = todos.filter(item=>{
      return item.id!==id
     })
     setTodos(newTodos)
     saveToLS()
  }; // Implement edit functionality

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLS()
  };

  const handleDelete = (e, id) => {

    // add confirmation pop-up

     let index = todos.findIndex(item=>{
      return item.id === id
     })
     let newTodos = todos.filter(item=>{
      return item.id!==id
     })
     setTodos(newTodos)
     saveToLS()
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    const id = e.target.id; // Get the id from the checkbox element
    const index = todos.findIndex((item) => item.id === id); // Find the todo index

    if (index !== -1) {
      // Create a copy of the todos array
      const newTodos = [...todos];
      // Toggle the isCompleted state of the specific todo
      newTodos[index].isCompleted = !newTodos[index].isCompleted;
      // Update the state with the modified array
      setTodos(newTodos);
      saveToLS()
    }
  };
  

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-2xl p-8 bg-slate-400 text-white min-h-[100vh] md:w-1/2">
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <div className="flex">
          <input
            name={todo.id}
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-full font-mono rounded-lg px-5 py-2"
            />
          <button
            onClick={handleAdd} disabled={todo.length<3}
            className="bg-gray-500 hover:bg-gray-600 p-2 py-1 disabled:bg-slate-600 text-white text-sm font-bold rounded-md mx-2"
            >
            Save
          </button>
          </div>
        </div>
        <input className="my-5" onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show finished
        <h2 className="text-lg font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No Todos to display</div>}
          {todos.map((item) => {
            return ( (showFinished)|| !item.isCompleted) &&
              <div key={item.id} className="todo flex my-2 justify-between">
                <div className="flex gap-5">

                <input
                  type="checkbox"
                  id={item.id} // Set the checkbox id to the todo id
                  checked={item.isCompleted} // Set the checkbox checked state based on isCompleted
                  onChange={handleCheckbox}
                  />
                <div className={item.isCompleted ? "line-through" : ""}>
                  {item.todo}
                </div>
                </div>
                <div className="buttons flex h-full">
                  <button
                    onClick={(e)=>handleEdit(e, item.id)}
                    className="bg-gray-500 hover:bg-gray-600 p-2 py-1 text-white text-sm font-bold rounded-md mx-2.5"
                    >
                    <FaEdit />
                  </button>
                  <button
                    onClick={(e)=>{handleDelete(e, item.id)}}
                    className="bg-gray-500 hover:bg-gray-600 p-2 py-1 text-white text-sm font-bold rounded-md mx-0"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            
          })}
        </div>
      </div>
    </>
  );
};

export default App;





// Checkbox not working properly

// import React, { useState } from "react";
// import Navbar from "./components/Navbar";
// import { v4 as uuidv4 } from 'uuid';


// const App = () => {
//   const [todo, setTodo] = useState(""); // text of todos
//   const [todos, setTodos] = useState([]); // arr holds no of todos

//   const handleEdit = () => {};

//   const handleAdd = () => {
//     setTodos([...todos, {id:uuidv4(), todo, isCompleted: false }]);
//     setTodo("");
//   };

//   const handleDelete = (e, id) => {

//   };

//   const handleChange = (e) => {
//     setTodo(e.target.value);
//   };

//   const handleCheckbox=(e) =>{
//     let id = e.target.name
//     let index = todos.findIndex(item=>{
//       return item.id === id;
//     })
//     let newTodos = [...todos];
//     newTodos[index].isCompleted = !newTodos[index].isCompleted; // toggle
//     setTodos(newTodos)
//     }

//   return (
//     <>
//       <Navbar />
//       <div className="container mx-auto my-5 rounded-2xl  p-8 bg-slate-400 text-white min-h-screen">
//         <div className="addTodo my-5">
//           <h2 className="text-lg font-bold ">Add a Todo</h2>
//           <input
//             name={todo.id}
//             onChange={handleChange}
//             value={todo}
//             type="text"
//             className="w-80 font-mono rounded-md"
//           />
//           <button
//             onClick={handleAdd}
//             className="bg-gray-500 hover:bg-gray-600 p-2 py-1 text-white text-sm font-bold rounded-md mx-4"
//           >
//             Add
//           </button>
//         </div>
//         <h2 className="text-lg font-bold">Your Todos</h2>
//         <div className="todos">
//           {todos.map((item) => {
//             return (
//               <div key={item.id} className="todo flex my-2 w-1/4 justify-between">
//                 <input onChange={handleCheckbox} type="checkbox" value={item.isCompleted } id="" />
//                 <div className={item.isCompleted?"line-through" : ""}>
//                   {item.todo}
//                 </div>
//                 <button
//                   onClick={handleEdit}
//                   className="bg-gray-500 hover:bg-gray-600 p-2 py-1 text-white text-sm font-bold rounded-md mx-2.5"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={handleDelete}
//                   className="bg-gray-500 hover:bg-gray-600 p-2 py-1 text-white text-sm font-bold rounded-md mx-0"
//                 >
//                   Delete
//                 </button>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </>
//   );
// };

// export default App;