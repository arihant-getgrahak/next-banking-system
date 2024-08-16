export default function Dashboard(props: { user: any; }) {
  const { user } = props;
  return <h1>Dashboard for {user}</h1>;
}
