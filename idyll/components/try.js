"use strict";
const React = require('react');

/**
 * An experiment
 * props {
 *  numPats     create a new flexagon with the given number of pats
 *  script      a flexagonator script to run
 *  width       width of canvas to draw in
 *  height      height of canvas to draw in
 * }
 * state {
 *  fm          current FlexagonManager encapsulating Flexagon, History, etc.
 * }
 */

class Try extends React.Component {
  constructor(props) {
    super(props);

    var fm = Flexagonator.runScriptItem(null, { numPats: props.numPats });
    this.state = { fm: fm };
  }

  componentDidMount() {
    Flexagonator.drawEntireFlexagon(this.refs.canvas, this.state.fm, { structure: true });
  }

  componentWillReceiveProps(props) {
    var script = this.buildScript(props);
    if (script.length) {
      var newstate = this.applyScript(script);
      if (newstate) {
        this.setState(newstate);
      }
    }
  }

  buildScript(props) {
    var script = [];

    if (props.numPats) {
      script = script.concat({ numPats: props.numPats });
      this.props.updateProps({ numPats: null });
    }
    if (props.script) {
      script = script.concat(props.script);
      this.props.updateProps({ script: null });
    }

    return script;
  }

  applyScript(script) {
    var fm = Flexagonator.runScript(this.state.fm, script);
    if (Flexagonator.isFlexError(fm)) {
      return null;
    }
    Flexagonator.drawEntireFlexagon(this.refs.canvas, fm, { structure: true });
    return { fm: fm };
  }

  render() {
    const { width, height } = this.props;
    return (
      <canvas ref="canvas" width={width} height={height} />
    );
  }
}


module.exports = Try;

