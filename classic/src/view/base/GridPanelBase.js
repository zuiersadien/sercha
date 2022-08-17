Ext.define("app.view.base.GridPanelBase", {
  extend: "Ext.grid.Panel",
  xtype: "gridpanelbase",
  store: {
    type: "invoices",
  },
  columns: [
    {
      dataIndex: "name",
      header: "User",
    },
    {
      dataIndex: "monto_venta",
      header: "Phone",
      width: 250,
    },
  ],
});


