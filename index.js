//Refrencing
let addNote = document.querySelector('#addNote');
let card = document.querySelector('#note-card');
let textarea = document.getElementById('textarea');

const empty = `
<div class="alert alert-danger d-flex align-items-center" role="alert" id='remove'>
  <div>
    Nothing To Show Here! Add Notes To Show!
  </div>

`

let noteData = [];
var lSdata = JSON.parse(localStorage.getItem('noteData'))
addNote.addEventListener('click', () => {

    if (JSON.parse(localStorage.getItem('noteData')).length == 0) {
        document.getElementById('remove').remove()
    }
    textarea = document.getElementById('textarea').value;
    note = `
    <div class="card mx-2 my-3 delete note" style="width: 18rem;">
        <div class="card-body mt-3">
            <h5 class="card-title">Notes ${JSON.parse(localStorage.getItem('noteData')).length + 1}</h5>
            <p class="card-text" id="text-fill">${textarea}</p>
            <button class="btn btn-primary" id='${JSON.parse(localStorage.getItem('noteData')).length}' onclick='deleteNote(this.id)'>Delete</button>
        </div>
    </div>`

    lSdata.push(textarea)
    localStorage.setItem('noteData', JSON.stringify(lSdata))
    document.getElementById('textarea').value = '';
    card.insertAdjacentHTML('beforeend', note)
})

const presentData = () => {
    if (JSON.parse(localStorage.getItem('noteData')).length != 0) {
        let lenOfLS = JSON.parse(localStorage.getItem('noteData')).length;
        for (let index = 0; index < lenOfLS; index++) {
            note = `
        <div class="card mx-2 my-3 delete note" style="width: 18rem;">
            <div class="card-body mt-3">
                <h5 class="card-title">Notes ${index + 1}</h5>
                <p class="card-text" id="text-fill">${JSON.parse(localStorage.getItem('noteData'))[index]}</p>
                <button class="btn btn-primary" id='${index}' onclick='deleteNote(this.id)'>Delete</button>
            </div>
        </div>`

            card.insertAdjacentHTML('beforeend', note);
        }
    } else {
        card.insertAdjacentHTML('beforebegin', empty)}
}

//Condition - If LS Avl or Not
const lSAvl = () => {
    if (localStorage.getItem('noteData') == null) {
        localStorage.setItem('noteData', JSON.stringify(noteData));
        presentData()
    } else {
        presentData()}
}

document.body.addEventListener('load', lSAvl())
function deleteNote(index) {
    lSdata.splice(index, 1);
    localStorage.setItem('noteData', JSON.stringify(lSdata))
    console.log(localStorage.getItem('noteData'));
    card.querySelectorAll('.delete').forEach(n => n.remove());
    presentData();
}

let searchBtn = document.getElementById('searchBtn')
let search = document.getElementById('search');

search.addEventListener('input', () => {
    let inputVal = search.value.toLowerCase();
    let noteCard = document.getElementsByClassName('note')
    Array.from(noteCard).forEach((element)=>{
        let cardTxt = element.getElementsByTagName('p')[0].innerText.toLowerCase();
        console.log(cardTxt);
        if (cardTxt.includes(inputVal)) {
            console.log('GOT');
            element.style.display = 'block'
        }else {
            element.style.display = 'none'}
    })
})
