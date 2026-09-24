import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div style={{ padding: "100px 20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>Dashboard</h1>
      
      <div style={{
        background: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "16px",
        padding: "30px",
        backdropFilter: "blur(10px)"
      }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "15px", color: "var(--primary)" }}>
          Welcome back, {session.user.name}!
        </h2>
        <p style={{ color: "var(--gray-300)", marginBottom: "10px" }}>
          <strong>Email:</strong> {session.user.email}
        </p>
        <p style={{ color: "var(--gray-300)" }}>
          You have successfully authenticated with NextAuth + Neon PostgreSQL.
        </p>
      </div>
    </div>
  );
}
