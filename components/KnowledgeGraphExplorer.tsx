"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Search, Network, BookOpen, Lightbulb, Share2, Eye, ChevronDown, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface KnowledgeNode {
  id: string;
  label: string;
  type: 'subject' | 'topic' | 'concept' | 'skill';
  x: number;
  y: number;
  connections: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  progress: number;
  color: string;
  size: number;
}

interface Connection {
  from: string;
  to: string;
  strength: number;
  type: 'prerequisite' | 'related' | 'builds-on' | 'applies-to';
}

const KnowledgeGraphExplorer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodes, setNodes] = useState<KnowledgeNode[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [isExploring, setIsExploring] = useState(false);

  // Initialize knowledge graph data
  useEffect(() => {
    const initializeGraph = () => {
      const mockNodes: KnowledgeNode[] = [
        {
          id: 'math-basics',
          label: 'Basic Mathematics',
          type: 'subject',
          x: 300,
          y: 200,
          connections: ['algebra', 'geometry'],
          difficulty: 'beginner',
          progress: 85,
          color: '#3B82F6',
          size: 60
        },
        {
          id: 'algebra',
          label: 'Algebra',
          type: 'topic',
          x: 150,
          y: 100,
          connections: ['calculus', 'equations'],
          difficulty: 'intermediate',
          progress: 65,
          color: '#10B981',
          size: 50
        },
        {
          id: 'geometry',
          label: 'Geometry',
          type: 'topic',
          x: 450,
          y: 100,
          connections: ['trigonometry', 'shapes'],
          difficulty: 'intermediate',
          progress: 72,
          color: '#8B5CF6',
          size: 50
        },
        {
          id: 'calculus',
          label: 'Calculus',
          type: 'concept',
          x: 50,
          y: 50,
          connections: ['derivatives', 'integrals'],
          difficulty: 'advanced',
          progress: 30,
          color: '#EF4444',
          size: 45
        },
        {
          id: 'trigonometry',
          label: 'Trigonometry',
          type: 'concept',
          x: 550,
          y: 50,
          connections: ['sin-cos-tan', 'unit-circle'],
          difficulty: 'advanced',
          progress: 45,
          color: '#F59E0B',
          size: 45
        },
        {
          id: 'programming',
          label: 'Programming',
          type: 'subject',
          x: 300,
          y: 400,
          connections: ['python', 'javascript', 'algorithms'],
          difficulty: 'intermediate',
          progress: 78,
          color: '#6366F1',
          size: 60
        },
        {
          id: 'python',
          label: 'Python',
          type: 'topic',
          x: 200,
          y: 350,
          connections: ['data-structures', 'web-development'],
          difficulty: 'beginner',
          progress: 90,
          color: '#059669',
          size: 50
        },
        {
          id: 'javascript',
          label: 'JavaScript',
          type: 'topic',
          x: 400,
          y: 350,
          connections: ['react', 'node-js'],
          difficulty: 'intermediate',
          progress: 55,
          color: '#DC2626',
          size: 50
        },
        {
          id: 'algorithms',
          label: 'Algorithms',
          type: 'concept',
          x: 300,
          y: 500,
          connections: ['sorting', 'searching', 'graph-theory'],
          difficulty: 'advanced',
          progress: 40,
          color: '#7C3AED',
          size: 45
        }
      ];

      const mockConnections: Connection[] = [
        { from: 'math-basics', to: 'algebra', strength: 0.9, type: 'prerequisite' },
        { from: 'math-basics', to: 'geometry', strength: 0.8, type: 'prerequisite' },
        { from: 'algebra', to: 'calculus', strength: 0.95, type: 'builds-on' },
        { from: 'geometry', to: 'trigonometry', strength: 0.85, type: 'builds-on' },
        { from: 'programming', to: 'python', strength: 0.7, type: 'prerequisite' },
        { from: 'programming', to: 'javascript', strength: 0.7, type: 'prerequisite' },
        { from: 'programming', to: 'algorithms', strength: 0.9, type: 'builds-on' },
        { from: 'python', to: 'algorithms', strength: 0.6, type: 'applies-to' },
        { from: 'javascript', to: 'algorithms', strength: 0.6, type: 'applies-to' },
        { from: 'calculus', to: 'algorithms', strength: 0.4, type: 'related' }
      ];

      setNodes(mockNodes);
      setConnections(mockConnections);
    };

    initializeGraph();
  }, []);

  // Canvas drawing logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawGraph = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      connections.forEach(connection => {
        const fromNode = nodes.find(n => n.id === connection.from);
        const toNode = nodes.find(n => n.id === connection.to);
        
        if (fromNode && toNode) {
          ctx.beginPath();
          ctx.moveTo(fromNode.x, fromNode.y);
          ctx.lineTo(toNode.x, toNode.y);
          
          // Style based on connection type
          const alpha = connection.strength * 0.7;
          switch (connection.type) {
            case 'prerequisite':
              ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
              ctx.lineWidth = 3;
              break;
            case 'builds-on':
              ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
              ctx.lineWidth = 2;
              break;
            case 'related':
              ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
              ctx.lineWidth = 1;
              break;
            case 'applies-to':
              ctx.strokeStyle = `rgba(245, 158, 11, ${alpha})`;
              ctx.lineWidth = 2;
              break;
          }
          ctx.stroke();
        }
      });

      // Draw nodes
      nodes.forEach(node => {
        const isHovered = hoveredNode === node.id;
        const isSelected = selectedNode?.id === node.id;
        
        // Node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size / 2, 0, 2 * Math.PI);
        ctx.fillStyle = node.color;
        ctx.fill();
        
        // Progress ring
        ctx.beginPath();
        ctx.arc(node.x, node.y, (node.size / 2) + 5, 0, 2 * Math.PI * (node.progress / 100));
        ctx.strokeStyle = node.color;
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Hover/selection effects
        if (isHovered || isSelected) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.size / 2 + 8, 0, 2 * Math.PI);
          ctx.strokeStyle = isSelected ? '#FFD700' : '#FFFFFF';
          ctx.lineWidth = 3;
          ctx.stroke();
        }
        
        // Node label
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y + 4);
      });
    };

    drawGraph();
  }, [nodes, connections, hoveredNode, selectedNode]);

  // Handle canvas interactions
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Find clicked node
    const clickedNode = nodes.find(node => {
      const distance = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2);
      return distance <= node.size / 2;
    });

    if (clickedNode) {
      setSelectedNode(clickedNode);
      setIsExploring(true);
    } else {
      setSelectedNode(null);
      setIsExploring(false);
    }
  };

  const handleCanvasMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Find hovered node
    const hoveredNode = nodes.find(node => {
      const distance = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2);
      return distance <= node.size / 2;
    });

    setHoveredNode(hoveredNode ? hoveredNode.id : null);
    canvas.style.cursor = hoveredNode ? 'pointer' : 'default';
  };

  const filteredNodes = nodes.filter(node => {
    const matchesSearch = node.label.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || node.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getRelatedNodes = (nodeId: string) => {
    const related = new Set<string>();
    connections.forEach(conn => {
      if (conn.from === nodeId) related.add(conn.to);
      if (conn.to === nodeId) related.add(conn.from);
    });
    return Array.from(related);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-50';
      case 'intermediate': return 'text-yellow-600 bg-yellow-50';
      case 'advanced': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <Network className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Knowledge Graph Explorer</h2>
            <p className="opacity-90">Discover learning connections and pathways</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search topics..."
              className="w-full pl-10 pr-4 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              className="w-full pl-10 pr-8 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 appearance-none"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all" className="text-gray-800">All Types</option>
              <option value="subject" className="text-gray-800">Subjects</option>
              <option value="topic" className="text-gray-800">Topics</option>
              <option value="concept" className="text-gray-800">Concepts</option>
              <option value="skill" className="text-gray-800">Skills</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Graph Canvas */}
        <div className="flex-1 p-6">
          <canvas
            ref={canvasRef}
            width={600}
            height={600}
            className="w-full h-96 border border-gray-200 rounded-lg cursor-crosshair"
            onClick={handleCanvasClick}
            onMouseMove={handleCanvasMouseMove}
          />
          
          <div className="mt-4 flex flex-wrap gap-2">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-0.5 bg-blue-500"></div>
              <span>Prerequisite</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-0.5 bg-green-500"></div>
              <span>Builds On</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-0.5 bg-purple-500"></div>
              <span>Related</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-0.5 bg-yellow-500"></div>
              <span>Applies To</span>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="w-80 border-l border-gray-200 p-6 bg-gray-50">
          {selectedNode ? (
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold">{selectedNode.label}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(selectedNode.difficulty)}`}>
                    {selectedNode.difficulty}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <BookOpen className="w-4 h-4" />
                  <span className="capitalize">{selectedNode.type}</span>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{selectedNode.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${selectedNode.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Connected Topics
                </h4>
                <div className="space-y-2">
                  {getRelatedNodes(selectedNode.id).map(nodeId => {
                    const relatedNode = nodes.find(n => n.id === nodeId);
                    if (!relatedNode) return null;
                    
                    return (
                      <div
                        key={nodeId}
                        className="flex items-center justify-between p-2 bg-white rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
                        onClick={() => setSelectedNode(relatedNode)}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: relatedNode.color }}
                          />
                          <span className="text-sm font-medium">{relatedNode.label}</span>
                        </div>
                        <span className="text-xs text-gray-500">{relatedNode.progress}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <Button className="w-full" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  Start Learning
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Get Recommendations
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-20">
              <Network className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="font-medium mb-2">Explore the Knowledge Graph</h3>
              <p className="text-sm">Click on any node to see detailed information and connections</p>
              
              <div className="mt-8 text-left">
                <h4 className="font-semibold mb-3">Quick Stats</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total Topics:</span>
                    <span className="font-medium">{nodes.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Connections:</span>
                    <span className="font-medium">{connections.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Progress:</span>
                    <span className="font-medium">
                      {Math.round(nodes.reduce((sum, node) => sum + node.progress, 0) / nodes.length)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeGraphExplorer;
