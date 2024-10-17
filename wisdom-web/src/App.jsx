import React, { useState, useEffect } from 'react';
import './App.css';


import WisdomLogo from './assets/wisdomLogo.tsx';
import appleLogo from './assets/appleLogo.png';
import androidLogo from './assets/androidLogo.png';
import qrRandom from './assets/qrRandom.png';


const categoriesArray = [
  { id: 2, category: "Plumbing", url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20174847.png" },
    { id: 89, category: "AI development", url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20201215.png" },
    { id: 1, category: "Home cleaning", url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20174733.png" },
    { id: 31, category: "Personal trainers", url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20175621.png" },
    { id: 317, category: "Dog walkers", url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20190223.png" },
    { id: 318, category: "Pet care at home", url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20190446.png" },
    { id: 5, category: "Masonry", url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20175117.png" },
    { id: 83, category: "Mobile app development", url: "https://storage.googleapis.com/wisdom-images/451067aa-4bd3-43d8-874d-ff8b5e50ce7e.jpeg" },
    { id: 84, category: "Web development", url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20181853.png" },
    { id: 151, category: "Architects", url: "https://storage.googleapis.com/wisdom-images/526bda5b-c0c2-4170-b552-12a17db69fa9.jpeg" },
    { id: 8, category: "Painting and decoration", url: "https://storage.googleapis.com/wisdom-images/237ee01c-4454-4d81-8f27-f502f74ac9d3.jpeg" },
    { id: 3, category: "Electrical work", url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20175034.png" },
    { id: 6, category: "Gardening", url: "https://storage.googleapis.com/wisdom-images/4a4881ba-a06f-4bb1-be9d-016d2b49eae4.jpeg" },
    { id: 32, category: "Nutritionists", url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20175812.png" },
    { id: 34, category: "Psychology", url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20180032.png" },
    { id: 35, category: "Yoga", url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20180113.png" },
    { id: 36, category: "Guided meditation", url: "https://storage.googleapis.com/wisdom-images/53a50b05-32d7-4e90-86ce-62702bc97d65.jpeg" },
    { id: 37, category: "Therapeutic massages", url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20180612.png" },
    { id: 54, category: "Couples therapy", url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20180656.png" },
    { id: 56, category: "Private tutors", url: "https://storage.googleapis.com/wisdom-images/77502ab75202d6b38aa0df57113b6746.jpg" },
    { id: 57, category: "Math classes", url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20180933.png" },
    { id: 58, category: "Language classes", url: "https://storage.googleapis.com/wisdom-images/6f1a64adbbe28f7d572a9fef189ea542.jpg" },
    { id: 59, category: "Science classes", url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20181138.png" },
    { id: 68, category: "Job interview preparation", url: "https://storage.googleapis.com/wisdom-images/36548671ef1476a260d9e3dbb8fe4706.jpg" },
    { id: 65, category: "Music classes", url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20181310.png" },
    { id: 61, category: "Programming classes", url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20181628.png" },
    { id: 85, category: "Frontend development", url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20182501.png" },
    { id: 86, category: "Backend development", url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20182034.png" },
    { id: 90, category: "Graphic design", url: "https://storage.googleapis.com/wisdom-images/a2b2c958-2d21-4308-8b07-51a1820f6faa.jpeg" },
    { id: 94, category: "Video editing", url: "https://storage.googleapis.com/wisdom-images/ad3a9403cb4273ff3bfb2ab24429bb62.jpg" },
    { id: 100, category: "3D design", url: "https://storage.googleapis.com/wisdom-images/4475f6e7e9766c27834ae79e308907db2d4fe361f741e26a2e9357b0a6c63082_1920x1080.webp" },
    { id: 101, category: "Social media content creation", url: "https://storage.googleapis.com/wisdom-images/contentcretor.png" },
    { id: 152, category: "Masons", url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20175117.png" },
    { id: 170, category: "Building rehabilitation", url: "https://storage.googleapis.com/wisdom-images/5964b65c-a2f6-4638-9024-6b38b2e0f42a.jpeg" },
    { id: 172, category: "Wedding planners", url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20184608.png" },
    { id: 173, category: "Event Catering", url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20184635.png" },
    { id: 174, category: "Event photography", url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20184808.png" },
    { id: 175, category: "Party DJs", url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20184853.png" },
    { id: 178, category: "Children's entertainers", url: "https://storage.googleapis.com/wisdom-images/1.webp" },
    { id: 181, category: "Event security", url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20185110.png" },
    { id: 228, category: "Business analysis", url: "https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20190143.png" },
];

function App() {
  const [activeImages, setActiveImages] = useState([]);
  const [currentBackgroundImages, setCurrentBackgroundImages] = useState([]);
  
  useEffect(() => {
    // Función para añadir una imagen aleatoria
    const addRandomImage = () => {
      const randomImage = categoriesArray[Math.floor(Math.random() * categoriesArray.length)];
      if (activeImages.length >= 10) return;
  
      const newImage = {
        ...randomImage,
        id: Math.random(), // Asignar un ID único para cada aparición
        left: window.innerWidth, // Empieza fuera de la pantalla a la derecha
        top: Math.random() * (window.innerHeight - 100), // Altura aleatoria
      };
  
      setActiveImages((prev) => [...prev, newImage]);
  
      // Elimina la imagen después de un tiempo si ha salido completamente de la pantalla
      setTimeout(() => {
        setActiveImages((prev) => prev.filter((img) => img.left > -300)); // Ajusta según el tamaño de las imágenes
      }, Math.random() * 8000 + 5000); // Entre 5 y 13 segundos de duración en pantalla
    };
  
    // Intervalo aleatorio para añadir nuevas imágenes
    const addImageInterval = setInterval(() => {
      addRandomImage();
    }, Math.random() * 8000 + 8000); //  segundos entre cada nueva imagen
  
    return () => clearInterval(addImageInterval); // Limpiar intervalo al desmontar el componente
  }, []);
  
  useEffect(() => {
    // Función para añadir una imagen de fondo aleatoria
    const addRandomBackgroundImage = () => {
      const randomImage = categoriesArray[Math.floor(Math.random() * categoriesArray.length)];
      if (currentBackgroundImages.length >= 5) return;
  
      const newImage = {
        ...randomImage,
        id: Math.random(), // Asignar un ID único para cada aparición
        left: window.innerWidth, // Empieza fuera de la pantalla a la derecha
        top: Math.random() * (window.innerHeight - 100), // Altura aleatoria
      };
  
      setCurrentBackgroundImages((prev) => [...prev, newImage]);
  
      // Elimina la imagen después de un tiempo si ha salido completamente de la pantalla
      setTimeout(() => {
        setCurrentBackgroundImages((prev) => prev.filter((img) => img.left > -300)); // Ajusta según el tamaño de las imágenes
      }, Math.random() * 10000 + 5000); // Entre 5 y 15 segundos de duración en pantalla
    };

    // Intervalo aleatorio para añadir nuevas imágenes de fondo
    const addBackgroundImageInterval = setInterval(() => {
      addRandomBackgroundImage();
    }, Math.random() * 13000 + 10000); // segundos entre cada nueva imagen de fondo
  
    return () => clearInterval(addBackgroundImageInterval); // Limpiar intervalo al desmontar el componente
  }, []);
  
  useEffect(() => {
    // Mover las imágenes activas
    const moveImages = () => {
      setActiveImages((prev) =>
        prev.map((img) => ({
          ...img,
          left: img.left - 0.6, // Mover hacia la izquierda
        }))
      );
    };
  
    // Mover las imágenes de fondo
    const moveBackgroundImages = () => {
      setCurrentBackgroundImages((prev) =>
        prev.map((img) => ({
          ...img,
          left: img.left - 0.3, // Mover más lentamente hacia la izquierda
        }))
      );
    };
  
    const moveInterval = setInterval(() => {
      moveImages();
      moveBackgroundImages();
    }, 10); // Actualizar cada 50 ms para un movimiento fluido
  
    return () => clearInterval(moveInterval); // Limpiar intervalo al desmontar el componente
  }, [activeImages, currentBackgroundImages]);
  
  return (
    <div className="container flex-1">
      
      {currentBackgroundImages.map((image) => (
        <img
          key={image.id}
          src={image.url}
          alt={image.category}
          className="background-image"
          style={{
            left: `${image.left}px`,
            top: `${image.top}px`,
            position: 'absolute',
            transition: 'none',
            width: '200px',
            height: '100px',
            objectFit: 'cover',
            opacity: 0.7, // Fondo más tenue
            filter: 'blur(2px)',
          }}
        />
      ))}

      {activeImages.map((image) => (
        <img
          key={image.id}
          src={image.url}
          alt={image.category}
          className="moving-image"
          style={{
            left: `${image.left}px`,
            top: `${image.top}px`,
            position: 'absolute',
            transition: 'none',
            width: '330px',
            height: '150px',
            objectFit: 'cover',
            borderRadius: '15px'
          }}
        />
      ))}

      {/* Contenedor central */}
      <div className="centered-container">
        <WisdomLogo
          className="logo"
          color="#ffffff"
        />
        <h1 style={{ fontSize: '35px', marginBottom: 40, marginTop: 10, color:'#bdbdbd'}}>Wisdom</h1>
        <div className="qr-container">
          <img
            src={qrRandom} // Cambia esto por la URL de tu QR
            alt="QR Code"
            className="qr-code"
          />
          <div
              style={{
                  height: '0.25rem',
                  width: '100%', 
                  marginTop: '0.25rem',   // Equivalente a py-4
                  marginBottom: '1rem', // Equivalente a py-4
                  borderBottom: '2px solid #323635'    
              }}
          />

          <div
            style={{
                display: 'flex',
                justifyContent: 'center', // Centrar horizontalmente
                alignItems: 'center',    // Centrar verticalmente
                gap: '100px',             // Espacio entre los elementos
            }}
          >
            <img
                src={appleLogo}
                alt="Apple Store"
                className="store-logo"
            />
            <img
                src={androidLogo}
                alt="Android Store"
                className="store-logo"
                />
            </div>

        </div>
      </div>
    </div>
  );
}

export default App;
