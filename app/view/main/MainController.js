/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('MyApp.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    onItemSelected: function (sender, record) {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    },
    onAddClick: function () {
        var view = this.getView(),
            rec = new KitchenSink.model.grid.Plant({
                common: '',
                light: 'Mostly Shady',
                price: 0,
                availDate: Ext.Date.clearTime(new Date()),
                indoor: false
            });

        view.store.insert(0, rec);
        view.findPlugin('cellediting').startEdit(rec, 0);
    },
    onRemoveClick: function (view, recIndex, cellIndex, item, e, record) {
        record.drop();
    }
});
