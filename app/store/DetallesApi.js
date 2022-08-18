Ext.define('MyApp.store.DetallesApi',{
  extend:'Ext.data.Store',
  alias:'store.DetallesApi',
  proxy:{
    type:'ajax',
    url:'http://localhost:7000/tasks/detalles',
    actionMethods: {
      read: 'GET',
      destroy: 'DELETE'
  },
  autoSync:true,
  
    
  },
  autoLoad:true
})