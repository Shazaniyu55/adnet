import ChangePassword from "@/account/components/change-password";
import AccountLayout from "@/account/components/layout";
import Layout from "@/components/layout";
import Head from "next/head";
import { SmnkErrorBoundary } from "../_app";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { updatePageLoading } from "@/store/slices/userSlice";
import { useRouter } from "next/router";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const {
    pageLoading,
    user: { _id },
  } = useSelector((state: RootState) => state.users);
  useEffect(() => {
    if (_id) {
      router.push("/dashboard/change-password");
    }
    if (pageLoading) {
      dispatch(updatePageLoading(false));
    }
  }, [dispatch, pageLoading, _id, router]);
  return (
    <Layout>
      <AccountLayout>
        <Head>
          <title>Change Password</title>
        </Head>
        <SmnkErrorBoundary>
          <ChangePassword />
        </SmnkErrorBoundary>
      </AccountLayout>
    </Layout>
  );
}
