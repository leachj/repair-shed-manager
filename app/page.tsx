import { Card } from '@/app/ui/dashboard/cards';
import { fetchCardData } from '@/app/lib/data';
import { getUserName, getUserId } from '@/app/lib/user';
 
export const dynamic = "force-dynamic"

export default async function Page() {
  const { numberOfJobs, numberOfCustomers, numberOfJobsAssignedToMe } = await fetchCardData();
  const userName = await getUserName();
  const userId = await getUserId();

  return (
    <main>
      <h1 className={`mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <h2>
        Welcome back {userName}
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="My Jobs" value={numberOfJobsAssignedToMe} type="jobs" filter={userId}/>
        <Card title="Total Jobs" value={numberOfJobs} type="jobs" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8"></div>
    </main>
  );
}