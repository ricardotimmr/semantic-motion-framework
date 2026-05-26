/**
 * Semantic Motion Framework – Classifier
 *
 * Funktionen zur Abfrage der Mapping-Datenbank.
 * Alle Zugriffe auf mappings.ts laufen über dieses Modul.
 *
 * Der Classifier erzwingt die Unterscheidung zwischen dem, was das Typsystem
 * erlaubt (types.ts), und dem, was das Framework tatsächlich unterstützt (mappings.ts).
 * Nicht unterstützte Kombinationen geben null zurück statt einen Fehler zu werfen.
 */

import { mappings } from "../data/mapping";
import type {
  ComponentId,
  Dimension,
  Subcategory,
  MappingQuery,
  MappingResult,
  MappingDatabase,
} from "./types";

// ---------------------------------------------------------------------------
// Primäre Abfrage
// ---------------------------------------------------------------------------

/**
 * Gibt den Mapping-Eintrag für eine gegebene Komponenten-/Dimensions-/Subkategorie-
 * Kombination zurück, oder null wenn die Kombination nicht vom Framework unterstützt wird.
 *
 * Dies ist die Hauptfunktion, die vom Editor und den Vorschau-Komponenten verwendet wird.
 *
 * @example
 * const entry = getMapping({
 *   component: "button",
 *   dimension: "feedback",
 *   subcategory: "error",
 * });
 * // → MappingEntry | null
 */
export function getMapping(query: MappingQuery): MappingResult {
  const { component, dimension, subcategory } = query;

  const entry = mappings.find(
    (m) =>
      m.component === component &&
      m.dimension === dimension &&
      m.subcategory === subcategory
  );

  return entry ?? null;
}

/**
 * Komfort-Überladung: die drei Felder direkt statt als Abfrageobjekt übergeben.
 *
 * @example
 * const entry = getMappingFor("button", "feedback", "error");
 */
export function getMappingFor(
  component: ComponentId,
  dimension: Dimension,
  subcategory: Subcategory
): MappingResult {
  return getMapping({ component, dimension, subcategory });
}

// ---------------------------------------------------------------------------
// Gefilterte Abfragen
// ---------------------------------------------------------------------------

/**
 * Gibt alle Mapping-Einträge für eine gegebene Komponente zurück.
 * Wird verwendet, um die Dimensions-/Subkategorie-Auswahlfelder in der Editor-Oberfläche zu befüllen.
 */
export function getMappingsForComponent(
  component: ComponentId
): MappingDatabase {
  return mappings.filter((m) => m.component === component);
}

/**
 * Gibt alle Mapping-Einträge für eine gegebene Komponente und Dimension zurück.
 * Wird verwendet, um den Subkategorie-Selektor zu befüllen, nachdem eine Dimension gewählt wurde.
 */
export function getMappingsForDimension(
  component: ComponentId,
  dimension: Dimension
): MappingDatabase {
  return mappings.filter(
    (m) => m.component === component && m.dimension === dimension
  );
}

/**
 * Gibt alle eindeutigen Dimensionen zurück, die für eine gegebene Komponente verfügbar sind.
 * Erhält die Reihenfolge des ersten Auftretens in der Datenbank.
 */
export function getDimensionsForComponent(
  component: ComponentId
): Dimension[] {
  const seen = new Set<Dimension>();
  const result: Dimension[] = [];

  for (const entry of mappings) {
    if (entry.component === component && !seen.has(entry.dimension)) {
      seen.add(entry.dimension);
      result.push(entry.dimension);
    }
  }

  return result;
}

/**
 * Gibt alle eindeutigen Subkategorien für eine gegebene Komponente und Dimension zurück.
 * Erhält die Reihenfolge des ersten Auftretens in der Datenbank.
 */
export function getSubcategoriesForDimension(
  component: ComponentId,
  dimension: Dimension
): Subcategory[] {
  return mappings
    .filter((m) => m.component === component && m.dimension === dimension)
    .map((m) => m.subcategory);
}

// ---------------------------------------------------------------------------
// Validierung
// ---------------------------------------------------------------------------

/**
 * Gibt true zurück, wenn die gegebene Kombination vom Framework unterstützt wird.
 * Als Absicherung vor dem Aufruf von getMapping in Kontexten verwenden,
 * in denen ein null-Ergebnis unerwartet wäre.
 */
export function isSupportedCombination(
  component: ComponentId,
  dimension: Dimension,
  subcategory: Subcategory
): boolean {
  return getMapping({ component, dimension, subcategory }) !== null;
}

/**
 * Gibt alle nicht unterstützten Kombinationen zurück, die das Typsystem erlauben würde,
 * die aber nicht in der Mapping-Datenbank vorhanden sind.
 *
 * Wird in Unit-Tests verwendet, um bewusste Lücken im Framework-Scope zu dokumentieren.
 * Wird nicht im Produktionscode verwendet.
 */
export function getUnsupportedCombinations(): MappingQuery[] {
  const allComponents: ComponentId[] = ["button", "toggle", "toast", "modal", "input", "skeleton"];
  const allDimensions: Dimension[] = ["feedback", "stateChange", "direction", "hierarchy", "attention"];

  const unsupported: MappingQuery[] = [];

  for (const component of allComponents) {
    for (const dimension of allDimensions) {
      const entries = getMappingsForDimension(component, dimension);
      if (entries.length === 0) {
        // Diese Komponenten-/Dimensions-Kombination hat überhaupt keine Einträge.
        // Das subcategory-Feld dient als Platzhalter.
        unsupported.push({
          component,
          dimension,
          subcategory: "success", // Platzhalter; jede Subkategorie würde null zurückgeben
        });
      }
    }
  }

  return unsupported;
}

// ---------------------------------------------------------------------------
// Datenbankinspektion
// ---------------------------------------------------------------------------

/**
 * Gibt die Gesamtanzahl der Einträge in der Mapping-Datenbank zurück.
 */
export function getMappingCount(): number {
  return mappings.length;
}

/**
 * Gibt alle Einträge in der Datenbank zurück.
 * Sparsam verwenden – die gefilterten Abfragen oben bevorzugen.
 */
export function getAllMappings(): MappingDatabase {
  return mappings;
}

/**
 * Gibt einen Mapping-Eintrag anhand seines id-Felds zurück.
 * Nützlich für direkte Abfragen während der Entwicklung und beim Testen.
 *
 * @example
 * const entry = getMappingById("button-feedback-error");
 */
export function getMappingById(id: string): MappingResult {
  return mappings.find((m) => m.id === id) ?? null;
}
