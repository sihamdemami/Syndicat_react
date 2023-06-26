import { useState } from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdAdd, MdCancel } from 'react-icons/md';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function AddRule() {
  const navigate=useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [title, setTitle] = useState("");
  const [message,setMessage]=useState("");
  const { idCoproperty } = useParams();
  const handleClose = () => {
    navigate(-1);
  };
  const [description, setdescription] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      
      formData.append("id_copropriete",idCoproperty);
      

      const response = await axios.post("http://127.0.0.1:8000/api/AddRegle", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setTitle("");
       
        setdescription("");
       
        toast.success("Rules added successfully", {
          autoClose: 3000,
          onClose: () => {
            navigate(-1);
          }
        });
      } else {
        setMessage("Some error occurred");
      }
    } catch (err) {
      console.log(err); 
    }
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-full max-w-xl'>
        <div className="bg-white px-6 sm:py-10 lg:px-8 dark:text-gray-200 dark:bg-secondary-dark-bg">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-200 dark:bg-secondary-dark-bg">ADD RULE</h2>
          </div>
          <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="title" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200 dark:bg-secondary-dark-bg">
                  Title
                </label>
                <div className="mt-2.5">
                  <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder='Title'
                    type="text"
                    id="title"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-gray-200 dark:bg-secondary-dark-bg"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="description" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200 dark:bg-secondary-dark-bg">
                  Description
                </label>
                <div className="mt-2.5">
                  <textarea
                  onChange={(e) => setdescription(e.target.value)} 
                  value={description}
                    placeholder="Description"
                    name="description"
                    id="description"
                    autoComplete="description"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-gray-200 dark:bg-secondary-dark-bg"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-10">
 
  <button
    type="button"
    onClick={handleClose}
    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
  >
    <MdCancel className="inline-block mr-2" />
    Cancel
  </button> <button
    type="submit"
    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
  >
    <MdAdd className="inline-block mr-2" />
    Add
  </button>
</div>

          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}
