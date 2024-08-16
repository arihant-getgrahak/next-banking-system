export default function DashboardPage({
  params,
}: {
  params: { user: string };
}) {
  return <div>{params.user}</div>;
}
