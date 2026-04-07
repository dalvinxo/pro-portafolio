# Pro Portafolio

Portafolio profesional construido con Next.js 15, React y TypeScript. El proyecto centraliza informacion de perfil, proyectos, certificados y resume bilingue, consumiendo contenido desde Notion, GitHub y Google Drive.

## Estado del proyecto

Proyecto finalizado el 7 de abril de 2026.

## Tabla de contenido

- [Descripcion](#descripcion)
- [Caracteristicas](#caracteristicas)
- [Stack](#stack)
- [Arquitectura general](#arquitectura-general)
- [Requisitos](#requisitos)
- [Instalacion](#instalacion)
- [Variables de entorno](#variables-de-entorno)
- [Como implementar la API de Google Drive](#como-implementar-la-api-de-google-drive)
- [Desarrollo local](#desarrollo-local)
- [Scripts disponibles](#scripts-disponibles)
- [Endpoints internos](#endpoints-internos)
- [Despliegue](#despliegue)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Mejoras futuras sugeridas](#mejoras-futuras-sugeridas)
- [Autor](#autor)
- [Licencia](#licencia)

## Descripcion

Este repositorio contiene el portafolio personal de `dalvinxo`. La aplicacion muestra informacion profesional, listado de proyectos, certificados con vista previa, enlaces de contacto y una version HTML del resume en espanol e ingles.

## Caracteristicas

- App Router con Next.js.
- Interfaz responsiva para perfil, proyectos, certificados y resume.
- Contenido dinamico obtenido desde bases de datos de Notion.
- Consulta de repositorios desde la API de GitHub.
- Vista previa de certificados servidos desde Google Drive.
- Resume renderizado via endpoint interno.
- Soporte bilingue `es` y `en`.

## Stack

- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- Notion API
- GitHub API
- Google Drive API mediante `googleapis`

## Arquitectura general

- `src/app`: paginas, layouts y rutas API.
- `src/services`: integraciones externas con Notion y Google Drive.
- `src/content`: contenido estatico del resume.
- `src/documents`: documento HTML del resume.
- `src/constants`: configuracion, traducciones y rutas.
- `public`: iconos e imagenes publicas.

Flujo principal de datos:

1. Notion provee datos de perfil, contacto, proyectos y certificados.
2. GitHub provee repositorios para la seccion de proyectos.
3. Google Drive almacena archivos de certificados.
4. La app expone endpoints internos para previsualizar certificados y generar el resume.

## Requisitos

- Node.js 18 o superior recomendado.
- npm 8 o superior.
- Credenciales validas de Notion, GitHub y Google Drive.

Nota: `package.json` define compatibilidad minima desde Node `16.13.2`, pero para Next.js 15 es mejor trabajar con Node 18 o superior.

## Instalacion

1. Clona el repositorio:

```bash
git clone https://github.com/dalvinxo/pro-portafolio.git
cd pro-portafolio
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea tu archivo de entorno local:

```bash
cp .env.example .env.local
```

4. Completa las variables con tus credenciales reales.

## Variables de entorno

El proyecto usa un archivo `.env.local` en la raiz.

```env
NOTION_TOKEN=tu_token_de_notion
PAGE_NOTION_MAIN=tu_page_id_principal_de_notion
TOKEN_GITHUB=tu_token_personal_de_github
GOOGLE_SERVICE_ACCOUNT_KEY='{"type":"service_account","project_id":"tu-proyecto","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"...","client_id":"..."}'
```

### Que hace cada variable

- `NOTION_TOKEN`: autentica el cliente de Notion.
- `PAGE_NOTION_MAIN`: pagina principal consultada por la app.
- `TOKEN_GITHUB`: token usado para consultar repositorios en GitHub.
- `GOOGLE_SERVICE_ACCOUNT_KEY`: credencial JSON completa de una service account con acceso a Google Drive.

## Como implementar la API de Google Drive

La integracion de Drive se usa para mostrar certificados desde la ruta interna `/api/certificate/[id]`.

### 1. Crear un proyecto en Google Cloud

1. Entra a Google Cloud Console.
2. Crea un proyecto nuevo o reutiliza uno existente.
3. Habilita la API de Google Drive para ese proyecto.

### 2. Crear una service account

1. Ve a `IAM & Admin > Service Accounts`.
2. Crea una nueva cuenta de servicio.
3. Genera una clave JSON.
4. Guarda ese archivo de forma segura.

### 3. Copiar la credencial al entorno

El proyecto espera la credencial completa serializada en una sola variable:

```env
GOOGLE_SERVICE_ACCOUNT_KEY='{"type":"service_account","project_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"..."}'
```

Recomendaciones:

- Usa comillas simples por fuera del JSON para evitar errores de parseo.
- Conserva los `\n` dentro de `private_key`.
- No subas esta variable al repositorio.

### 4. Compartir los archivos o carpeta en Drive

La service account no ve automaticamente tus archivos. Debes compartir con el correo `client_email` de la cuenta de servicio:

- Cada archivo individual de certificado, o
- Una carpeta que contenga todos los certificados

Otorga al menos permiso de lectura.

### 5. Registrar el `fileId` en Notion

La base de datos de certificados en Notion usa la propiedad `DriveFileId`.

Ejemplo:

```text
1AbCdEfGhIjKlMnOpQrStUvWxYz123456
```

La app utiliza ese valor para consultar el archivo y servirlo desde:

```text
/api/certificate/<fileId>
```

### 6. Como funciona internamente

- `src/services/drive.service.ts` autentica con `google.auth.GoogleAuth`.
- La app solicita el archivo con `drive.files.get`.
- `src/app/api/certificate/[id]/route.ts` entrega el archivo para vista previa.
- El frontend detecta si el archivo es PDF o imagen para renderizarlo correctamente.

### 7. Errores comunes

- `GOOGLE_SERVICE_ACCOUNT_KEY environment variable is not set`
  - La variable no existe o no se cargo en el entorno.
- `Certificate not found or access denied`
  - El `fileId` es invalido o la service account no tiene acceso.
- La vista previa no aparece
  - El archivo no es PDF/imagen, el `fileId` no coincide o falta compartir el recurso en Drive.

## Desarrollo local

Inicia el entorno de desarrollo:

```bash
npm run dev
```

Abre `http://localhost:3000`.

## Scripts disponibles

- `npm run dev`: inicia el servidor de desarrollo.
- `npm run build`: compila la aplicacion para produccion.
- `npm run start`: ejecuta la app compilada.
- `npm run lint`: ejecuta el analisis estatico.
- `npm run prettier`: formatea el proyecto.

## Endpoints internos

- `GET /api/certificate/[id]`: devuelve un certificado desde Google Drive.
- `HEAD /api/certificate/[id]`: devuelve metadatos basicos para resolver la vista previa.
- `GET /api/resume?lang=es|en`: genera el resume en HTML segun idioma.

## Despliegue

La aplicacion usa rutas API de Next.js, por lo que debe desplegarse en una plataforma compatible con ejecucion server-side.

Opciones recomendadas:

- Vercel
- Netlify con soporte adecuado para Next.js

Antes de desplegar:

1. Configura las variables de entorno en la plataforma.
2. Verifica acceso real a Notion, GitHub y Google Drive.
3. Ejecuta `npm run build` para validar que la compilacion sea correcta.

Importante:

- El archivo `netlify.toml` existe, pero debe validarse segun el proveedor final.
- Hay un workflow heredado de GitHub Pages en `.github/workflows/pages.yml`; con la arquitectura actual no deberia asumirse como via principal de despliegue sin una revision adicional.

## Estructura del proyecto

```text
src/
  app/
    api/
    certificates/
    projects/
    resume/
  common/
  components/
  constants/
  content/
  documents/
  helpers/
  layouts/
  services/
  styles/
  utils/
public/
.github/
```

## Mejoras futuras sugeridas

- Agregar `.env.production.example` o documentacion por entorno.
- Unificar estrategia de despliegue y limpiar configuraciones heredadas.
- Incorporar pruebas para servicios y rutas API.
- Documentar el esquema exacto de las bases de datos de Notion.

## Autor

Desarrollado por [dalvinxo](https://github.com/dalvinxo).

## Licencia

Este proyecto esta bajo la licencia MIT. Consulta [LICENSE](LICENSE).
