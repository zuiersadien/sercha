/**
 * This view is an example list of people.
 */
Ext.define("MyApp.view.main.List", {
  extend: "Ext.grid.Panel",
  xtype: "mainlist",

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
          title: "Editar Personal",

          url: "someURLGenerated",
          standardSubmit: true,

          //some form values added here
          items: [
            {
              xtype: "textfield",
              flex: 10,
              
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
              
              fieldLabel: "Code",
            },
            {
              xtype: "textfield",
              flex: 10,
              padding: 10,
             
              name: "nombre",
              fieldLabel: "Nombre",
            },
            {
              xtype: "textfield",

              flex: 10,
              padding: 10,
              
              name: "apellidoP",
              fieldLabel: "Apellido Paterno",
            },
            {
              xtype: "textfield",
              flex: 10,
              padding: 10,
              
              name: "apellidoM",
              fieldLabel: "Apellido Materno",
            },
            {
              xtype: "textfield",
              flex: 10,
              padding: 10,
              
              name: "estado",
              fieldLabel: "estado",
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
          height: 500,
          width: 400,
          layout: "fit",
          items: form,
          padding: 10,
        }).show();
      }

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
    { xtype: "rownumberer" },

    {
      text: "id",
      dataIndex: "tra_ide",
    },
    {
      text: "code",
      dataIndex: "tra_cod",
      // editor: {
      //   xtype: 'textfield',
      //   allowBlank: false,

      // },
    },
    { text: "Nombre", dataIndex: "tra_nom", flex: 1 },
    { text: "Apellido Paterno", dataIndex: "tra_pat", flex: 1 },
    { text: "Apellido Materno", dataIndex: "tra_mat", flex: 1 },
    { text: "Activo", dataIndex: "est_ado", flex: 1 },
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
          iconCls: "x-fa fa-home",
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

                          fetch(`http://localhost:4000/tasks/${rec.data.tra_ide}`, {
                            method: "PUT", // or "PUT" with the url changed to, e.g "https://reqres.in/api/users/2"
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
