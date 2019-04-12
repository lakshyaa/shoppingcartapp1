$(() => {

    function refreshList() {
      $.get('/vendors', (data) => {
        $('#vendorlist').empty()
  
         for (let vendor of data) {
          $('#vendorlist').append(
            `<li> ${vendor.name}<button id="deletevendor" value="${vendor.id}" onclick="deleteElement(${vendor.id})">Delete</button></li>`)
            
            
            
        }
      })
    }
  
    refreshList()
  
    $('#addvendor').click(() => {

      console.log("reached in get")
      $.post(
        '/vendors',
        {
          name: $('#vendorname').val(),
         
        },
        (data) => {
          if (data.success) {
            refreshList()
          } else {
            alert('Some error occurred')
          }
        }
      )
    })
    
    $('#deletevendor').click(() => {
      console.log("reached in delete")
        $.delete(
          '/vendors/delete',
            {
                id: $('deletevendor').val
              },
          (data) => {
            if (data.success) {
              refreshList()
            } else {
              alert('Some error occurred')
            }
          }
        )
      })
    
  })
  