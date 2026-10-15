<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Reglas de trabajo

- **No ejecutar `npx next dev`, `next dev`, `npm run dev`, `next build`, ni NINGÚN comando de dev/build** hasta que el usuario lo indique explícitamente. El usuario ejecuta estos comandos manualmente.
- **No instalar dependencias con `npm install`**. Si se necesitan paquetes, mostrar los comandos `npm install <paquete>` para que el usuario los ejecute manualmente.
- **Siempre importar con alias `@/`** (ej: `@/_Pages/principal/estructuras/Encabezado/Encabezado`) y **nunca** con rutas relativas hacia arriba como `../../` o `../`. Los imports locales de la misma carpeta (`./algo.module.css`) sí se permiten.
- **No usar emojis** en la interfaz ni en el código (textos, botones, mensajes, logs). Usar **íconos de Ionicons** (`<ion-icon name="...">`) si se requieren íconos.
- **Nunca leer ni abrir `.env.local`** (tiene valores reales). Trabajar siempre con **`.env.example`**: si se necesita una variable nueva, agrégala ahí con un placeholder y avisa al usuario. Nunca imprimir ni commitear secretos.
- **Sin scripts de verificación ni informes "TODO VERDE":** NO ejecutar scripts propios de comprobación tras cada cambio, NI emitir resúmenes de estado. Solo verificar si el usuario lo pide explícitamente.
- Si hay un error, el usuario lo reporta y me pide que lo arregle.

## Estructura de archivos (patrón del proyecto)

- Carpetas y archivos gestionados **en español**.
- Todo el código de páginas vive en `_Pages/principal/...` (fuera de `app/`).
- Cada componente es una **carpeta en PascalCase** con:
  - `<Nombre>.jsx` (mismo nombre que la carpeta),
  - `<nombre>.module.css` (CSS Modules),
  - `index.js` (barrel: `export { default } from './<Nombre>.jsx';`).
- Subcomponentes dentro de `componentes/<Sub>/...`.
- Los layouts persistentes van en `_Pages/principal/estructuras/<Nombre>/`.
- Las rutas de `app/` son **delgadas**: solo exportan `metadata` y renderizan el componente de `_Pages/` importado con `@/`.
- Datos y utilidades en `_Pages/principal/datos/...`.

<!-- Reglas globales de estilo de trabajo -->

## Idioma y estilo

- Responder siempre en español, directamente y sin rodeos.
- No usar emojis (ver reglas de trabajo).
- Diseño intuitivo, compacto y coherente con la interfaz existente.

## Cambios mínimos

- Localizar primero la implementación concreta y sus dependencias inmediatas.
- Modificar únicamente los archivos necesarios para cumplir la solicitud.
- Reutilizar componentes, funciones, estilos y patrones existentes.
- No refactorizar, renombrar ni reformatear cosas ajenas a la tarea.
- No duplicar lógica o CSS si ya existe una implementación reutilizable.
- No inventar rutas, tablas, columnas, endpoints ni APIs.
- Si falta información crítica, preguntar antes de decidir.

## Frontend

- Usar el alias `@/` en los imports (ver reglas de trabajo).
- Respetar Next.js App Router, React, CSS Modules y los componentes existentes.
- No añadir dependencias, iconos, botones ni colores innecesarios.

## Respuesta final

- Indicar brevemente qué se cambió y en qué archivos.
- Mencionar solo las verificaciones realmente realizadas.
- Si el usuario debe ejecutar comandos, mostrarlos sin ejecutarlos.
