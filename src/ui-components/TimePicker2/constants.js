import { Colors } from 'constants/constants';

export const TimeTickType = {
  OFFSET: 0,
  HOUR: 1,
  REGULAR: 2,
  SEPARATOR: 3
};

export const TimeTickStylesByType = {
  [TimeTickType.OFFSET]: {
    'min-height': '6.25%',
    'background-color': {
      'not-selected': 'none',
      'selected': 'none',
      'disabled': Colors.PRIMARY_RED_MEDIUM_SHADE
    },
    'border-bottom': {
      'not-active': `2px dashed ${Colors.PRIMARY_RED_MEDIUM_SHADE}`,
      'active': `2px dashed ${Colors.PRIMARY_RED}`
    },
  },

  [TimeTickType.HOUR]: {
    'min-height': '6.25%',
    'background-color': {
      'not-selected': 'none',
      'selected': Colors.PRIMARY_RED_LIGHT_SHADE,
      'disabled': Colors.PRIMARY_RED_MEDIUM_SHADE
    },
    'border-bottom': {
      'not-active': `2px dashed ${Colors.PRIMARY_RED_MEDIUM_SHADE}`,
      'active': `2px dashed ${Colors.PRIMARY_RED}`
    },
  },

  [TimeTickType.REGULAR]: {
    'min-height': '6.25%',
    'background-color': {
      'not-selected': 'none',
      'selected': Colors.PRIMARY_RED_LIGHT_SHADE
    },
    'border-bottom': {
      'not-active': `1px dashed ${Colors.PRIMARY_RED_LIGHT_SHADE}`,
      'active': `1px dashed ${Colors.PRIMARY_RED}`
    }
  },

  [TimeTickType.SEPARATOR]: {
    'min-height': '12.5%',
    'background-color': {
      'not-selected': Colors.PRIMARY_RED_DARK_SHADE,
      'selected': Colors.PRIMARY_RED
    },
    'border-bottom': {
      'not-active': `none`,
      'active': `none`
    }
  }
}

export const MINUTE_GRANULARITY = 15