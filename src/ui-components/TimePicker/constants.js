import { Colors } from 'constants/constants';

export const daysList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const TimeTickType = {
  OFFSET: 0,
  HOUR: 1,
  REGULAR: 2
};


export const TimeTickStylesByType = {
  [TimeTickType.OFFSET]: {
    'min-height': {
      5: '6%',
      10: '6%',
      15: '6%',
      20: '6%',
      30: '6%'
    },
    'background-color': {
      'not-selected': 'none',
      'selected': 'none'
    },
    'border-bottom': {
      'not-active': `2px dashed ${Colors.PRIMARY_RED_MEDIUM_SHADE}`,
      'active': `2px dashed ${Colors.PRIMARY_RED}`
    },
  },

  [TimeTickType.HOUR]: {
    'min-height': {
      5: '2.75%',
      10: '5.50%',
      15: '8.25%',
      20: '11%',
      30: '16.5%' 
    },
    'background-color': {
      'not-selected': 'none',
      'selected': Colors.PRIMARY_RED_LIGHT_SHADE
    },
    'border-bottom': {
      'not-active': `2px dashed ${Colors.PRIMARY_RED_MEDIUM_SHADE}`,
      'active': `2px dashed ${Colors.PRIMARY_RED}`
    },
  },

  [TimeTickType.REGULAR]: {
    'min-height': {
      5: '2.75%',
      10: '5.50%',
      15: '8.25%',
      20: '11%',
      30: '16.5%' 
    },
    'background-color': {
      'not-selected': 'none',
      'selected': Colors.PRIMARY_RED_LIGHT_SHADE
    },
    'border-bottom': {
      'not-active': `1px dashed ${Colors.PRIMARY_RED_LIGHT_SHADE}`,
      'active': `1px dashed ${Colors.PRIMARY_RED}`
    }
  }
}