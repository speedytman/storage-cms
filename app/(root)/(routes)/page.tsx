import { auth } from "@/lib/auth";

const RootPage = async () => {
  const session = await auth();
  return <div>{session?.user.email}</div>;
};

export default RootPage;
