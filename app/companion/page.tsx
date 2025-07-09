import {getSubjectColor} from "@/lib/utils";
import { getAllCompanions } from "@/lib/actions/companion.action";
// import { SearchParams } from "@/types";
import CompanionCard from "@/components/companioncard";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";

const CompanionsLibrary = async ({ searchParams }: SearchParams) => {
    const filters = await searchParams;
    const subject = filters.subject ? filters.subject : '';
    const topic = filters.topic ? filters.topic : '';

    const companions = await getAllCompanions({ subject, topic });
    
    return(
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <section className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6 bg-white rounded-lg shadow-sm p-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Your library</h1>
            <div className="flex flex-1 gap-4">
              <SearchInput />
              <SubjectFilter />
            </div>
          </div>
        </section>
        <section className="container mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {companions.map((companion) => (
              <CompanionCard
                key={companion.id}
                {...companion}
                color={getSubjectColor(companion.subject)}
              />
            ))}
          </div>
        </section>
      </main>
    )
}

export default CompanionsLibrary