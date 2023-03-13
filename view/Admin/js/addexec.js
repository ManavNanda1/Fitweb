const addButton = document.querySelector('#add');
addButton.addEventListener('click', (e)=> {
  const formContainer = document.querySelector('#form-container');
  const newForm = document.createElement('div');
  newForm.classList.add('col-lg-4')
  newForm.innerHTML = `
    <div class="card shadow-lg" >
      <div class="card-body">
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="floatingInput" placeholder="Exercise name">
            <label for="floatingInput" class="form-label">Exercise Name</label>
          </div>
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="floatingInput" placeholder="bodyPart Name">
            <label for="floatingInput" class="form-label">bodyPart</label>
          </div>
          <div class="form-floating mb-3">
            <input type="file" class="form-control" id="floatingInput" placeholder="gifUrl">
            <label for="floatingInput" class="form-label">gifUrl</label>
          </div>
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="floatingInput" placeholder="equipment">
            <label for="floatingInput" class="form-label">equipment</label>
          </div>
      </div>`;
  formContainer.append(newForm);
});
const submit = document.querySelector('#submit');
submit.addEventListener('click', (e)=> {
    console.log("sadf");

})