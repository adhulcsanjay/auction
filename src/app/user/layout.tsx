
import DashboardLayout from "../layout/dashboard";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardLayout>
    {children}
    </DashboardLayout>
  )
}
