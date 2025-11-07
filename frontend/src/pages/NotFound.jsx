import { Link } from "react-router-dom";
export default function NotFound(){
  return (
    <div className="min-h-screen grid place-items-center p-6">
      <div className="max-w-md w-full card text-center">
        <div className="text-3xl font-bold">404</div>
        <div className="text-white/70 mt-1">Página não encontrada</div>
        <Link to="/app" className="btn btn-primary mt-4">Voltar ao app</Link>
      </div>
    </div>
  );
}
