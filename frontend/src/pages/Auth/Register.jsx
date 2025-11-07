import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { registerUser, validateEmail, fetchRegisteredUsers } from "../../lib/auth.js";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
    setError("");
    setSuccess("");
  }

  async function loadUsers() {
    try {
      setLoadingUsers(true);
      const list = await fetchRegisteredUsers();
      const sorted = list
        .slice()
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setUsers(sorted);
    } catch (loadError) {
      console.error("Falha ao carregar usuárias cadastradas", loadError);
    } finally {
      setLoadingUsers(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!validateEmail(form.email)) {
      setError("Informe um e-mail válido.");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccess("");

    const result = await registerUser({
      name: form.name,
      email: form.email,
      password: form.password,
      birthdate: form.birthdate,
      position: form.position,
      team: form.team,
      phone: form.phone
    });

    setIsSubmitting(false);

    if (!result.ok) {
      setError(result.error || "Não foi possível concluir o cadastro.");
      return;
    }

    setSuccess(`Cadastro de ${result.user.name} criado com sucesso! Veja a lista abaixo.`);
    setForm(initialForm);
    await loadUsers();
  }

  const recentUsers = users.slice(0, 5);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid lg:grid-cols-2 gap-8">
        <div className="p-8 rounded-2xl bg-[var(--bg-off-dark)]/85 backdrop-blur-lg border border-[var(--border-color)]">
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
              className="input"
            />
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={form.email}
              onChange={handleChange}
              required
              className="input"
            />
            <input
              type="password"
              name="password"
              placeholder="Senha"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
              className="input"
            />
            <input
              type="date"
              name="birthdate"
              value={form.birthdate}
              onChange={handleChange}
              className="input"
            />
            <select
              name="position"
              value={form.position}
              onChange={handleChange}
              className="input text-white"
            >
              <option value="" className="text-black">
                Selecione a posição
              </option>
              <option value="goleira" className="text-black">
                Goleira
              </option>
              <option value="defensora" className="text-black">
                Defensora
              </option>
              <option value="meia" className="text-black">
                Meio-campo
              </option>
              <option value="atacante" className="text-black">
                Atacante
              </option>
            </select>
            <input
              type="text"
              name="team"
              placeholder="Time atual (opcional)"
              value={form.team}
              onChange={handleChange}
              className="input"
            />
            <input
              type="text"
              name="phone"
              placeholder="WhatsApp (opcional)"
              value={form.phone}
              onChange={handleChange}
              className="input"
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

            <button type="submit" className="btn-primary w-full !py-3 !text-base" disabled={isSubmitting}>
              {isSubmitting ? "Cadastrando..." : "Cadastrar"}
            </button>
          </form>

          <p className="text-sm text-center mt-6 text-[var(--text-muted)]">
            Já tem conta? {""}
            <Link to="/login" className="font-semibold text-[var(--primary-color)] hover:underline">
              Fazer login
            </Link>
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-[var(--bg-off-dark)]/70 border border-[var(--border-color)]">
          <h3 className="text-xl font-display font-semibold text-[var(--text-light)]">
            Cadastros recentes (JSON da API)
          </h3>
          <p className="text-sm text-[var(--text-muted)]">
            Esta lista vem diretamente de <code>/api/users</code>, mostrando que o cadastro foi persistido.
          </p>
          <div className="mt-4 space-y-3">
            {loadingUsers && <p className="text-sm text-[var(--text-muted)]">Carregando cadastros...</p>}
            {!loadingUsers && recentUsers.length === 0 && (
              <p className="text-sm text-[var(--text-muted)]">Nenhum cadastro ainda. Seja a primeira!</p>
            )}
            {!loadingUsers &&
              recentUsers.map((user) => (
                <div key={user.id} className="p-3 rounded-xl border border-[var(--border-color)] bg-black/30">
                  <div className="text-[var(--text-light)] font-semibold">{user.name}</div>
                  <div className="text-xs text-[var(--text-muted)]">{user.email}</div>
                  {user.team && (
                    <div className="text-xs text-[var(--text-muted)]">Time: {user.team}</div>
                  )}
                  {user.position && (
                    <div className="text-xs text-[var(--text-muted)]">Posição: {user.position}</div>
                  )}
                  <div className="text-xs text-[var(--text-muted)] mt-1">
                    {new Date(user.createdAt).toLocaleString("pt-BR")}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
