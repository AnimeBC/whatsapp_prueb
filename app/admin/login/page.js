import { redirect } from "next/navigation";

export const metadata = {
  title: "Acceso | Drive Mid",
  robots: { index: false, follow: false },
};

export default function Page() {
  redirect("/acceso");
}
