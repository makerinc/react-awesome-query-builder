import * as constants from '../constants';

/**
 * @param {object} config
 * @param {Immutable.List} path
 * @param {string} conjunction
 */
export const setConjunction = (config, path, conjunction) => ({
  type: constants.SET_CONJUNCTION,
  path: path,
  conjunction: conjunction
});

/**
 * @param {object} config
 * @param {Immutable.List} path
 * @param {bool} not
 */
export const setNot = (config, path, not) => ({
  type: constants.SET_NOT,
  path: path,
  not: not
});

/**
 * @param {object} config
 * @param {Immutable.List} path
 * @param {object} story
 */
export const setStory = (config, path, story) => ({
  type: constants.SET_STORY,
  path: path,
  story: story
});

/**
 * @param {object} config
 * @param {Immutable.List} path
 * @param {object} meta
 */
export const setMeta = (config, path, meta) => ({
  type: constants.SET_META,
  path: path,
  meta: meta
});
