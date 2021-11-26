
const defaultState = {
  username: null,
  role: {},
  header: '',
  user: null,
  tables: [],
  consommables: [],
  socket: null,
  orders: [],
  test: false
};


export default function store(state = defaultState, action) {
  console.log('>>> *******_____________________:*********', action);
  switch (action.type) {
    case 'SAVE_HEADER':
      return { ...state, header: action.token };
    case 'SAVE_USER':
      return { ...state, role: action.user.role, user: action.user };
    case 'SAVE_TABLE':
      return { ...state, tables: action.tables };
    case 'SAVE_CONSO':
      return { ...state, consommables: action.consommables };
    case 'SAVE_SOCKET':
      return { ...state, socket: action.socket };
    case 'CMD':
      const orders = [...state.orders]
      const ordersSlice = orders
      const orders2 = action.orders

      for (let index = 0; index < orders2.length; index++) {
        const order = orders2[index];
        if(!orders.find(elt => elt.id === order.id)){
          ordersSlice.push(order)
        }
      }
      
      ordersSlice.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())
      const state_ = { ...state, orders: ordersSlice }
      return state_;
    case 'NEW_ORDER':
      const order = action.order
      const orders4 = [...state.orders]
      console.log('order order order>>', order)

      if(orders4.length === 0){
        orders4.push(order)
      }
      else if(!orders4.find(elt => elt.id === order.id)){
        orders4.push(order)
      }

      //orders4.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())
      
      const state_ = { ...state, orders: orders4 }
      console.log('-----------state_', state_)
      return { ...state_};
         
          
    default:
      return state;
  }
}
