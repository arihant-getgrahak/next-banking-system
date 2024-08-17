import {Dashboard} from "@/components/dashboard";

export default function DashboardPage({
  params,
}: {
  params: { name: string };
}) {
  return <Dashboard name={params.name} />;
}
