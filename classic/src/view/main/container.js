Ext.application({
  name: 'Fiddle',

  launch: function() {
      Ext.create('Ext.Container', {
          title: 'Main Container',
          fullscreen: true,
          layout: 'hbox',
          items: [{
              xtype: 'panel',
              layout: {
                  type: 'vbox',
                  pack: 'start',
                  align: 'start'
              },
              defaultType: 'button',
              flex: 1,
              style: 'background:red;',
              items: [{
                  text: 'button1'
              }, {
                  text: 'button2'
              }, {
                  text: 'button3'
              }]

          }, {
              xtype: 'panel',
              layout: {
                  type: 'hbox',
                  pack: 'start',
                  align: 'start'
              },
              defaultType: 'button',
              flex: 1,
              style: 'background:blue;',
              items: [{
                  text: 'button1'
              }, {
                  text: 'button2'
              }, {
                  text: 'button3'
              }]

          }]
      })
  }
});