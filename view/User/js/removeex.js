const Rembtn = document.querySelectorAll('#Rembtn')

for (let i = 0; i < Rembtn.length; i++) {
    Rembtn[i].addEventListener('click',async (e)=>{
        console.log(e.target);
        const remid =e.target.getAttribute('exercise-id');
        const res= await fetch(`http://localhost:8000/user/profile/action/removeexercise/${remid}`,
        {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
        })
        console.log(res);
        if (res.ok) {
            const res =await Swal.fire('Exercise Deleted Succesfully')
            if (res.isConfirmed) {
                location.reload()
            }
        }
    })
    
}
Rembtn.forEach((btn)=>{
       
})