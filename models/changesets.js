var app=require('../app');
var Bookshelf=app.get('bookshelf');

var Changesets=Bookshelf.Model.extend({
    tableName: 'changesets2'
});

module.exports=Bookshelf.model('Changeset',Changesets);