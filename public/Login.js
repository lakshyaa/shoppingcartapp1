var user;
$(() => {
  

  
$('#login').click(()=>{
      $.post('users/add',{

       name: $('#userid').val()

      },
      (data)=>{
        sessionStorage.setItem("userid",data.id);
        alert(`welcome user:${data.name}`);
     //   refreshProductListAgain()
            })

     $.get('/products', (data) => {
          $('#productable').empty()
        console.log(" in refresh  product list")
         // console.log(data.name+" "+data.price+" "+data.quantity)
       for (let product of data) {
           //   console.log(vendor.id+"  "+vendor.name)
            $('#productable').append(
                
              `<tr><th>name</th>
              <th>price</th>
              <th>quantity</th>
              <th>Vendor Name</th>
              <th>ADD</th>
              </tr>
              <tr><td>${product.name}</td><td>${product.price}</td><td>${product.quantity}</td><td>${product.vendorId}</td><td> <button id="productadd" value="${product.id}"
              onclick="addProductElement(${product.id})">ADD To Cart</button></td></tr>`)
                 }
        })
        
        
      })
    

})
  