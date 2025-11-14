# Cómo Añadir una Nueva Destination

Esta guía explica paso a paso cómo añadir una nueva destination (destino de freediving) al sitio web.

## 📋 Resumen del Proceso

1. **Añadir la ciudad en `regions.json`** (si no existe)
2. **Crear el archivo markdown** en `/src/content/destinations/`
3. **Verificar** que todo esté correcto
4. **Reconstruir** el sitio

---

## Paso 1: Añadir la Ciudad en `regions.json`

Edita el archivo `/src/content/regions.json` y añade la ciudad dentro del país correspondiente.

### Estructura del archivo `regions.json`

```json
{
  "region-slug": {
    "name": { "en": "Region Name", "es": "Nombre Región" },
    "slug": "region-slug",
    "countries": {
      "country-slug": {
        "name": { "en": "Country Name", "es": "Nombre País" },
        "slug": "country-slug",
        "cities": {
          "city-slug": {
            "name": { "en": "City Name", "es": "Nombre Ciudad" },
            "slug": "city-slug"
          }
        }
      }
    }
  }
}
```

### Ejemplo: Añadir "Barcelona" a España

Si quieres añadir Barcelona a España en Europa, edita `regions.json`:

```json
"europe": {
  "name": {
    "en": "Europe",
    "es": "Europa"
  },
  "slug": "europe",
  "countries": {
    "spain": {
      "name": {
        "en": "Spain",
        "es": "España"
      },
      "slug": "spain",
      "cities": {
        "tenerife": {
          "name": {
            "en": "Tenerife",
            "es": "Tenerife"
          },
          "slug": "tenerife"
        },
        "barcelona": {
          "name": {
            "en": "Barcelona",
            "es": "Barcelona"
          },
          "slug": "barcelona"
        }
      }
    }
  }
}
```

### Reglas importantes para `regions.json`:

- ✅ El `slug` debe ser en minúsculas y usar guiones (kebab-case)
- ✅ El `slug` de la ciudad debe coincidir con el nombre del archivo `.md` que crearás
- ✅ Si el país no existe, añádelo primero
- ✅ Si la región no existe, añádela primero

---

## Paso 2: Crear el Archivo Markdown de la Destination

Crea un nuevo archivo en `/src/content/destinations/` con el nombre `{city-slug}.md`.

### Estructura del Frontmatter (Obligatorio)

```yaml
---
name:
  en: "City Name, Country"  # Formato: "Ciudad, País"
  es: "Nombre Ciudad, País"
country: "country-slug"     # Debe coincidir con el slug en regions.json
city: "city-slug"           # Debe coincidir con el slug en regions.json
region: "region-slug"       # Debe coincidir con el slug en regions.json
description:
  en: "Descripción corta en inglés..."
  es: "Descripción corta en español..."
image: "/images/destinations/city-slug.jpg"  # Opcional
content:                    # Opcional pero recomendado
  en: |
    ## About City Name
    
    Contenido en markdown...
  es: |
    ## Acerca de Nombre Ciudad
    
    Contenido en markdown...
---
```

### Ejemplo Completo: `barcelona.md`

```markdown
---
name:
  en: "Barcelona, Spain"
  es: "Barcelona, España"
country: "spain"
city: "barcelona"
region: "europe"
description:
  en: "Barcelona offers excellent freediving opportunities in the Mediterranean with clear waters and accessible dive sites."
  es: "Barcelona ofrece excelentes oportunidades de freediving en el Mediterráneo con aguas claras y sitios de buceo accesibles."
image: "/images/destinations/barcelona.jpg"
content:
  en: |
    ## About Barcelona
    
    Barcelona is a vibrant city on the Mediterranean coast, offering unique freediving experiences in the heart of Catalonia.
    
    ### Freediving Conditions
    
    - **Visibility**: Typically 10-20 meters depending on conditions
    - **Water Temperature**: 14-24°C (varies by season)
    - **Best Season**: May to October
    - **Accessibility**: Easy access from the city center
    
    ### Key Dive Sites
    
    - **Costa Brava**: Beautiful coastal diving with rocky formations
    - **Medes Islands**: Marine reserve with rich biodiversity
    - **Blanes**: Popular spot for training and recreational diving
    
    ### Training Facilities
    
    Barcelona hosts several freediving schools offering courses from beginner to advanced levels, including AIDA and PADI certifications.
  es: |
    ## Acerca de Barcelona
    
    Barcelona es una ciudad vibrante en la costa mediterránea, que ofrece experiencias únicas de freediving en el corazón de Cataluña.
    
    ### Condiciones de Freediving
    
    - **Visibilidad**: Típicamente 10-20 metros dependiendo de las condiciones
    - **Temperatura del Agua**: 14-24°C (varía según la temporada)
    - **Mejor Temporada**: Mayo a Octubre
    - **Accesibilidad**: Fácil acceso desde el centro de la ciudad
    
    ### Sitios de Buceo Principales
    
    - **Costa Brava**: Hermoso buceo costero con formaciones rocosas
    - **Islas Medes**: Reserva marina con rica biodiversidad
    - **Blanes**: Lugar popular para entrenamiento y buceo recreativo
    
    ### Instalaciones de Entrenamiento
    
    Barcelona alberga varias escuelas de freediving que ofrecen cursos desde principiante hasta niveles avanzados, incluyendo certificaciones AIDA y PADI.
---
```

### Campos Obligatorios

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| `name.en` | Nombre completo en inglés (formato: "Ciudad, País") | `"Barcelona, Spain"` |
| `name.es` | Nombre completo en español (formato: "Ciudad, País") | `"Barcelona, España"` |
| `country` | Slug del país (debe existir en `regions.json`) | `"spain"` |
| `city` | Slug de la ciudad (debe existir en `regions.json`) | `"barcelona"` |
| `region` | Slug de la región (debe existir en `regions.json`) | `"europe"` |
| `description.en` | Descripción corta en inglés | `"Barcelona offers..."` |
| `description.es` | Descripción corta en español | `"Barcelona ofrece..."` |

### Campos Opcionales

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| `image` | Ruta a la imagen del destino | `"/images/destinations/barcelona.jpg"` |
| `content.en` | Contenido largo en markdown (inglés) | Contenido detallado... |
| `content.es` | Contenido largo en markdown (español) | Contenido detallado... |

### Reglas Importantes para el Archivo `.md`:

- ✅ El nombre del archivo debe ser `{city-slug}.md` (ej: `barcelona.md`)
- ✅ Los slugs (`country`, `city`, `region`) deben coincidir exactamente con los de `regions.json`
- ✅ El formato del `name` debe ser: `"Ciudad, País"` (con coma y espacio)
- ✅ El `content` es opcional pero muy recomendado para SEO
- ✅ Puedes usar markdown completo en el `content` (títulos, listas, enlaces, etc.)

---

## Paso 3: Verificar que Todo Esté Correcto

Ejecuta el script de verificación para asegurarte de que todo está bien configurado:

```bash
npm run check-destinations
```

O manualmente:

```bash
node scripts/check-destinations.js
```

### ¿Qué verifica el script?

- ✅ Que todas las ciudades en `regions.json` tengan su archivo `.md` correspondiente
- ✅ Que no haya archivos `.md` huérfanos (sin entrada en `regions.json`)
- ✅ Muestra un reporte de qué falta o qué sobra

### Ejemplo de salida del script:

```
📋 Destination Verification Report

Expected destinations: 9
Created: 9
Missing: 0
Extra files: 0

✅ All destinations are properly configured!
```

Si hay errores, el script te indicará qué falta o qué está mal.

---

## Paso 4: Reconstruir el Sitio

Una vez que hayas añadido la destination y verificado que todo está correcto, reconstruye el sitio:

```bash
npm run build
```

O si estás en desarrollo:

```bash
npm run dev
```

### URLs Generadas Automáticamente

El sitio generará automáticamente las siguientes URLs:

- Inglés: `/{locale}/{region}/{country}/{city}/`
- Español: `/{locale}/{region}/{country}/{city}/`

**Ejemplo para Barcelona:**
- `/en/europe/spain/barcelona/`
- `/es/europe/spain/barcelona/`

---

## 📝 Checklist Completo

Antes de considerar que una destination está completa, verifica:

- [ ] La ciudad está añadida en `regions.json` con `name` y `slug` correctos
- [ ] El archivo `{city-slug}.md` existe en `/src/content/destinations/`
- [ ] El frontmatter tiene todos los campos obligatorios
- [ ] Los slugs (`country`, `city`, `region`) coinciden con `regions.json`
- [ ] Las descripciones están en inglés y español
- [ ] El contenido largo (`content`) está incluido (recomendado)
- [ ] El script de verificación pasa sin errores
- [ ] El sitio se reconstruye correctamente
- [ ] Las URLs funcionan en ambos idiomas

---

## 🔍 Ejemplos de Destinations Existentes

Puedes usar estos archivos como referencia:

- `/src/content/destinations/dahab.md` - Ejemplo completo con contenido
- `/src/content/destinations/koh-tao.md` - Ejemplo con buena estructura
- `/src/content/destinations/tenerife.md` - Ejemplo europeo

---

## ❓ Preguntas Frecuentes

### ¿Qué pasa si el país no existe en `regions.json`?

Primero debes añadir el país completo en `regions.json`, incluyendo su `name` (en/es) y `slug`.

### ¿Puedo usar el mismo slug para diferentes ciudades?

No, cada ciudad debe tener un slug único. Si hay ciudades con el mismo nombre en diferentes países, usa un slug más específico (ej: `barcelona-spain`, `barcelona-venezuela`).

### ¿El contenido (`content`) es obligatorio?

No es obligatorio, pero es muy recomendado para SEO y para proporcionar información útil a los usuarios. Si no lo incluyes, la página mostrará un mensaje indicando que la información estará disponible pronto.

### ¿Cómo sé qué slugs usar?

Los slugs deben ser:
- En minúsculas
- Usar guiones en lugar de espacios (kebab-case)
- Ser descriptivos pero cortos
- Ejemplos: `koh-tao`, `sharm-el-sheikh`, `barcelona`

### ¿Qué formato de imagen debo usar?

Las imágenes deben estar en `/public/images/destinations/` y la ruta en el frontmatter debe empezar con `/images/destinations/`. Formatos recomendados: JPG o WebP.

---

## 🛠️ Scripts Útiles

- `npm run check-destinations` - Verifica que todas las destinations estén correctamente configuradas
- `npm run check-content` - Verifica el contenido de las destinations
- `npm run build` - Construye el sitio para producción
- `npm run dev` - Inicia el servidor de desarrollo

---

## 📚 Recursos Adicionales

- Ver estructura completa en: `/src/content.config.ts`
- Ver ejemplos en: `/src/content/destinations/`
- Ver estructura de regions en: `/src/content/regions.json`

---

*Última actualización: Enero 2025*

