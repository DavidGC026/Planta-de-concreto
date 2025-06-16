
import React, { useState, useEffect } from 'react';
import LoginScreen from '@/components/LoginScreen';
import MainMenu from '@/components/MainMenu';
import EvaluationScreen from '@/components/EvaluationScreen';
import ResultsScreen from '@/components/ResultsScreen';
import { Toaster } from '@/components/ui/toaster';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [user, setUser] = useState(null);
  const [currentEvaluation, setCurrentEvaluation] = useState(null);
  const [evaluationResults, setEvaluationResults] = useState(null);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.href = '../public/Logo_imcyc.png'; // Asegúrate que este archivo exista en tu carpeta public
    document.head.appendChild(favicon);

    document.title = "IMCYC Evaluación de Plantas";


  }, []);

  const handleLogin = (username) => {
    setUser(username);
    setCurrentScreen('menu');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('login');
    setCurrentEvaluation(null);
    setEvaluationResults(null);
  };

  const handleSelectEvaluation = (evaluationType) => {
    setCurrentEvaluation(evaluationType);
    setCurrentScreen('evaluation');
  };

  const handleBackToMenu = () => {
    setCurrentScreen('menu');
    setCurrentEvaluation(null);
    setEvaluationResults(null);
  };

  const handleEvaluationComplete = (results) => {
    setEvaluationResults(results);
    setCurrentScreen('results');
  };

  const handleNewEvaluation = () => {
    setCurrentScreen('menu');
    setCurrentEvaluation(null);
    setEvaluationResults(null);
  };

  return (
    <div className="min-h-screen">
      {currentScreen === 'login' && (
        <LoginScreen onLogin={handleLogin} />
      )}
      
      {currentScreen === 'menu' && (
        <MainMenu 
          onSelectEvaluation={handleSelectEvaluation}
          onLogout={handleLogout}
          username={user}
        />
      )}
      
      {currentScreen === 'evaluation' && (
        <EvaluationScreen
          evaluationType={currentEvaluation}
          onBack={handleBackToMenu}
          onComplete={handleEvaluationComplete}
          username={user}
        />
      )}
      
      {currentScreen === 'results' && (
        <ResultsScreen
          results={evaluationResults}
          onBack={handleBackToMenu}
          onNewEvaluation={handleNewEvaluation}
        />
      )}
      
      <Toaster />
    </div>
  );
};

export default App;