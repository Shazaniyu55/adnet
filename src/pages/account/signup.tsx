import AccountLayout from "@/account/components/layout";
import SignUp from "@/account/components/signup";
import Layout from "@/components/layout";
import Head from "next/head";

export default function SignUpPage() {
  return (
    <Layout>
      <AccountLayout>
        <Head>
          <title>Create Account</title>
        </Head>
        <SignUp />
      </AccountLayout>
    </Layout>
  );
}
