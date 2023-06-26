import { MdOutlineCancel } from 'react-icons/md';
import { useState,useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function AddCoproperty() {
  const [agreed, setAgreed] = useState(false);
  const [Userdate,setuserdata]=useState([]);
  const navigate=useNavigate();
  useEffect(() => {

    const fetchUser = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/users-without-copropriete`);
        const data = await response.json();
        console.log(data);
        const user = Object.values(data);
        setuserdata(user);
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des users :', error);
      }
    };

    fetchUser();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page après la soumission du formulaire

    // Récupérer les valeurs des champs du formulaire
    const name = event.target.elements.Name.value;
    const adress = event.target.elements.Address.value;
    const zip_code = event.target.elements.Zip_Code.value;
    const city = event.target.elements.City.value;
    const nbr_appartement = event.target.elements['Number Appartments'].value;
    const etage= event.target.elements.Etages.value;
    const email=event.target.elements['user'].value;

    // Créer un objet avec les données à envoyer à l'API
    const copropertyData = {
      name,
      adress,
      zip_code,
      city,
      nbr_appartement,
      etage,
      email,
      
    };

    try {
      // Effectuer la requête HTTP pour ajouter la coproperty à la base de données
      await axios.post('http://127.0.0.1:8000/api/coproperty/AddByname', copropertyData);

      // Réinitialiser les champs du formulaire après l'ajout réussi
      event.target.reset();
      toast.success("Coproperty added successfully");

    } catch (error) {
      console.error('Error adding coproperty:', error);
    }
  };

  return (
    <div className='mx-auto  max-w-xl  '>
    <div className=" bg-white px-6 py-24 sm:py-10 lg:px-8 dark:text-gray-200 dark:bg-secondary-dark-bg">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-200 dark:bg-secondary-dark-bg">Coproperty Informations</h2>
      
      </div>
      <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20" onSubmit={handleSubmit}>

        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
     
        <label htmlFor="user" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200 dark:bg-secondary-dark-bg">
                  syndic
                </label>
                <div className="mt-2.5">
                  <select
                    name="user"
                    id="user"
                    required
                   
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-gray-200 dark:bg-secondary-dark-bg">
                    <option value="">Select Syndic</option>
                    {Userdate.map((user) => (
                      <option key={user}>{user.email}</option>
                    ))}
                  </select>
                </div>
        <div className="sm:col-span-2">
            <label htmlFor="Name" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200 dark:bg-secondary-dark-bg">
              Name
            </label>
            <div className="mt-2.5">
              <input
              placeholder='Name'
                type="text"
                name="Name"
                id="Name"
                autoComplete="Text"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-gray-200 dark:bg-secondary-dark-bg"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="Address" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200 dark:bg-secondary-dark-bg">
            Address
            </label>
            <div className="mt-2.5">
              <input
              placeholder='Address'
                type="text"
                name="Address"
                id="Address"
                autoComplete="Text"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-gray-200 dark:bg-secondary-dark-bg"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="Zip_Code" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200 dark:bg-secondary-dark-bg">
              Zip_Code
            </label>
            <div className="mt-2.5">
              <input
              placeholder='Zip_Code'
                type="text"
                name="Zip_Code"
                id="Zip_Code"
                autoComplete="Text"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-gray-200 dark:bg-secondary-dark-bg"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="City" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200 dark:bg-secondary-dark-bg">
            City
            </label>
            <div className="mt-2.5">
              <input
                placeholder='City'
                type="text"
                name="City"
                id="City"
                autoComplete="City"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-gray-200 dark:bg-secondary-dark-bg"
              />
            </div>
          </div>     
          <div className="sm:col-span-2">
            <label htmlFor="Number Appartments" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200 dark:bg-secondary-dark-bg">
            Number Appartments
            </label>
            <div className="mt-2.5">
              <input
             
                placeholder='Number Appartments'
                type="text"
                name="Number Appartments"
                id="Number Appartments"
                autoComplete="Number Appartments"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-gray-200 dark:bg-secondary-dark-bg"
              />
            </div>
          </div> 
          <div className="sm:col-span-2">
            <label htmlFor="Etages" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200 dark:bg-secondary-dark-bg">
           Floors
            </label>
            <div className="mt-2.5">
              <input
                placeholder='Etages'
                type="text"
                name="Etages"
                id="Etages"
                autoComplete="Etages"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-gray-200 dark:bg-secondary-dark-bg"
              />
            </div>
          </div> 
          
          <div className="sm:col-span-2">
            
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
          >
            Add
          </button>
        </div></div>
      </form>
    </div>  <ToastContainer /></div>
  );
}