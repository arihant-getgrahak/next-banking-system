import { Dashboard } from "@/components/dashboard";

export default function DashboardPage({
  params,
}: {
  params: { email: string };
}) {
  return <Dashboard email={decodeURIComponent(params.email)} />;
}
