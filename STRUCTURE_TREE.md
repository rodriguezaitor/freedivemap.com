# 🌍 FreediveMap Structure Tree

Estructura completa de regions, countries, provinces y cities.

---

## 📊 Resumen

- **7 Regions** (regiones)
- **13 Countries** (países)
- **18 Provinces** (provincias)
- **33 Cities** (ciudades/destinos)
- **33 Destination Files** (.md)

---

## 🌏 ASIA

### 🇹🇭 Thailand (Tailandia)
- 📍 **Koh Tao** (`koh-tao.md`)
- 📍 **Koh Lanta** (`koh-lanta.md`)

### 🇵🇭 Philippines (Filipinas)
#### 🏝️ **Bohol** (Province)
- 📍 **Panglao** (`panglao.md`)

#### 🏝️ **Cebu** (Province)
- 📍 **Cebu** (`cebu.md`)
- 📍 **Moalboal** (`moalboal.md`)

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
#### 🏝️ **Canary Islands** (Islas Canarias) (Province)
- 📍 **Tenerife** (`tenerife.md`)
- 📍 **Lanzarote** (`lanzarote.md`)

#### 🏛️ **Catalonia** (Cataluña) (Province)
- 📍 **Barcelona** (`barcelona.md`)

### 🇲🇹 Malta
- 📍 **Valletta** (`valletta.md`)
- 📍 **Gozo** (`gozo.md`)

---

## 🇦🇫 AFRICA

### 🇪🇬 Egypt (Egipto)
#### 🏜️ **South Sinai** (Sinaí del Sur) (Province)
- 📍 **Dahab** (`dahab.md`)
- 📍 **Sharm El Sheikh** (`sharm-el-sheikh.md`)

---

## 🇺🇸 NORTH AMERICA

### 🇲🇽 Mexico (México)
#### 🏖️ **Quintana Roo** (Province)
- 📍 **Cozumel** (`cozumel.md`)
- 📍 **Playa del Carmen** (`playa-del-carmen.md`)

### 🇭🇳 Honduras
#### 🏝️ **Bay Islands** (Islas de la Bahía) (Province)
- 📍 **Roatan** (`roatan.md`)
- 📍 **Utila** (`utila.md`)

---

## 🇧🇷 SOUTH AMERICA

### 🇨🇴 Colombia
#### 🏛️ **Bolívar** (Province)
- 📍 **Cartagena** (`cartagena.md`)

#### 🏛️ **Magdalena** (Province)
- 📍 **Taganga** (`taganga.md`)

### 🇧🇷 Brazil (Brasil)
#### 🏛️ **Pernambuco** (Province)
- 📍 **Fernando de Noronha** (`fernando-de-noronha.md`)

#### 🏛️ **Rio de Janeiro** (Río de Janeiro) (Province)
- 📍 **Arraial do Cabo** (`arraial-do-cabo.md`)

---

## 🇦🇺 OCEANIA

### 🇦🇺 Australia
#### 🏛️ **New South Wales** (Nueva Gales del Sur) (Province)
- 📍 **Byron Bay** (`byron-bay.md`)

#### 🏛️ **Western Australia** (Australia Occidental) (Province)
- 📍 **Perth** (`perth.md`)

### 🇳🇿 New Zealand (Nueva Zelanda)
#### 🏛️ **Auckland** (Province)
- 📍 **Auckland** (`auckland.md`)

#### 🏛️ **Wellington** (Province)
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
Ejemplo: /en/africa/egypt/dahab/ → /en/africa/egypt/south-sinai/dahab/
```

### Con Province (con provincia)
```
/{locale}/{region}/{country}/{province}/{city}/
Ejemplo: /en/asia/indonesia/bali/amed/
Ejemplo: /en/europe/spain/canary-islands/tenerife/
Ejemplo: /en/europe/spain/catalonia/barcelona/
```

---

## 📊 Estadísticas por Región

| Región | Países | Provincias | Ciudades | Destinations |
|--------|--------|------------|----------|--------------|
| **Asia** | 3 | 5 | 10 | 10 |
| **Europe** | 2 | 2 | 5 | 5 |
| **Africa** | 1 | 1 | 2 | 2 |
| **North America** | 2 | 2 | 4 | 4 |
| **South America** | 2 | 4 | 4 | 4 |
| **Oceania** | 2 | 4 | 4 | 4 |
| **Antarctica** | 2 | 0 | 4 | 4 |
| **TOTAL** | **13** | **18** | **33** | **33** |

---

## 🔍 Detalles por País

### Países con Provinces (provincias)

#### 🇮🇩 **Indonesia**: 3 provincias → 5 ciudades
- **Bali**: 1 ciudad (Amed)
- **Lombok**: 3 ciudades (Gili Trawangan, Gili Meno, Gili Air)
- **Aceh**: 1 ciudad (Pulau Weh)

#### 🇪🇸 **Spain**: 2 provincias → 3 ciudades
- **Canary Islands**: 2 ciudades (Tenerife, Lanzarote)
- **Catalonia**: 1 ciudad (Barcelona)

#### 🇵🇭 **Philippines**: 2 provincias → 3 ciudades
- **Bohol**: 1 ciudad (Panglao)
- **Cebu**: 2 ciudades (Cebu, Moalboal)

#### 🇪🇬 **Egypt**: 1 provincia → 2 ciudades
- **South Sinai**: 2 ciudades (Dahab, Sharm El Sheikh)

#### 🇲🇽 **Mexico**: 1 provincia → 2 ciudades
- **Quintana Roo**: 2 ciudades (Cozumel, Playa del Carmen)

#### 🇭🇳 **Honduras**: 1 provincia → 2 ciudades
- **Bay Islands**: 2 ciudades (Roatan, Utila)

#### 🇨🇴 **Colombia**: 2 provincias → 2 ciudades
- **Bolívar**: 1 ciudad (Cartagena)
- **Magdalena**: 1 ciudad (Taganga)

#### 🇧🇷 **Brazil**: 2 provincias → 2 ciudades
- **Pernambuco**: 1 ciudad (Fernando de Noronha)
- **Rio de Janeiro**: 1 ciudad (Arraial do Cabo)

#### 🇦🇺 **Australia**: 2 provincias → 2 ciudades
- **New South Wales**: 1 ciudad (Byron Bay)
- **Western Australia**: 1 ciudad (Perth)

#### 🇳🇿 **New Zealand**: 2 provincias → 2 ciudades
- **Auckland**: 1 ciudad (Auckland)
- **Wellington**: 1 ciudad (Wellington)

### Países sin Provinces (sin provincias)

- 🇹🇭 **Thailand**: 2 ciudades
- 🇲🇹 **Malta**: 2 ciudades
- 🏝️ **South Shetland Islands**: 2 ciudades
- 🌊 **Ross Sea**: 2 ciudades

---

## 📁 Archivos de Destinations por Región

### Asia (10 archivos)
- `amed.md` (Indonesia/Bali)
- `gili-trawangan.md` (Indonesia/Lombok)
- `gili-meno.md` (Indonesia/Lombok)
- `gili-air.md` (Indonesia/Lombok)
- `pulau-weh.md` (Indonesia/Aceh)
- `koh-tao.md` (Thailand)
- `koh-lanta.md` (Thailand)
- `panglao.md` (Philippines/Bohol)
- `moalboal.md` (Philippines/Cebu)
- `cebu.md` (Philippines/Cebu)

### Europe (5 archivos)
- `tenerife.md` (Spain/Canary Islands)
- `lanzarote.md` (Spain/Canary Islands)
- `barcelona.md` (Spain/Catalonia)
- `valletta.md` (Malta)
- `gozo.md` (Malta)

### Africa (2 archivos)
- `dahab.md` (Egypt/South Sinai)
- `sharm-el-sheikh.md` (Egypt/South Sinai)

### North America (4 archivos)
- `cozumel.md` (Mexico/Quintana Roo)
- `playa-del-carmen.md` (Mexico/Quintana Roo)
- `roatan.md` (Honduras/Bay Islands)
- `utila.md` (Honduras/Bay Islands)

### South America (4 archivos)
- `cartagena.md` (Colombia/Bolívar)
- `taganga.md` (Colombia/Magdalena)
- `fernando-de-noronha.md` (Brazil/Pernambuco)
- `arraial-do-cabo.md` (Brazil/Rio de Janeiro)

### Oceania (4 archivos)
- `byron-bay.md` (Australia/New South Wales)
- `perth.md` (Australia/Western Australia)
- `auckland.md` (New Zealand/Auckland)
- `wellington.md` (New Zealand/Wellington)

### Antarctica (4 archivos)
- `king-george-island.md` (South Shetland Islands)
- `deception-island.md` (South Shetland Islands)
- `mcmurdo-station.md` (Ross Sea)
- `cape-adare.md` (Ross Sea)

---

## 🗺️ Lista Completa de Provincias

1. **Bali** (Indonesia)
2. **Lombok** (Indonesia)
3. **Aceh** (Indonesia)
4. **Canary Islands** (Spain)
5. **Catalonia** (Spain)
6. **Bohol** (Philippines)
7. **Cebu** (Philippines)
8. **South Sinai** (Egypt)
9. **Quintana Roo** (Mexico)
10. **Bay Islands** (Honduras)
11. **Bolívar** (Colombia)
12. **Magdalena** (Colombia)
13. **Pernambuco** (Brazil)
14. **Rio de Janeiro** (Brazil)
15. **New South Wales** (Australia)
16. **Western Australia** (Australia)
17. **Auckland** (New Zealand)
18. **Wellington** (New Zealand)

---

*Última actualización: Enero 2025*
