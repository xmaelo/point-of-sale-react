const defaultState = {
  username: null,
  role: {},
  header: '',
  user: null
};

export default function store(state = defaultState, action) {
  console.log('>>> *******Started redux here with this action:*********', action);
  switch (action.type) {
    case 'SAVE_HEADER':
      return { ...state, header: action.token };
    case 'SAVE_USER':
      return { ...state, role: action.user.role, user: action.user };
    default:
      return state;
  }
}
