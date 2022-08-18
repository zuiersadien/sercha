Ext.define('MyApp.store.VentasApi',{
  extend:'Ext.data.Store',
  alias:'store.VentasApi',
  proxy:{
    type:'ajax',
    root:"tasks",
    rootProperty: 'tasks',
    url:'http://localhost:7000/tasks',
    actionMethods: {
      read: 'GET',
      destroy: 'DELETE'
  },
  autoSync:true,
  
    
  },
  autoLoad:true
})