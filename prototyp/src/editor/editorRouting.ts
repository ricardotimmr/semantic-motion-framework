import { getMapping, getMappingById } from '../framework/classifier';
import type { ComponentId, Dimension, Subcategory } from '../framework/types';
import { pagePaths } from '../pages/pageTypes';

export const EDITOR_MAPPING_QUERY_PARAM = 'mapping';

export type EditorRouteSelection = {
  component: ComponentId;
  dimension: Dimension;
  subcategory: Subcategory;
};

export function getSelectionFromMappingId(
  mappingId: string | null | undefined,
): EditorRouteSelection | null {
  if (mappingId === null || mappingId === undefined || !mappingId.trim()) {
    return null;
  }

  const entry = getMappingById(mappingId.trim());

  if (entry === null) {
    return null;
  }

  return {
    component: entry.component,
    dimension: entry.dimension,
    subcategory: entry.subcategory,
  };
}

export function getEditorSelectionFromSearch(
  search: string,
): EditorRouteSelection | null {
  const params = new URLSearchParams(search);

  return getSelectionFromMappingId(params.get(EDITOR_MAPPING_QUERY_PARAM));
}

export function getMappingIdFromSelection(
  selection: EditorRouteSelection,
): string | null {
  return getMapping(selection)?.id ?? null;
}

export function getEditorPathForSelection(selection: EditorRouteSelection) {
  const mappingId = getMappingIdFromSelection(selection);

  if (mappingId === null) {
    return pagePaths.editor;
  }

  const params = new URLSearchParams({
    [EDITOR_MAPPING_QUERY_PARAM]: mappingId,
  });

  return `${pagePaths.editor}?${params.toString()}`;
}
