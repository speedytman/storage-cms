import Header from "@/components/header";
import Search from "@/components/search";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }
  return (
    <>
      <Header />
      <Search />
      {children}
    </>
  );
}
