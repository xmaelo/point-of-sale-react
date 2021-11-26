import { request_get } from "../config";

const defaultState = {
  username: null,
  role: {},
  header: '',
  user: null,
  tables: [],
  consommables: [],
  socket: null,
  orders: []
};


export default function store(state = defaultState, action) {
  console.log('>>> ****************', action);
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
      const orders = state.orders
      const ordersSlice = state.orders
      const orders2 = action.orders

      for (let index = 0; index < orders2.length; index++) {
        const order = orders2[index];
        if(!orders.find(elt => elt.id === order.id)){
          ordersSlice.push(order)
        }
      }
      
      console.log('ordersSlice ordersSlice', ordersSlice)
      ordersSlice.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())

      return { ...state, orders: ordersSlice };
    case 'NEW_ORDER':
        const order = action.order
        const orders4 = state.orders
        const newOrderSlice = state.orders

        if(orders4.length === 0){
          newOrderSlice.push(order)
        }
        else if(!orders4.find(elt => elt.id === order.id)){
          newOrderSlice.push(order)
        }

        newOrderSlice.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())

        return { ...state, orders: newOrderSlice };
    default:
      return state;
  }
}
