import * as Popover from "@radix-ui/react-popover";
import { useMemo, useRef, useState, useEffect, useId } from "react";

export default function Combobox({
  label,
  options = [],
  value,
  onChange,
  placeholder = "Selecionar…",
  searchPlaceholder = "Buscar…"
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const triggerId = useId();
  const labelId = `${triggerId}-label`;
  const labelText = label || placeholder;

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return term ? options.filter((option) => option.label.toLowerCase().includes(term)) : options;
  }, [options, query]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  const selected = options.find((option) => option.value === value);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <label id={labelId} className="sr-only" htmlFor={triggerId}>
        {labelText}
      </label>
      <Popover.Trigger asChild>
        <button
          id={triggerId}
          aria-labelledby={labelId}
          type="button"
          className="input flex items-center justify-between gap-2"
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <span className={`truncate ${selected ? "text-white" : "text-white/60"}`}>
            {selected ? selected.label : placeholder}
          </span>
          <span aria-hidden>›</span>
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="card p-2 w-[min(92vw,360px)]" sideOffset={8}>
          <input
            ref={inputRef}
            className="input mb-2"
            placeholder={searchPlaceholder}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            role="searchbox"
            aria-label="Buscar opção"
          />
          <ul role="listbox" aria-label="Opções" className="max-h-64 overflow-auto divide-y divide-white/5">
            {filtered.length === 0 && <li className="p-3 text-sm text-white/60">Nada encontrado</li>}
            {filtered.map((option) => (
              <li key={option.value}>
                <button
                  className={`w-full text-left px-3 py-2 hover:bg-white/10 ${option.value === value ? "bg-pb-lilas/30" : ""}`}
                  role="option"
                  aria-selected={option.value === value}
                  onClick={() => {
                    onChange?.(option.value);
                    setOpen(false);
                  }}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}



