import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, ArrowLeft, CheckCircle, XCircle, MinusCircle, UserCheck, Users, Wrench, Settings } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const evaluationQuestions = {
  jefe_planta: {
    title: 'Jefe de Planta',
    icon: UserCheck,
    sections: [
      {
        title: 'Producción y Mezclado',
        questions: [
          'Mezclador tipo tambor o eje vertical (0.5–1.0 m³ por ciclo)',
          'Básculas para cemento, agua y agregados (manuales o semi-automáticas)',
          'Tolvas de agregados (2–3 compartimientos, 20–40 m³ en total)',
          'Banda transportadora o cargador frontal para alimentación',
          'Silo de cemento (30–60 toneladas)',
          'Tanque de agua (3,000–5,000 litros)',
          'Tolva de descarga o canaleta manual'
        ]
      },
      {
        title: 'Control y Automatización',
        questions: [
          'Tablero de control semiautomático',
          'Interruptores de paro de emergencia',
          'Sensor de humedad (opcional o manual)',
          'Indicadores de peso (básculas digitales simples)'
        ]
      },
      {
        title: 'Laboratorio y Control de Calidad',
        questions: [
          'Moldes cilíndricos para especímenes',
          'Varilla de compactación y mesa de sacudidas',
          'Cono de Abrams (revenimiento)',
          'Balanza de precisión',
          'Termómetro para concreto',
          'Cronómetro',
          'Caja húmeda o tanque para curado de especímenes',
          'Prensa hidráulica para rotura de cilindros (puede estar en laboratorio externo)'
        ]
      },
      {
        title: 'Mantenimiento',
        questions: [
          'Herramientas manuales básicas (llaves, dados, desarmadores)',
          'Juego de grasa y lubricantes',
          'Compresor de aire portátil',
          'Bomba de lavado o hidrolavadora pequeña',
          'Banco de herramientas y estantería'
        ]
      },
      {
        title: 'Transporte y Entrega',
        questions: [
          'Camión revolvedor chico (3 a 6 m³)',
          'Mezcladora portátil (respaldo o mezcla manual)',
          'Motocicleta o radio para comunicación de entrega',
          'Remolque (en algunos casos)'
        ]
      },
      {
        title: 'Seguridad y Normatividad',
        questions: [
          'Señalización básica (extintores, cintas, carteles)',
          'Equipo de protección personal (EPP): casco, chaleco, lentes',
          'Botiquín de primeros auxilios',
          'Manuales de operación y bitácoras'
        ]
      }
    ]
  },
  laboratorista: {
    title: 'Laboratorista',
    icon: UserCheck,
    sections: [
      {
        title: 'Producción y Mezclado',
        questions: [
          'Mezclador tipo tambor o eje vertical (0.5–1.0 m³ por ciclo)',
          'Básculas para cemento, agua y agregados (manuales o semi-automáticas)',
          'Tolvas de agregados (2–3 compartimientos, 20–40 m³ en total)',
          'Banda transportadora o cargador frontal para alimentación',
          'Silo de cemento (30–60 toneladas)',
          'Tanque de agua (3,000–5,000 litros)',
          'Tolva de descarga o canaleta manual'
        ]
      },
      {
        title: 'Control y Automatización',
        questions: [
          'Tablero de control semiautomático',
          'Interruptores de paro de emergencia',
          'Sensor de humedad (opcional o manual)',
          'Indicadores de peso (básculas digitales simples)'
        ]
      },
      {
        title: 'Laboratorio y Control de Calidad',
        questions: [
          'Moldes cilíndricos para especímenes',
          'Varilla de compactación y mesa de sacudidas',
          'Cono de Abrams (revenimiento)',
          'Balanza de precisión',
          'Termómetro para concreto',
          'Cronómetro',
          'Caja húmeda o tanque para curado de especímenes',
          'Prensa hidráulica para rotura de cilindros (puede estar en laboratorio externo)'
        ]
      },
      {
        title: 'Mantenimiento',
        questions: [
          'Herramientas manuales básicas (llaves, dados, desarmadores)',
          'Juego de grasa y lubricantes',
          'Compresor de aire portátil',
          'Bomba de lavado o hidrolavadora pequeña',
          'Banco de herramientas y estantería'
        ]
      },
      {
        title: 'Transporte y Entrega',
        questions: [
          'Camión revolvedor chico (3 a 6 m³)',
          'Mezcladora portátil (respaldo o mezcla manual)',
          'Motocicleta o radio para comunicación de entrega',
          'Remolque (en algunos casos)'
        ]
      },
      {
        title: 'Seguridad y Normatividad',
        questions: [
          'Señalización básica (extintores, cintas, carteles)',
          'Equipo de protección personal (EPP): casco, chaleco, lentes',
          'Botiquín de primeros auxilios',
          'Manuales de operación y bitácoras'
        ]
      }
    ]
  },
  operador_camion: {
    title: 'Operador de camión revolvedor',
    icon: UserCheck,
    sections: [
      {
        title: 'Producción y Mezclado',
        questions: [
          'Mezclador tipo tambor o eje vertical (0.5–1.0 m³ por ciclo)',
          'Básculas para cemento, agua y agregados (manuales o semi-automáticas)',
          'Tolvas de agregados (2–3 compartimientos, 20–40 m³ en total)',
          'Banda transportadora o cargador frontal para alimentación',
          'Silo de cemento (30–60 toneladas)',
          'Tanque de agua (3,000–5,000 litros)',
          'Tolva de descarga o canaleta manual'
        ]
      },
      {
        title: 'Control y Automatización',
        questions: [
          'Tablero de control semiautomático',
          'Interruptores de paro de emergencia',
          'Sensor de humedad (opcional o manual)',
          'Indicadores de peso (básculas digitales simples)'
        ]
      },
      {
        title: 'Laboratorio y Control de Calidad',
        questions: [
          'Moldes cilíndricos para especímenes',
          'Varilla de compactación y mesa de sacudidas',
          'Cono de Abrams (revenimiento)',
          'Balanza de precisión',
          'Termómetro para concreto',
          'Cronómetro',
          'Caja húmeda o tanque para curado de especímenes',
          'Prensa hidráulica para rotura de cilindros (puede estar en laboratorio externo)'
        ]
      },
      {
        title: 'Mantenimiento',
        questions: [
          'Herramientas manuales básicas (llaves, dados, desarmadores)',
          'Juego de grasa y lubricantes',
          'Compresor de aire portátil',
          'Bomba de lavado o hidrolavadora pequeña',
          'Banco de herramientas y estantería'
        ]
      },
      {
        title: 'Transporte y Entrega',
        questions: [
          'Camión revolvedor chico (3 a 6 m³)',
          'Mezcladora portátil (respaldo o mezcla manual)',
          'Motocicleta o radio para comunicación de entrega',
          'Remolque (en algunos casos)'
        ]
      },
      {
        title: 'Seguridad y Normatividad',
        questions: [
          'Señalización básica (extintores, cintas, carteles)',
          'Equipo de protección personal (EPP): casco, chaleco, lentes',
          'Botiquín de primeros auxilios',
          'Manuales de operación y bitácoras'
        ]
      }
    ]
  },
  operador_bombas: {
    title: 'Operador de bombas de concreto',
    icon: UserCheck,
    sections: [
      {
        title: 'Producción y Mezclado',
        questions: [
          'Mezclador tipo tambor o eje vertical (0.5–1.0 m³ por ciclo)',
          'Básculas para cemento, agua y agregados (manuales o semi-automáticas)',
          'Tolvas de agregados (2–3 compartimientos, 20–40 m³ en total)',
          'Banda transportadora o cargador frontal para alimentación',
          'Silo de cemento (30–60 toneladas)',
          'Tanque de agua (3,000–5,000 litros)',
          'Tolva de descarga o canaleta manual'
        ]
      },
      {
        title: 'Control y Automatización',
        questions: [
          'Tablero de control semiautomático',
          'Interruptores de paro de emergencia',
          'Sensor de humedad (opcional o manual)',
          'Indicadores de peso (básculas digitales simples)'
        ]
      },
      {
        title: 'Laboratorio y Control de Calidad',
        questions: [
          'Moldes cilíndricos para especímenes',
          'Varilla de compactación y mesa de sacudidas',
          'Cono de Abrams (revenimiento)',
          'Balanza de precisión',
          'Termómetro para concreto',
          'Cronómetro',
          'Caja húmeda o tanque para curado de especímenes',
          'Prensa hidráulica para rotura de cilindros (puede estar en laboratorio externo)'
        ]
      },
      {
        title: 'Mantenimiento',
        questions: [
          'Herramientas manuales básicas (llaves, dados, desarmadores)',
          'Juego de grasa y lubricantes',
          'Compresor de aire portátil',
          'Bomba de lavado o hidrolavadora pequeña',
          'Banco de herramientas y estantería'
        ]
      },
      {
        title: 'Transporte y Entrega',
        questions: [
          'Camión revolvedor chico (3 a 6 m³)',
          'Mezcladora portátil (respaldo o mezcla manual)',
          'Motocicleta o radio para comunicación de entrega',
          'Remolque (en algunos casos)'
        ]
      },
      {
        title: 'Seguridad y Normatividad',
        questions: [
          'Señalización básica (extintores, cintas, carteles)',
          'Equipo de protección personal (EPP): casco, chaleco, lentes',
          'Botiquín de primeros auxilios',
          'Manuales de operación y bitácoras'
        ]
      }
    ]
  }
};

const evaluationDataConfig = {
  personal: {
    title: 'Evaluación de Personal',
    icon: Users,
    roles: [
      { id: 'jefe_planta', name: 'Jefe de Planta' },
      { id: 'laboratorista', name: 'Laboratorista' },
      { id: 'operador_camion', name: 'Operador de camión revolvedor' },
      { id: 'operador_bombas', name: 'Operador de bombas de concreto' }
    ],
  },
  equipo: {
    title: 'Evaluación de Equipo',
    icon: Wrench,
    sections: evaluationQuestions.jefe_planta.sections // Reutilizando preguntas como ejemplo
  },
  operacion: {
    title: 'Evaluación de Operación',
    icon: Settings,
    sections: evaluationQuestions.jefe_planta.sections // Reutilizando preguntas como ejemplo
  }
};


const EvaluationScreen = ({ evaluationType, onBack, onComplete, username }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedRole, setSelectedRole] = useState(null);
  const [evaluationStarted, setEvaluationStarted] = useState(false);

  const config = evaluationDataConfig[evaluationType];
  let currentEvaluationData;

  if (evaluationType === 'personal' && selectedRole) {
    currentEvaluationData = evaluationQuestions[selectedRole];
  } else if (evaluationType !== 'personal') {
    currentEvaluationData = config;
  } else {
    currentEvaluationData = config; // Para la pantalla de selección de rol
  }
  
  const totalSections = currentEvaluationData?.sections?.length || 0;
  const currentSectionData = currentEvaluationData?.sections?.[currentSection];
  const totalQuestions = currentSectionData?.questions?.length || 0;
  
  const progress = totalSections > 0 && totalQuestions > 0 
    ? ((currentSection * 100) + ((currentQuestion + 1) / totalQuestions * 100)) / totalSections 
    : 0;

  const handleAnswer = (answer) => {
    const key = `${selectedRole || evaluationType}-${currentSection}-${currentQuestion}`;
    setAnswers(prev => ({ ...prev, [key]: answer }));
    
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else if (currentSection < totalSections - 1) {
      setCurrentSection(prev => prev + 1);
      setCurrentQuestion(0);
    } else {
      const finalAnswers = { ...answers, [key]: answer };
      const totalAnswerCount = Object.keys(finalAnswers).length;
      // Calcular puntaje basado en respuestas 'si'
      let score = 0;
      Object.values(finalAnswers).forEach(ans => {
        if (ans === 'si') score += 1;
      });
      const percentageScore = totalAnswerCount > 0 ? (score / totalAnswerCount) * 100 : 0;
      
      onComplete({ 
        answers: finalAnswers, 
        score: Math.round(percentageScore), 
        totalAnswers: totalAnswerCount,
        evaluationTitle: currentEvaluationData.title,
        sections: currentEvaluationData.sections.map(sec => ({
          title: sec.title,
          questions: sec.questions.map((q, i) => ({
            text: q,
            answer: finalAnswers[`${selectedRole || evaluationType}-${currentEvaluationData.sections.indexOf(sec)}-${i}`]
          }))
        }))
      });
    }
  };

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    setCurrentSection(0);
    setCurrentQuestion(0);
    setAnswers({});
  };

  const handleStartEvaluation = () => {
    if (evaluationType === 'personal' && !selectedRole) {
      toast({
        title: "Selecciona un rol",
        description: "Debes seleccionar un rol antes de continuar.",
        variant: "destructive"
      });
      return;
    }
    setEvaluationStarted(true);
  };

  const MainIcon = config.icon;

  if (evaluationType === 'personal' && !evaluationStarted) {
    return (
      <div className="min-h-screen custom-bg flex flex-col">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-700/10"></div>
        
        <header className="relative z-10 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
               <Button variant="ghost" onClick={onBack} className="p-2 -ml-2">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Button>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow">
                <MainIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-semibold text-gray-800">{config.title}</span>
                <p className="text-xs text-gray-500">Selección de Rol</p>
              </div>
            </div>
          </div>
        </header>

        <main className="relative z-10 flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-white mb-2">
              Selecciona el Rol a Evaluar
            </h1>
            <p className="text-md text-white/80">
              Elige uno de los siguientes roles para comenzar la evaluación.
            </p>
          </motion.div>

          <motion.div 
            className="w-full max-w-md space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            {config.roles.map((role, index) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.99 }}
              >
                <Button
                  variant={selectedRole === role.id ? "default" : "list"}
                  size="lg"
                  onClick={() => handleRoleSelect(role.id)}
                  className={`w-full font-medium py-5 rounded-md text-md button-list-item justify-start pl-6 
                              ${selectedRole === role.id ? 'bg-blue-600 text-white shadow-lg ring-2 ring-blue-300' : 'text-gray-700'}`}
                >
                  {evaluationQuestions[role.id]?.icon && React.createElement(evaluationQuestions[role.id].icon, { className: "w-5 h-5 mr-3" })}
                  {role.name}
                </Button>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-10">
            <Button
              onClick={handleStartEvaluation}
              disabled={!selectedRole}
              size="lg"
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-10 py-3 text-lg font-semibold rounded-lg shadow-md disabled:opacity-60"
            >
              Iniciar Evaluación
            </Button>
          </div>
        </main>
        <motion.div
          initial={{ opacity: 0, x: 100, y:50 }}
          animate={{ opacity: 1, x: 0, y:0 }}
          transition={{ duration: 1.2, delay: 0.5, type: "spring", stiffness: 50 }}
          className="fixed bottom-0 right-0 md:right-5 z-20 pointer-events-none"
        >
          <img    
            alt="Concreton - Mascota IMCYC"
            className="w-auto h-48 sm:h-56 md:h-64 drop-shadow-xl" 
             src="../../public/Concreton.png" />
        </motion.div>
      </div>
    );
  }


  if (!currentEvaluationData || !currentEvaluationData.sections || currentEvaluationData.sections.length === 0) {
     return (
        <div className="min-h-screen custom-bg flex flex-col items-center justify-center text-white p-4">
            <Building2 size={64} className="mb-4 text-blue-300"/>
            <h1 className="text-3xl font-bold mb-2">Evaluación no disponible</h1>
            <p className="text-lg mb-6 text-center">No se encontraron preguntas para esta selección.</p>
            <Button onClick={onBack} variant="outline" className="text-white border-white hover:bg-white/10">
                <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Menú
            </Button>
        </div>
    );
  }


  return (
    <div className="min-h-screen custom-bg">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-700/10"></div>
      
      <header className="relative z-10 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" onClick={onBack} className="p-2 -ml-2">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Button>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow">
                {currentEvaluationData.icon ? React.createElement(currentEvaluationData.icon, { className: "w-5 h-5 text-white" }) : <Building2 className="w-5 h-5 text-white" />}
              </div>
              <div>
                <span className="text-lg font-semibold text-gray-800">{currentEvaluationData.title}</span>
                <p className="text-xs text-gray-500">
                  {currentSectionData?.title}
                </p>
              </div>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <motion.div
              className="progress-bar h-2.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "circOut" }}
            />
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentSection}-${currentQuestion}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <Card className="question-card rounded-xl border-0 shadow-xl mb-8">
              <CardHeader className="pb-3 bg-gray-50 rounded-t-xl border-b">
                <CardTitle className="text-xl text-center font-semibold text-gray-700">
                  {currentSectionData?.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 py-6">
                <div className="mb-6 min-h-[60px] flex items-center">
                  <p className="text-md font-medium text-gray-700 leading-relaxed">
                    <span className="text-blue-600 font-semibold">{currentQuestion + 1}. </span> 
                    {currentSectionData?.questions[currentQuestion]}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { value: 'si', label: 'SÍ', icon: CheckCircle, color: 'bg-green-500 hover:bg-green-600 focus:ring-green-400' },
                    { value: 'no', label: 'NO', icon: XCircle, color: 'bg-red-500 hover:bg-red-600 focus:ring-red-400' },
                    { value: 'na', label: 'N/A', icon: MinusCircle, color: 'bg-gray-500 hover:bg-gray-600 focus:ring-gray-400' }
                  ].map((option) => {
                    const Icon = option.icon;
                    return (
                      <motion.div
                        key={option.value}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <Button
                          onClick={() => handleAnswer(option.value)}
                          className={`w-full h-16 ${option.color} text-white font-semibold text-md rounded-lg shadow-md transition-all duration-150 ease-in-out flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-offset-2`}
                        >
                          <Icon className="w-5 h-5" />
                          <span>{option.label}</span>
                        </Button>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="mt-6 text-center text-xs text-gray-500">
                  Pregunta {currentQuestion + 1} de {totalQuestions} | Sección {currentSection + 1} de {totalSections}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </main>

      <motion.div
        initial={{ opacity: 0, x: 100, y:50 }}
        animate={{ opacity: 1, x: 0, y:0 }}
        transition={{ duration: 1.2, delay: 0.5, type: "spring", stiffness: 50 }}
        className="fixed bottom-0 right-0 md:right-5 z-20 pointer-events-none"
      >
        <img    
          alt="Concreton - Mascota IMCYC"
          className="w-auto h-48 sm:h-56 md:h-64 drop-shadow-xl" 
           src="../../public/Concreton.png" />
      </motion.div>
    </div>
  );
};

export default EvaluationScreen;