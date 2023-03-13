 async function removeUser(t) {

   
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })  

      console.log(result);   
       if (result.isConfirmed) {
        const res= await fetch('http://localhost:8000/admin/action/removeuser', {
            headers: {
              "Content-Type": "application/json",
            },
             method: "POST", 
             body:JSON.stringify({
                userid:t.getAttribute('user-id')
                }), 
           });
           if (res.status==200) {
               const response =await res.json()
           await Swal.fire(
                'Deleted!',
                response.message,
                'success'
              )
              location.reload()
           }
        }
        else{
            return
        }
    
}
  
  