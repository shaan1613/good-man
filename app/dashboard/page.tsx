import { Suspense } from 'react';
import CompanionCard from '@/components/companioncard';
import CTA from '@/components/CTA';
import CompanionsList from '@/components/Companionlist';
import { getAllCompanions, getRecentSessions } from "@/lib/actions/companion.action";
import { getSubjectColor } from "@/lib/utils";
import { LoadingGrid } from '@/components/ui/loading';
import { LoadingCard } from '@/components/ui/loading';
import LearningPathRecommender from '@/components/LearningPathRecommender';
import StudyAnalyticsDashboard from '@/components/StudyAnalyticsDashboard';
import KnowledgeGraphExplorer from '@/components/KnowledgeGraphExplorer';

const DashboardContent = async () => {
  const companions = await getAllCompanions({ limit: 3 });
  const recentSessionsCompanions = await getRecentSessions(10);

  return (
    <>
      {/* AI Learning Path Recommender */}
      <section className="mb-8">
        <LearningPathRecommender />
      </section>

      {/* Study Analytics Dashboard */}
      <section className="mb-8">
        <StudyAnalyticsDashboard />
      </section>

      {/* Knowledge Graph Explorer */}
      <section className="mb-8">
        <KnowledgeGraphExplorer />
      </section>

      <h1 className="text-3xl font-bold text-gray-800 mb-6">Popular Companions</h1>
      <section className="home-section">
        {companions.map((companion) => (
          <CompanionCard
            key={companion.id}
            {...companion}
            color={getSubjectColor(companion.subject)}
          />
        ))}
      </section>

      <section className='home-section'>
        <CompanionsList
          title="Recently Completed Sessions"
          companions={recentSessionsCompanions}
        />
        <CTA />
      </section>
    </>
  );
};

const Page = () => {
  return (
    <main>
      <Suspense fallback={
        <div className="flex flex-col gap-8">
          <div className="h-8 bg-gray-200 rounded w-64 animate-pulse"></div>
          <div className="home-section">
            <LoadingGrid count={3} />
          </div>
          <div className="home-section">
            <div className="companion-list animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="h-12 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
            <div className="cta-section animate-pulse">
              <div className="h-6 bg-gray-300 rounded w-32 mb-4"></div>
              <div className="h-16 bg-gray-300 rounded mb-4"></div>
              <div className="h-10 bg-gray-300 rounded w-24"></div>
            </div>
          </div>
        </div>
      }>
        <DashboardContent />
      </Suspense>
    </main>
  );
};

export default Page;
