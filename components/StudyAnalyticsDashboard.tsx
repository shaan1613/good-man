"use client";
import React, { useState, useEffect } from 'react';
import { BarChart3, Brain, Clock, Target, TrendingUp, Calendar, Award, Zap } from 'lucide-react';
import { getUserSessions, getUserCompanions } from '@/lib/actions/companion.action';
import { useUser } from '@clerk/nextjs';

interface StudySession {
  id: string;
  date: string;
  subject: string;
  duration: number;
  score: number;
  companion: string;
  topics: string[];
}

interface LearningInsight {
  type: 'strength' | 'improvement' | 'trend' | 'recommendation';
  title: string;
  description: string;
  icon: string;
  actionable?: string;
}

interface SubjectProgress {
  subject: string;
  progress: number;
  sessions: number;
  avgScore: number;
}

const StudyAnalyticsDashboard: React.FC = () => {
  const { user } = useUser();
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('week');
  const [selectedMetric, setSelectedMetric] = useState<'time' | 'performance' | 'engagement'>('time');
  const [insights, setInsights] = useState<LearningInsight[]>([]);
  const [userSessions, setUserSessions] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<SubjectProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const userSessionData = await getUserSessions(user.id);
        const userCompanions = await getUserCompanions(user.id);
        
        // Transform companion data to match expected session structure
        const sessionData = userCompanions.map((companion: any, index: number) => ({
          id: companion.id || `session-${index}`,
          date: new Date().toISOString(),
          subject: companion.subject || 'General',
          duration: companion.duration || 30,
          score: Math.floor(Math.random() * 20) + 80, // Mock score
          companion: companion.name || 'AI Companion',
          topics: [companion.topic] || ['Learning']
        }));

        const uniqueSubjects = [...new Set(sessionData.map(session => session.subject))];
        const subjectProgressData = uniqueSubjects.map(subject => {
          const filteredSessions = sessionData.filter(session => session.subject === subject);
          return {
            subject,
            progress: Math.min(Math.round((filteredSessions.length / userCompanions.length) * 100), 100),
            sessions: filteredSessions.length,
            avgScore: Math.round(filteredSessions.reduce((acc, cur) => acc + cur.score, 0) / filteredSessions.length || 0)
          };
        });

        setUserSessions(sessionData);
        setSubjects(subjectProgressData);
      } catch (error) {
        console.error("Error fetching user data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user?.id]);

// Fetch weekly data from user sessions
const computeWeeklyData = () => {
  return userSessions.reduce((acc, session) => {
    const day = new Date(session.date).toLocaleString('en-US', { weekday: 'short' });
    let data = acc.find(d => d.day === day);
    if (!data) {
      data = { day, time: 0, performance: 0, engagement: 0 };
      acc.push(data);
    }
    data.time += session.duration;
    data.performance += session.score;
    data.engagement += session.topics.length;
    return acc;
  }, []).map((data) => ({
    ...data,
    performance: Math.round(data.performance / subjects.length || 1),
    engagement: Math.round(data.engagement / userSessions.length || 1)
  }));
};

const weeklyData = computeWeeklyData();

const achievementStats = {
  totalHours: userSessions.reduce((acc, session) => acc + session.duration, 0),
  completedSessions: userSessions.length,
  averageScore: Math.round(userSessions.reduce((acc, session) => acc + session.score, 0) / userSessions.length || 1),
  improvementRate: Math.round(subjects.reduce((acc, subject) => acc + subject.progress, 0) / subjects.length || 1)
};

// Mocked learning streaks calculated from sessions data
const learningStreaks = {
  current: userSessions.reduce((streak, session) => {
    // Assuming session dates are in order
    const sessionDate = new Date(session.date);
    const today = new Date();
    const diffInDays = Math.floor((today - sessionDate) / (1000 * 60 * 60 * 24));
    return diffInDays === 1 ? streak + 1 : streak;
  }, 0),
  longest: 28,  // Placeholder
  thisWeek: userSessions.filter(s => {
    const d = new Date(s.date);
    return d > new Date(new Date().setDate(new Date().getDate() - 7));
  }).length,
  thisMonth: userSessions.filter(s => {
    const d = new Date(s.date);
    return d > new Date(new Date().setMonth(new Date().getMonth() - 1));
  }).length
};

  useEffect(() => {
// Generate AI insights based on real data
    const generateInsights = () => {
      if (subjects.length === 0) {
        setInsights([
          {
            type: 'recommendation',
            title: 'Start Your Learning Journey',
            description: 'No study sessions found. Create a companion and start learning!',
            icon: '🚀',
            actionable: 'Create your first AI companion'
          }
        ]);
        return;
      }

      const topSubject = subjects.sort((a, b) => b.avgScore - a.avgScore)[0];
      const weakestSubject = subjects.sort((a, b) => a.progress - b.progress)[0];
      
      const insightsData: LearningInsight[] = [
        {
          type: 'strength',
          title: 'Excellence in Top Subject',
          description: `You're performing exceptionally well in ${topSubject.subject} with ${topSubject.avgScore}% average score`,
          icon: '🌟',
          actionable: `Consider taking advanced ${topSubject.subject} challenges`
        },
        {
          type: 'improvement',
          title: 'Needs Improvement',
          description: `Your progress in ${weakestSubject.subject} is at ${weakestSubject.progress}%. Focus sessions could help`,
          icon: '📚',
          actionable: `Schedule 2 extra ${weakestSubject.subject} sessions this week`
        },
        {
          type: 'trend',
          title: 'Learning Progress',
          description: `You've completed ${userSessions.length} study sessions with consistent improvement`,
          icon: '📈',
          actionable: 'Keep up the great work!'
        },
        {
          type: 'recommendation',
          title: 'Consistency Boost',
          description: 'Maintain regular study sessions to maximize retention and progress',
          icon: '⚡',
          actionable: 'Set daily study reminders'
        }
      ];
      setInsights(insightsData);
    };

    generateInsights();
  }, [timeframe]);

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'strength': return 'bg-green-50 border-green-200 text-green-800';
      case 'improvement': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'trend': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'recommendation': return 'bg-purple-50 border-purple-200 text-purple-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div 
        className="bg-white rounded-xl shadow-xl p-6 border border-gray-100 transform transition-all duration-300 hover:shadow-2xl"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-blue-500 animate-pulse" />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Learning Analytics</h2>
              <p className="text-gray-600">Track your progress and discover insights</p>
            </div>
          </div>
          <div className="flex gap-2">
            {['week', 'month', 'year'].map((period) => (
              <button
                key={period}
                onClick={() => setTimeframe(period as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  timeframe === period
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-lg text-white">
            <Clock className="w-6 h-6 mb-2" />
            <div className="text-2xl font-bold">{achievementStats.totalHours}h</div>
            <div className="text-sm opacity-90">Total Study Time</div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-lg text-white">
            <Target className="w-6 h-6 mb-2" />
            <div className="text-2xl font-bold">{achievementStats.averageScore}%</div>
            <div className="text-sm opacity-90">Average Score</div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-lg text-white">
            <Zap className="w-6 h-6 mb-2" />
            <div className="text-2xl font-bold">{learningStreaks.current}</div>
            <div className="text-sm opacity-90">Day Streak</div>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-lg text-white">
            <TrendingUp className="w-6 h-6 mb-2" />
            <div className="text-2xl font-bold">+{achievementStats.improvementRate}%</div>
            <div className="text-sm opacity-90">Improvement</div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Weekly Performance</h3>
            <div className="flex gap-1">
              {['time', 'performance', 'engagement'].map((metric) => (
                <button
                  key={metric}
                  onClick={() => setSelectedMetric(metric as any)}
                  className={`px-3 py-1 rounded text-xs font-medium ${
                    selectedMetric === metric
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {metric.charAt(0).toUpperCase() + metric.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-2">
            {weeklyData.map((day, index) => {
              const value = day[selectedMetric];
              const maxValue = Math.max(...weeklyData.map(d => d[selectedMetric]));
              const height = (value / maxValue) * 100;
              
              return (
                <div key={day.day} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-gray-100 rounded-t relative group">
                    <div
                      className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t transition-all duration-500 ease-out"
                      style={{ height: `${height * 2}px` }}
                    />
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      {selectedMetric === 'time' ? formatTime(value) : `${value}%`}
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 mt-2">{day.day}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Subject Progress */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-6">Subject Progress</h3>
          <div className="space-y-4">
            {subjects.map((subject) = (
              div key={subject.subject} className="space-y-2"
                div className="flex justify-between items-center"
                  span className="font-medium"{subject.subject}/span
                  div className="text-sm text-gray-600"
                    {subject.progress}% • {subject.sessions} sessions
                  /div
                /div
                div className="w-full bg-gray-200 rounded-full h-3"
                  div
                    className="bg-gradient-to-r from-green-400 to-green-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${subject.progress}%` }}
                  /
                /div
                div className="flex justify-between text-xs text-gray-500"
                  spanAvg Score: {subject.avgScore}%/span
                  span{100 - subject.progress}% remaining/span
                /div
              /div
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Brain className="w-6 h-6 text-purple-500" />
          <h3 className="text-lg font-semibold">AI-Powered Insights</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.map((insight, index) => (
            <div
              key={index}
              className={`border-2 rounded-lg p-4 ${getInsightColor(insight.type)}`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{insight.icon}</span>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">{insight.title}</h4>
                  <p className="text-sm mb-2">{insight.description}</p>
                  {insight.actionable && (
                    <div className="bg-white bg-opacity-50 rounded px-2 py-1 text-xs font-medium">
                      💡 {insight.actionable}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Streaks & Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-6 h-6 text-orange-500" />
            <h3 className="text-lg font-semibold">Learning Streaks</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{learningStreaks.current}</div>
              <div className="text-sm text-gray-600">Current Streak</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{learningStreaks.longest}</div>
              <div className="text-sm text-gray-600">Longest Streak</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{learningStreaks.thisWeek}</div>
              <div className="text-sm text-gray-600">This Week</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{learningStreaks.thisMonth}</div>
              <div className="text-sm text-gray-600">This Month</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-6 h-6 text-yellow-500" />
            <h3 className="text-lg font-semibold">Recent Achievements</h3>
          </div>
          
          <div className="space-y-3">
            {[
              { title: 'Speed Learner', desc: 'Completed 5 sessions in one day', icon: '⚡' },
              { title: 'Math Master', desc: 'Scored 95%+ in 10 math sessions', icon: '🧮' },
              { title: 'Consistency King', desc: 'Maintained 14-day learning streak', icon: '👑' },
              { title: 'Knowledge Seeker', desc: 'Explored 3 new subjects this month', icon: '🔍' }
            ].map((achievement, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                <span className="text-2xl">{achievement.icon}</span>
                <div className="flex-1">
                  <div className="font-medium text-yellow-800">{achievement.title}</div>
                  <div className="text-sm text-yellow-600">{achievement.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StudyAnalyticsDashboard;
