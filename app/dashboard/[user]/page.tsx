import Dashboard from "@/components/dashboard";

export default function DashboardPage({
  params,
}: {
  params: { user: string };
}) {
  return <Dashboard user={params.user} />;
}
