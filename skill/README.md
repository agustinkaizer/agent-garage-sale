# El método como skill instalable

Instalar la skill hace que tu agente reconozca solo cuándo aplicar el método (decís
"quiero vender las cosas que tengo sin uso" y la carga), sin pegarle la URL del
repo cada vez.

## Claude Code

```bash
mkdir -p ~/.claude/skills
cp -r skill/agent-garage-sale ~/.claude/skills/
```

(o cloná el repo y copiá la carpeta). Después podés invocarla con
`/agent-garage-sale` o simplemente pedir lo que necesitás — la description hace que
se dispare sola.

## Codex, Copilot CLI, Gemini CLI

Los tres reconocen el directorio multi-runtime `~/.agents/skills/`:

```bash
mkdir -p ~/.agents/skills
cp -r skill/agent-garage-sale ~/.agents/skills/
```

## Cualquier otro agente

La skill es solo un puntero: el contenido real es el [`AGENTS.md`](../AGENTS.md) del
repo. Si tu agente no soporta skills, pasale la URL del repo directamente (ver el
[README](../README.md#cómo-empezar)).
