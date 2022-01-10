
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
         
          
    default:
      return state;
  }
}
