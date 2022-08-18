Ext.define("MyApp.view.main.VentasDetalle", {
  extend: "Ext.grid.Panel",
  xtype: "VentasDetalle",

  requires: ["MyApp.store.DetallesApi"],

  title: "",
  iconCls:'x-fa fa-qrcode',
  collapsible: true,
  tools:[{
    type:'refresh',
    tooltip:'Refresh data',
    handler: function(data) {
      Ext.Msg.alert('system')
    }
  }],
  tbar:[
    
    {
      text: 'info',
      handler: 'onAddClick'
  }
  ],
  store: {
    type: "DetallesApi",
  },
  selModel: {
    
  },
  // plugins: {
  //   cellediting: {
  //     clicksToEdit: 1,
  //   },
  // },
  columns: [
    {
      text: "v_d_pro",
      dataIndex: "v_d_pro",
      flex:1
      
    }
, 
    {
      text: "v_d_uni",
      dataIndex: "v_d_uni",
      flex:1
    },
    {
      text: "v_d_can",
      dataIndex: "v_d_can",
      flex:1
    },
    {
      text: "v_d_tot",
      dataIndex: "v_d_tot",
       flex:1
    },
   
    
    
  ],

  // listeners: {

  // },
});
