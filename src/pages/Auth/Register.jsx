import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../lib/auth";
export default function Register(){
  const [email,setEmail]=useState(""); const nav=useNavigate();
  function onSubmit(e){ e.preventDefault(); login(email||"jogadora@passa-bola.com"); nav("/app"); }
  return (
    <div className="min-h-screen grid place-items-center p-6">
      <div className="max-w-md w-full card">
        <h1 className="text-2xl font-bold">Criar conta</h1>
        <p className="text-white/70 text-sm mt-1">Bora jogar com estilo! ⚽</p>
        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div><div className="label">Nome</div><input className="input" placeholder="Seu nome" /></div>
          <div><div className="label">E-mail</div><input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="voce@email.com" /></div>
          <div><div className="label">Senha</div><input className="input" type="password" placeholder="********" /></div>
          <div><div className="label">Posição</div><select className="input"><option>MEI</option><option>ATA</option><option>ZAG</option><option>LAT</option><option>GOL</option></select></div>
          <button className="btn btn-primary w-full">Criar conta</button>
        </form>
        <div className="text-sm text-white/70 mt-4">Já tem conta? <Link className="text-pb-lilas hover:underline" to="/login">Entrar</Link></div>
      </div>
    </div>
  );
}
