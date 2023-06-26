import { MdOutlineCancel } from 'react-icons/md';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdAdd, MdCancel } from 'react-icons/md';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function AddProperty() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const { idCoproperty } = useParams();
  const [num_appartement, setNumAppartement] = useState("");
  const handleClose = () => {
    navigate(-1);
  };


  const [agreed, setAgreed] = useState(false);
  const [numAppartements, setNumAppartements] = useState([]);
  const [emailUser, setEmailUser] = useState([]);
  const [email, setEmail] = useState("");
  const [surface, setSurface] = useState("");
  const [nbr_chambres, setNbrChambres] = useState("");
  const [montantmensuelle, setmontantmensuelle] = useState("");


  const handleNumAppartementChange = (e) => {
    setNumAppartement(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  useEffect(() => {
    // Effectuez votre appel API pour récupérer les numéros d'appartement en utilisant le code PHP
    // Utilisez une méthode appropriée pour effectuer l'appel API, comme fetch() ou axios

    const fetchNumAppartements = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/copropriete/propriete/${idCoproperty}`);
        const data = await response.json();
        console.log(data);
        const numAppartements = Object.values(data.numAppartements);
        setNumAppartements(numAppartements);
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des numéros d\'appartement :', error);
      }
    };

    fetchNumAppartements();
  }, [idCoproperty]);


  useEffect(() => {
    // Effectuez votre appel API pour récupérer les numéros d'appartement en utilisant le code PHP
    // Utilisez une méthode appropriée pour effectuer l'appel API, comme fetch() ou axios

    const fetchEmailUser = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/getcoproperty/${idCoproperty}`);
        const data = await response.json();
        console.log(data);
        const emailUser = Object.values(data);
        setEmailUser(emailUser);
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des emails :', error);
      }
    };

    fetchEmailUser();
  }, [idCoproperty]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("num_appartement", num_appartement);
      formData.append("nbr_chambres", nbr_chambres);
      formData.append("surface", surface);
      formData.append("montantmensuelle", montantmensuelle);
      formData.append("id_copropriete", idCoproperty);

      const response = await axios.post(`http://127.0.0.1:8000/api/propertyByemail/Add/${idCoproperty}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      if (response.status === 200) {
        setEmail("");
        setmontantmensuelle("");
        setNbrChambres("");
        setNumAppartement("");
        setSurface("");

        toast.success("Property added successfully", {
          autoClose: 3000,
          onClose: () => {
            navigate(-1);
          },
        });
      } else {
        setMessage("Some error occurred");
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className='mx-auto  max-w-xl '>
      <div className="bg-white px-6  sm:py-12 lg:px-8 dark:text-gray-200 dark:bg-secondary-dark-bg">
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
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-200 dark:bg-secondary-dark-bg">Property Informations</h2>
        </div>
        <form className="mx-auto mt-16 w-full sm:mt-20" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">



            <div className="sm:col-span-2">
              <label htmlFor="Email" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200 dark:bg-secondary-dark-bg">
                Email
              </label>
              <div className="mt-2.5">
                <select
                  name="email"
                  id="email"
                  required
                  value={email}
                  onChange={handleEmailChange}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-gray-200 dark:bg-secondary-dark-bg">
                  <option value="">Sélect email</option>
                  {emailUser.map((email) => (
                    <option key={email}>{email}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="sm:col-span-2 border-t-2 border-gray-200"></div>
            <div className="sm:col-span-2">
              <label htmlFor="NumberAppartment" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200 dark:bg-secondary-dark-bg">
                Number Appartment
              </label>
              <div className="mt-2.5">
                <select
                  name="num_appartement"
                  id="num_appartement"
                  required
                  value={num_appartement}
                  onChange={handleNumAppartementChange}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-gray-200 dark:bg-secondary-dark-bg">
                  <option value="">Sélect num apartment</option>
                  {numAppartements.map((numAppartement) => (
                    <option key={numAppartement}>{numAppartement}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="sm:col-span-2 grid grid-cols-2 gap-x-4">
              <div>

                <label htmlFor="nbr_chambres" className="block text-sm font-semibold leading-5 text-gray-700 dark:text-gray-200">
                 Chambers
                </label>
                <select
                  name="nbr_chambres"
                  id="nbr_chambres"
                  required
                  value={nbr_chambres}
                  onChange={(e) => setNbrChambres(e.target.value)}
                  className="block w-full px-4 py-3 mt-1 text-gray-700 border border-gray-300 rounded-md shadow-sm dark:bg-secondary-dark-bg dark:text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Sélect Chambers</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>

              </div>
              <div>
                <label htmlFor="LastName" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200 dark:bg-secondary-dark-bg">
                  Area
                </label>
                <div className="mt-2.5">
                  <input
                    placeholder='	surface'
                    type="text"
                    name="surface"
                    id="surface"
                    autoComplete="Text"
                    value={surface}
                    onChange={(e) => setSurface(e.target.value)}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-gray-200 dark:bg-secondary-dark-bg"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="montantmensuel" className="block text-sm font-semibold leading-5 text-gray-700 dark:text-gray-200 w-full">
                  Monthly amount
                </label>
                <input
                  value={montantmensuelle}

                  placeholder='montantmensuelle'
                  type="text"
                  name="montantmensuelle"
                  id="montantmensuelle"
                  required

                  onChange={(e) => setmontantmensuelle(e.target.value)}
                  className="block w-full px-4 py-3 mt-1 text-gray-700 border border-gray-300 rounded-md shadow-sm dark:bg-secondary-dark-bg dark:text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
  );
}
