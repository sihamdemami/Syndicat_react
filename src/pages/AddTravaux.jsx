import { useState ,useEffect} from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddTravaux({id_user}) {
  const [dateCreationDemande, setDateCreationDemande] = useState('');


  const [description, setDescription] = useState('');
  const [id_copropriete,setIdCoproperty]=useState('');
  
  



  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/property/${id_user}`)
      .then(response => {
        const data = response.data;
        setIdCoproperty(data.id_copropriete);
        
      
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);
      });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      
     
      formData.append("description", description);
    
      formData.append("id_copropriete",id_copropriete);
      formData.append("id_user",id_user);
      

      const response = await axios.post("http://127.0.0.1:8000/api/AddDemandetravaux", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

   
        setDateCreationDemande("");
         
        setDescription("");
        toast.success("Work added successfully");
       
        
      
     
    } catch (err) {
      console.log(err); 
    }
  };

  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="bg-white px-6 sm:py-10 lg:px-8 dark:text-gray-200 dark:bg-secondary-dark-bg">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-200 dark:bg-secondary-dark-bg">ADD WORK</h2>
        </div>
        <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            
            
            <div className="sm:col-span-2">
              <label htmlFor="Description" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200 dark:bg-secondary-dark-bg">
                Description
              </label>
              <div className="mt-2.5">
                <textarea
              required
                placeholder='description'
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-gray-200 dark:bg-secondary-dark-bg"
                />
              </div>
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
