# Turborepo Cheatsheet
## Wat is het?
High-performance build-systeem voor JS/TS monorepos. Caching + task pipelines.

## Starten
```bash
npm i -g turbo
npx create-turbo@latest
```
Of met pnpm:
```bash
pnpm dlx create-turbo@latest
```

## Kernbestanden
- `turbo.json` — pipelines (bv. build, lint, test), cache, afhankelijkheden.
- `package.json` workspaces — definieer `apps/*` en `packages/*`.

## Pipeline voorbeeld
```json
{
  "$schema":"https://turbo.build/schema.json",
  "pipeline":{
    "build":{"dependsOn":["^build"],"outputs":[".next/**","dist/**"]},
    "typecheck":{},
    "lint":{},
    "test":{"dependsOn":["^build"]},
    "dev":{"cache":false}
  }
}
```

## Commands
```bash
pnpm i
pnpm -w turbo run dev --parallel
pnpm -w turbo run build
pnpm -w turbo run test
```

## Remote caching (later)
Activeer om CI-builds drastisch te versnellen.
