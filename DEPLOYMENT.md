# Deployment: JJJ Fitness online stellen (Vercel)

Ziel: Die Seite ist unter einer echten Adresse erreichbar, z.B. `https://jjj-fitness.vercel.app`.
Danach wird sie bei jedem `git push` automatisch neu veröffentlicht.

Alles ist kostenlos. Ihr braucht ein GitHub-Konto und ein Vercel-Konto. Diese Konten muss eine Person aus dem Team selbst erstellen.

---

## Schritt 1: Code auf GitHub hochladen

1. Auf [github.com](https://github.com) anmelden → oben rechts **+** → **New repository**.
2. Name: `jjj-fitness`. Wählt **Private** (nur ihr seht den Code) oder **Public**. Vercel funktioniert mit beidem.
3. **Keine** README, .gitignore oder Lizenz hinzufügen, das Projekt hat schon alles. → **Create repository**.
4. Im Terminal im Projektordner (GitHub zeigt die Befehle auch an):

   ```bash
   git remote add origin https://github.com/EUER-NAME/jjj-fitness.git
   ```

   ```bash
   git push -u origin main
   ```

   Beim ersten Push fragt GitHub nach einer Anmeldung. Am einfachsten geht das mit der App [GitHub Desktop](https://desktop.github.com): Projektordner hinzufügen → «Publish repository».

## Schritt 2: Vercel mit GitHub verbinden

1. Auf [vercel.com](https://vercel.com) mit **Continue with GitHub** anmelden (Hobby-Plan, gratis).
2. **Add New… → Project** → beim Repository `jjj-fitness` auf **Import** klicken.
3. Vercel erkennt Vite automatisch:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Unter **Environment Variables** die Formspree-ID eintragen (siehe README, «Feedback-Formular verbinden»):
   - Name: `VITE_FORMSPREE_ID`
   - Value: eure ID, z.B. `abcdwxyz`
5. **Deploy** klicken. Nach ca. 1 Minute ist die Seite online.

## Schritt 3: Nach dem ersten Deployment

- [ ] Live-Adresse notieren: `https://______________________.vercel.app`
- [ ] In `index.html` bei `og:image` die volle Adresse eintragen, z.B. `https://jjj-fitness.vercel.app/og-image.png`. Dann committen und pushen.
- [ ] Alle Seiten auf der Live-Adresse durchklicken, besonders direkte Links wie `/uebungen/kreuzheben` neu laden.
- [ ] Feedback-Formular einmal echt testen
- [ ] Tests auf echten Handys machen und in `TESTPROTOKOLL.md` eintragen
- [ ] Lighthouse laufen lassen (Anleitung im Testprotokoll)

## Wie geht es danach weiter?

Jede Änderung, die ihr auf GitHub pusht, wird automatisch veröffentlicht:

```bash
git add -A
```

```bash
git commit -m "Texte auf Französisch verbessert"
```

```bash
git push
```

Für Pull Requests (Änderungsvorschläge) erstellt Vercel eine eigene **Vorschau-Adresse**. So kann das Team Änderungen anschauen, bevor sie live gehen.

## Warum funktionieren Unterseiten wie `/uebungen` direkt?

Die Datei `vercel.json` sagt Vercel: «Schick bei jeder Adresse die `index.html`». Danach entscheidet React Router im Browser, welche Seite angezeigt wird. Ohne diese Datei gäbe es beim Neuladen von `/uebungen` einen Fehler 404.
