
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Building2, ArrowLeft, Download, RotateCcw } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const ResultsScreen = ({ results, onBack, onNewEvaluation }) => {
  const { score, totalAnswers } = results;
  const status = score >= 160 ? 'APROBADO' : 'REPROBADO';
  const statusColor = status === 'APROBADO' ? 'text-green-600' : 'text-red-600';

  // Radar chart data (mock data for visualization)
  const categories = [
    'Conocimiento técnico y operativo',
    'Gestión de la producción',
    'Mantenimiento del equipo',
    'Seguridad y cumplimiento normativo',
    'Control de calidad',
    'Gestión del personal',
    'Documentación y control administrativo',
    'Coordinación con logística y clientes',
    'Resolución de problemas',
    'Mejora continua y enfoque a resultados'
  ];

  const generateRadarChart = () => {
    const centerX = 200;
    const centerY = 200;
    const radius = 150;
    const levels = 5;
    
    // Generate grid circles
    const gridCircles = [];
    for (let i = 1; i <= levels; i++) {
      const r = (radius * i) / levels;
      gridCircles.push(
        <circle
          key={`grid-${i}`}
          cx={centerX}
          cy={centerY}
          r={r}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="1"
        />
      );
    }

    // Generate grid lines
    const gridLines = [];
    categories.forEach((_, index) => {
      const angle = (index * 2 * Math.PI) / categories.length - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      gridLines.push(
        <line
          key={`line-${index}`}
          x1={centerX}
          y1={centerY}
          x2={x}
          y2={y}
          stroke="#e5e7eb"
          strokeWidth="1"
        />
      );
    });

    // Generate data points (random values for demo)
    const dataPoints = [];
    const values = categories.map(() => Math.random() * 0.7 + 0.3); // Random values between 0.3 and 1
    
    values.forEach((value, index) => {
      const angle = (index * 2 * Math.PI) / categories.length - Math.PI / 2;
      const x = centerX + radius * value * Math.cos(angle);
      const y = centerY + radius * value * Math.sin(angle);
      dataPoints.push({ x, y });
    });

    // Create polygon path
    const pathData = dataPoints.map((point, index) => 
      `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
    ).join(' ') + ' Z';

    return (
      <svg width="400" height="400" className="radar-chart">
        {gridCircles}
        {gridLines}
        
        {/* Data area */}
        <path
          d={pathData}
          fill="rgba(59, 130, 246, 0.3)"
          stroke="#3b82f6"
          strokeWidth="2"
        />
        
        {/* Data points */}
        {dataPoints.map((point, index) => (
          <circle
            key={`point-${index}`}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="#3b82f6"
          />
        ))}
        
        {/* Category labels */}
        {categories.map((category, index) => {
          const angle = (index * 2 * Math.PI) / categories.length - Math.PI / 2;
          const labelRadius = radius + 30;
          const x = centerX + labelRadius * Math.cos(angle);
          const y = centerY + labelRadius * Math.sin(angle);
          
          return (
            <text
              key={`label-${index}`}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="10"
              fill="#374151"
              className="font-medium"
            >
              <tspan x={x} dy="0">{category.split(' ').slice(0, 2).join(' ')}</tspan>
              {category.split(' ').length > 2 && (
                <tspan x={x} dy="12">{category.split(' ').slice(2).join(' ')}</tspan>
              )}
            </text>
          );
        })}
      </svg>
    );
  };

  const handleDownload = () => {
    toast({
      title: "🚧 Esta función no está implementada aún",
      description: "¡Pero no te preocupes! Puedes solicitarla en tu próximo prompt! 🚀"
    });
  };

  return (
    <div className="min-h-screen construction-bg">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-700/20"></div>
      
      {/* Header */}
      <div className="relative z-10 bg-white/95 backdrop-blur-sm border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" onClick={onBack} className="mr-2">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-800">IMCYC</span>
              <p className="text-sm text-gray-600">Inicio | Evaluación de Personal | Jefe de Planta</p>
            </div>
          </div>
        </div>
      </div>

      {/* Results Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="glass-card border-0 rounded-2xl">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-3xl font-bold text-gray-800 mb-2">
                Evaluación Final: {score}/{totalAnswers * 10}
              </CardTitle>
              <div className={`text-4xl font-bold ${statusColor}`}>
                {status}
              </div>
            </CardHeader>

            <CardContent className="px-8 pb-8">
              <div className="flex justify-center mb-8">
                {generateRadarChart()}
              </div>

              <div className="flex justify-center space-x-4">
                <Button
                  onClick={handleDownload}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar Reporte</span>
                </Button>
                
                <Button
                  onClick={onNewEvaluation}
                  variant="outline"
                  className="px-6 py-3 flex items-center space-x-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Nueva Evaluación</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Character */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="fixed bottom-8 right-8 z-20"
      >
        <img  
          alt="Mascota IMCYC trabajador de construcción"
          className="w-24 h-24 drop-shadow-lg"
         src="../../public/Concreton.png" />
      </motion.div>
    </div>
  );
};

export default ResultsScreen;
