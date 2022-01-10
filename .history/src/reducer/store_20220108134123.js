
const defaultState = {
  username: null,
  role: {},
  header: '',
  user: null,
  tables: [],
  consommables: [],
  socket: null,
  orders: [],
  test: false,
  commission: 0,
  orders_caisse: []
};


export default function store(state = defaultState, action) {
  switch (action.type) {
    case 'SAVE_HEADER':
      return { ...state, header: action.token };
    case 'SAVE_USER':
      return { ...state, role: action.user.role, user: action.user };
    case 'SAVE_TABLE':
      return { ...state, tables: action.tables };
    case 'SAVE_CONSO':
      return { ...state, consommables: action.consommables };
    case 'SAVE_COM':
      return { ...state, commission: action.commission };
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
      
      ordersSlice.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
      const state_ = { ...state, orders: [...ordersSlice.filter(a => a.status?.task_name ==="en_attente")] }
      return state_;
    case 'CMD_CAISSE':
      const ordersx = [...state.orders]
      const ordersSlicex = ordersx
      const ordersy = action.orders

      for (let index = 0; index < ordersy.length; index++) {
        const order = ordersy[index];
        if(!orders.find(elt => elt.id === order.id)){
          ordersSlicex.push(order)
        }
      }
      
      ordersSlicex.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
      const state_x = { ...state, orders_caisse: [...ordersSlicex.filter(a => a.status?.task_name ==="valide")] }
      return state_x;
    case 'NEW_ORDER':
      const order = action.order
      let orders4 = [...state.orders]
      let newT = []
      if(orders4.length === 0){
        orders4.push(order)
      }
      else if(!orders4.find(elt => elt.id === order.id)){
        orders4.push(order)
      }else if(orders4.find(elt => elt.id === order.id)){
        newT = orders4.map(m =>{
          if(m.id === order.id){
            return {...order}
          }else{
            return {...m}
          }
        })
        orders4 = newT

      }

      orders4.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
      
      const state_2 = { ...state, orders: [...orders4.filter(a => a.status?.task_name ==="en_attente")] }
      console.log('-----------state_', state_2)
      return { ...state_2};
    case 'NEW_ORDER_CAISSE':
      const orderC = action.order
      let orders5 = [...state.orders_caisse]
      let newT = []
      if(orders5.length === 0){
        orders5.push(orderC)
      }
      else if(!orders5.find(elt => elt.id === orderC.id)){
        orders5.push(orderC)
      }else if(orders5.find(elt => elt.id === orderC.id)){
        newT = orders5.map(m =>{
          if(m.id === orderC.id){
            return {...orderC}
          }else{
            return {...m}
          }
        })
        orders5 = newT

      }

      orders5.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
      
      const state_22 = { ...state, orders_caisse: [...orders5.filter(a => a.status?.task_name ==="valide")] }
      console.log('-----------state_', state_22)
      return { ...state_22};
         
          
    default:
      return state;
  }
}
