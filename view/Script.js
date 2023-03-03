// BMI calculator code below 
function calculateImc(form) {
    let imcBar = document.getElementById('IMCbar');
    let imcData = document.getElementById('imcData');
    let imc = form.weight.value / ((form.height.value / 100) * (form.height.value / 100));
    let imcText;
    if (imc <= 18.5) {
        imcText = 'Underweight';
    } else if (imc > 18.5 && imc <= 25) {
        imcText = 'Normal Weight';
    } else if (imc > 25 && imc <= 30) {
        imcText = 'Overweight';
    } else if (imc > 30 && imc <= 35) {
        imcText = 'Level 1 obesity';
    } else if (imc > 35 && imc <= 40) {
        imcText = 'Level 2 obesity';
    } else if (imc > 40 && imc <= 50) {
        imcText = 'Level 3 obesity';
    } else if (imc > 50) {
        imcText = 'Level 4 obesity';
    }
    if (imc <= 15) {
        imcBar.style.width = '0%';
    } else if (imc >= 50) { // si es 50 o mayor es 100%
        imcBar.style.width = '100%';
    } else { // If IMC wis between 15 and 50
        imcBar.style.width = (((imc - 15) * 100) / 35) + '%';
    }
    imcData.innerHTML = `IMC: ${parseFloat(imc).toFixed(2)}  ${imcText}`;
    return false;
}
const done=document.querySelectorAll('.done')
done.forEach((btn)=>{

    btn.addEventListener('click',(event)=>{
    const enames= event.target.getAttribute('data-exercise-name')
        try {
             fetch("/user/exercise/save", {
              
             // Adding method type
             method: "POST",
              
             headers: {
                 "Content-type": "application/json"
             },
             // Adding body or contents to send
             body:JSON.stringify({
                d:enames,
             })
            }).then(response => response.json())
            .then(data => console.log(data))
             
            
        } catch (error) {
        console.log(error.message);
            
        }
    
})

})