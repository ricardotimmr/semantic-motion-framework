import { describe, expect, it } from 'vitest';
import { getPageFromPath, getPagePath, pageOrder, pagePaths } from './pageTypes';

describe('page routing helpers', () => {
  it('maps all page ids to stable clean paths', () => {
    expect(pagePaths).toEqual({
      startseite: '/',
      editor: '/editor',
      frameworkKarte: '/framework-karte',
      ueberDasProjekt: '/ueber-das-projekt',
    });
  });

  it('resolves clean paths back to page ids', () => {
    for (const page of pageOrder) {
      expect(getPageFromPath(getPagePath(page))).toBe(page);
    }
  });

  it('normalizes trailing slashes and falls back to the start page', () => {
    expect(getPageFromPath('/editor/')).toBe('editor');
    expect(getPageFromPath('/framework-karte/')).toBe('frameworkKarte');
    expect(getPageFromPath('/does-not-exist')).toBe('startseite');
  });
});
