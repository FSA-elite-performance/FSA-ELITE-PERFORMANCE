import RouteAliasPage from '../components/RouteAliasPage';

export default function DashboardAliasPage() {
  return (
    <RouteAliasPage
      title="FSA Dashboard Shortcut"
      description="Dashboard shortcut for FSA ELITE. This path redirects to the live welcome experience."
      target="/welcome"
    />
  );
}