import { describe, expect, it } from 'vitest';
import {
  getEditorPathForSelection,
  getEditorSelectionFromSearch,
  getMappingIdFromSelection,
  getSelectionFromMappingId,
} from './editorRouting';

describe('editor mapping URL helpers', () => {
  it('resolves a valid mapping id to an editor selection', () => {
    expect(getSelectionFromMappingId('button-feedback-error')).toEqual({
      component: 'button',
      dimension: 'feedback',
      subcategory: 'error',
    });
  });

  it('returns null for invalid or empty mapping ids', () => {
    expect(getSelectionFromMappingId('does-not-exist')).toBeNull();
    expect(getSelectionFromMappingId('')).toBeNull();
    expect(getSelectionFromMappingId(null)).toBeNull();
  });

  it('reads the mapping id from an editor query string', () => {
    expect(
      getEditorSelectionFromSearch('?mapping=toast-feedback-warning'),
    ).toEqual({
      component: 'toast',
      dimension: 'feedback',
      subcategory: 'warning',
    });
  });

  it('creates a shareable editor path for supported selections', () => {
    expect(
      getEditorPathForSelection({
        component: 'modal',
        dimension: 'direction',
        subcategory: 'backEnter',
      }),
    ).toBe('/editor?mapping=modal-direction-backEnter');
  });

  it('falls back to the bare editor path for unsupported selections', () => {
    expect(
      getEditorPathForSelection({
        component: 'toggle',
        dimension: 'hierarchy',
        subcategory: 'toForeground',
      }),
    ).toBe('/editor');
  });

  it('derives the mapping id from a supported selection', () => {
    expect(
      getMappingIdFromSelection({
        component: 'skeleton',
        dimension: 'attention',
        subcategory: 'loading',
      }),
    ).toBe('skeleton-attention-loading');
  });
});
