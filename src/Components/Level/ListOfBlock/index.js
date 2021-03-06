import React, { Component } from "react";
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";

import ReactTooltip from "react-tooltip";

// Connection with redux centeral store
import * as actionTypes from "../../../store/actions";
import { connect } from "react-redux";

class ListOfBlock extends Component {
  state = {
    tags: []
  };

  componentDidMount = () => {
    this.setState({
      tags: this.props.tags
    });
  };

  componentDidUpdate = prevProps => {
    if (prevProps.tags !== this.props.tags) {
      this.setState({
        tags: this.props.tags
      });
    }
  };

  render() {
    console.log("ListOfBlocks -> mount", this.state.tags);
    return (
      <Droppable droppableId="list" direction="horizontal">
        {provided => (
          <div
            className="col-12 list-tags-container"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {this.state.tags &&
              this.state.tags.map((tag, index) => (
                <Draggable
                  draggableId={`${tag.id}-${index}`}
                  index={index}
                  key={tag.id}
                >
                  {provided => (
                    <div
                      className="blockAnime alert tag-block mr-4 "
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      // data-tip={tag.tip}
                    >
                      {tag.content}
                      {/* <ReactTooltip /> */}
                    </div>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  }
}

const mapStateToProps = state => ({
  levels: state.levelsReducer.levels
});

export default connect(mapStateToProps)(ListOfBlock);
