const Sequelize = require('sequelize')
const Op = Sequelize.Op

const db = new Sequelize({
  dialect: 'sqlite', // mysql, postgres, mssql
  storage: __dirname + '/management.db'
  // database : '',
  // host: 'localhost',
  // username: '',
  // password: '',
  // port: ''
})

const Vendor = db.define('vendor', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
})
const Products=db.define('product',{
name:{
  type: Sequelize.STRING,
    allowNull: false
},
price:{
  type:Sequelize.NUMBER
  
}
,quantity:{
  type:Sequelize.NUMBER
},





})


const User = db.define('user', {
  name:Sequelize.STRING
})
const CartItems = db.define('cartitems', {
quantity:Sequelize.INTEGER

  
})
//User.belongsToMany(Products, { through: CartItems })
//Products.belongsToMany(User, { through: CartItems })
//[‎4/‎12/‎2019 9:31 AM]  Shantanu Singh:  
Vendor.hasMany(Products,{foreignKey:{allowNull:false},onDelete:'CASCADE'});
Products.belongsTo(Vendor,{foreignKey:{allowNull: false},onDelete:'CASCADE'});
CartItems.belongsTo(Products,{onDelete:'CASCADE'});
CartItems.belongsTo(User,{onDelete:'CASCADE'});
User.hasMany(CartItems,{foreignKey:{allowNull: false},onDelete:'CASCADE'});
Products.hasMany(CartItems,{foreignKey:{allowNull: false},onDelete:'CASCADE'}) 
 






module.exports = {
  db, Vendor,Products,User,Products,CartItems
}
