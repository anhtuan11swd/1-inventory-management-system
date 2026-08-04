import { redirect } from "next/navigation";
import RegisterForm from "@/components/auth/RegisterForm";
import { auth } from "@/lib/authOptions";

export default async function RegisterPage() {
  const session = await auth();

  if (session) {
    redirect("/dashboard/home/overview");
  }

  return <RegisterForm />;
}
