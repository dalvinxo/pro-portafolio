# Pro Portafolio

Portafolio profesional de [dalvinxo](https://github.com/dalvinxo) construido con Next.js 15, React 18 y TypeScript. Centraliza perfil, recorrido profesional, proyectos, certificados y resume bilingue, consumiendo el contenido desde Notion, GitHub y Google Drive. Se despliega automaticamente en Vercel.

## Estado del proyecto

**Finalizado** — version estable cerrada el 31 de octubre de 2026.

El proyecto queda en modo mantenimiento: el contenido se actualiza desde Notion sin tocar codigo, y los cambios de codigo se publican solos al hacer push a `main`.

## Tabla de contenido

- [Caracteristicas](#caracteristicas)
- [Paginas](#paginas)
- [Stack](#stack)
- [Arquitectura](#arquitectura)
- [Requisitos](#requisitos)
- [Instalacion](#instalacion)
- [Variables de entorno](#variables-de-entorno)
- [Contenido en Notion](#contenido-en-notion)
- [Integracion con GitHub](#integracion-con-github)
- [Integracion con Google Drive](#integracion-con-google-drive)
- [Preferencias de usuario](#preferencias-de-usuario)
- [Cache y revalidacion](#cache-y-revalidacion)
- [Desarrollo local](#desarrollo-local)
- [Scripts disponibles](#scripts-disponibles)
- [Calidad de codigo y commits](#calidad-de-codigo-y-commits)
- [Flujo de ramas y despliegue](#flujo-de-ramas-y-despliegue)
- [Endpoints internos](#endpoints-internos)
- [Seguridad](#seguridad)
- [Solucion de problemas](#solucion-de-problemas)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Mejoras futuras](#mejoras-futuras)
- [Autor](#autor)
- [Licencia](#licencia)

## Caracteristicas

- App Router de Next.js con Server Components y rutas API.
- Interfaz responsiva, modo claro/oscuro y animaciones con Framer Motion.
- Respeta `prefers-reduced-motion`: sin animaciones para quien lo solicite.
- Contenido dinamico desde bases de datos de Notion (editable sin desplegar).
- Repositorios y lenguajes obtenidos desde la API de GitHub.
- Certificados servidos desde Google Drive con vista previa de PDF e imagenes.
- Resume generado en HTML via endpoint interno.
- Soporte bilingue `es` / `en` con deteccion del idioma del navegador.
- Preferencias persistentes: color de acento y tamano de fuente.
- Accesibilidad: navegacion por teclado, `aria-*`, contraste AA en el color de acento.

## Paginas

| Ruta            | Descripcion                                                                                                   |
| --------------- | ------------------------------------------------------------------------------------------------------------- |
| `/`             | Inicio: presentacion, fotos de perfil, redes sociales, linea de tiempo "Mi recorrido" y accesos a secciones. |
| `/projects`     | Proyectos destacados (Notion) y repositorios publicos con sus lenguajes (GitHub).                             |
| `/certificates` | Certificados y cursos con filtros y vista previa del archivo almacenado en Drive.                             |
| `/resume`       | Resume en espanol e ingles. Actualmente oculto de la navegacion, pero la ruta sigue disponible.               |

### Mi recorrido

La seccion "Mi recorrido" de la pagina de inicio (`src/app/Journey.tsx`) es una linea de tiempo vertical:

- En escritorio las etapas alternan a izquierda y derecha de una linea central; en movil se apilan en una columna.
- La linea se rellena con el color de acento a medida que se hace scroll.
- La ultima etapa se marca como "Actualidad".
- Cada etapa sale de la base de datos `about` de Notion, ordenada por `Order`.

## Stack

| Area          | Tecnologia                                   |
| ------------- | -------------------------------------------- |
| Framework     | Next.js 15 (App Router)                      |
| UI            | React 18, Tailwind CSS 3, Framer Motion      |
| Lenguaje      | TypeScript                                   |
| Iconos        | `react-icons` (Ionicons 5)                   |
| Contenido     | Notion API (`@notionhq/client`)              |
| Repositorios  | GitHub REST API                              |
| Archivos      | Google Drive API (`googleapis`)              |
| Tema          | `next-themes`                                |
| Calidad       | ESLint, Prettier, Husky, Commitlint          |
| Despliegue    | Vercel                                       |

## Arquitectura

```text
            ┌──────────┐   ┌──────────┐   ┌──────────────┐
            │  Notion  │   │  GitHub  │   │ Google Drive │
            └────┬─────┘   └────┬─────┘   └──────┬───────┘
                 │              │                │
        src/services/      fetch en         src/services/
        database.notion    projects/page    drive.service
                 │              │                │
                 └──────┬───────┘                │
                        ▼                        ▼
             Server Components (src/app)   /api/certificate/[id]
                        │                        │
                        └──────────┬─────────────┘
                                   ▼
                       Client Components (UI)
```

1. Notion provee perfil, recorrido, redes, proyectos y certificados.
2. GitHub provee los repositorios publicos y sus lenguajes.
3. Google Drive almacena los archivos de certificados; la app los sirve a traves de su propia API, sin exponer Drive al navegador.
4. Las paginas se generan en el servidor y se revalidan periodicamente (ISR).

## Requisitos

- Node.js 18 o superior (se recomienda 20 LTS).
- npm 8 o superior. El proyecto no usa yarn.
- Credenciales de Notion, GitHub y una service account de Google Cloud.

## Instalacion

```bash
git clone https://github.com/dalvinxo/pro-portafolio.git
cd pro-portafolio
npm install
cp .env.example .env.local
```

Completa `.env.local` con tus credenciales (ver la siguiente seccion) y ejecuta `npm run dev`.

## Variables de entorno

Todas las variables son de servidor: ninguna usa el prefijo `NEXT_PUBLIC_`, por lo que no llegan al navegador.

```env
NOTION_TOKEN=secret_xxx
PAGE_NOTION_MAIN=id_de_la_pagina_principal
TOKEN_GITHUB=github_pat_xxx
GOOGLE_SERVICE_ACCOUNT_KEY='{"type":"service_account", ... }'
```

| Variable                     | Obligatoria | Uso                                                                  |
| ---------------------------- | ----------- | -------------------------------------------------------------------- |
| `NOTION_TOKEN`               | Si          | Secret de la integracion interna de Notion.                          |
| `PAGE_NOTION_MAIN`           | Si          | ID de la pagina principal de Notion.                                 |
| `TOKEN_GITHUB`               | Si          | Token personal de GitHub (solo lectura de repos publicos).           |
| `GOOGLE_SERVICE_ACCOUNT_KEY` | Si\*        | JSON completo de la service account de Google Drive.                 |

\* El build funciona sin `GOOGLE_SERVICE_ACCOUNT_KEY` (el cliente de Drive se crea al primer uso), pero la vista previa de certificados fallara en tiempo de ejecucion.

En Vercel se configuran en **Settings → Environment Variables**, para los entornos Production y Preview.

## Contenido en Notion

1. Crea una integracion interna en https://www.notion.so/my-integrations y copia su secret en `NOTION_TOKEN`.
2. Comparte cada base de datos con la integracion (menu `...` → **Connections**).
3. Los IDs de las bases de datos estan en `src/constants/database.id.ts`.

Todas las bases usan un checkbox `Status`: solo se muestran los registros marcados.

### `about` — Mi recorrido

| Propiedad            | Tipo      | Uso                                  |
| -------------------- | --------- | ------------------------------------ |
| `Order`              | Number    | Orden de la etapa (ascendente).      |
| `Description`        | Rich text | Texto en ingles.                     |
| `DescriptionSpanish` | Rich text | Texto en espanol.                    |
| `Status`             | Checkbox  | Publicar / ocultar.                  |

### `contact` — Redes sociales

| Propiedad | Tipo      | Uso                                                        |
| --------- | --------- | ---------------------------------------------------------- |
| `ID`      | Title     | Nombre de la red: `github`, `linkedin` o `youtube`.        |
| `Link`    | Rich text | URL del perfil.                                            |
| `Order`   | Number    | Orden de aparicion.                                        |
| `Status`  | Checkbox  | Publicar / ocultar.                                        |

### `projects` — Proyectos destacados

| Propiedad     | Tipo      | Uso                                       |
| ------------- | --------- | ----------------------------------------- |
| `Name`        | Title     | Nombre en ingles.                         |
| `NameSpanish` | Rich text | Nombre en espanol.                        |
| `Progress`    | Checkbox  | Marca el proyecto como "en progreso".     |
| `Deploy`      | Rich text | URL del despliegue (opcional).            |
| `Repository`  | Rich text | URL del repositorio (opcional).           |
| `Date`        | Date      | Fecha; se ordena de mas reciente a antigua. |
| `Status`      | Checkbox  | Publicar / ocultar.                       |

### `certificates` — Certificados

| Propiedad            | Tipo      | Uso                                             |
| -------------------- | --------- | ----------------------------------------------- |
| `ID`                 | Unique ID | Identificador (prefijo + numero).               |
| `Title`              | Title     | Titulo del certificado.                         |
| `Description`        | Rich text | Descripcion en ingles.                          |
| `DescriptionSpanish` | Rich text | Descripcion en espanol.                         |
| `Type`               | Select    | Tipo en ingles (curso, certificacion, ...).     |
| `TypeSpanish`        | Select    | Tipo en espanol.                                |
| `CompletionDate`     | Date      | Fecha de obtencion (orden descendente).         |
| `ExpiryDate`         | Date      | Fecha de expiracion (opcional).                 |
| `CertificateUrl`     | URL       | Enlace de verificacion externo (opcional).      |
| `DriveFileId`        | Rich text | ID del archivo en Google Drive.                 |
| `Status`             | Checkbox  | Publicar / ocultar.                             |

## Integracion con GitHub

`src/app/projects/page.tsx` consulta `https://api.github.com/users/dalvinxo/repos` y, por cada repositorio, su endpoint de lenguajes.

- Crea un token en GitHub → Settings → Developer settings → **Fine-grained tokens** con acceso de solo lectura a repositorios publicos.
- El token evita el limite de 60 peticiones/hora de la API anonima.
- Para usar otro usuario cambia la URL en `getGithubRepository`.

## Integracion con Google Drive

Los certificados se sirven desde `/api/certificate/[id]`.

1. En Google Cloud Console crea (o reutiliza) un proyecto y habilita la **Google Drive API**.
2. En `IAM & Admin → Service Accounts` crea una cuenta de servicio y genera una clave **JSON**.
3. Copia el JSON completo en `GOOGLE_SERVICE_ACCOUNT_KEY`:
   - Usa comillas simples por fuera del JSON.
   - Conserva los `\n` dentro de `private_key`.
4. Comparte la carpeta de certificados en Drive con el `client_email` de la service account (permiso de lector).
5. Copia el ID de cada archivo (la parte `/d/<ID>/` de la URL de Drive) en la propiedad `DriveFileId` de Notion.

Funcionamiento interno:

- `src/services/drive.service.ts` crea el cliente de Drive la primera vez que se usa (no al importar el modulo, para no romper el build).
- `src/app/api/certificate/[id]/route.ts` descarga el archivo y detecta su tipo real por su firma (PDF, JPEG, PNG, GIF).
- El frontend renderiza un visor de PDF o una imagen segun el tipo.

## Preferencias de usuario

Desde la barra de navegacion (boton de tema y menu de preferencias):

| Preferencia     | Valores                                        | Almacenamiento            |
| --------------- | ---------------------------------------------- | ------------------------- |
| Tema            | claro, oscuro                                  | `next-themes`             |
| Color de acento | `sky`, `violet`, `emerald`, `rose`, `amber`    | `localStorage.accent`     |
| Tamano de letra | `md`, `lg`, `xl`                               | `localStorage.font-size`  |
| Idioma          | `es`, `en`                                     | `localStorage.language`   |

Un script inline (`src/constants/preferences.ts`) aplica el acento y el tamano antes del primer pintado para evitar parpadeos. Solo se aceptan valores de la lista permitida.

Los colores de acento se definen como variables CSS en `src/styles/tailwinds.css` y se usan en Tailwind como `accent`, `accent-2`, `accent-ink` (texto accesible) y `accent-solid` (fondo para texto blanco).

## Cache y revalidacion

| Recurso                 | Revalidacion                 |
| ----------------------- | ---------------------------- |
| Pagina de inicio        | cada 20 minutos (`1200 s`)   |
| Repositorios de GitHub  | cada 3 minutos (`180 s`)     |
| `/api/resume`           | sin cache (`no-store`)       |

Los cambios en Notion aparecen en el sitio, como maximo, al cumplirse el intervalo de revalidacion. No hace falta volver a desplegar.

## Desarrollo local

```bash
npm run dev
```

Abre http://localhost:3000.

> No ejecutes `npm run build` mientras `npm run dev` esta corriendo: ambos escriben en la carpeta `.next` y el servidor de desarrollo empieza a fallar con errores de webpack. Si ocurre, deten el servidor, borra `.next` y vuelve a iniciarlo.

## Scripts disponibles

| Script             | Descripcion                               |
| ------------------ | ----------------------------------------- |
| `npm run dev`      | Servidor de desarrollo.                   |
| `npm run build`    | Compilacion de produccion.                |
| `npm run start`    | Ejecuta la compilacion de produccion.     |
| `npm run lint`     | Analisis estatico con ESLint.             |
| `npm run prettier` | Formatea todo el proyecto.                |

## Calidad de codigo y commits

Husky ejecuta dos hooks:

- **pre-commit**: `npm run prettier` y `npm run lint`.
- **commit-msg**: Commitlint con [Conventional Commits](https://www.conventionalcommits.org/).

Formato de mensaje:

```text
<tipo>(<alcance opcional>): <descripcion>

feat(home): redesign journey section as a vertical timeline
fix(drive): create Google Drive client lazily so the build does not fail
chore(ci): remove GitHub Pages workflow, deploys run on Vercel
```

Tipos habituales: `feat`, `fix`, `refactor`, `chore`, `docs`, `style`, `perf`.

## Flujo de ramas y despliegue

| Rama   | Uso                                                        | Despliegue en Vercel |
| ------ | ---------------------------------------------------------- | -------------------- |
| `main` | Produccion. Protegida.                                     | Produccion           |
| `dev`  | Desarrollo e integracion.                                  | Preview              |

Flujo recomendado:

1. Trabaja en `dev` (o en una rama a partir de `dev`).
2. Haz push: Vercel genera un despliegue de preview.
3. Abre un Pull Request de `dev` a `main`.
4. Al hacer merge, Vercel despliega a produccion automaticamente.

No hay workflows de GitHub Actions: Vercel compila y despliega por si mismo. El archivo `netlify.toml` es una configuracion heredada y no se usa.

## Endpoints internos

| Metodo | Ruta                       | Descripcion                                              |
| ------ | -------------------------- | -------------------------------------------------------- |
| `GET`  | `/api/certificate/[id]`    | Devuelve el archivo del certificado desde Google Drive.  |
| `HEAD` | `/api/certificate/[id]`    | Devuelve metadatos para decidir el tipo de vista previa. |
| `GET`  | `/api/resume?lang=es\|en`  | Genera el resume en HTML segun el idioma.                |

## Seguridad

- Nunca subas `.env.local`; esta en `.gitignore`.
- No uses el prefijo `NEXT_PUBLIC_` para secretos: esas variables se incrustan en el JavaScript del navegador.
- Si un secreto se filtra (en un commit, un log o un chat), **rotalo**. Borrar el archivo no basta: sigue en el historial de git.
  - Notion: https://www.notion.so/my-integrations → integracion → **Refresh secret**.
  - GitHub: Settings → Developer settings → tokens → **Regenerate**.
  - Google: IAM → Service Accounts → Keys → borrar la clave y crear una nueva.
- Despues de rotar, actualiza `.env.local` y las variables en Vercel y vuelve a desplegar.
- Para reportar una vulnerabilidad escribe al autor en privado en lugar de abrir un issue publico.

## Solucion de problemas

| Sintoma                                                        | Causa y solucion                                                                                              |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Errores de webpack o `Cannot find module` en `npm run dev`     | Se ejecuto `build` con el servidor de desarrollo abierto. Deten el servidor, borra `.next` y reinicia.        |
| `GOOGLE_SERVICE_ACCOUNT_KEY environment variable is not set`   | Falta la variable en `.env.local` o en Vercel.                                                                |
| `Certificate not found or access denied`                       | `DriveFileId` incorrecto o la carpeta no esta compartida con la service account.                             |
| La vista previa del certificado no aparece                     | El archivo no es PDF ni imagen, o el ID no coincide.                                                          |
| Una seccion sale vacia o con "no disponible"                   | La base de Notion no esta compartida con la integracion, o ningun registro tiene `Status` marcado.           |
| Un cambio en Notion no aparece                                 | Espera el intervalo de revalidacion (ver [Cache y revalidacion](#cache-y-revalidacion)).                      |
| Error al hacer commit                                          | El mensaje no cumple Conventional Commits, o ESLint encontro errores.                                         |

## Estructura del proyecto

```text
src/
  app/
    api/
      certificate/[id]/   # Proxy de archivos de Google Drive
      resume/             # Resume en HTML
    certificates/         # Pagina de certificados
    projects/             # Pagina de proyectos
    resume/               # Pagina del resume
    About.tsx             # Hero, redes y accesos de la pagina de inicio
    Journey.tsx           # Linea de tiempo "Mi recorrido"
    layout.tsx            # Layout raiz, metadatos y proveedores
    page.tsx              # Pagina de inicio (carga datos de Notion)
  common/                 # Componentes compartidos (Motion, Nav, PageWrapper, ...)
  components/             # Header, Navbar, Loading
  constants/              # IDs de Notion, rutas, preferencias, traducciones
  content/                # Contenido estatico del resume
  context/                # Proveedores de idioma y preferencias
  documents/              # Plantilla HTML del resume
  helpers/                # Formateo de fechas
  layouts/                # Layout principal
  services/               # Notion y Google Drive
  styles/                 # Tailwind y variables de acento
  utils/                  # Cliente de Notion, diccionarios, idioma
public/
  img/                    # Fotos de perfil
.github/
  ISSUE_TEMPLATE/         # Plantillas de bug y feature request
```

## Mejoras futuras

- Pruebas automaticas para servicios y rutas API.
- Tipar las respuestas de Notion en lugar de usar `any`.
- Volver a mostrar el resume en la navegacion.
- Eliminar `netlify.toml` si no se va a usar Netlify.

## Autor

Desarrollado por [dalvinxo](https://github.com/dalvinxo).

## Licencia

Este proyecto esta bajo la licencia MIT. Consulta [LICENSE](LICENSE).
