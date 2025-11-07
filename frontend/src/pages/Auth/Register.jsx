import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, validateEmail } from "../../lib/auth.js";

const initialForm = {
  name: "",
  email: "",
  password: "",
  birthdate: "",
  position: "",
  team: "",
  phone: ""
};

export default function Register() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
    setError("");
    setSuccess("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!validateEmail(form.email)) {
      setError("Informe um e-mail válido.");
      return;
    }

    const result = registerUser({
      email: form.email,
      password: form.password,
      name: form.name
    });

    if (!result.ok) {
      setError(result.error || "Não foi possível concluir o cadastro.");
      return;
    }

    setSuccess("Cadastro criado com sucesso! Redirecionando…");
    setTimeout(() => {
      navigate("/app", { replace: true });
    }, 800);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 rounded-2xl bg-[var(--bg-off-dark)]/85 backdrop-blur-lg border border-[var(--border-color)]">
        <h2 className="text-2xl font-display font-bold mb-6 text-center text-[var(--primary-color)]">
          Cadastro de jogadora
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Nome completo"
            value={form.name}
            onChange={handleChange}
            required
            minLength={3}
            className="block w-full p-3 border border-[var(--border-color)] bg-transparent rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/50 focus:border-[var(--primary-color)]"
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={form.email}
            onChange={handleChange}
            required
            className="block w-full p-3 border border-[var(--border-color)] bg-transparent rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/50 focus:border-[var(--primary-color)]"
          />
          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={form.password}
            onChange={handleChange}
            required
            minLength={6}
            className="block w-full p-3 border border-[var(--border-color)] bg-transparent rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/50 focus:border-[var(--primary-color)]"
          />
          <input
            type="date"
            name="birthdate"
            value={form.birthdate}
            onChange={handleChange}
            className="block w-full p-3 border border-[var(--border-color)] bg-transparent rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/50 focus:border-[var(--primary-color)]"
          />
          <select
            name="position"
            value={form.position}
            onChange={handleChange}
            className="block w-full p-3 border border-[var(--border-color)] bg-transparent rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/50 focus:border-[var(--primary-color)] text-white"
          >
            <option value="" className="text-black">Selecione a posição</option>
            <option value="goleira" className="text-black">Goleira</option>
            <option value="defensora" className="text-black">Defensora</option>
            <option value="meia" className="text-black">Meio-campo</option>
            <option value="atacante" className="text-black">Atacante</option>
          </select>
          <input
            type="text"
            name="team"
            placeholder="Time atual (opcional)"
            value={form.team}
            onChange={handleChange}
            className="block w-full p-3 border border-[var(--border-color)] bg-transparent rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/50 focus:border-[var(--primary-color)]"
          />
          <input
            type="text"
            name="phone"
            placeholder="WhatsApp (opcional)"
            value={form.phone}
            onChange={handleChange}
            className="block w-full p-3 border border-[var(--border-color)] bg-transparent rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/50 focus:border-[var(--primary-color)]"
          />

          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          {success && (
            <p className="text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-3 py-2">
              {success}
            </p>
          )}

          <button type="submit" className="btn-primary w-full !py-3 !text-base">
            Cadastrar
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-[var(--text-muted)]">
          Já tem conta? {""}
          <Link to="/login" className="font-semibold text-[var(--primary-color)] hover:underline">
            Fazer login
          </Link>
        </p>
      </div>
    </div>
  );
}