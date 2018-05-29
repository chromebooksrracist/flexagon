namespace Flexagonator {

  describe('runScript.pats', () => {
    it('creates a flexagon manager from the pat structure of a flexagon', () => {
      const empty = makeFlexagon([0, 1, 2, 3]) as Flexagon;
      const fm1 = makeFlexagonManager(empty);

      const pats = [1, [2, 3], [4, [5, 6]], 7];
      const fm2 = RunScriptItem(fm1, { pats: pats }) as FlexagonManager;
      expect(areLTArraysEqual(pats, fm2.flexagon.getAsLeafTrees()));
    });
  });

}
