/**
 * Semantic Motion Framework – Classifier
 *
 * Funktionen zur Abfrage der Mapping-Datenbank.
 * Alle Zugriffe auf mapping.ts laufen über dieses Modul.
 *
 * Der Classifier erzwingt die Unterscheidung zwischen dem, was das Typsystem
 * benennt (types.ts), und dem, was das Framework tatsächlich abdeckt (mapping.ts).
 * Out-of-Scope-Kombinationen geben null zurück statt einen Fehler zu werfen.
 */

import { mappings } from "../data/mapping";
import {
  COMPONENT_IDS,
  DIMENSIONS,
  SUBCATEGORIES_BY_DIMENSION,
} from "./types";
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
 * Gibt alle theoretisch definierten Komponenten zurück.
 * Der Editor kann diese Liste verwenden, um auch Out-of-Scope-Optionen sichtbar,
 * aber deaktiviert darzustellen.
 */
export function getDefinedComponents(): readonly ComponentId[] {
  return COMPONENT_IDS;
}

/**
 * Gibt alle theoretisch definierten Bedeutungsdimensionen zurück.
 */
export function getDefinedDimensions(): readonly Dimension[] {
  return DIMENSIONS;
}

/**
 * Gibt alle theoretisch definierten Subkategorien einer Dimension zurück.
 */
export function getDefinedSubcategoriesForDimension(
  dimension: Dimension
): readonly Subcategory[] {
  return SUBCATEGORIES_BY_DIMENSION[dimension];
}

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
 * Gibt alle Komponenten zurück, die mindestens einen Mapping-Eintrag besitzen.
 * Erhält die Reihenfolge der theoretischen Komponentenliste.
 */
export function getSupportedComponents(): ComponentId[] {
  return COMPONENT_IDS.filter((component) =>
    mappings.some((m) => m.component === component)
  );
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
 * Gibt alle Kombinationen zurück, die theoretisch benennbar sind,
 * aber bewusst nicht Teil der Mapping-Datenbank sind.
 *
 * Diese Funktion ist ein Analyse-/Dokumentationswerkzeug, nicht die Grundlage
 * der Editor-Auswahl. Die Editor-UI sollte verfügbare Optionen datenbankgetrieben
 * aktivieren und Out-of-Scope-Optionen höchstens ausgegraut darstellen.
 */
export function getOutOfScopeCombinations(): MappingQuery[] {
  const outOfScope: MappingQuery[] = [];

  for (const component of COMPONENT_IDS) {
    for (const dimension of DIMENSIONS) {
      for (const subcategory of SUBCATEGORIES_BY_DIMENSION[dimension]) {
        const query = { component, dimension, subcategory };
        if (!isSupportedCombination(component, dimension, subcategory)) {
          outOfScope.push(query);
        }
      }
    }
  }

  return outOfScope;
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
