/**
 * This view is an example list of people.
 */
Ext.define("MyApp.view.main.List", {
  extend: "Ext.grid.Panel",
  xtype: "mainlist",

  requires: ["MyApp.store.ExtraApi"],

  title: "Personnel",

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
                  padding:10,
                  dataIndex: "tra_nom",
                  
                  fieldLabel: "ID"
                },
                {
                  xtype: "textfield",
                  flex: 10,
                  padding:10,
                  fieldLabel: "Code"
                },
                {
                  xtype: "textfield",
                  flex: 10,
                  padding:10,
                  fieldLabel: "Nombre"
                },
                {
                  xtype: "textfield",
                  flex: 10,
                  padding:10,
                  fieldLabel: "Apellido Paterno"
                },
                {
                  xtype: "textfield",
                  flex: 10,
                  padding:10,
                  fieldLabel: "Apellido Materno"
                },
              ],
              buttons:[{
                text:'actualizar datos',
                handler:function(btn){
                  var data=this.up('form')
                  console.warn('print the form data',data.getForm().getValues())
                }
              }
                
              ]
            });
            Ext.create("Ext.window.Window", {
              title: "bienvenido",
              height: 500,
              width: 400,
              layout: "fit",
              items: form,
              padding:10
            }).show();
          },
        },
      ],
    },
  ],

  // listeners: {

  // },
});
