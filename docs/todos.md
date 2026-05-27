# TODOs fuer Preview und Code-Export

Diese Datei sammelt offene technische Punkte, die beim spaeteren Einbinden des Frameworks in den Editor relevant werden.

## 1. Spring-Easing gesondert behandeln

Aktueller Zustand:

- In `types.ts` existiert `EASING_CURVES.spring` nur als Platzhalter.
- Spring darf spaeter nicht wie eine normale `cubic-bezier`-Kurve exportiert oder gerendert werden.

Framer-Motion-Preview und Framer-Motion-Export:

- Wenn `easing.preset === "spring"`:
  - nicht `EASING_CURVES.spring` verwenden
  - stattdessen `transition.type = "spring"` setzen
  - `springConfig` aus dem Mapping verwenden

Beispiel:

```ts
transition: {
  type: "spring",
  stiffness: entry.params.springConfig.stiffness,
  damping: entry.params.springConfig.damping,
  mass: entry.params.springConfig.mass,
}
```

CSS-Export:

- CSS unterstuetzt keine echte Spring-Physik nativ.
- Moegliche Loesungen:
  - Spring-Mappings im CSS-Export als eingeschraenkt markieren.
  - Spring naeherungsweise mit `cubic-bezier` approximieren.
  - Keyframes erzeugen, die den Overshoot grob nachbilden.

Empfehlung fuer den Prototyp:

- Framer Motion korrekt mit `springConfig` exportieren.
- CSS-Export bei Spring entweder mit Hinweis versehen oder bewusst approximieren.

## 2. Mehrphasige Toast-Error-Animation behandeln

Aktueller Zustand:

- `toast-feedback-error` ist zweiphasig:
  - y-Einfahrt von unten
  - x-Shake nach Ankunft
- Ein naiver `direction`/`keyframes`-Renderer reicht dafuer nicht aus, weil `direction: "y"` die Einfahrt beschreibt, die Keyframes aber den anschliessenden x-Shake.

Moegliche Loesungen:

- Sonderfall im Toast-Renderer fuer `toast-feedback-error`.
- Oder spaeter ein `stages`-Modell einfuehren, zum Beispiel:

```ts
stages: [
  { direction: "y", translateFrom: "bottom", translateDistance: "self", duration: 160 },
  { direction: "x", keyframes: { values: [0, -6, 6, -6, 6, 0], times: [...] }, duration: 160 },
]
```

Empfehlung fuer den Prototyp:

- Fuer die erste Editor-Implementierung reicht ein gezielter Sonderfall im Toast-Renderer.
- Das `stages`-Modell ist sauberer, aber erst sinnvoll, wenn mehrere mehrphasige Mappings entstehen.
