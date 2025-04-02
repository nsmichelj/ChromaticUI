# Contribuir a ChromaticUI 🎨

¡Gracias por querer mejorar ChromaticUI! Aquí te explicamos cómo hacerlo:

## Primeros pasos 🚀

Antes de contribuir, asegúrate de cumplir estos requisitos y configurar tu entorno:

### Requisitos Previos

- Git: Sistema de control de versiones. [Instalar Git](https://git-scm.com/downloads)
- Node.js: Entorno de ejecución de JavaScript. [Instalar Node.js](https://nodejs.org/en/download)
- pnpm: Gestor de paquetes (alternativa a npm/yarn). [Instalar pnpm](https://pnpm.io/installation)
- Visual Studio Code: Editor de código recomendado. [Instalar Visual Studio Code](https://code.visualstudio.com/download)

Ademas debes estar familiarizado con las siguientes tecnologías:

- React: [Documentación oficial](https://react.dev/).
- Astro: [Guía de inicio](https://docs.astro.build/en/getting-started/).
- Tailwind CSS: [Aprende a usarlo](https://tailwindcss.com/docs).

## Cómo Contribuir 🤝

### 1. Configura tu Entorno

#### Fork del Repositorio

- Haz un `fork` del proyecto a tu cuenta de GitHub para tener tu propia copia. Para hacer esto:
- Haz clic en el botón `Fork` en la parte superior derecha de la página del repositorio en GitHub.
- Esto creará una copia del repositorio en tu cuenta de GitHub.

#### Clona tu Fork

- Clona el repositorio a tu máquina local:

```bash
git clone <URL del fork>
cd nombre_del_repo
```

#### Añade el Repositorio Original como Remoto

- Para mantener tu fork actualizado con los cambios del repositorio original, agrega el repositorio original como un remoto:

```bash
git remote add upstream <URL del repositorio original>
```

#### Instala las Dependencias

- Instala todas las dependencias necesarias:

```bash
pnpm i
```

### 2. Trabaja en tus Cambios

#### Sincroniza tu Fork

- Antes de empezar, asegúrate de que tu fork esté actualizado con el repositorio original:

```bash
# Desde la terminal:
git switch main
git fetch upstream
git merge upstream/main
```

También puedes sincronizar desde GitHub haciendo clic en Sync Fork en la página de tu fork.

#### Crea una Nueva Rama

- Nunca trabajes directamente en main/master .
- Crea una nueva rama para tus cambios. Usa nombres descriptivos:

```bash
git switch -c feature/tu-mejora
```

Ejemplos:

- `feature/nueva-funcion`
- `fix/arreglar-color-picker`
- `docs/actualizar-readme`

#### Desarrolla tus Cambios

- Implementa tus cambios o mejoras en tu rama local. Asegúrate de seguir las prácticas y estándares del proyecto.

#### Prueba tus Cambios

- Ejecuta el servidor de desarrollo para revisar tus cambios en tiempo real:

```bash
pnpm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para probar tus cambios.

### Envía tus Cambios

#### 3. Commit de tus Cambios

- Haz commit de tus cambios con un mensaje claro y descriptivo. Usa la convención de commits:

```bash
git commit -m "tipo descripción (preferiblemente en ingles)"
```

- Usa [Conventional Commits](https://www.conventionalcommits.org/) para mensajes claros:

```bash
git commit -m "tipo(ámbito): descripción (preferiblemente en ingles)"
# Ejemplos:
# - feat(picker): añade soporte para OKCHL
# - fix(generator): corrige generación de tonos en Safari
# - docs(readme): actualiza instrucciones de exportación
```

#### Push a tu Fork

- Haz push de tu rama con los cambios a tu fork en GitHub:

```bash
git push origin feature/tu-mejora
```

### Crea un Pull Request (PR)

- Ve a tu fork en GitHub y haz clic en "Pull request" .
- Describe claramente qué cambios has realizado y por qué son necesarios o útiles para el proyecto.
- Incluye capturas de pantalla si afecta a la interfaz.
- Usa etiquetas relevantes como `bug`, `enhancement`, `documentation`.

### Reportar Issues

- Bugs:
  - Usa la etiqueta `bug`.
  - Describe cómo reproducir el error.
  - Incluye sistema operativo, versión del navegador, etc.
- Sugerencias :
  - Usa la etiqueta `enhancement`.
  - Explica por qué tu idea beneficiaría al proyecto.

## Buenas Prácticas 🌟

Para garantizar que tus contribuciones sean útiles y fáciles de integrar, sigue estas recomendaciones:

### 1. Revisa Issues Abiertos

- Antes de empezar a trabajar en algo, revisa los [issues abiertos](https://github.com/NSMichelJ/ChromaticUI/issues).
- Si encuentras un issue que puedes resolver y no hay una PR abierta para ello, ¡adelante!
- Usa #numero-de-la-issue en tu commit o PR para vincularlo al issue correspondiente.

```bash
git commit -m "fix(generator): corrige generación de paletas #123"
```

Deja un comentario en el issue indicando que estás trabajando en ello. Esto ayuda a evitar duplicados.

### 2. Revisa PRs Abiertas

**Antes de abrir una nueva PR:**

- Revisa las PRs abiertas para asegurarte de que no estás trabajando en algo que ya está en progreso.
- Si alguien ya está trabajando en un cambio similar, puedes colaborar:
  - Aporta sugerencias en los comentarios.
  - Ayuda revisando su código.
  - Ofrece pruebas adicionales si es necesario.

### 3. Mantén tus Commits Limpios y Descriptivos

- Haz commit de tus cambios con un mensaje claro y descriptivo. Usa la convención de commits:

```bash
git commit -m "tipo descripción (preferiblemente en ingles)"
```

- Usa [Conventional Commits](https://www.conventionalcommits.org/) para mensajes claros:

```bash
git commit -m "tipo(ámbito): descripción (preferiblemente en ingles)"
```

- feat: Nuevas funcionalidades.
- fix: Correcciones de errores.
- docs: Cambios en documentación.
- style: Cambios de formato.
- refactor : Refactorización de código.

#### Ejemplo:

```bash
git commit -m "feat(export): añade exportación a Tailwind 4 con OKCHL #45"
```

### 4. Sigue las Convenciones del Proyecto

- Astro: Mantén archivos modulares y componentizados.
- React : Usa functional components y hooks.
- Tailwind CSS : Prioriza clases de Tailwind antes de escribir CSS personalizado.

### 5. Actualiza tu Rama con Frecuencia

- Para evitar conflictos, mantén tu rama sincronizada con la rama principal del proyecto.

### 6. Participa en Discusiones

**Si recibes comentarios o sugerencias en tu PR:**

- Responde a tiempo y participa activamente en la conversación.
- Haz los cambios necesarios y actualiza tu PR.
- Si necesitas aclaraciones, no dudes en preguntar.

### 7. Documenta tus Cambios

- Si añades una nueva función, actualiza la documentación relevante (README, guías, etc.).
- Explica claramente cómo usar tu nueva característica en la descripción del PR.

## 📖 Código de Conducta

Respeto y empatía son prioritarios en todas las interacciones.

### Valores Esperados

- ✅ Respeto:
  - Comunícate con amabilidad, incluso en desacuerdos.
  - Valora las contribuciones de otros, aunque no estés de acuerdo.
- ✅ Constructividad:
  - Críticas orientadas a soluciones, no a personas.
  - Ejemplo: En lugar de "Esto está mal", prueba "¿Qué tal si probamos X?".
- ✅ Inclusividad:
  - Evita lenguaje excluyente (ej: "solo para expertos").
  - Respeta diferencias culturales, de género y habilidades.

### Conductas Inaceptables

- ❌ Acoso:
  - Comentarios ofensivos, ataques personales o discriminación.
- ❌ Lenguaje Tóxico:
  - Humillaciones, sarcasmo destructivo o burlas.
- ❌ Spam o Disrupción:
  - Publicidad no solicitada, off-topic prolongado o sabotajes.

> ✨ ¡Gracias por ayudar a crear la mejor herramienta de paletas de color! 🎨
