import { useState, useEffect } from "react";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Card from "../components/Card";
import PolarBear from "../assets/PolarBear.svg"

export default function MyNotes() {
  const [items,setItems] = useState([])

  const toastOptionsSuccess =  {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  }

  const toastOptionsFailure =  {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  }

  // const items = ([
  //   {
  //     id : 1,
  //     title : "this is title",
  //     text : "this is text"
  //   },
  //   {
  //     id : 2,
  //     title : "2nd title",
  //     text : "2nd text"
  //   },
  //   {
  //     id : 2,
  //     title : "2nd title",
  //     text : "2nd text"
  //   },
  //   {
  //     id : 2,
  //     title : "2nd title",
  //     text : "2nd text"
  //   },
  //   {
  //     id : 2,
  //     title : "2nd title",
  //     text : "2nd text"
  //   },
  //   {
  //     id : 2,
  //     title : "2nd title",
  //     text : "2nd text"
  //   },
  // ])

  const fetchNotes =async ()=>{
    
      axios.get("https://make-notes-api.vercel.app/api/notes").then(
        res => {
          if(!res.data || res.data.length === 0){
            setItems([])
            toast.error('Oops, No Notes Found 😕!',toastOptionsFailure);
          }
          else{
          setItems(res.data)}
        }
    ).catch(err => {
        console.log(err)
        toast.error('Oops, No Notes Found 😕!',toastOptionsFailure);})
    
    
  }


  // useEffect is a hook that allows you to run some code after the component has rendered. 
  // The empty array [] as the second argument means this effect will only run once, 
  // when the component mounts 
  useEffect(()=>{
    // .then() is a method that runs after the GET request is successful.
    // res is the response object returned by the server.
    fetchNotes();
  },[])

  async function handleDelete(id){
    try {
      const res = await axios.delete(`https://make-notes-api.vercel.app/api/notes/${id}`);
      console.log("Note Deleted successfully:", res.data);
      toast.success('📃 Note Deleted Successfully!',toastOptionsSuccess);  // Log the successful update
      fetchNotes();
    }
    catch(err){
      console.error("Error deleting note:", err);  // Log any errors
      toast.error('Failed to delete note!',toastOptionsFailure);
    }
  }

  return (
    <>
      {items.length === 0 ? (
        <div className="flex flex-col justify-center items-center mt-10 text-white ">
        {/* Render this when no notes are found */}
        <img src={PolarBear} alt="" className="w-[15em] h-[15em] opacity-50" />
        <h2 className="text-xl">No Notes Available</h2>
        <p className="text-base">Create a new note to get started!</p>
      </div>
      ) : (
        <ul className="gap-7 flex justify-center p-8 flex-wrap">
        {items.map((item) =>(
          <li key = {item._id}>
            <Card title={item.title} text={item.text} id={item._id} onDelete={handleDelete}/>
          </li>
        ))}
      </ul>
      )}
      
      <ToastContainer/>
    </>
  );
}
