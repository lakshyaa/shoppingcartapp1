
$(() => {

  refreshUserCart();


})
function refreshUserCart() {
  console.log(sessionStorage.getItem('userid'));
  $.post(
    '/usercart',
    {
      userid: sessionStorage.getItem('userid')

    },
    (data) => {
      var sum = 0;
      $('#Items').empty();
      $('#Items').append(
        `
        <tr>
          <td>NAME</td>
          <td>PRICE</td>
          <td>Quantity</td>
          <td>Vendor Name</td>
          <td>OPTION</td>
        </tr>
        `
      )
      for (var todo of data) {
        var price = parseInt(todo.product.price);
        var qty = parseInt(todo.quantity);
        sum += (price * qty);
        console.log(todo,"todoooooo")
        $('#Items').append(
          `
          <tr>
              <td>
                  ${todo.product.name}
              </td>
              <td>
              ${todo.product.price}
              </td>
              <td>
              ${todo.product.quantity}
              </td>
              <td>
              ${todo.product.vendor.name}
              </td>
              <td> <button id="productadd" value="${todo.id}"
              onclick="deleteElement(${todo.id})">X</button></td></tr>`)
               }
               $('#Items').append(
                `<tr>
                <td><h3>Total:</h3></td><td> </td><td> </td><td> </td><td>${sum}</td>
                </tr>`
                ) 

    }
  )

}
