namespace Flexagonator {

  describe('namePiecesToScript', () => {
    it('should map leafShape to angles', () => {
      const name: NamePieces = { leafShape: 'bronze' };
      const [script, errors] = namePiecesToScript(name);
      expect(script.length).toBe(1);
      expect(errors.length).toBe(0);

      const angles = script[0].angles;
      if (angles === undefined) {
        fail('script[0].angles should exist');
      } else {
        expect(angles[0]).toBe(30);
        expect(angles[1]).toBe(60);
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
  });

  it('should map pinchFaces to flexes', () => {
    const name: NamePieces = { pinchFaces: 'penta' };
    const [script, errors] = namePiecesToScript(name);
    expect(script.length).toBe(1);
    expect(errors.length).toBe(0);

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
    expect(errors.length).toBe(0);

    const flexes = script[0].flexes;
    if (flexes === undefined) {
      fail('script[0].flexes should exist');
    } else {
      expect(flexes).toBe('F*>S*');
    }
  });

}
