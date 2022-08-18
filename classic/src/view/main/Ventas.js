Ext.define("MyApp.view.main.Ventas", {
  extend: "Ext.grid.Panel",
  xtype: "ventas",

  requires: ["MyApp.store.VentasApi"],

  title: "Personnel",
  iconCls: "x-fa fa-qrcode",
  collapsible: true,

  tools: [
    {
      type: "refresh",
      tooltip: "Refresh data",
      handler: function (data) {
        Ext.Msg.alert("system");
      },
    },
  ],
  tbar: [
    {
      text: "Add new row",
      iconCls: "x-fa fa-plus-circle",
      handler: function () {
        let form = Ext.create("Ext.form.Panel", {
          itemId: "postForm",
          title: "Nueva venta",

          url: "someURLGenerated",
          standardSubmit: true,

          //some form values added here
          items: [
            {
              xtype: "textfield",
              flex: 10,

              padding: 10,

              name: "producto",
              dataIndex: "tra_nom",

              fieldLabel: "producto",
            },
            {
              xtype: "textfield",
              flex: 10,
              padding: 10,
              name: "cliente",

              fieldLabel: "cliente",
            },
            {
              xtype: "textfield",
              flex: 10,
              padding: 10,

              name: "fecha",
              fieldLabel: "fecha",
            },
            {
              xtype: "panel",
              html: '<div style="width: 100%; height: 40px;background-color:#5fa2dd;display: flex;justify-content:center;align-items:center;font-size:20px;color:white;text-align:center">Detalles</div>',
            },
            
            {
              xtype: "textfield",
              flex: 10,
              padding: 10,
              name: "unidad",

              fieldLabel: "unidad",
            },
            {
              xtype: "textfield",
              flex: 10,
              padding: 10,

              name: "cantidad",
              fieldLabel: "cantidad",
            },
          ],
          buttons: [
            {
              text: "guardar venta",
              handler: function (btn) {
                var data = this.up("form");
                Ext.Msg.confirm(
                  "porfavor confirme",
                  "esta seguro de confirmar esta venta?",
                  function (res) {
                    if (res == "yes") {
                      

                      fetch(`http://localhost:7000/tasks/`, {
                        method: "POST", // or "PUT" with the url changed to, e.g "https://reqres.in/api/users/2"
                        headers: {
                          "Content-type": "application/json",
                        },
                        body: JSON.stringify({
                          v_d_pro: data.getForm().getValues().producto,
                          ven_cli: data.getForm().getValues().cliente,
                          ven_mon: data.getForm().getValues().fecha,
                          v_d_uni: data.getForm().getValues().unidad,
                          v_d_can: data.getForm().getValues().cantidad,
                          v_d_tot: data.getForm().getValues().cantidad*data.getForm().getValues().unidad,
                          
                          }),
                      }).then((res) => window.location.reload());
                    }
                  }
                );
              },
            },
          ],
        });
        let formDetalles = Ext.create("Ext.form.Panel", {
          itemId: "postForm",
          title: "detalles",

          url: "someURLGenerated",
          standardSubmit: true,

          //some form values added here
          items: [
            {
              xtype: "textfield",
              flex: 10,

              padding: 10,

              name: "producto",
              dataIndex: "tra_nom",

              fieldLabel: "producto",
            },
            {
              xtype: "textfield",
              flex: 10,
              padding: 10,
              name: "cliente",

              fieldLabel: "cliente",
            },
            {
              xtype: "textfield",
              flex: 10,
              padding: 10,

              name: "monto",
              fieldLabel: "monto",
            },
            {
              xtype: "panel",
              html: '<div style="width: 100%; height: 40px;background-color:#5fa2dd;display: flex;justify-content:center;align-items:center;">hello</div>',
            },
            {
              xtype: "textfield",
              flex: 10,
              padding: 10,

              name: "detalles",
              fieldLabel: "detalles",
            },
            {
              xtype: "textfield",
              flex: 10,
              padding: 10,
              name: "unidad",

              fieldLabel: "unidad",
            },
            {
              xtype: "textfield",
              flex: 10,
              padding: 10,

              name: "cantidad",
              fieldLabel: "cantidad",
            },
            {
              xtype: "textfield",
              flex: 10,
              padding: 10,

              name: "total",
              fieldLabel: "total",
            },
          ],
          
        });
        Ext.create("Ext.window.Window", {
          title: "bienvenido",
          height: 600,
          width: 400,
          layout: "fit",
          items: form,
          padding: 10,
        }).show();
      },
    },
    
  ],
  store: {
    type: "VentasApi",
  },

  selModel: {
    type: "checkboxmodel",
    mode: "MULTI",
    injectCheckbox: 1,
  },
  // plugins: {
  //   cellediting: {
  //     clicksToEdit: 1,
  //   },
  // },
  columns: [
    {
      xtype: "actioncolumn",
      width: 50,
      items: [
        {
          iconCls: "x-fa fa-trash",
          tooltip: "Press to delete",
          handler: function (grid, rowindex) {
            let rec = grid.store.getAt(rowindex);
            Ext.Msg.confirm("please confirm", "are u sure?", function (res) {
              if (res == "yes") {
                grid.store.remove(rec);
                console.log(rec.data.v_d_ide);

                fetch(`http://localhost:7000/tasks/${rec.data.v_d_ide}`, {
                  method: "DELETE",
                }).then(() => console.log("hola"));
              }
            });
          },
        },
      ],
    },
    {
      xtype: "actioncolumn",
      width: 50,
      items: [
        {
          iconCls: "x-fa fa-list",
          tooltip: "mostrar detalles",
          handler: function (grid, rowindex) {
            let rec = grid.store.getAt(rowindex);
            // Ext.Msg.confirm("please confirm", "are u sure?", function (res) {
            //   if (res == "yes") {
            //     grid.store.remove(rec);
            //     console.log(rec.data.tra_ide);

            //     fetch(`http://localhost:7000/tasks/${rec.data.tra_ide}`, {
            //       method: "DELETE",
            //     }).then(() => console.log("hola"));
            //   }
            // });
          },
        },
      ],
    },
    {
      xtype: "actioncolumn",
      width: 50,

      items: [
        {
          iconCls: "x-fa fa-pen",
          tooltip: "Press to edit",
          handler: function (grid, rowindex) {
            let rec = grid.store.getAt(rowindex);
                console.log( rec.data)
            let form = Ext.create("Ext.form.Panel", {
              itemId: "postForm",
              title: "Editar venta",

              url: "someURLGenerated",
              standardSubmit: true,

              //some form values added here
              items: [
                {
                  xtype: "textfield",
                  flex: 10,

                  padding: 10,

                  name: "producto",
                  dataIndex: "tra_nom",
                  value: rec.data.v_d_pro,
                  fieldLabel: "producto",
                },
                {
                  xtype: "textfield",
                  flex: 10,
                  padding: 10,
                  name: "cliente",
                  value: rec.data.ven_cli,
                  fieldLabel: "cliente",
                },
                {
                  xtype: "textfield",
                  flex: 10,
                  padding: 10,
                  value: rec.data.ven_mon,
                  name: "fecha",
                  fieldLabel: "fecha",
                },
                {
                  xtype: "panel",
                  html: '<div style="width: 100%; height: 40px;background-color:#5fa2dd;display: flex;justify-content:center;align-items:center;font-size:20px;color:white;text-align:center">Detalles</div>',
                },
                {
                  xtype: "textfield",
                  flex: 10,
                  padding: 10,
                  name: "unidad",
                  value: rec.data.v_d_uni,
                  fieldLabel: "unidad",
                },
                {
                  xtype: "textfield",
                  flex: 10,
                  padding: 10,
                  value: rec.data.v_d_can,
                  name: "cantidad",
                  fieldLabel: "cantidad",
                },
              ],
              buttons: [
                {
                  text: "actualizar datos",
                  handler: function (btn) {
                    var data = this.up("form");
                    console.log(rec.data.tra_ide);
                    rec.data.code = 10;
                    Ext.Msg.confirm(
                      "porfavor confirme",
                      "esta seguro de actualizar?",
                      function (res) {
                        if (res == "yes") {
                          grid.store.remove(rec);
                          console.log(rec.data.v_d_ide);

                          fetch(
                            `http://localhost:7000/tasks/${rec.data.v_d_ide}`,
                            {
                              method: "PUT", // or "PUT" with the url changed to, e.g "https://reqres.in/api/users/2"
                              headers: {
                                "Content-type": "application/json",
                              },
                              body: JSON.stringify({
                                v_d_pro: data.getForm().getValues().producto,
                                ven_cli: data.getForm().getValues().cliente,
                                ven_mon: data.getForm().getValues().fecha,
                                v_d_uni: data.getForm().getValues().unidad,
                                v_d_can: data.getForm().getValues().cantidad,
                                v_d_tot: data.getForm().getValues().cantidad*data.getForm().getValues().unidad,
                              }),
                            }
                          ).then((res) => window.location.reload());
                        }
                      }
                    );
                  },
                },
              ],
            });
            Ext.create("Ext.window.Window", {
              title: "bienvenido",
              height: 500,
              width: 400,
              layout: "fit",
              items: form,
              padding: 10,
            }).show();
          },
        },
      ],
    },
    {
      flex: 1,
      text: "id",
      dataIndex: "v_d_ide",
    },
    {
      text: "FECHA",
      flex: 1,
      dataIndex: "ven_mon",
    },
    {
      text: "CLIENTE",
      flex: 1,
      dataIndex: "ven_cli",
    },
    {
      text: "PRODUCTO",
      dataIndex: "v_d_pro",
      flex: 1,
    },
    {
      text: "UNIDAD",
      dataIndex: "v_d_uni",
      flex: 1,
    },
    {
      text: "CANTIDAD",
      dataIndex: "v_d_can",
      flex: 1,
    },
    {
      text: "TOTAL",
      dataIndex: "v_d_tot",
      flex: 1,
    },
  ],

  // listeners: {

  // },
});
