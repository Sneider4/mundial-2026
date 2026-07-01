# Mundial 2026 ⬡

Plataforma de visualización en tiempo real del **FIFA World Cup 2026** (USA · CAN · MEX) construida con Angular 21 y la API oficial de football-data.org.

Diseño futurista minimalista con paleta oscura y acentos dorados.

> **Demo en vivo:** [mundial-2026.vercel.app](https://mundial-2026.vercel.app)

---

## Características

| Sección | Descripción |
|---|---|
| **Inicio** | Partidos en vivo, últimos resultados, próximos partidos y tabla de goleadores |
| **Grupos** | Tabla de posiciones por grupo con indicador de clasificados |
| **Fixture** | Todos los partidos filtrables por estado (Finalizados / En vivo / Programados), agrupados por fecha |
| **Eliminatorias** | Bracket por fase (Octavos → Final) con ganador resaltado |
| **Equipo** | Perfil del equipo con historial de partidos y resultado W / D / L |

## Stack

- **Angular 21** — Standalone components, Signals, new control flow (`@if`, `@for`)
- **Bootstrap 5** + Bootstrap Icons
- **football-data.org** API (competición `WC`)
- CSS glassmorphism, fuentes Inter + Space Grotesk, paleta `#07090d` / `#c9a84c`
- **Vercel** — despliegue con función serverless para el proxy de la API

---

## Configuración local

### 1. Clonar e instalar

```bash
git clone https://github.com/Sneider4/mundial-2026.git
cd mundial-2026
npm install
```

### 2. API Key

Obtén una API key gratuita en [football-data.org](https://www.football-data.org/client/register).

Copia el archivo de ejemplo del proxy:

```bash
# Linux / Mac
cp proxy.conf.example.json proxy.conf.json

# Windows (PowerShell)
Copy-Item proxy.conf.example.json proxy.conf.json
```

Edita `proxy.conf.json` y reemplaza `TU_API_KEY_AQUI` con tu key real.

### 3. Levantar el servidor

```bash
ng serve
```

Abre [http://localhost:4200](http://localhost:4200).

> El proxy de Angular redirige `/football-api/*` a `api.football-data.org` con la API key en el header — evita errores CORS en desarrollo.

---

## Despliegue en Vercel

### 1. Fork / sube el repositorio a GitHub

```bash
git remote add origin https://github.com/TU_USUARIO/mundial-2026.git
git push -u origin main
```

### 2. Importa el proyecto en Vercel

En [vercel.com](https://vercel.com) → **New Project** → selecciona el repositorio.

### 3. Configura la variable de entorno

En **Settings → Environment Variables** añade:

| Variable | Valor |
|---|---|
| `FOOTBALL_API_KEY` | Tu API key de football-data.org |

### 4. Deploy

Vercel detecta automáticamente el `vercel.json` y:
- Ejecuta `npm run build` (Angular build de producción)
- Sirve los estáticos desde `dist/mundial-2026/browser/`
- Expone la función serverless `api/football/[...path].js` como proxy de la API

---

Desarrollado por **Richard Sneider Malagón Conde**  
[GitHub @Sneider4](https://github.com/Sneider4) · [LinkedIn](https://www.linkedin.com/in/sneider-malagon)
