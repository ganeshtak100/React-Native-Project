const initialState = {
  iconName: '',
};

export default (state = initialState, action) => {
  console.log('state', state, '==', action);
  switch (action.type) {
    case 'MIDLIST':
      return {
        ...state,
        iconName: action.action,
      };

    default:
      return state;
  }
};
