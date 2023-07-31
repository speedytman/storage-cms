import DashboardNav from "@/components/dashboard-nav";
import StoreSelector from "@/components/store-selector";
import UserMenu from "@/components/user-menu";
import { auth } from "@/lib/auth";

const Header = async () => {
  const session = await auth();

  if (!session) {
    return;
  }

  return (
    <header className="h-16 flex justify-between items-center p-4 gap-4 border-b shadow-md">
      <StoreSelector />
      <DashboardNav />
      <UserMenu
        image={session.user.image!}
        name={session.user.name!}
        email={session.user.email!}
      />
    </header>
  );
};

export default Header;
