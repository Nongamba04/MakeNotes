import { useState, useRef, useEffect } from "react";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";  // Import axios
import Button from "./Button";
import DeleteButton from "./DelButton";

export default function Card({ title, text,id,onDelete}) {
  const [hidden, setHidden] = useState(true);  // State to manage visibility
  const [newNote, setNewNote] = useState({ id,title, text }); // Initialize state with props
  const formRef = useRef(null);  // Reference to the card element

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

  // Handle input change and update state
  function handleInputChange(event) {
    const { name, value } = event.target;
    setNewNote(prevNote => ({ ...prevNote, [name]: value }));
    console.log(newNote);
  }

  // Handle form visibility on click
  function handleInputClick() {
    setHidden(false);  // Make the form visible
  }


  // Handle form update
  async function handleUpdate(event) {
    event.preventDefault(); // Prevent default form submission

    try {
      const res = await axios.put("https://make-notes-api.vercel.app/api", newNote, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log("Note updated successfully:", res.data);
      toast.success('📃 Note Updated Successfully!',toastOptionsSuccess);  // Log the successful update
    } catch (err) {
      console.error("Error updating note:", err);  // Log any errors
      toast.error('Failed to update note!',toastOptionsFailure);
    }
  }

  const handleDelete = async () =>{
    try {
      await onDelete(id)
      toast.success('📃 Note Deleted Successfully!',toastOptionsSuccess);
    }
    catch(err){
      console.error("Error deleting note:", err);
    }
  }
  // Function to handle clicks outside the form
  function handleClickOutside(event) {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setHidden(true);  // Hide the button when clicking outside
    }
  }

  useEffect(() => {
    // Add event listener to detect clicks outside the form
    document.addEventListener("click", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="w-[19em] md:w-[22em] rounded-xl border border-white/10 shadow-lg backdrop-blur-sm bg-white/10">
        <div className="flex items-center p-2">
          <div className="px-1">
            <span className="inline-block items-center w-2 h-2 p-1 rounded-[50%] bg-[#ff605c]"></span>
          </div>
          <div className="px-1">
            <span className="inline-block items-center w-2 h-2 p-1 rounded-[50%] bg-[#ffbd44]"></span>
          </div>
          <div className="px-1">
            <span className="inline-block items-center w-2 h-2 p-1 rounded-[50%] bg-[#00ca4e]"></span>
          </div>
        </div>
        <form ref={formRef} className="flex flex-col items-center gap-5 p-5">
          <input
            type="text"
            name="title"
            value={newNote.title}
            className="font-bold text-xl w-[13em] md:w-[16em] p-4 bg-transparent text-white outline-[#fff]"
            onChange={handleInputChange}
            onClick={handleInputClick}
          />
          <textarea
            value={newNote.text}
            className="font-bold w-[17em] h-[15em] p-3 bg-transparent text-white outline-[#fff]"
            name="text"
            onChange={handleInputChange}
            onClick={handleInputClick}
          ></textarea>
          
           
        </form>
        <div className="flex justify-center items-center py-2">
         {/* Delete button */}
     <DeleteButton handleDelete={handleDelete}/>
        
        {!hidden && (
      <Button
            text={"Update"}
        styles={{ color: "#07F7BC", colorHover: "#08AB87" }}
        handleSubmit={handleUpdate} // Use Tailwind utility classes
      />
    )}

        </div>

      </div>
      <ToastContainer/>
    </>
  );
}
