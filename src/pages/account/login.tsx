import AccountLayout from "@/account/components/layout";
import Login from "@/account/components/login";
import Layout from "@/components/layout";
import Head from "next/head";

export default function LoginPage() {
  return (
    <Layout>
      <AccountLayout>
        <Head>
          <title>Login</title>
        </Head>
        <Login />
      </AccountLayout>
    </Layout>
  );
}
