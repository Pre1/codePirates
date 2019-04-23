import React, { Component } from "react";

import { withRouter, Link } from "react-router-dom";
import { findDOMNode } from "react-dom";
import { Button } from "react-bootstrap";

import ReactTooltip from "react-tooltip";
import assistant from "../../../assets/images/pirateBird.png";
import lightImg from "../../../assets/images/lightbulb.svg";

import * as actionCreators from "../../../store/actions";

import { connect } from "react-redux";
// import Sound from "react-sound";

Array.prototype.getRandom = function() {
  return this[Math.floor(Math.random() * this.length)];
};

const compactWhitespace = str => str.replace(/\s{2,}/g, " ");

class Instruction extends Component {
  state = {
    toolTip: false,

    instruct: [
      "أهلا بالقرصان الصغير",
      "ابدا اللعبة",
      " ضع القطع المناسبة في مكانها!"
    ],

    critics: [
      "حاول ان ترى تأثير بنائك على شاشة العرض",
      "رائع!",
      "آآآآرررررّّ",
      "وشرايك تضغط على الزر السفلي؟ آآررر",
      "غلطططط... امزح"
    ],

    // for level-specific instrucions
    lvlInstruct: [],

    currentInstruct: 0,

    // just for testing, it'll be removed later
    next: false
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextProps.lvlInstruction[0] === this.props.lvlInstruction[0]) {
  //     return false;
  //   }
  //   return true;
  // }

  async componentDidMount() {
    let id = this.props.match.params.levelID;
    // ReactTooltip.rebuild();

    await this.props.getGoals(id);

    let goals = this.props.goals;
    console.log("TCL: Instruction -> componentDidMount -> goals", goals);

    let { overlay, lvlInstruction } = await this.props;
    console.log(
      "TCL: Instruction -> componentDidMount -> lvlInstruction",
      lvlInstruction
    );

    if (!overlay) {
      ReactTooltip.show(findDOMNode(this.refs.instruct));
      setTimeout(() => {
        ReactTooltip.hide(findDOMNode(this.refs.instruct));

        let initial = [
          "أهلا بالقرصان الصغير",
          "ابدا اللعبة",
          " ضع القطع المناسبة في مكانها!"
        ];

        this.setState(prevState => ({
          // instruct: [...initial, ...lvlInstruction],
          instruct: lvlInstruction,
          currentInstruct: prevState.currentInstruct
        }));
      }, 4000);
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    let prevBuildingBlks = prevProps.buildingBlocks;
    let currentBuildingBlks = this.props.buildingBlocks;

    let prevStrHTML = compactWhitespace(
      prevBuildingBlks.map(elm => elm.compile()).join("")
    );
    let curStrHTML = compactWhitespace(
      currentBuildingBlks.map(elm => elm.compile()).join("")
    );

    console.log(
      "TCL: Instruction -> componentDidUpdate -> curStrHTML",
      curStrHTML
    );

    let { overlay, lvlInstruction } = await this.props;

    console.log(
      "TCL: Instruction -> componentDidUpdate -> lvlInstruction",
      lvlInstruction
    );
    let { instruct, currentInstruct, next } = this.state;

    // let goals = compactWhitespace(this.props.goals);

    // if (prevStrHTML !== curStrHTML && goals !== curStrHTML) {
    //   let { critics } = this.state;
    //   let say = critics.getRandom();
    //   this.setState({
    //     instruct: [say],
    //     currentInstruct: 0
    //   });
    // }

    // if (goals) {
    //   if (goals === curStrHTML) {
    //     this.props.resetGoals();

    //     this.setState({
    //       instruct: ["آحسنت لقد اجتزت المرحلة!"],
    //       currentInstruct: 0
    //     });
    //   }
    // }

    // check if the overlay is dism
    // if (!overlay && !next) {
    //   this.setState({ next: true });
    // }

    if (prevProps.lvlInstruction[0] !== lvlInstruction[0]) {
      console.log("Instruction =====================================");
      console.log(
        "TCL: Instruction -> componentDidUpdate -> prevProps.lvlInstruction[0]",
        prevProps.lvlInstruction
      );

      console.log(
        "TCL: Instruction -> componentDidUpdate -> lvlInstruction",
        lvlInstruction
      );
      console.log("Instruction =====================================");

      this.setState({
        instruct: lvlInstruction,
        currentInstruct: 0
      });
    }
    // The initial Instructions for the Level
    // or you if you want to pass multiple sentences in
    if (
      !overlay &&
      instruct[currentInstruct] &&
      currentInstruct <= instruct.length
    ) {
      console.log(
        "TCL: Instruction -> componentDidUpdate -> currentInstruct",
        currentInstruct
      );

      console.log(
        "TCL: Instruction -> componentDidUpdate -> instruct[currentInstruct]",
        instruct[currentInstruct]
      );
      ReactTooltip.show(findDOMNode(this.refs.instruct));

      setTimeout(() => {
        ReactTooltip.hide(findDOMNode(this.refs.instruct));

        this.setState({
          currentInstruct: currentInstruct + 1
        });
      }, 4000);
    }
    // else if (next && currentInstruct >= instruct.length) {
    //   this.setState({
    //     instruct: lvlInstruction,
    //     currentInstruct: 0
    //   });
    // }
  }

  toggleTip = () => {
    let { toolTip } = this.state;
    if (toolTip) ReactTooltip.hide(findDOMNode(this.refs.instruct));
    else {
      ReactTooltip.show(findDOMNode(this.refs.instruct));
    }

    this.setState({ toolTip: !toolTip });
  };
  render() {
    let { buildingBlocks } = this.props;
    let { instruct, currentInstruct } = this.state;

    return (
      <div>
        {/* <Button variant="dark" onClick={this.toggleTip}>
          debug
        </Button> */}
        <div onClick={() => this.props.toggleOverlay()}>
          <img
            id="instructBird"
            src={assistant}
            style={{ width: "100%", marginTop: "15%" }}
            // data-tip="أهلا بالقرصان الصغير"
            data-tip={instruct[currentInstruct]}
            alt="pirateBird-instruct"
            ref="instruct"
            data-place="top"
            // data-offset="{'left': -30, 'top': -50}"
            data-event="focus"
            data-for="instructBird"
            // data-tip
          />
          <ReactTooltip
            id="instructBird"
            // afterShow={}
            // afterHide={}
            // place="left"
            // offset={{ left: -50, top: 110 }}

            // getContent={[
            //   () => {
            //     return ["أهلا بالقرصان الصغير"];
            //   },
            //   1000
            // ]}
          />

          {/* <Button
            className="flex"
            style={{
              width: "20px",
              height: "20%",
              marginTop: "-20px",
              postion: "absolute"
            }}
          >

          </Button> */}
          <div style={{ position: "absolute", left: "5px", bottom: "5px" }}>
            <Link
              to={`/level/content`}
              style={{ color: "#fff", textDecoration: "none" }}
            >
              <button className="col-12 btn-light">
                <img src={lightImg} alt="light" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    buildingBlocks: state.mainReducer.buildingBlocks,
    goals: state.levelsReducer.currentGoals,
    lvlInstruction: state.levelsReducer.currentInstruction
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getGoals: id => dispatch(actionCreators.getLevelGoals(id)),
    setGoals: (id, goals) => dispatch(actionCreators.setLevelGoals(id, goals)),
    resetGoals: () => dispatch(actionCreators.resetLevelGoals())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Instruction)
);
