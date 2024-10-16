import React, { useState, useEffect } from 'react';
import './App.css';

const categoriesArray = [
  { id: 1, category: 'Plumbing', url: 'https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20174847.png' },
  { id: 2, category: 'AI development', url: 'https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20201215.png' },
  { id: 3, category: 'Home cleaning', url: 'https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20174733.png' },
  { id: 4, category: 'Personal trainers', url: 'https://storage.googleapis.com/wisdom-images/Captura%20de%20pantalla%202024-09-27%20175621.png' },
  // Agrega más imágenes según sea necesario
];

function App() {
  const [positions, setPositions] = useState(
    categoriesArray.map(() => ({
      left: window.innerWidth, // Inicialmente fuera de la vista a la derecha
      top: Math.random() * (window.innerHeight - 200), // Altura aleatoria dentro del contenedor
      duration: Math.random() * 3000 + 5000, // Duración aleatoria entre 5 y 8 segundos
      start: false, // Controla si la imagen ha empezado a moverse
    }))
  );

  useEffect(() => {
    // Crear temporizadores para cada imagen con tiempos aleatorios
    const timeouts = categoriesArray.map((_, index) => {
      return setTimeout(() => {
        setPositions((prevPositions) =>
          prevPositions.map((pos, posIndex) => 
            posIndex === index ? { ...pos, start: true } : pos
          )
        );
      }, Math.random() * 3000); // Intervalo aleatorio entre 0 y 3 segundos
    });

    // Limpiar los temporizadores cuando el componente se desmonte
    return () => timeouts.forEach(timeout => clearTimeout(timeout));
  }, []);

  useEffect(() => {
    const moveImages = () => {
      setPositions((prevPositions) =>
        prevPositions.map((pos) => ({
          left: pos.left <= -200
            ? window.innerWidth // Reiniciar la posición cuando la imagen salga por la izquierda
            : pos.start ? pos.left - 5 : pos.left, // Mover solo si ha empezado
          top: pos.top, // Mantener la altura constante
          duration: pos.duration,
          start: pos.start, // Mantener el estado de inicio
        }))
      );
    };

    const interval = setInterval(moveImages, 50); // Actualizar las posiciones cada 50 ms para movimiento fluido

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
  }, [positions]);

  return (
    <div className="container">
      {categoriesArray.map((category, index) => (
        <img
          key={category.id}
          src={category.url}
          alt={category.category}
          className="moving-image"
          style={{
            left: `${positions[index].left}px`,
            top: `${positions[index].top}px`,
            opacity: positions[index].start ? 1 : 0, // Controlar la visibilidad antes de que comience
            transition: 'none', // Sin transición, el movimiento es controlado por el intervalo
          }}
        />
      ))}
    </div>
  );
}

export default App;
