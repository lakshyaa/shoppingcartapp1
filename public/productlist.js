 $(() => {

    function refreshList() {
      $.get('/vendors', (data) => {
        //$('#vendorlist').empty()
        console.log(" in refresh list")
  
        
  
        for (let vendor of data) {
            console.log(vendor.id+"  "+vendor.name)
          $('#vendors').append(
            `<option value=${vendor.id}>${vendor.name}</option>`)
               }
      })
    }
    function refreshProductList() {
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
              </tr>
              <tr><td>${product.name}</td><td>${product.price}</td><td>${product.quantity}</td><td><button id="productdelete" value="${product.id}"
              onclick="deleteProductElement(${product.id})">
     Delete</button></tr>`)
                 }
        })
      }

      
    
  
    refreshList()
    refreshProductList()
    $('#productAttributes').click(() => {

        console.log("reached in products Attributes")
        $.post(
          '/products',
          {
            name: $('#name').val(),
            price:$('#price').val(),
            vendorid:$('#vendors').val(),
            quantity:$('#quantity').val()
        },
          (data) => {
            if (data.success) {
              refreshList()
              refreshProductList()
            } else {
              alert('Some error occurred')
            }
          }
        )
      })
     

  
    
    })
  