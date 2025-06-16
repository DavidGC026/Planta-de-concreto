import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';

const MainMenu = ({ onSelectEvaluation, onLogout, username }) => {
  const evaluationTypes = [
    {
      id: 'personal',
      title: 'Evaluación de Personal',
    },
    {
      id: 'equipo',
      title: 'Evaluación de Equipo',
    },
    {
      id: 'operacion',
      title: 'Evaluación de Operación',
    }
  ];

  return (
    <div className="min-h-screen custom-bg flex flex-col"> {/* Usando custom-bg y flex-col */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-700/10"></div>
      
      {/* Header */}
      <header className="relative z-10 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src="../../public/Logo_imcyc.png" alt="Logo IMCYC" className="h-12 w-auto" /> {/* Logo IMCYC */}
            <div>
              <span className="text-xl font-bold text-gray-800">IMCYC</span>
              <p className="text-sm text-gray-600">Plataforma de Evaluación</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700 font-medium">Bienvenido, {username}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={onLogout}
              className="flex items-center space-x-2 border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              <LogOut className="w-4 h-4" />
              <span>Salir</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold text-white mb-3">
            Panel Principal de Evaluaciones
          </h1>
          <p className="text-lg text-white/90">
            Selecciona el tipo de evaluación que deseas realizar.
          </p>
        </motion.div>

        <motion.div 
          className="w-full max-w-md space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {evaluationTypes.map((type, index) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.15 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="list"
                size="lg"
                onClick={() => onSelectEvaluation(type.id)}
                className="w-full font-semibold py-6 rounded-lg text-lg button-list-item justify-start pl-8"
              >
                {type.title}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* Concreton */}
      <motion.div
        initial={{ opacity: 0, x: 100, y:50 }}
        animate={{ opacity: 1, x: 0, y:0 }}
        transition={{ duration: 1.2, delay: 0.8, type: "spring", stiffness: 50 }}
        className="fixed bottom-0 right-0 md:right-5 z-20 pointer-events-none"
      >
        <img   
          alt="Concreton - Mascota IMCYC"
          className="w-auto h-48 sm:h-56 md:h-64 drop-shadow-xl" 
          src="../../public/Concreton.png" /> {/* Usando concreton.png */}
      </motion.div>
    </div>
  );
};

export default MainMenu;