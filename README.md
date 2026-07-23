# Sunrise Energy ☀️

Sitio web oficial de **Sunrise Energy**, especialistas en la transición energética y soluciones sostenibles para empresas, industrias e instituciones.

## Tecnologías 🚀

Este proyecto está construido utilizando tecnologías modernas para asegurar alto rendimiento y una experiencia de usuario excepcional:

- **[React](https://react.dev/)** + **[Vite](https://vitejs.dev/)** (Frontend rápido y modular)
- **TypeScript** (Tipado estático para código robusto)
- **[GSAP](https://gsap.com/)** (Animaciones fluidas y de alto rendimiento vinculadas al scroll)
- **Lucide React** (Iconografía limpia y moderna)
- **CSS3** (Estilos corporativos Premium con variables y efectos Glassmorphism)

## Características Principales ✨

- **Diseño Premium y Moderno:** Efectos de píldora flotante (Floating Pill), cristal esmerilado (backdrop-blur) e interacciones avanzadas.
- **Scroll Animado (Secuencia de Imágenes):** Componente interactivo que dibuja fotogramas (frames) de un video en un lienzo HTML5 (`<canvas>`) conforme el usuario se desplaza, ofreciendo una experiencia inmersiva para explicar los servicios de la empresa.
- **Responsivo:** Perfectamente adaptado a dispositivos móviles, tablets y pantallas grandes.
- **Integración con WhatsApp:** Modal de contacto optimizado para redirigir directamente al equipo comercial vía WhatsApp.

## Instalación y Ejecución 🛠️

Asegúrate de tener [Node.js](https://nodejs.org/) instalado en tu sistema.

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Ejecutar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   *El sitio estará disponible en `http://localhost:5173` (o el puerto que asigne Vite).*

3. **Construir para producción:**
   ```bash
   npm run build
   ```

4. **Linting (oxlint):**
   ```bash
   npm run lint
   ```

## Estructura de Componentes 📂

- `Header.tsx`: Barra de navegación principal (Navbar).
- `Hero.tsx`: Sección principal con mensaje clave de la marca y call-to-action.
- `ClientsStrip.tsx`: Cintillo con logotipos de clientes de confianza.
- `scroll-image-sequence.tsx`: Experiencia inmersiva con animaciones manejadas por GSAP ScrollTrigger.
- `About.tsx`: Sección "Quiénes Somos".
- `Expertise.tsx`: Muestra el conocimiento y metodología.
- `Services.tsx`: Catálogo de soluciones (Solar, Eólica, etc.).
- `FinalCTA.tsx`: Llamado a la acción de cierre.
- `ConsultModal.tsx`: Ventana modal para contactar al equipo técnico y solicitar proyectos a medida.

## Sobre Sunrise Energy 🌍

Somos el socio estratégico que impulsa el desarrollo integral mediante la integración de tecnologías renovables y soluciones de infraestructura sostenible de extremo a extremo.

---
*Desarrollado para Sunrise Energy.*
