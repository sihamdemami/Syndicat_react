import React, { useState, useEffect, useRef } from 'react';
import { BiShow } from 'react-icons/bi';
import { useReactToPrint } from 'react-to-print';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Document = () => {
  const { idCoproperty } = useParams();
  const [documents, setDocuments] = useState([]);
  const [showDocument, setShowDocument] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/coproprietes/${idCoproperty}/documents`);
        if (!response.ok) {
          throw new Error('Une erreur est survenue lors de la récupération des documents.');
        }
        const data = await response.json();
        if (!Array.isArray(data.documents)) {
          throw new Error('Format de données invalide : documents n\'est pas un tableau.');
        }
        const documentsWithPaths = data.documents.map((document) => ({
          ...document,
          path: `http://127.0.0.1:8000${document.chemin_fichier}`,
        }));
        setDocuments(documentsWithPaths);
        console.log(documentsWithPaths);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchDocuments();
  }, [idCoproperty]);

  const handleShowDocument = (document) => {
    setSelectedDocument(document);
    setShowDocument(true);
  };

  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const handlePrintDocument = () => {
    handlePrint();
  };

  const DocumentCard = ({ document }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    const handleShowDocument = () => {
      window.open(`http://127.0.0.1:8000${document.chemin_fichier}`);
    };

    return (
      <div
        className={`bg-white rounded-lg shadow-md p-6 mb-4 flex flex-col items-center dark:bg-gray-600 dark:text-white  ${
          isHovered ? 'shadow-gray-400' : ''
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <h3 className="text-xl font-semibold mb-2 dark:text-white">{document.title}</h3>
        <p className="text-gray-600 dark:text-white">{document.description}</p>
        {isHovered && (
          <button
            className="px-4 py-2 text-black rounded-lg mt-4 bg-blue-200 hover:bg-blue-300"
            onClick={handleShowDocument}
          >
           <BiShow/>
          </button>
        )}
      </div>
    );
  };

  const DocumentViewer = ({ document }) => {
    const navigate = useNavigate();

    const handleCancel = () => {
      navigate(-1);
    };

    return (
      <div className="document-viewer">
        <iframe src={document.path} title={document.title} width="100%" height="100%" />
        <button onClick={handleCancel}>Annuler</button>
      </div>
    );
  };

  const handleAddDocument = () => {
    // Ajouter ici la logique pour ajouter un document
    console.log('Add document');
  };

  return (
    <div className="container mt-20 mx-auto">
     
      <div className="document-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {showDocument && selectedDocument && <DocumentViewer document={selectedDocument} />}
        {!showDocument &&
          documents.map((document) => <DocumentCard key={document.id_document} document={document} />)}
      </div>
    </div>
  );
};

export default Document;