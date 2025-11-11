# Cómo verificar Google Tag Manager

## Método 1: Consola del navegador (Más rápido)

1. Abre `https://freedivemap.com` en tu navegador
2. Abre las DevTools (F12 o Clic derecho → Inspeccionar)
3. Ve a la pestaña **Console**
4. Escribe y presiona Enter:
   ```javascript
   window.dataLayer
   ```
5. Deberías ver un array con objetos, incluyendo uno con `gtm.start`
6. También verifica:
   ```javascript
   window.google_tag_manager
   ```
   Debería mostrar un objeto con tu ID `GTM-NG9MG7LN`

## Método 2: Network Tab (Verificar carga)

1. Abre las DevTools (F12)
2. Ve a la pestaña **Network**
3. Recarga la página (F5)
4. Busca `gtm.js?id=GTM-NG9MG7LN` en la lista
5. Debería aparecer con status 200 (éxito)

## Método 3: Google Tag Assistant (Extensión de Chrome)

1. Instala la extensión "Tag Assistant Legacy" desde Chrome Web Store
2. Visita `https://freedivemap.com`
3. Haz clic en el icono de Tag Assistant
4. Debería mostrar tu contenedor GTM como activo

## Método 4: Verificar en Google Tag Manager

1. Ve a [Google Tag Manager](https://tagmanager.google.com)
2. Selecciona tu contenedor `GTM-NG9MG7LN`
3. Ve a **Preview** (Vista previa)
4. Ingresa tu URL: `https://freedivemap.com`
5. Deberías ver la conexión y los tags activos

## Método 5: Verificar Partytown

1. Abre las DevTools (F12)
2. Ve a la pestaña **Application** (o **Aplicación**)
3. En el panel izquierdo, busca **Service Workers**
4. Deberías ver un service worker de Partytown activo
5. También verifica en **Network** que se carga `/~partytown/`

## Verificación rápida en consola

Copia y pega esto en la consola del navegador:

```javascript
// Verificar dataLayer
console.log('dataLayer:', window.dataLayer);

// Verificar GTM
console.log('GTM:', window.google_tag_manager);

// Verificar Partytown
console.log('Partytown:', navigator.serviceWorker.controller);

// Verificar si GTM está cargado
if (window.google_tag_manager && window.google_tag_manager['GTM-NG9MG7LN']) {
  console.log('✅ GTM está funcionando correctamente!');
} else {
  console.log('❌ GTM no está cargado');
}
```

## Problemas comunes

- **Si no ves dataLayer**: El script de GTM no se está ejecutando
- **Si ves error 404 en gtm.js**: Verifica que el ID sea correcto
- **Si Partytown no carga**: Verifica que la integración esté correctamente instalada
- **Si no funciona en producción**: Asegúrate de que el build incluya los archivos de Partytown

