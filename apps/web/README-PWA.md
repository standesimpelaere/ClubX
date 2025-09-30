# PWA (Progressive Web App) Guide

## Overzicht
ClubX is geconfigureerd als een installable PWA met offline functionaliteit, caching en native app-achtige ervaring.

## Configuratie
- **App naam**: ClubX
- **Korte naam**: ClubX  
- **Primair merk-kleur**: #0EA5E9 (blauw)
- **Achtergrondkleur**: #ffffff (wit)
- **Start-URL**: /
- **Scope**: /

## Hoe te testen

### 1. Development vs Production
```bash
# Development (PWA uitgeschakeld)
pnpm run dev

# Development met PWA (voor lokaal testen)
pnpm run dev:pwa

# Production build
pnpm run build:web
pnpm run start:web
```

### 2. Service Worker testen
1. Open Chrome DevTools (F12)
2. Ga naar **Application** → **Service Workers**
3. Controleer of de Service Worker actief is
4. Voor **force refresh**: klik op "Update on reload" of "Unregister"

### 3. Offline functionaliteit testen
1. Ga naar **Application** → **Service Workers**
2. Vink "Offline" aan
3. Navigeer door de app - je zou de offline pagina moeten zien
4. Schakel offline uit om weer online te gaan

### 4. Install prompt testen
1. Open de app in Chrome/Edge
2. Kijk naar de install button in de address bar
3. Of ga naar **Application** → **Manifest** en klik "Add to homescreen"

### 5. Lighthouse PWA audit
```bash
pnpm run pwa:lighthouse
```
Of handmatig:
1. Open Chrome DevTools (F12)
2. Ga naar **Lighthouse** tab
3. Selecteer **Progressive Web App**
4. Klik "Generate report"
5. Doel: **≥90 score** voor Installable + Best Practices

## Caching strategieën

### HTML/Documenten
- **Strategie**: NetworkFirst
- **Fallback**: /offline pagina
- **Cache**: html-cache

### Static assets (_next/static, CSS, JS)
- **Strategie**: StaleWhileRevalidate  
- **Cache**: static-resources
- **Expiration**: 30 dagen

### Afbeeldingen
- **Strategie**: CacheFirst
- **Cache**: images
- **Expiration**: 30 dagen

### API calls (GET)
- **Strategie**: NetworkFirst
- **Cache**: api-cache
- **Expiration**: 30 seconden

## Bekende valkuilen

### 1. HTTP vs HTTPS
- **Development**: HTTP werkt lokaal
- **Production**: HTTPS vereist voor install prompt
- **Oplossing**: Gebruik HTTPS in productie

### 2. Service Worker cache
- **Probleem**: Oude cache na updates
- **Oplossing**: "Update on reload" in DevTools of hard refresh

### 3. Manifest validatie
- **Check**: manifest.webmanifest is geldig JSON
- **Icons**: Alle icon sizes aanwezig
- **URLs**: Relatieve paden gebruiken

## Installatie op verschillende platforms

### Android
1. Open in Chrome
2. Klik "Add to Home screen" in menu
3. Bevestig installatie

### iOS
1. Open in Safari
2. Klik share button (vierkant met pijl)
3. Selecteer "Add to Home Screen"
4. Bevestig installatie

### Desktop (Chrome/Edge)
1. Klik install button in address bar
2. Of ga naar menu → "Install ClubX"

## Troubleshooting

### Service Worker niet actief
```bash
# Check of PWA enabled is
NODE_ENV=production pnpm run dev

# Of force refresh browser cache
Ctrl+Shift+R (Windows/Linux)
Cmd+Shift+R (Mac)
```

### Icons niet zichtbaar
- Controleer of bestanden bestaan in `/public/icons/`
- Check manifest.webmanifest paths
- Verificeer MIME types (image/png)

### Offline pagina niet werkt
- Check of `/offline` route bestaat
- Controleer Service Worker registratie
- Test in incognito mode

## Aanpassingen

### App naam wijzigen
1. `apps/web/public/manifest.webmanifest`
2. `apps/web/src/app/layout.tsx` (metadata)
3. `apps/web/public/site.webmanifest`

### Kleuren wijzigen
1. `apps/web/public/manifest.webmanifest` (theme_color, background_color)
2. `apps/web/src/app/layout.tsx` (themeColor meta tag)

### Icons vervangen
1. Vervang bestanden in `/public/icons/`
2. Behoud dezelfde namen en sizes
3. Gebruik PNG formaat
