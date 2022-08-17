Ext.define('MyApp.store.ExtraApi',{
  extend:'Ext.data.Store',
  alias:'store.extraApi',
  proxy:{
    type:'ajax',
    url:'http://localhost:4000/tasks',
    actionMethods: {
      read: 'GET',
      destroy: 'DELETE'
  },
  autoSync:true,
  
    
  },
  autoLoad:true
})