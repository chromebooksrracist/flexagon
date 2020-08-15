namespace Flexagonator {

  describe('namePiecesToScript', () => {

    it('should map patsPrefix to numPats', () => {
      const name: NamePieces = { patsPrefix: 'tetradeca' };
      const [script, errors] = namePiecesToScript(name);
      expect(script.length).toBe(1);
      expect(errors.length).toBe(0);

      const numPats = script[0].numPats;
      if (numPats === undefined) {
        fail('script[0].numPats should exist');
      } else {
        expect(numPats).toBe(14);
      }
    });

    it('should complain if patsPrefix is urecognized', () => {
      const name = { patsPrefix: 'blah' };
      const [script, errors] = namePiecesToScript(name as NamePieces);
      expect(script.length).toBe(0);
      expect(errors.length).toBe(1);

      const error = errors[0];
      if (error === undefined) {
        fail('errors[0] should exist');
      } else {
        expect(error.nameError).toBe('unknown patsPrefix');
        expect(error.propValue).toBe('blah');
      }
    });

    it('should use overallShape with patsPrefix to set angles when pats meet in middle', () => {
      // triangular hexaflexagon
      const name: NamePieces = { overallShape: 'triangular', patsPrefix: 'hexa' };
      const [script, errors] = namePiecesToScript(name);
      expect(script.length).toBe(2);
      expect(errors.length).toBe(0);

      expect(script[0].numPats).toBe(6);
      const angles = script[1].angles;
      if (angles === undefined) {
        fail('script[1].angles should exist');
      } else {
        expect(angles[0]).toBe(60);
        expect(angles[1]).toBe(90);
      }
    });

    it('should use overallShape with patsPrefix to set angles for stars', () => {
      // star decaflexagon
      const name: NamePieces = { overallShape: 'star', patsPrefix: 'deca' };
      const [script, errors] = namePiecesToScript(name);
      expect(script.length).toBe(2);
      expect(errors.length).toBe(0);

      expect(script[0].numPats).toBe(10);
      const angles = script[1].angles;
      if (angles === undefined) {
        fail('script[1].angles should exist');
      } else {
        expect(angles[0]).toBe(36);
        expect(angles[1]).toBe(36);
      }
    });

    it('should use overallShape with patsPrefix to set angles for rings', () => {
      // star decaflexagon
      const name: NamePieces = { overallShape: 'decagonal ring', patsPrefix: 'pentadeca' };
      const [script, errors] = namePiecesToScript(name);
      expect(script.length).toBe(3);
      expect(errors.length).toBe(0);

      expect(script[0].numPats).toBe(15);
      const angles = script[1].angles;
      if (angles === undefined) {
        fail('script[1].angles should exist');
      } else {
        expect(angles[0]).toBe(63);
        expect(angles[1]).toBe(54);
      }
      const directions = script[2].directions;
      if (directions === undefined) {
        fail('script[2].directions should exist');
      } else {
        expect(directions.length).toBe(15);
        expect(directions[0]).toBe(true);
        expect(directions[1]).toBe(false);
      }
    });

    it('should use overallShape with patsPrefix and leafShape to set angles', () => {
      // star decaflexagon
      const name: NamePieces = { overallShape: 'hexagonal', patsPrefix: 'dodeca', leafShape: 'silver' };
      const [script, errors] = namePiecesToScript(name);
      expect(script.length).toBe(3);
      expect(errors.length).toBe(0);

      expect(script[0].numPats).toBe(12);
      const angles = script[1].angles;
      if (angles === undefined) {
        fail('script[1].angles should exist');
      } else {
        expect(angles[0]).toBe(45);
        expect(angles[1]).toBe(90); // note: different from default for 'silver flexagon'
      }
      const directions = script[2].directions;
      if (directions === undefined) {
        fail('script[2].directions should exist');
      } else {
        expect(directions.length).toBe(12);
        expect(directions[0]).toBe(false);
        expect(directions[1]).toBe(true);
      }
    });

    it('should map leafShape to angles', () => {
      const name: NamePieces = { leafShape: 'bronze' };
      const [script, errors] = namePiecesToScript(name);
      expect(script.length).toBe(1);
      expect(errors.length).toBe(1);

      const angles = script[0].angles;
      if (angles === undefined) {
        fail('script[0].angles should exist');
      } else {
        expect(angles[0]).toBe(30);
        expect(angles[1]).toBe(60);
      }

      const error = errors[0];
      if (error === undefined) {
        fail('errors[0] should exist');
      } else {
        expect(error.nameError).toBe('missing the number of pats');
      }
    });

    it('should complain if leafShape is urecognized', () => {
      const name = { leafShape: 'blah' };
      const [script, errors] = namePiecesToScript(name as NamePieces);
      expect(script.length).toBe(0);
      expect(errors.length).toBe(1);

      const error = errors[0];
      if (error === undefined) {
        fail('errors[0] should exist');
      } else {
        expect(error.nameError).toBe('unknown leafShape');
        expect(error.propValue).toBe('blah');
      }
    });

    it('should map pinchFaces to flexes', () => {
      const name: NamePieces = { pinchFaces: 'penta' };
      const [script, errors] = namePiecesToScript(name);
      expect(script.length).toBe(1);
      expect(errors.length).toBe(1);

      const flexes = script[0].flexes;
      if (flexes === undefined) {
        fail('script[0].flexes should exist');
      } else {
        expect(flexes).toBe('P*P*P*');
      }
    });

    it('should complain if pinchFlexes is invalid', () => {
      const name = { pinchFaces: 'blah' };
      const [script, errors] = namePiecesToScript(name as NamePieces);
      expect(script.length).toBe(0);
      expect(errors.length).toBe(1);

      const error = errors[0];
      if (error === undefined) {
        fail('errors[0] should exist');
      } else {
        expect(error.nameError).toBe('need at least 2 pinch faces');
        expect(error.propValue).toBe('blah');
      }
    });

    it('should prefer generator over pinchFaces', () => {
      const name: NamePieces = { generator: 'F*>S*', pinchFaces: 'icosa' };
      const [script, errors] = namePiecesToScript(name);
      expect(script.length).toBe(1);
      expect(errors.length).toBe(1);

      const flexes = script[0].flexes;
      if (flexes === undefined) {
        fail('script[0].flexes should exist');
      } else {
        expect(flexes).toBe('F*>S*');
      }
    });

    it('should complain if numPats and pats.length are different', () => {
      const name: NamePieces = { patsPrefix: 'tetra', pats: [0, 0, 0] };
      const [script, errors] = namePiecesToScript(name);
      expect(script.length).toBe(1);
      expect(errors.length).toBe(1);

      const error = errors[0];
      if (error === undefined) {
        fail('errors[0] should exist');
      } else {
        expect(error.nameError).toBe('numPats, pats, and directions should represent the same count');
      }
    });

  });
}
