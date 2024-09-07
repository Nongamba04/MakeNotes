import { useState } from "react";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from "./Button";

export default function TextCard() {
  const [note, setNote] = useState({
    title: "",
    text: "",
  });

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

  const handleInputChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setNote((prevNote) => ({ ...prevNote, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(note);

    try {
      const res = await fetch("http://localhost:5000/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });

      const data = await res.json();
      console.log(data);

      setNote({
        title: "",
        text: "",
      });

      toast.success('📃 Note Saved Successfully!',toastOptionsSuccess);

    } catch (err) {
      console.log("notes error", err);
      toast.error('Failed to save note!',toastOptionsFailure);
    }
  };

  return (
    <>
      <div className="w-full flex justify-center items-center min-h-[65vh] md:min-h-[80vh]">
        <form
          className="w-[20em] md:w-[50em] h-[23em] flex flex-col gap-5 p-5 rounded-md border border-white/10 shadow-lg backdrop-blur-sm bg-white/10"
        >
          <div className="flex flex-col gap-8">
            <input
              className="w-full px-[10px] py-[12px] rounded-md bg-white/10 text-white placeholder-gray-350 outline-[#fff] text-2xl font-bold"
              name="title"
              placeholder="Title"
              type="text"
              value={note.title}
              onChange={handleInputChange}
              maxLength={500}
            />
            <textarea
              name="text"
              onChange={handleInputChange}
              value={note.text}
              className="borderw-full h-[10em] bg-white/10 text-white rounded-lg px-[10px] py-[12px] outline-[#fff]"
            ></textarea>
          </div>
          <Button text={"Create"} styles={{ color: "#24b4fb", colorHover: "#0071e2" }} handleSubmit={handleSubmit}/>
        </form>
        
      </div>
      <ToastContainer />
    </>
  );
}
