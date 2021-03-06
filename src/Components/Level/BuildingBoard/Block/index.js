import React, { Component } from "react";
import { connect } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import TextBlock from "../TextBlock";
import * as actionCreators from "../../../../store/actions";
import * as Blocks from "../../../../Library/PiratesCode";

class Block extends Component {
  state = {
    bb: this.props.buildingBlocks
  };

  componentDidUpdate = prevProps => {
    if (prevProps.buildingBlocks !== this.props.buildingBlocks) {
      this.setState({ bb: this.props.buildingBlocks });
    }
  };

  deleteBlock = block => {
    let newBB = this.props.buildingBlocks.slice();
    let building = new Blocks.ChildBlock("building", "building");
    console.log("ABDULLAH : ", block);
    building.children = newBB;
    this.props.addInstruction(block, block.name);
    building.deleteChild(block.id);
    this.props.putTagBack(block);
    this.props.onSetBB(building.children);
  };

  render() {
    const { block, index, blocks } = this.props;

    return (
      <div
        className="bblockAnime card-body"
        style={{
          maxWidth: "400px",
          backgroundColor: "rgba(186, 108, 0, 0.5)",
          border: "2px solid rgb(109, 64, 2)",
          borderRadius: "10px"
        }}
      >
        <Droppable key={index} droppableId={`${block.name}-${index}`}>
          {provided => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="card-body"
            >
              <button
                style={{
                  color: "white",
                  backgroundColor: "#bc6f03",
                  backgroundImage:
                    "linear-gradient(315deg, #bc6f03 0%, #874000 74%)",

                  borderRadius: "10px"
                }}
                onClick={() => this.deleteBlock(block)}
              >
                <span>X</span>
              </button>
              <p
                className="card-text"
                style={{ color: "white", fontSize: "20px" }}
              >
                {"<" + block.name + ">"}
                <br />

                {block.children.map((child, cindex) => {
                  if (child.name === "text") {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="card-body"
                        style={{
                          maxWidth: "300px",
                          backgroundColor: "#f7f7f7",
                          border: "2px solid rgb(109, 64, 1)"
                        }}
                      >
                        <TextBlock
                          blocks={blocks}
                          block={block}
                          index={cindex}
                        />
                      </div>
                    );
                  }
                  return <div />;
                })}
              </p>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        {block.children.map((child, cindex) => {
          if (child.name !== "text") {
            return (
              <Block
                addInstruction={this.props.addInstruction}
                onSetBB={this.props.onSetBB}
                buildingBlocks={this.props.buildingBlocks}
                putTagBack={this.props.putTagBack}
                block={child}
                blocks={block.children}
                index={cindex}
              />
            );
          }
        })}
        <p style={{ color: "white", fontSize: "20px" }}>
          {"</" + block.name + ">"}
        </p>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDeleteBlock: block => dispatch(actionCreators.deleteBlock(block))
  };
};
export default connect(
  null,
  mapDispatchToProps
)(Block);
