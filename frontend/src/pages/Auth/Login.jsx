import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login, loginDemo } from "../../lib/auth.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/app";

  function handleSubmit(event) {
    event.preventDefault();
    const result = login(email, password);
    if (!result.ok) {
      setError(result.error || "Não foi possível entrar. Tente novamente.");
      return;
    }
    navigate(redirectTo, { replace: true });
  }

  function handleDemo() {
    loginDemo();
    navigate("/app", { replace: true });
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 rounded-2xl bg-[var(--bg-off-dark)]/85 backdrop-blur-lg border border-[var(--border-color)]">
        <h1 className="text-3xl font-display font-bold mb-6 text-center text-[var(--primary-color)]">
          Passa a Bola · Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="block w-full p-3 border border-[var(--border-color)] bg-transparent rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/50 focus:border-[var(--primary-color)]"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="block w-full p-3 border border-[var(--border-color)] bg-transparent rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/50 focus:border-[var(--primary-color)]"
            required
          />
          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
          <button type="submit" className="btn-primary w-full !py-3 !text-base">
            Entrar
          </button>
        </form>

        <button
          onClick={handleDemo}
          className="btn-secondary w-full !mt-4 !py-3 !text-base"
        >
          Entrar com conta demo
        </button>

        <p className="text-sm text-center mt-6 text-[var(--text-muted)]">
          Não tem conta? {""}
          <Link to="/register" className="font-semibold text-[var(--primary-color)] hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}