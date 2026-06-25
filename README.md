# Mundial 2026 ⬡

Plataforma de visualización del **FIFA World Cup 2026** (USA · CAN · MEX) construida con Angular 19 y la API de football-data.org.

Diseño futurista minimalista con paleta oscura y acentos dorados.

---

## Características

| Sección | Descripción |
|---|---|
| **Inicio** | Partidos en vivo, últimos resultados y próximos partidos |
| **Grupos** | Tabla de posiciones por grupo con indicador de clasificados |
| **Fixture** | Todos los partidos filtrables por estado (Finalizados / En vivo / Programados) |
| **Eliminatorias** | Bracket por fase (Octavos → Final) con ganador resaltado |
| **Equipo** | Perfil del equipo con historial de partidos W/D/L |

## Stack

- **Angular 21** — Standalone components, Signals, new control flow
- **Bootstrap 5** + Bootstrap Icons
- **football-data.org** API (competición `WC`)
- CSS glassmorphism, Inter + Space Grotesk, paleta `#07090d` / `#c9a84c`

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
cp proxy.conf.example.json proxy.conf.json
```

Edita `proxy.conf.json` y reemplaza `TU_API_KEY_AQUI` con tu key.

Luego copia el environment:

```bash
cp src/environments/environment.example.ts src/environments/environment.ts
```

### 3. Levantar el servidor

```bash
ng serve
```

Abre [http://localhost:4200](http://localhost:4200).

> El proxy de Angular redirige `/football-api/*` a `api.football-data.org` con la API key en el header — evita errores CORS.

---

Desarrollado por **Richard Sneider Malagón Conde**  
[GitHub @Sneider4](https://github.com/Sneider4) · [LinkedIn](https://www.linkedin.com/in/richard-malagon)
