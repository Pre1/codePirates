import React, { Component } from "react";
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";

import ReactTooltip from "react-tooltip";

// Connection with redux centeral store
import * as actionTypes from "../../../store/actions";
import { connect } from "react-redux";

class ListOfBlock extends Component {
  // onDragEnd = result => {
  //   const { destination, source, draggableId } = result;

  //   if (!destination) {
  //     return;
  //   }

  //   if (destination.droppableId === source.droppableId) {
  //     return;
  //   }
  // };
  render() {
    console.log("ListOfBlocks", this.props.tags);
    return (
      // <DragDropContext onDragEnd={this.onDragEnd}>
      <Droppable droppableId="list" direction="horizontal">
        {provided => (
          <div
            className="col-12 list-tags-container"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {this.props.tags &&
              this.props.tags.map((tag, index) => (
                <Draggable draggableId={tag.id} index={index} key={tag.id}>
                  {provided => (
                    <div
                      className="alert tag-block mr-4 "
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      data-tip={tag.tip}
                    >
                      {tag.content}
                      <ReactTooltip />
                    </div>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      // </DragDropContext>
    );
  }
}

const mapStateToProps = state => ({
  tags: state.mainReducer.tags
});

export default connect(mapStateToProps)(ListOfBlock);
