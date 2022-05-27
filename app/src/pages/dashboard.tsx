import Head from "next/head";
import ComingSoon from "components/ComingSoon";

const Dashboard = () => {
  return (
    <main>
      <Head>
        <title>Dashboard | Ari</title>
        <meta property="og:title" content="Dashboard | Ari" />
      </Head>
      <ComingSoon />
    </main>
  );
};

export default Dashboard;
