import { redirect } from "next/navigation";
import BackOfficeShell from "@/components/dashboard/BackOfficeShell";
import { auth } from "@/lib/authOptions";

export default async function BackOfficeLayout({ children }) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return <BackOfficeShell>{children}</BackOfficeShell>;
}
