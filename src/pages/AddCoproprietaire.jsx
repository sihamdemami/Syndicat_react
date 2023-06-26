import { MdOutlineCancel } from 'react-icons/md';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { MdAdd, MdCancel } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function AddCoproprietaire({ idCoproperty }) {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [CIN, setCIN] = useState("");
  const [password, setPassword] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [birthday, setBirthday] = useState("");
  const [genre, setGender] = useState("");
  const [message, setMessage] = useState("");
  const [num_appartement, setNumAppartement] = useState("");
  const [nbr_chambres, setNbrChambres] = useState("");
  const [surface, setSurface] = useState("");
  const [montant_mensuel, setMontantMensuel] = useState("");
  const [nom_prenom, setNomPrenom] = useState("");
  const [image, setImage] = useState("");
  const [options, setOptions] = useState([]);
  const [numAppartements, setNumAppartements] = useState([]);

  const handleNumAppartementChange = (e) => {
    setNumAppartement(e.target.value);
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



  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstname", firstname);
      formData.append("lastname", lastname);
      formData.append("email", email);
      formData.append("CIN", CIN);
      formData.append("password", password);
      formData.append("phonenumber", phonenumber);
      formData.append("birthday", birthday);
      formData.append("genre", genre);
      formData.append("image", image);
      formData.append("num_appartement", num_appartement);
      formData.append("nbr_chambres", nbr_chambres);
      formData.append("surface", surface);
      formData.append("montantmensuelle", montant_mensuel);
      formData.append("id_copropriete", idCoproperty);

      const response = await axios.post(`http://127.0.0.1:8000/api/users/add/${idCoproperty}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      if (response.status === 200) {
        setFirstname("");
        setLastname("");
        setCIN("");
        setEmail("");
        setPhonenumber("");
        setPassword("");
        setBirthday("");
        setGender("");
        setMontantMensuel("");
        setNbrChambres("");
        setNumAppartement("");
        setSurface("");
        setBirthday("");
        setMessage("User created successfully");
        toast.success("User added successfully", {
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
  const handleClose = () => {
    navigate(-1);
  };




  return (
    <div className='mx-auto max-w-xxl w-full rounded-md'>
      <div className="bg-white px-6 sm:py-10 lg:px-8 dark:text-gray-200 dark:bg-secondary-dark-bg">
        <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]" aria-hidden="true">
          <div className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} />
        </div>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-200 dark:bg-secondary-dark-bg">Copropritaire Informations</h2>
        </div>
        <form action="#" method="POST" className="mx-auto mt-16 w-full sm:mt-20" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 max-w-2xl gap-x-8 gap-y-6 sm:grid-cols-2 mx-auto">

            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">User Infos</h3>
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 max-w-2xl">
                <div>
                  <label htmlFor="firstname" className="block text-sm font-semibold leading-5 text-gray-700 dark:text-gray-200">
                    First Name
                  </label>
                  <input
                    placeholder='firstname'
                    type="text"
                    name="firstname"
                    id="firstname"
                    required
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    className="block w-full px-4 py-3 mt-1 text-gray-700 border border-gray-300 rounded-md shadow-sm dark:bg-secondary-dark-bg dark:text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="lastname" className="block text-sm font-semibold leading-5 text-gray-700 dark:text-gray-200">
                    Last Name
                  </label>
                  <input
                    placeholder='lastname'
                    type="text"
                    name="lastname"
                    id="lastname"
                    required
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    className="block w-full px-4 py-3 mt-1 text-gray-700 border border-gray-300 rounded-md shadow-sm dark:bg-secondary-dark-bg dark:text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold leading-5 text-gray-700 dark:text-gray-200">
                    Email address
                  </label>
                  <input
                    placeholder='email'
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full px-4 py-3 mt-1 text-gray-700 border border-gray-300 rounded-md shadow-sm dark:bg-secondary-dark-bg dark:text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="CIN" className="block text-sm font-semibold leading-5 text-gray-700 dark:text-gray-200">
                    CIN
                  </label>
                  <input
                    placeholder='CIN'
                    type="text"
                    name="CIN"
                    id="CIN"
                    required
                    value={CIN}
                    onChange={(e) => setCIN(e.target.value)}
                    className="block w-full px-4 py-3 mt-1 text-gray-700 border border-gray-300 rounded-md shadow-sm dark:bg-secondary-dark-bg dark:text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="phonenumber" className="block text-sm font-semibold leading-5 text-gray-700 dark:text-gray-200">
                    Phone Number
                  </label>
                  <input
                    placeholder='phone Number'
                    type="tel"
                    name="phonenumber"
                    id="phonenumber"
                    required
                    value={phonenumber}
                    onChange={(e) => setPhonenumber(e.target.value)}
                    className="block w-full px-4 py-3 mt-1 text-gray-700 border border-gray-300 rounded-md shadow-sm dark:bg-secondary-dark-bg dark:text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold leading-5 text-gray-700 dark:text-gray-200">
                    Password
                  </label>
                  <input
                    placeholder='password'
                    type="password"
                    name="password"
                    id="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full px-4 py-3 mt-1 text-gray-700 border border-gray-300 rounded-md shadow-sm dark:bg-secondary-dark-bg dark:text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="gender" className="block text-sm font-semibold leading-5 text-gray-700 dark:text-gray-200">
                    Gender
                  </label>
                  <select
                    name="genre"
                    id="genre"
                    required
                    value={genre}
                    onChange={(e) => setGender(e.target.value)}
                    className="block w-full px-4 py-3 mt-1 text-gray-700 border border-gray-300 rounded-md shadow-sm dark:bg-secondary-dark-bg dark:text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">Select a gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="birthday" className="block text-sm font-semibold leading-5 text-gray-700 dark:text-gray-200">
                    Birthday
                  </label>
                  <input
                    type="date"
                    name="birthday"
                    id="birthday"
                    required
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    className="block w-full px-4 py-3 mt-1 text-gray-700 border border-gray-300 rounded-md shadow-sm dark:bg-secondary-dark-bg dark:text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="image" className="block text-sm font-semibold leading-5 text-gray-700 dark:text-gray-200">
                    Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"

                    onChange={handleImageChange}
                    className="block w-full px-4 py-3 mt-1 text-gray-700 border border-gray-300 rounded-md shadow-sm dark:bg-secondary-dark-bg dark:text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>



            </div>


            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Property Infos</h3>
              <div className="mt-4">
                <label htmlFor="num_appartement" className="block text-sm font-medium text-gray-700">
                  Numéro de l'appartement
                </label>
                <div className="mt-1">
                  <select
                    name="num_appartement"
                    id="num_appartement"
                    required
                    value={num_appartement}
                    onChange={handleNumAppartementChange}
                    className="block w-full px-4 py-3 mt-1 text-gray-700 border border-gray-300 rounded-md shadow-sm dark:bg-secondary-dark-bg dark:text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <option value="">Sélectionnez un numéro d'appartement</option>
                    {numAppartements.map((numAppartement) => (
                      <option key={numAppartement}>{numAppartement}</option>
                    ))}
                  </select>
                </div>

              </div>
              <br></br>


              <div className="mt-4">
                <label htmlFor="montantmensuel" className="block text-sm font-semibold leading-5 text-gray-700 dark:text-gray-200">
                  Montant Mensuel
                </label>
                <input
                  value={montant_mensuel}
                  placeholder='montant_mensuel'
                  type="text"
                  name="montantmensuelle"
                  id="montantmensuelle"
                  required

                  onChange={(e) => setMontantMensuel(e.target.value)}
                  className="block w-full px-4 py-3 mt-1 text-gray-700 border border-gray-300 rounded-md shadow-sm dark:bg-secondary-dark-bg dark:text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <br></br>

              <div className="mt-4">
                <label htmlFor="surface" className="block text-sm font-semibold leading-5 text-gray-700 dark:text-gray-200">
                  Surface
                </label>
                <input
                  placeholder='surface'
                  type="text"
                  name="surface"
                  id="surface"
                  required
                  value={surface}
                  onChange={(e) => setSurface(e.target.value)}
                  className="block w-full px-4 py-3 mt-1 text-gray-700 border border-gray-300 rounded-md shadow-sm dark:bg-secondary-dark-bg dark:text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <br></br>

              <div className="mt-4">
                <label htmlFor="nbr_chambres" className="block text-sm font-semibold leading-5 text-gray-700 dark:text-gray-200">
                  Nbr Chambres
                </label>
                <select
                  name="nbr_chambres"
                  id="nbr_chambres"
                  required
                  value={nbr_chambres}
                  onChange={(e) => setNbrChambres(e.target.value)}
                  className="block w-full px-4 py-3 mt-1 text-gray-700 border border-gray-300 rounded-md shadow-sm dark:bg-secondary-dark-bg dark:text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Sélectionnez une Chambres</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid  max-w-2xl gap-x-8 gap-y-6  mx-auto mt-4 ">
              <div className="flex justify-between mt-10">

              <button
                type="button"
                onClick={handleClose}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <MdCancel className="inline-block mr-2" />
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <MdAdd className="inline-block mr-2" />
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>



  );
}
