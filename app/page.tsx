import Link from 'next/link';
import { Button } from '@/components/ui/button';
import KnowledgeGraphExplorer from '@/components/KnowledgeGraphExplorer';

const Page = () => {
  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 float-slow top-10 left-10"></div>
        <div className="absolute w-96 h-96 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-15 float-medium top-32 right-20"></div>
        <div className="absolute w-64 h-64 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-25 float-fast bottom-20 left-32"></div>
        <div className="absolute w-48 h-48 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 float-slow bottom-32 right-10"></div>
      </div>

      {/* Hero Section */}
      <section className="hero-modern">
        <div className="hero-content-modern">
          <h1 className="hero-title-modern">
            Work AI for all.
          </h1>
          <p className="hero-description-modern">
            The Work AI platform connected to all your data. Find, create and automate anything.
          </p>
          <div className="hero-actions-modern">
            <Link href="/dashboard">
              <Button className="btn-demo">
                GET A DEMO
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Feature Card */}
        <div className="feature-card-modern">
          <div className="feature-card-content">
            <div className="feature-icon-modern">📊</div>
            <h3 className="feature-title">The Work AI platform</h3>
            <p className="feature-description">
              connected to all your data. Find, create and automate anything.
            </p>
          </div>
        </div>
      </section>

      {/* Knowledge Graph Section */}
      <section className="my-16 px-6 max-w-7xl mx-auto">
        <KnowledgeGraphExplorer />
      </section>

      {/* Bottom Section with Modern Cards */}
      <section className="bottom-section">
        <div className="cards-container">
          <div className="modern-card">
            <div className="card-icon">🤖</div>
            <h3>AI Companions</h3>
            <p>Personalized learning assistants</p>
          </div>
          <div className="modern-card">
            <div className="card-icon">⚡</div>
            <h3>Instant Results</h3>
            <p>Real-time learning feedback</p>
          </div>
          <div className="modern-card">
            <div className="card-icon">🎯</div>
            <h3>Smart Targeting</h3>
            <p>Adaptive learning paths</p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Page
