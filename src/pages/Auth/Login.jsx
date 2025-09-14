import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { login } from "../../lib/auth";

export default function Login(){
  const [email,setEmail]=useState("");
  const [pwd,setPwd]=useState("");
  const nav=useNavigate();
  const loc=useLocation();
  const from=loc.state?.from?.pathname || "/app";

  function onSubmit(e){
    e.preventDefault();
    login(email || "jogadora@passa-bola.com"); // MOCK local
    nav(from, { replace:true });
  }

  function demo(){
    login("demo@passa-bola.com");
    nav("/app", { replace:true });
  }

  return (
    <div className="min-h-screen grid place-items-center p-6">
      <div className="max-w-md w-full card">
        <h1 className="text-2xl font-bold">Entrar</h1>
        <p className="text-white/70 text-sm mt-1">Bem-vinda de volta! 💚</p>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div>
            <div className="label">E-mail</div>
            <input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="voce@email.com" />
          </div>
          <div>
            <div className="label">Senha</div>
            <input className="input" type="password" value={pwd} onChange={e=>setPwd(e.target.value)} placeholder="********" />
          </div>
          <button className="btn btn-primary w-full">Entrar</button>
        </form>

        <button className="btn btn-ghost w-full mt-3" onClick={demo}>
          Entrar como demo
        </button>

        <div className="text-sm text-white/70 mt-4">
          Não tem conta? <Link className="text-pb-lilas hover:underline" to="/register">Cadastre-se</Link>
        </div>
      </div>
    </div>
  );
}
