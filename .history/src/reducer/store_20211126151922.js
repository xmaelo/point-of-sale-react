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
    case 'CMD':
      const orders = state.orders
      const ordersSlice = state.orders
      const orders2 = action.orders

      for (let index = 0; index < orders2.length; index++) {
        const elt = orders2[index];
        if(!orders.find(elt => elt.id === order.id)){
          ordersSlice.push(order)
        }else{
          continue
        } 
      }
      ordersSlice.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())

      return { ...state, orders: ordersSlice };
    case 'NEW_ORDER':
      (async function(){
        const order = await onOrder(action.random)
        const orders = state.orders
        const ordersSlice = state.orders
        
        for (let index = 0; index < orders.length; index++) {
          const elt = orders[index];
          if(!orders.find(elt => elt.id === order.id)){
            ordersSlice.push(order)
          }else{
            continue
          } 
        }
        ordersSlice.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())

        return { ...state, orders: ordersSlice };
      })()
    default:
      return state;
  }
}
