import Link from "next/link";

export default function CasaraoPage() {
  return (
    <main className="linktree-content">
      <div className="profile-photo">
        <img src="/images/logo_linktree.png" alt="Casarão da Mironga" className="avatar" />
      </div>

      <h1 className="site-title">Casarão da Mironga</h1>
      <p className="site-sub">Produtos, eventos e experiências — loja oficial</p>

      <section style={{ width: "100%", maxWidth: 520, marginTop: 12 }}>
        <Link href="#" className="link-card">
          <span className="label">Coleção Axé — Pulseiras e Amuletos</span>
        </Link>

        <Link href="#" className="link-card">
          <span className="label">Ritual ao Vivo — Agende sua visita</span>
        </Link>

        <Link href="#" className="link-card">
          <span className="label">Workshops e Oficinas — Próximas Turmas</span>
        </Link>
      </section>
    </main>
  );
}
