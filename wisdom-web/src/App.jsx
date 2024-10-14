import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const categoriesArray = [
  { id: 1, category: 'Plumbing', url: 'https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20174847.png' },
  { id: 2, category: 'AI development', url: 'https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20201215.png' },
  { id: 3, category: 'Home cleaning', url: 'https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20174733.png' },
  { id: 4, category: 'Personal trainers', url: 'https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20175621.png' },
  // Agrega más imágenes según sea necesario
];

const WelcomeVideoScreen = () => {
  const [currentImage, setCurrentImage] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [topPosition, setTopPosition] = useState(0);

  useEffect(() => {
    const showImage = () => {
      // Seleccionar una imagen aleatoria
      const randomImage = categoriesArray[Math.floor(Math.random() * categoriesArray.length)];
      setCurrentImage(randomImage);
      setIsVisible(true);

      // Generar una posición vertical aleatoria
      const randomTop = Math.random() * (window.innerHeight - 200); // Ajusta 200 según el tamaño de tu imagen
      setTopPosition(randomTop);

      // Hacer que la imagen desaparezca después de un tiempo
      setTimeout(() => {
        setIsVisible(false);
      }, 5000); // Cambia 5000 a la duración deseada
    };

    // Mostrar la imagen cada 7 segundos
    const intervalId = setInterval(showImage, 7000); // Cambia 7000 a la duración deseada entre imágenes

    return () => clearInterval(intervalId);
  }, []);

  if (!currentImage) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#272626] text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative flex justify-center items-center h-screen bg-[#272626] overflow-hidden">
      {isVisible && (
        <motion.div
          initial={{ x: '100vw', opacity: 1 }} // Comienza fuera de la vista a la derecha
          animate={{ x: '-100vw', opacity: 0 }} // Se mueve completamente a la izquierda fuera de la vista
          transition={{ duration: 40, ease: "linear" }} // Duración de la animación
          className="absolute"
          style={{ top: topPosition }} // Aplica la posición vertical aleatoria
        >
          <img 
            src={currentImage.url} 
            alt={currentImage.category} 
            className="w-40 h-auto rounded-xl" // Ajuste responsivo
            style={{ maxWidth: '100%', height: 'auto' }} // Asegura que la imagen sea responsiva
          />
        </motion.div>
      )}
    </div>
  );
};

export default WelcomeVideoScreen;
