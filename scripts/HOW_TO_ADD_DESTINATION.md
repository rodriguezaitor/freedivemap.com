# Cómo Añadir una Nueva Destination

Esta guía explica paso a paso cómo añadir una nueva destination (destino de freediving) al sitio web.

## 📋 Resumen del Proceso

1. **Añadir la ciudad en `regions.json`** (si no existe)
   - Si el país tiene **provinces**, añade la ciudad dentro de la provincia correspondiente
   - Si el país **no tiene provinces**, añade la ciudad directamente en `cities`
2. **Crear el archivo markdown** en `/src/content/destinations/`
   - Incluye el campo `province` si el país tiene provincias
3. **Verificar** que todo esté correcto
4. **Reconstruir** el sitio

---

## Paso 1: Añadir la Ciudad en `regions.json`

Edita el archivo `/src/content/regions.json` y añade la ciudad dentro del país correspondiente.

**⚠️ IMPORTANTE:** Primero verifica si el país tiene **provinces** o no. Algunos países tienen provincias (como España, Indonesia, Filipinas) y otros no (como Malta, Tailandia).

### Estructura del archivo `regions.json`

#### Opción A: País SIN Provinces (sin provincias)

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

#### Opción B: País CON Provinces (con provincias)

```json
{
  "region-slug": {
    "name": { "en": "Region Name", "es": "Nombre Región" },
    "slug": "region-slug",
    "countries": {
      "country-slug": {
        "name": { "en": "Country Name", "es": "Nombre País" },
        "slug": "country-slug",
        "provinces": {
          "province-slug": {
            "name": { "en": "Province Name", "es": "Nombre Provincia" },
            "slug": "province-slug",
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
  }
}
```

### Ejemplo 1: Añadir ciudad a país SIN provinces (Malta)

Si quieres añadir una nueva ciudad a Malta (que no tiene provincias):

```json
"europe": {
  "countries": {
    "malta": {
      "name": {
        "en": "Malta",
        "es": "Malta"
      },
      "slug": "malta",
      "cities": {
        "valletta": { ... },
        "gozo": { ... },
        "new-city": {
          "name": {
            "en": "New City",
            "es": "Nueva Ciudad"
          },
          "slug": "new-city"
        }
      }
    }
  }
}
```

### Ejemplo 2: Añadir ciudad a país CON provinces (España)

Si quieres añadir una nueva ciudad a España, debes añadirla dentro de la provincia correspondiente:

```json
"europe": {
  "countries": {
    "spain": {
      "name": {
        "en": "Spain",
        "es": "España"
      },
      "slug": "spain",
      "provinces": {
        "canary-islands": {
          "name": {
            "en": "Canary Islands",
            "es": "Islas Canarias"
          },
          "slug": "canary-islands",
          "cities": {
            "tenerife": { ... },
            "lanzarote": { ... },
            "gran-canaria": {
              "name": {
                "en": "Gran Canaria",
                "es": "Gran Canaria"
              },
              "slug": "gran-canaria"
            }
          }
        },
        "catalonia": {
          "cities": {
            "barcelona": { ... }
          }
        }
      }
    }
  }
}
```

### ¿Cómo saber si un país tiene provinces?

Consulta el archivo `/src/content/regions.json` y busca el país. Si tiene un objeto `"provinces"`, entonces usa la **Opción B**. Si solo tiene `"cities"`, usa la **Opción A**.

**Países CON provinces actualmente:**
- 🇮🇩 Indonesia (Bali, Lombok, Aceh)
- 🇪🇸 Spain (Canary Islands, Catalonia)
- 🇵🇭 Philippines (Bohol, Cebu)
- 🇪🇬 Egypt (South Sinai)
- 🇲🇽 Mexico (Quintana Roo)
- 🇭🇳 Honduras (Bay Islands)
- 🇨🇴 Colombia (Bolívar, Magdalena)
- 🇧🇷 Brazil (Pernambuco, Rio de Janeiro)
- 🇦🇺 Australia (New South Wales, Western Australia)
- 🇳🇿 New Zealand (Auckland, Wellington)

### Reglas importantes para `regions.json`:

- ✅ El `slug` debe ser en minúsculas y usar guiones (kebab-case)
- ✅ El `slug` de la ciudad debe coincidir con el nombre del archivo `.md` que crearás
- ✅ Si el país no existe, añádelo primero
- ✅ Si la región no existe, añádela primero
- ✅ Si el país tiene `provinces`, **NO** debe tener `cities` directamente (y viceversa)
- ✅ Si añades una ciudad a un país con provinces, debe ir dentro de la provincia correspondiente
- ✅ Si añades una ciudad a un país sin provinces, debe ir directamente en `cities`

---

## Paso 2: Crear el Archivo Markdown de la Destination

Crea un nuevo archivo en `/src/content/destinations/` con el nombre `{city-slug}.md`.

### Estructura del Frontmatter (Obligatorio)

#### Opción A: País SIN Province (sin provincia)

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

#### Opción B: País CON Province (con provincia)

```yaml
---
name:
  en: "City Name, Country"  # Formato: "Ciudad, País"
  es: "Nombre Ciudad, País"
country: "country-slug"     # Debe coincidir con el slug en regions.json
province: "province-slug"   # ⚠️ OBLIGATORIO si el país tiene provinces
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

### Ejemplo 1: País CON Province - `barcelona.md`

```markdown
---
name:
  en: "Barcelona, Spain"
  es: "Barcelona, España"
country: "spain"
province: "catalonia"       # ⚠️ OBLIGATORIO porque España tiene provinces
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

### Ejemplo 2: País CON Province - `dahab.md` (Egipto tiene provinces)

```markdown
---
name:
  en: "Dahab, Egypt"
  es: "Dahab, Egipto"
country: "egypt"
province: "south-sinai"     # ⚠️ OBLIGATORIO porque Egipto tiene provinces
city: "dahab"
region: "africa"
description:
  en: "Dahab is home to the famous Blue Hole and is a world-renowned destination for depth training and competitive freediving."
  es: "Dahab es el hogar del famoso Blue Hole y es un destino de renombre mundial para el entrenamiento de profundidad y el freediving competitivo."
image: "/images/destinations/dahab.jpg"
content:
  en: |
    ## About Dahab
    
    Dahab is one of the world's most famous freediving destinations...
  es: |
    ## Acerca de Dahab
    
    Dahab es uno de los destinos de freediving más famosos del mundo...
---
```

### Ejemplo 3: País SIN Province - `valletta.md` (Malta no tiene provinces)

```markdown
---
name:
  en: "Valletta, Malta"
  es: "La Valeta, Malta"
country: "malta"
# province: NO necesario porque Malta NO tiene provinces
city: "valletta"
region: "europe"
description:
  en: "Valletta offers world-class freediving facilities with access to deep water sites and professional training centers."
  es: "La Valeta ofrece instalaciones de freediving de clase mundial con acceso a sitios de aguas profundas y centros de entrenamiento profesionales."
---
```

### Campos Obligatorios

| Campo | Descripción | Ejemplo | ¿Cuándo es obligatorio? |
|-------|-------------|---------|-------------------------|
| `name.en` | Nombre completo en inglés (formato: "Ciudad, País") | `"Barcelona, Spain"` | Siempre |
| `name.es` | Nombre completo en español (formato: "Ciudad, País") | `"Barcelona, España"` | Siempre |
| `country` | Slug del país (debe existir en `regions.json`) | `"spain"` | Siempre |
| `province` | Slug de la provincia (debe existir en `regions.json`) | `"catalonia"` | **Solo si el país tiene provinces** |
| `city` | Slug de la ciudad (debe existir en `regions.json`) | `"barcelona"` | Siempre |
| `region` | Slug de la región (debe existir en `regions.json`) | `"europe"` | Siempre |
| `description.en` | Descripción corta en inglés | `"Barcelona offers..."` | Siempre |
| `description.es` | Descripción corta en español | `"Barcelona ofrece..."` | Siempre |

### Campos Opcionales

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| `image` | Ruta a la imagen del destino | `"/images/destinations/barcelona.jpg"` |
| `content.en` | Contenido largo en markdown (inglés) | Contenido detallado... |
| `content.es` | Contenido largo en markdown (español) | Contenido detallado... |

### Reglas Importantes para el Archivo `.md`:

- ✅ El nombre del archivo debe ser `{city-slug}.md` (ej: `barcelona.md`)
- ✅ Los slugs (`country`, `city`, `region`) deben coincidir exactamente con los de `regions.json`
- ✅ Si el país tiene `provinces`, el campo `province` es **OBLIGATORIO** y debe coincidir con el slug en `regions.json`
- ✅ Si el país NO tiene `provinces`, **NO** incluyas el campo `province`
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

El sitio generará automáticamente las URLs según si el país tiene provinces o no:

#### País SIN Province (sin provincia)
- Inglés: `/{locale}/{region}/{country}/{city}/`
- Español: `/{locale}/{region}/{country}/{city}/`

**Ejemplo para Valletta (Malta):**
- `/en/europe/malta/valletta/`
- `/es/europe/malta/valletta/`

#### País CON Province (con provincia)
- Inglés: `/{locale}/{region}/{country}/{province}/{city}/`
- Español: `/{locale}/{region}/{country}/{province}/{city}/`

**Ejemplo para Barcelona (España):**
- `/en/europe/spain/catalonia/barcelona/`
- `/es/europe/spain/catalonia/barcelona/`

**Ejemplo para Amed (Indonesia):**
- `/en/asia/indonesia/bali/amed/`
- `/es/asia/indonesia/bali/amed/`

---

## 📝 Checklist Completo

Antes de considerar que una destination está completa, verifica:

- [ ] Verificaste si el país tiene `provinces` o no en `regions.json`
- [ ] La ciudad está añadida en `regions.json` con `name` y `slug` correctos
  - [ ] Si el país tiene provinces: la ciudad está dentro de la provincia correcta
  - [ ] Si el país no tiene provinces: la ciudad está directamente en `cities`
- [ ] El archivo `{city-slug}.md` existe en `/src/content/destinations/`
- [ ] El frontmatter tiene todos los campos obligatorios
- [ ] Si el país tiene provinces: el campo `province` está incluido y es correcto
- [ ] Si el país no tiene provinces: el campo `province` NO está incluido
- [ ] Los slugs (`country`, `city`, `region`, `province` si aplica) coinciden con `regions.json`
- [ ] Las descripciones están en inglés y español
- [ ] El contenido largo (`content`) está incluido (recomendado)
- [ ] El script de verificación pasa sin errores
- [ ] El sitio se reconstruye correctamente
- [ ] Las URLs funcionan en ambos idiomas (con o sin province según corresponda)

---

## 🔍 Ejemplos de Destinations Existentes

Puedes usar estos archivos como referencia:

### Con Province (con provincia)
- `/src/content/destinations/barcelona.md` - España con province (Catalonia)
- `/src/content/destinations/tenerife.md` - España con province (Canary Islands)
- `/src/content/destinations/amed.md` - Indonesia con province (Bali)
- `/src/content/destinations/dahab.md` - Egipto con province (South Sinai)
- `/src/content/destinations/cebu.md` - Filipinas con province (Cebu)

### Sin Province (sin provincia)
- `/src/content/destinations/koh-tao.md` - Tailandia sin province
- `/src/content/destinations/valletta.md` - Malta sin province

---

## ❓ Preguntas Frecuentes

### ¿Cómo sé si un país tiene provinces?

Consulta `/src/content/regions.json` y busca el país. Si tiene un objeto `"provinces"`, entonces el país usa provincias. Si solo tiene `"cities"`, no usa provincias.

**Países CON provinces actualmente:**
- Indonesia, Spain, Philippines, Egypt, Mexico, Honduras, Colombia, Brazil, Australia, New Zealand

**Países SIN provinces:**
- Thailand, Malta, South Shetland Islands, Ross Sea

### ¿Cuándo debo incluir el campo `province` en el archivo `.md`?

- ✅ **SÍ incluir** `province` si el país tiene `provinces` en `regions.json`
- ❌ **NO incluir** `province` si el país solo tiene `cities` en `regions.json`

### ¿Qué pasa si el país no existe en `regions.json`?

Primero debes añadir el país completo en `regions.json`, incluyendo su `name` (en/es) y `slug`. Decide si el país necesita provinces o no basándote en su estructura administrativa.

### ¿Qué pasa si la provincia no existe en `regions.json`?

Si el país tiene provinces y quieres añadir una ciudad a una provincia nueva, primero debes:
1. Añadir la provincia en `regions.json` dentro del país
2. Añadir la ciudad dentro de esa provincia
3. Crear el archivo `.md` con el campo `province` correspondiente

### ¿Puedo usar el mismo slug para diferentes ciudades?

No, cada ciudad debe tener un slug único. Si hay ciudades con el mismo nombre en diferentes países o provincias, usa un slug más específico (ej: `barcelona-spain`, `barcelona-venezuela`).

### ¿El contenido (`content`) es obligatorio?

No es obligatorio, pero es muy recomendado para SEO y para proporcionar información útil a los usuarios. Si no lo incluyes, la página mostrará un mensaje indicando que la información estará disponible pronto.

### ¿Cómo sé qué slugs usar?

Los slugs deben ser:
- En minúsculas
- Usar guiones en lugar de espacios (kebab-case)
- Ser descriptivos pero cortos
- Ejemplos: `koh-tao`, `sharm-el-sheikh`, `barcelona`, `canary-islands`, `south-sinai`

### ¿Qué formato de imagen debo usar?

Las imágenes deben estar en `/public/images/destinations/` y la ruta en el frontmatter debe empezar con `/images/destinations/`. Formatos recomendados: JPG o WebP.

### ¿Puedo tener un país con provinces Y cities al mismo tiempo?

No. Un país debe tener **O** `provinces` **O** `cities`, pero no ambos. Si un país tiene provinces, todas sus ciudades deben estar dentro de las provincias.

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

---

## 🗺️ Estructura Completa

Para ver la estructura completa de todas las regions, countries, provinces y cities, consulta:
- `/STRUCTURE_TREE.md` - Árbol completo de la estructura

---

*Última actualización: Enero 2025*

