const express = require('express')
const {
  db,
  Vendor,Products,User,CartItems
} = require('./db')

const app = express()

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

app.use('/',
  express.static(__dirname + '/public')
)

app.get('/products', async (req, res) => {
  console.log(" i reached in  product get")

  const p = await Products.findAll()
  res.send(p);
})


app.get('/vendors', async (req, res) => {
  console.log(" i reached in get")

  const vendors = await Vendor.findAll()
  res.send(vendors)
})
app.post('/usercart',  (req, res) => {
  console.log(" i reached in get of usercart")
  console.log("this is"+req.body.userid+"is userid")
  CartItems.findAll({
    where:{
      userId:req.body.userid
    },
    include:{
      model: Products,
      include:[Vendor]
    }
}).then((item)=>{
  res.send(item);
});
//res.send(result)
})
app.post('/usercart/delete', async (req, res) => {

  try {
    console.log(" i reached in user cart delete")
    console.log('idddddd  '+req.body.id);
      const result = await CartItems.destroy({
          where: {
            id: req.body.id
          }
        });  
            res.send({success: true})
  } catch (e) {
    res.send({success: false, err: e.message})
  }


})



app.post('/vendors/delete', async (req, res) => {

  try {
    console.log(" i reached in delete")
    console.log('idddddd  '+req.body.id);
      const result = await Vendor.destroy({
          where: {
            id: req.body.id
          }
        });  
            res.send({success: true})
  } catch (e) {
    res.send({success: false, err: e.message})
  }


})
app.post('/products/delete', async (req, res) => {

  try {
    console.log(" i reached in product delete")
    console.log('id  '+req.body.id);
      const result = await Products.destroy({
          where: {
            id: req.body.id
          }
        });  
        
    
    res.send({success: true})
  } catch (e) {
    res.send({success: false, err: e.message})
  }


})

app.post('/vendors', async (req, res) => {

  try {
    const result = await Vendor.create({
      name: req.body.name
      
    })
    res.send({success: true})
  } catch (e) {
    res.send({success: false, err: e.message})
  }


})
app.post('/products', async (req, res) => {
  console.log("in products post method")
  console.log( req.body.name+" "+req.body.price+"  "+req.body.quantity+"  "+req.body.vendorid)

  try {
    const result = await Products.create({
      name: req.body.name,
      price:req.body.price,
      quantity:req.body.quantity,
      vendorId:req.body.vendorid
      
    })
    res.send({success: true})
  } catch (e) {
    res.send({success: false, err: e.message})
  }


})
app.post('/products/addToCart', (req, res) => {
  console.log("in  addtoCart products post method")
  console.log( req.body.id+" "+req.body.userid+"  ")

  
    const result =  CartItems.findOrCreate({
      where : {
      userId : req.body.userid,
      productId : req.body.id
    },
    defaults : {
      quantity:0,
    }
      
    }).then((user)=>{
      CartItems.update(
      {
      quantity:parseInt(user[0].quantity)+1
      },
      {
      where:{
      userId:req.body.userid,
      productId:req.body.id
      }

      })})
      
    .catch((err)=>{
      console.log(err, req.body.id+" "+req.body.userid);
    })
   


})

app.post('/users/add', async (req, res) => {
  console.log("in users add")
  console.log(req.body.name)

try{
     const result = await User.create({
        name: req.body.name,
             
     })
     
     

      const result1=await User.findOne({
where:{
  name:req.body.name
}
      }).then((item)=>{
res.send(item)
      })
}
    

 catch(e)
    {
      console.log("error occur")

    }
      })
      
     
db.sync()
  .then(() => {
    const port=process.env.PORT||5678
    app.listen(port)
  })
