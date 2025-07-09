"use client";
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loading } from '@/components/ui/loading';
import { Brain, Target, TrendingUp, Clock, Star, ChevronRight } from 'lucide-react';

interface LearningGoal {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
  skills: string[];
  icon: string;
}

interface RecommendedPath {
  id: string;
  title: string;
  description: string;
  companions: any[];
  totalDuration: number;
  difficulty: string;
  completionRate: number;
  popularity: number;
}

const LearningPathRecommender: React.FC = () => {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState<'goals' | 'skills' | 'paths'>('goals');
  const [skillLevel, setSkillLevel] = useState<string>('');
  const [recommendedPaths, setRecommendedPaths] = useState<RecommendedPath[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const learningGoals: LearningGoal[] = [
    {
      id: 'academic-excellence',
      title: 'Academic Excellence',
      description: 'Master your coursework and achieve top grades',
      difficulty: 'intermediate',
      estimatedTime: 120,
      skills: ['critical-thinking', 'research', 'writing'],
      icon: '🎓'
    },
    {
      id: 'career-prep',
      title: 'Career Preparation',
      description: 'Build skills for your dream job',
      difficulty: 'advanced',
      estimatedTime: 180,
      skills: ['communication', 'leadership', 'problem-solving'],
      icon: '💼'
    },
    {
      id: 'creative-skills',
      title: 'Creative Development',
      description: 'Enhance your artistic and creative abilities',
      difficulty: 'beginner',
      estimatedTime: 90,
      skills: ['creativity', 'design-thinking', 'innovation'],
      icon: '🎨'
    },
    {
      id: 'tech-literacy',
      title: 'Digital Fluency',
      description: 'Master modern technology and digital tools',
      difficulty: 'intermediate',
      estimatedTime: 150,
      skills: ['coding', 'digital-tools', 'data-analysis'],
      icon: '💻'
    },
    {
      id: 'personal-growth',
      title: 'Personal Development',
      description: 'Build confidence and life skills',
      difficulty: 'beginner',
      estimatedTime: 75,
      skills: ['self-awareness', 'emotional-intelligence', 'mindfulness'],
      icon: '🌱'
    },
    {
      id: 'language-mastery',
      title: 'Language Excellence',
      description: 'Become fluent in multiple languages',
      difficulty: 'advanced',
      estimatedTime: 200,
      skills: ['linguistics', 'cultural-awareness', 'communication'],
      icon: '🌍'
    }
  ];

  const skillLevels = [
    { id: 'beginner', label: 'Beginner', description: 'Just starting out', icon: '🌱' },
    { id: 'intermediate', label: 'Intermediate', description: 'Some experience', icon: '📈' },
    { id: 'advanced', label: 'Advanced', description: 'Highly experienced', icon: '🚀' }
  ];

  const generateRecommendations = async () => {
    setIsLoading(true);
    
    // Simulate AI-powered recommendation generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockPaths: RecommendedPath[] = [
      {
        id: 'path-1',
        title: 'Accelerated Learning Mastery',
        description: 'A comprehensive path combining your selected goals with proven learning techniques',
        companions: [],
        totalDuration: 45,
        difficulty: skillLevel,
        completionRate: 89,
        popularity: 94
      },
      {
        id: 'path-2',
        title: 'Adaptive Skill Builder',
        description: 'Personalized journey that adapts to your pace and learning style',
        companions: [],
        totalDuration: 60,
        difficulty: skillLevel,
        completionRate: 92,
        popularity: 87
      },
      {
        id: 'path-3',
        title: 'Expert-Guided Journey',
        description: 'Learn from industry experts with hands-on projects and real-world applications',
        companions: [],
        totalDuration: 75,
        difficulty: skillLevel,
        completionRate: 95,
        popularity: 91
      }
    ];
    
    setRecommendedPaths(mockPaths);
    setCurrentStep('paths');
    setIsLoading(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <div className="text-center space-y-4">
          <Brain className="w-16 h-16 mx-auto text-blue-500 animate-bounce" />
          <h3 className="text-xl font-semibold text-gray-800">AI is crafting your perfect learning path...</h3>
          <Loading variant="dots" size="lg" className="text-blue-500" />
          <p className="text-gray-600">Analyzing your goals and preferences</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 transform transition-all duration-300 hover:shadow-2xl">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
        <div className="relative z-10 flex items-center gap-3">
          <Brain className="w-8 h-8 animate-pulse" />
          <div>
            <h2 className="text-2xl font-bold text-white">Smart Learning Path Recommender</h2>
            <p className="text-blue-100">AI-powered personalized learning journey</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {['goals', 'skills', 'paths'].map((step, index) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep === step ? 'bg-blue-500 text-white' : 
                  ['goals', 'skills'].indexOf(currentStep) > ['goals', 'skills'].indexOf(step) ? 'bg-green-500 text-white' : 
                  'bg-gray-200 text-gray-600'
                }`}>
                  {index + 1}
                </div>
                {index < 2 && <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Learning Goals */}
        {currentStep === 'goals' && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">What are your learning goals?</h3>
              <p className="text-gray-600">Select all that apply to personalize your experience</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {learningGoals.map((goal) => (
                <div 
                  key={goal.id}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    selectedGoals.includes(goal.id) 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => {
                    setSelectedGoals(prev => 
                      prev.includes(goal.id) 
                        ? prev.filter(id => id !== goal.id)
                        : [...prev, goal.id]
                    );
                  }}
                >
                  <div className="text-3xl mb-2">{goal.icon}</div>
                  <h4 className="font-semibold mb-2">{goal.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{goal.description}</p>
                  <div className="flex justify-between items-center text-xs">
                    <span className={`px-2 py-1 rounded-full border ${getDifficultyColor(goal.difficulty)}`}>
                      {goal.difficulty}
                    </span>
                    <span className="text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {goal.estimatedTime}m
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Button 
                onClick={() => setCurrentStep('skills')}
                disabled={selectedGoals.length === 0}
                className="px-8"
              >
                Continue to Skill Assessment
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Skill Level */}
        {currentStep === 'skills' && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">What's your current skill level?</h3>
              <p className="text-gray-600">This helps us recommend the right difficulty level</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {skillLevels.map((level) => (
                <div 
                  key={level.id}
                  className={`border-2 rounded-lg p-6 cursor-pointer transition-all text-center ${
                    skillLevel === level.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSkillLevel(level.id)}
                >
                  <div className="text-4xl mb-3">{level.icon}</div>
                  <h4 className="font-semibold mb-2">{level.label}</h4>
                  <p className="text-sm text-gray-600">{level.description}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center space-x-4">
              <Button 
                variant="outline"
                onClick={() => setCurrentStep('goals')}
              >
                Back
              </Button>
              <Button 
                onClick={generateRecommendations}
                disabled={!skillLevel}
                className="px-8"
              >
                Generate My Learning Path
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Recommended Paths */}
        {currentStep === 'paths' && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Your Personalized Learning Paths</h3>
              <p className="text-gray-600">AI-curated paths based on your goals and skill level</p>
            </div>
            
            <div className="space-y-4">
              {recommendedPaths.map((path, index) => (
                <div key={path.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center font-semibold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">{path.title}</h4>
                        <p className="text-gray-600">{path.description}</p>
                      </div>
                    </div>
                    {index === 0 && (
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                        Recommended
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <Clock className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                      <div className="text-sm font-medium">{path.totalDuration} min</div>
                      <div className="text-xs text-gray-500">Duration</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <Target className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                      <div className="text-sm font-medium">{path.completionRate}%</div>
                      <div className="text-xs text-gray-500">Success Rate</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <TrendingUp className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                      <div className="text-sm font-medium">{path.popularity}%</div>
                      <div className="text-xs text-gray-500">Popularity</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <Star className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                      <div className="text-sm font-medium">{path.difficulty}</div>
                      <div className="text-xs text-gray-500">Level</div>
                    </div>
                  </div>
                  
                  <Button className="w-full" variant={index === 0 ? "default" : "outline"}>
                    {index === 0 ? "Start This Path" : "Choose This Path"}
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Button 
                variant="outline"
                onClick={() => {
                  setCurrentStep('goals');
                  setSelectedGoals([]);
                  setSkillLevel('');
                  setRecommendedPaths([]);
                }}
              >
                Start Over
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningPathRecommender;
