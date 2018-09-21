'use strict';

exports.__esModule = true;
exports.setDragEnd = exports.setDragStart = exports.setDragProgress = undefined;

var _constants = require('../constants');

var constants = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// /**
//  * @param {Object} dragging
//  */
// export const setDragging = (dragging) => ({
//   type: constants.SET_DRAGGING,
//   dragging: dragging,
// });

// /**
//  * @param {Object} mousePos
//  */
// export const setMousePos = (mousePos) => ({
//   type: constants.SET_MOUSE_POS,
//   mousePos: mousePos,
// });

// /**
//  * @param {Object} dragStart
//  */
// export const setDragStart = (dragStart) => ({
//   type: constants.SET_DRAG_START,
//   dragStart: dragStart,
// });


/**
 * @param {Object} mousePos
 * @param {Object} dragging
 */
var setDragProgress = exports.setDragProgress = function setDragProgress(mousePos, dragging) {
  return {
    type: constants.SET_DRAG_PROGRESS,
    mousePos: mousePos,
    dragging: dragging
  };
};

/**
 * @param {Object} dragStart
 * @param {Object} dragging
 * @param {Object} mousePos
 */
var setDragStart = exports.setDragStart = function setDragStart(dragStart, dragging, mousePos) {
  return {
    type: constants.SET_DRAG_START,
    dragStart: dragStart,
    dragging: dragging,
    mousePos: mousePos
  };
};

/**
 *
 */
var setDragEnd = exports.setDragEnd = function setDragEnd() {
  return {
    type: constants.SET_DRAG_END
  };
};