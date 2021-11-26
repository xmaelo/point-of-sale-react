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

async function onOrder(random){
   try {
     const res = await request_get('/commandes?page=1&random='+random)
     if(res&&res["hydra:member"]){
       return res["hydra:member"][0]
     }
   } catch (error) {
     
   }
}
export default function store(state = defaultState, action) {
  console.log('>>> *******Started redux here with this action:*********', action);
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
    case 'NEW_ORDER':
      (async function(){
        const order = await onOrder(action.random)
        const orders = state.orders
        orders.push(order)
        return { ...state, orders: orders };
      })()
    default:
      return state;
  }
}
