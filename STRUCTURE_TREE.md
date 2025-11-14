# 🌍 FreediveMap Structure Tree

Estructura completa de regions, countries, provinces y cities.

---

## 📊 Resumen

- **7 Regions** (regiones)
- **13 Countries** (países)
- **3 Provinces** (provincias - solo Indonesia)
- **33 Cities** (ciudades/destinos)
- **33 Destination Files** (.md)

---

## 🌏 ASIA

### 🇹🇭 Thailand (Tailandia)
- 📍 **Koh Tao** (`koh-tao.md`)
- 📍 **Koh Lanta** (`koh-lanta.md`)

### 🇵🇭 Philippines (Filipinas)
- 📍 **Panglao** (`panglao.md`)
- 📍 **Moalboal** (`moalboal.md`)
- 📍 **Cebu** (`cebu.md`)

### 🇮🇩 Indonesia
#### 🏝️ **Bali** (Province)
- 📍 **Amed** (`amed.md`)

#### 🏝️ **Lombok** (Province)
- 📍 **Gili Trawangan** (`gili-trawangan.md`)
- 📍 **Gili Meno** (`gili-meno.md`)
- 📍 **Gili Air** (`gili-air.md`)

#### 🏝️ **Aceh** (Province)
- 📍 **Pulau Weh** (`pulau-weh.md`)

---

## 🇪🇺 EUROPE

### 🇪🇸 Spain (España)
- 📍 **Tenerife** (`tenerife.md`)
- 📍 **Lanzarote** (`lanzarote.md`)
- 📍 **Barcelona** (`barcelona.md`)

### 🇲🇹 Malta
- 📍 **Valletta** (`valletta.md`)
- 📍 **Gozo** (`gozo.md`)

---

## 🇦🇫 AFRICA

### 🇪🇬 Egypt (Egipto)
- 📍 **Dahab** (`dahab.md`)
- 📍 **Sharm El Sheikh** (`sharm-el-sheikh.md`)

---

## 🇺🇸 NORTH AMERICA

### 🇲🇽 Mexico (México)
- 📍 **Cozumel** (`cozumel.md`)
- 📍 **Playa del Carmen** (`playa-del-carmen.md`)

### 🇭🇳 Honduras
- 📍 **Roatan** (`roatan.md`)
- 📍 **Utila** (`utila.md`)

---

## 🇧🇷 SOUTH AMERICA

### 🇨🇴 Colombia
- 📍 **Cartagena** (`cartagena.md`)
- 📍 **Taganga** (`taganga.md`)

### 🇧🇷 Brazil (Brasil)
- 📍 **Fernando de Noronha** (`fernando-de-noronha.md`)
- 📍 **Arraial do Cabo** (`arraial-do-cabo.md`)

---

## 🇦🇺 OCEANIA

### 🇦🇺 Australia
- 📍 **Byron Bay** (`byron-bay.md`)
- 📍 **Perth** (`perth.md`)

### 🇳🇿 New Zealand (Nueva Zelanda)
- 📍 **Auckland** (`auckland.md`)
- 📍 **Wellington** (`wellington.md`)

---

## 🧊 ANTARCTICA

### 🏝️ South Shetland Islands (Islas Shetland del Sur)
- 📍 **King George Island** (`king-george-island.md`)
- 📍 **Deception Island** (`deception-island.md`)

### 🌊 Ross Sea (Mar de Ross)
- 📍 **McMurdo Station** (`mcmurdo-station.md`)
- 📍 **Cape Adare** (`cape-adare.md`)

---

## 📝 Estructura de URLs

### Sin Province (sin provincia)
```
/{locale}/{region}/{country}/{city}/
Ejemplo: /en/africa/egypt/dahab/
```

### Con Province (con provincia)
```
/{locale}/{region}/{country}/{province}/{city}/
Ejemplo: /en/asia/indonesia/bali/amed/
```

---

## 📊 Estadísticas por Región

| Región | Países | Provincias | Ciudades | Destinations |
|--------|--------|------------|----------|--------------|
| **Asia** | 3 | 3 | 8 | 8 |
| **Europe** | 2 | 0 | 5 | 5 |
| **Africa** | 1 | 0 | 2 | 2 |
| **North America** | 2 | 0 | 4 | 4 |
| **South America** | 2 | 0 | 4 | 4 |
| **Oceania** | 2 | 0 | 4 | 4 |
| **Antarctica** | 2 | 0 | 4 | 4 |
| **TOTAL** | **13** | **3** | **33** | **33** |

---

## 🔍 Detalles por País

### Países con Provinces (provincias)
- 🇮🇩 **Indonesia**: 3 provincias (Bali, Lombok, Aceh) → 5 ciudades

### Países sin Provinces (sin provincias)
- 🇹🇭 **Thailand**: 2 ciudades
- 🇵🇭 **Philippines**: 3 ciudades
- 🇪🇸 **Spain**: 3 ciudades
- 🇲🇹 **Malta**: 2 ciudades
- 🇪🇬 **Egypt**: 2 ciudades
- 🇲🇽 **Mexico**: 2 ciudades
- 🇭🇳 **Honduras**: 2 ciudades
- 🇨🇴 **Colombia**: 2 ciudades
- 🇧🇷 **Brazil**: 2 ciudades
- 🇦🇺 **Australia**: 2 ciudades
- 🇳🇿 **New Zealand**: 2 ciudades
- 🏝️ **South Shetland Islands**: 2 ciudades
- 🌊 **Ross Sea**: 2 ciudades

---

## 📁 Archivos de Destinations

### Asia (8 archivos)
- `amed.md` (Indonesia/Bali)
- `gili-trawangan.md` (Indonesia/Lombok)
- `gili-meno.md` (Indonesia/Lombok)
- `gili-air.md` (Indonesia/Lombok)
- `pulau-weh.md` (Indonesia/Aceh)
- `koh-tao.md` (Thailand)
- `koh-lanta.md` (Thailand)
- `panglao.md` (Philippines)
- `moalboal.md` (Philippines)
- `cebu.md` (Philippines)

### Europe (5 archivos)
- `tenerife.md` (Spain)
- `lanzarote.md` (Spain)
- `barcelona.md` (Spain)
- `valletta.md` (Malta)
- `gozo.md` (Malta)

### Africa (2 archivos)
- `dahab.md` (Egypt)
- `sharm-el-sheikh.md` (Egypt)

### North America (4 archivos)
- `cozumel.md` (Mexico)
- `playa-del-carmen.md` (Mexico)
- `roatan.md` (Honduras)
- `utila.md` (Honduras)

### South America (4 archivos)
- `cartagena.md` (Colombia)
- `taganga.md` (Colombia)
- `fernando-de-noronha.md` (Brazil)
- `arraial-do-cabo.md` (Brazil)

### Oceania (4 archivos)
- `byron-bay.md` (Australia)
- `perth.md` (Australia)
- `auckland.md` (New Zealand)
- `wellington.md` (New Zealand)

### Antarctica (4 archivos)
- `king-george-island.md` (South Shetland Islands)
- `deception-island.md` (South Shetland Islands)
- `mcmurdo-station.md` (Ross Sea)
- `cape-adare.md` (Ross Sea)

---

*Última actualización: Enero 2025*

