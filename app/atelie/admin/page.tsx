"use client";
import Link from "next/link";
import AdminPanel from "../components/AdminPanel";

export default function AdminPage() {
  return (
    <div className="atelie-page" style={{ minHeight: "100dvh" }}>
      <div className="atelie-main">
        <header className="atelie-header">
          <Link href="/atelie" className="sidebar-back" style={{ marginRight: "auto" }}>
            ← Voltar ao Ateliê
          </Link>
        </header>
        <div className="atelie-content">
          <AdminPanel />
        </div>
      </div>
    </div>
  );
}
