namespace Flexagonator {
  describe('getAsLeafTrees', () => {
    it('should make a flexagon that returns the original trees', () => {
      const trees: LeafTree[] = [1, [2, 3], [[4, 5], [6, 7]]];
      const flexagon = makeFlexagon(trees);
      const result = flexagon.getAsLeafTrees();
      for (var i in result) {
        expect(areEqual(result[i], trees[i])).toBeTruthy();
      }
    });
  });

  describe('getTopIds', () => {
    it('should return the tops of the top leaves', () => {
      const trees: LeafTree[] = [1, [-2, 3], [[4, 5], [6, -7]]];
      const flexagon = makeFlexagon(trees);
      const result = flexagon.getTopIds();
      expect(result[0]).toBe(1);
      expect(result[1]).toBe(-2);
      expect(result[2]).toBe(4);
    });
  });

  describe('getBottomIds', () => {
    it('should return the bottoms of the bottom leaves', () => {
      const trees: LeafTree[] = [1, [-2, 3], [[4, 5], [6, -7]]];
      const flexagon = makeFlexagon(trees);
      const result = flexagon.getBottomIds();
      expect(result[0]).toBe(-1);
      expect(result[1]).toBe(-3);
      expect(result[2]).toBe(7);
    });
  });
}
