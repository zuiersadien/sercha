Ext.define("MyApp.view.main.Ventas", {
  extend: "Ext.grid.Panel",
  xtype: "ventas",

  requires: ["MyApp.store.ExtraApi"],

  title: "Personnel",
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
      text:'Add new row',
      iconCls:'x-fa fa-plus-circle',
      handler: function( ) {
        
       
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
              xtype: 'panel',
              html: '<div style="width: 100%; height: 40px;background-color:#5fa2dd;display: flex;justify-content:center;align-items:center;font-size:20px;color:white;text-align:center">Detalles</div>'
            },{
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
            }
            
  
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
                      function onAddClick  () {
                          
                        var view = this.getView(),
                            rec = new KitchenSink.model.grid.Plant({
                                common: '',
                                light: 'Mostly Shady',
                                price: 0,
                                availDate: Ext.Date.clearTime(new Date()),
                                indoor: false
                            });

                        view.store.insert(0, rec);
                        console.log(view)
                        view.findPlugin('cellediting').startEdit(rec, 0);
                    }
                    onAddClick()

                      // fetch(`http://localhost:4000/tasks/`, {
                      //   method: "POST", // or "PUT" with the url changed to, e.g "https://reqres.in/api/users/2"
                      //   headers: {
                      //     "Content-type": "application/json",
                      //   },
                      //   body: JSON.stringify({
                      //     "tra_cod": data.getForm().getValues().codigo,
                      //     "tra_nom": data.getForm().getValues().nombre,
                      //     "tra_pat": data.getForm().getValues().apellidoP,
                      //     "tra_mat": data.getForm().getValues().apellidoM,
                      //     "est_ado": data.getForm().getValues().estado
                      //     }),
                      // }).then((res) => window.location.reload());
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
              xtype: 'panel',
              html: '<div style="width: 100%; height: 40px;background-color:#5fa2dd;display: flex;justify-content:center;align-items:center;">hello</div>'
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
          buttons: [
            {
              text: "crear nuevo trabajador",
              handler: function (btn) {
                var data = this.up("form");
                Ext.Msg.confirm(
                  "porfavor confirme",
                  "esta seguro de crear un nuevo trabajador?",
                  function (res) {
                    if (res == "yes") {
                      

                      fetch(`http://localhost:4000/tasks/`, {
                        method: "POST", // or "PUT" with the url changed to, e.g "https://reqres.in/api/users/2"
                        headers: {
                          "Content-type": "application/json",
                        },
                        body: JSON.stringify({
                          "tra_cod": data.getForm().getValues().codigo,
                          "tra_nom": data.getForm().getValues().nombre,
                          "tra_pat": data.getForm().getValues().apellidoP,
                          "tra_mat": data.getForm().getValues().apellidoM,
                          "est_ado": data.getForm().getValues().estado
                          }),
                      }).then((res) => window.location.reload());
                    }
                  }
                );
              },
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
      }

    },
    {
      text: 'Add Employee',
      handler: 'onAddClick'
  }
  ],
  store: {
    type: "extraApi",
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
      text: "id",
      dataIndex: "tra_ide",
    }
,
    {
      text: "producto",
      dataIndex: "tra_ide",
    },
    {
      text: "cliente",
      dataIndex: "tra_cod",
    },
    {
      text: "unidad",
      dataIndex: "tra_cod",
    },
    {
      text: "cantidad",
      dataIndex: "tra_cod",
    },
    {
      text: "detail",
      dataIndex: "tra_cod",
    },
    {
      text: "total",
      dataIndex: "tra_cod",
    },
    { text: "fecha", dataIndex: "tra_nom", flex: 1 },
    
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
                console.log(rec.data.tra_ide);

                fetch(`http://localhost:4000/tasks/${rec.data.tra_ide}`, {
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
            Ext.Msg.confirm("please confirm", "are u sure?", function (res) {
              if (res == "yes") {
                grid.store.remove(rec);
                console.log(rec.data.tra_ide);

                fetch(`http://localhost:4000/tasks/${rec.data.tra_ide}`, {
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
          iconCls: "x-fa fa-pen",
          tooltip: "Press to edit",
          handler: function (grid, rowindex) {
            let rec = grid.store.getAt(rowindex);

            let form = Ext.create("Ext.form.Panel", {
              itemId: "postForm",
              title: "Editar Personal",

              url: "someURLGenerated",
              standardSubmit: true,

              //some form values added here
              items: [
                {
                  xtype: "textfield",
                  flex: 10,
                  value: rec.data.tra_ide,
                  padding: 10,
                  disabled: true,
                  name: "id",
                  dataIndex: "tra_nom",

                  fieldLabel: "ID",
                },
                {
                  xtype: "textfield",
                  flex: 10,
                  padding: 10,
                  name: "codigo",
                  value: rec.data.tra_cod,
                  fieldLabel: "Code",
                },
                {
                  xtype: "textfield",
                  flex: 10,
                  padding: 10,
                  value: rec.data.tra_nom,
                  name: "nombre",
                  fieldLabel: "Nombre",
                },
                {
                  xtype: "textfield",

                  flex: 10,
                  padding: 10,
                  value: rec.data.tra_pat,
                  name: "apellidoP",
                  fieldLabel: "Apellido Paterno",
                },
                {
                  xtype: "textfield",
                  flex: 10,
                  padding: 10,
                  value: rec.data.tra_mat,
                  name: "apellidoM",
                  fieldLabel: "Apellido Materno",
                },
                {
                  xtype: "textfield",
                  flex: 10,
                  padding: 10,
                  value: rec.data.est_ado,
                  name: "estado",
                  fieldLabel: "estado",
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
                          console.log(rec.data.tra_ide);

                          // fetch(`http://localhost:4000/tasks/${rec.data.tra_ide}`, {
                          //   method: "PUT", // or "PUT" with the url changed to, e.g "https://reqres.in/api/users/2"
                          //   headers: {
                          //     "Content-type": "application/json",
                          //   },
                          //   body: JSON.stringify({
                          //     "tra_cod": data.getForm().getValues().codigo,
                          //     "tra_nom": data.getForm().getValues().nombre,
                          //     "tra_pat": data.getForm().getValues().apellidoP,
                          //     "tra_mat": data.getForm().getValues().apellidoM,
                          //     "est_ado": data.getForm().getValues().estado
                          //     }),
                          // }).then((res) => window.location.reload());
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
  ],

  // listeners: {

  // },
});
