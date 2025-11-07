import BackgroundMesh from "./components/BackgroundMesh.jsx";
import PublicHeader from "./components/PublicHeader.jsx";
import SponsorsRow from "./components/SponsorsRow.jsx";
import { Outlet } from "react-router-dom";

const sponsorLogos = [
  { src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", alt: "Google" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Adidas_2022_logo.svg/300px-Adidas_2022_logo.svg.png", alt: "Adidas" },
  { src: "https://upload.wikimedia.org/wikipedia/en/thumb/d/da/Puma_complete_logo.svg/300px-Puma_complete_logo.svg.png", alt: "Puma" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Nike_logo.svg/320px-Nike_logo.svg.png", alt: "Nike" }
];

export default function PublicLayout() {
  return (
    <>
      <BackgroundMesh />
      <div className="public-theme relative z-10 min-h-screen flex flex-col bg-dots">
        <PublicHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <footer className="border-t border-[var(--border-color)] bg-[var(--bg-off-dark)] text-[var(--text-muted)] text-xs py-6">
          <div className="max-w-6xl mx-auto px-6 space-y-4">
            <SponsorsRow items={sponsorLogos} />
            <p>Projeto Passa a Bola · Futebol feminino em todos os cantos do Brasil.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
