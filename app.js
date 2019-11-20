const allTodos = document.querySelector('#todos-list');
const form = document.querySelector('#add-todo-form')

// Get Fata From Firebase-Firestore


renderTodos = (doc) => {
    let li = document.createElement('li');
    li.setAttribute("data-id", doc.id)

    let name = document.createElement('span');
    let city = document.createElement('span');
    let crossIcon = document.createElement('div');
    let EditIcon = document.createElement('div');

    EditIcon.setAttribute("style",'margin-right:60px')
    crossIcon.setAttribute("style",'margin-right:10px')


    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    EditIcon.textContent = 'Edit';
    crossIcon.textContent = 'Del';

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(EditIcon);
    li.appendChild(crossIcon);
    allTodos.appendChild(li);

    // Deleting Data From Firebase-Firestore

    crossIcon.addEventListener('click', (e) => {
        // e.stopPropagation() // Optional
        let id = e.target.parentElement.getAttribute('data-id')
        db.collection('todos').doc(id).delete();
        allTodos.removeChild(li)
    })



    // Updating Data From Firebase-Firestore

    EditIcon.addEventListener('click',(e)=>{
        let name = prompt("Please Enter User Name",doc.data().name);
        let city = prompt("Please Enter City Name",doc.data().city);
        let id = e.target.parentElement.getAttribute('data-id')
        db.collection('todos').doc(id).update({
            name:name,
            city:city
        })
        allTodos.removeChild(li)

    })


}


// db.collection('todos').get().then(snapShot => {
//     snapShot.docs.forEach(doc => {
//         renderTodos(doc);
//     });
// })


//Saving Data in Firebase-Firestore


form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('todos').add({
        name: form.name.value,
        city: form.city.value
    })

    form.name.value = '';
    form.city.value = '';
})




// Making Quries from Firebase-Firestore


// db.collection('todos').where("city",'<','M').get().then(snapShot => {
//     snapShot.docs.forEach(doc => {
//         renderTodos(doc);
//     });
// })




// Orders our data From Firebase-Firestore


// db.collection('todos').orderBy('city').get().then(snapShot => {
//     snapShot.docs.forEach(doc => {
//         renderTodos(doc);
//     });
// })





// Realtime Data using Firebase-Firestore

db.collection('todos').orderBy('city').onSnapshot(snapshot=>{
    let changes= snapshot.docChanges();
    changes.forEach(change => {
        // console.log(change.doc.data())
        if(change.type == 'added'){
            renderTodos(change.doc);
        }
        if(change.type == 'modified'){
            renderTodos(change.doc);
        }
       
    
        
    });
})



// Updating Data From Firebase-Firestore