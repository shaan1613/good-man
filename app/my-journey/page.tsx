import { Suspense } from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  getUserCompanions,
  getUserSessions,
} from "@/lib/actions/companion.action";
import Image from "next/image";
import CompanionsList from "@/components/Companionlist";
import { createSupabaseClient } from "@/lib/supabase";
import { calculateDailyStreak } from "@/lib/utils";
import { Loading } from "@/components/ui/loading";

const MyJourneyPage = async () => {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const companions = await getUserCompanions(user.id);
  const sessionHistory = await getUserSessions(user.id);

  // Fetch all logs for the user to calculate streak
  const supabase = createSupabaseClient();
  const { data: logs } = await supabase
    .from("logs")
    .select("created_at")
    .eq("user_id", user.id);

  const streak = calculateDailyStreak(logs?.map(log => log.created_at) || []);

  return (
    <main className="min-lg:w-3/4 bg-gray-50 min-h-screen">
      {/* Hero Header */}
      <section className="journey-header">
        <div className="journey-profile">
          <Image
            src={user.imageUrl}
            alt={`${user.firstName} ${user.lastName}`}
            className="journey-avatar"
            width={96}
            height={96}
          />
          <div className="journey-info">
            <h1>{`${user.firstName} ${user.lastName}`}</h1>
            <p>{user.emailAddresses[0].emailAddress}</p>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            ✅
          </div>
          <p className="stat-number">{sessionHistory.length}</p>
          <p className="stat-label">Lessons Completed</p>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            🎓
          </div>
          <p className="stat-number">{companions.length}</p>
          <p className="stat-label">Companions Created</p>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            🔥
          </div>
          <p className="stat-number">{streak}</p>
          <p className="stat-label">Daily Streak</p>
        </div>
      </div>

      {/* Journey Sections */}
      <div className="journey-sections">
        <div className="journey-section">
          <div className="section-header">
            <h2 className="section-title">Recent Sessions</h2>
          </div>
          <div className="section-content">
            <Suspense fallback={<Loading variant="spinner" size="lg" />}>
              <CompanionsList
                title="Recent Sessions"
                companions={sessionHistory}
                classNames="border-none shadow-none bg-transparent p-0"
              />
            </Suspense>
          </div>
        </div>
        
        <div className="journey-section">
          <div className="section-header">
            <h2 className="section-title">My Companions ({companions.length})</h2>
          </div>
          <div className="section-content">
            <Suspense fallback={<Loading variant="spinner" size="lg" />}>
              <CompanionsList
                title="My Companions"
                companions={companions}
                classNames="border-none shadow-none bg-transparent p-0"
              />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MyJourneyPage;
