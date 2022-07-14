// let title = '';
// let notes = '';

// let flag = true;

// if(flag){
// localStorage.setItem('userData',JSON.stringify([]));
// localStorage.setItem('counter',-1);
// localStorage.setItem('idx',0);
//     flag = false;
// }

function getAllNotes()
{
    let allNotes = localStorage.getItem('userData');

    if(allNotes==null){
        localStorage.setItem('userData',JSON.stringify([]));
    }

    let latestData = JSON.parse(localStorage.getItem('userData'));

    console.log(latestData);

    if(latestData.length==0){
        document.getElementById('outputNotes').innerHTML = '';
        document.getElementById('dataPresent').innerText = "No notes to display...";
        localStorage.setItem('idx',-1);
        localStorage.setItem('counter',-1);
        return;
    }

    let notes = "";

    for(let x of latestData)
    {
        notes = notes + `
                <div class='card'>
                    <h2>${x.title}</h2>
                    <h5>${x.notes}</h5>
                    <button onclick="EditFun(${x.id})">Edit</button>
                    <button onclick="deleteFun(${x.id})">Delete</button>
                    <p>${x.date}</p>
                </div>
                `
    }

    document.getElementById('outputNotes').innerHTML = notes;   
}

//Forever delete from localstorage....
function delForeverFun(index)
{
    let latestData = JSON.parse(localStorage.getItem('delNotes'));

    latestData = latestData.filter((obj)=>{
        return obj.id != index;
    });

    console.log(latestData);

    localStorage.setItem('delNotes',JSON.stringify(latestData));

    getAllDelNotes();
}


function getAllDelNotes()
{
    let latestData = JSON.parse(localStorage.getItem('delNotes'));

    let notes = "";

    for(let x of latestData)
    {
        notes = notes + `
                <div class='card'>
                    <h2>${x.title}</h2>
                    <h5>${x.notes}</h5>
                    <button onclick="delForeverFun(${x.id})">Delete forever</button>
                    <p>${x.date}</p>
                </div>
                `
    }

    document.getElementById('deletedNotes').innerHTML = notes;   
}

function EditFun(identity)
{
    window.scrollTo(0,0); // To move the user back to top of the screen.

    let latestData = JSON.parse(localStorage.getItem('userData'));

    let note = {};
    let noteIndex = -1;

    for(let i=0;i<latestData.length;i++)
    {
        if(latestData[i].id == identity)
        {
            note.title = latestData[i].title;
            note.notes = latestData[i].notes;
            noteIndex = i;
        }
    }

    console.log(note,noteIndex);

    document.getElementById('title').value = note.title;

    document.getElementById('notes').value = note.notes;
    
    let btn = document.getElementById('addBtn');

    btn.innerHTML = 'Modify';

    btn.onclick = ()=>{

        let newTitle = document.getElementById('title').value;
        let newNote = document.getElementById('notes').value;

        latestData[noteIndex].title = newTitle;
        latestData[noteIndex].notes = newNote;

        console.log(latestData);

        localStorage.setItem('userData',JSON.stringify(latestData));

        document.getElementById('title').value = '';
        document.getElementById('notes').value = '';
        document.getElementById('addBtn').innerText = 'Add Note';

        getAllNotes();

        btn.onclick = addNote;
        
        return;
    };
}



function deleteFun(index){

    let latestData = JSON.parse(localStorage.getItem('userData'));

    let delNote = {};
    let delNoteIndex = -1;

    for(let i=0;i<latestData.length;i++)
    {
        if(latestData[i].id == index)
        {
            delNote.id = latestData[i].id;
            delNote.title = latestData[i].title;
            delNote.notes = latestData[i].notes;
            delNote.date = latestData[i].date;
            delNoteIndex = i;
        }
    }


    latestData = latestData.filter((obj)=>{
        return obj.id != index;
    });

    console.log(latestData);

    localStorage.setItem('userData',JSON.stringify(latestData));
    console.log(localStorage.getItem('userData'));

    getAllNotes();

    let deletedData = localStorage.getItem('delNotes');

    if(deletedData==null){
        deletedData = localStorage.setItem('delNotes',JSON.stringify([]));
    }

    deletedData = JSON.parse(localStorage.getItem('delNotes'));

    deletedData.push(delNote);

    localStorage.setItem('delNotes',JSON.stringify(deletedData));

    getAllDelNotes();
}


let retreiveNotes = ()=>{

    let latestData = JSON.parse(localStorage.getItem('userData'));

    // console.log(latestData);

    //let index = localStorage.getItem('counter');

    let index = latestData.length - 1;

    let x = latestData[index]; 



    // console.log(x);

    let currentNodeId = x.id;

    let title = (x.title).length>10?"HELOOOO":x.title;
    let notez = (x.notes).length>20?"HELOOOO":x.notes;

    let notes = document.getElementById('outputNotes').innerHTML;

    let newDiv = `<div class="card">
        <h2>${title}</h2>
        <h5>${notez}</h5>
        <button onclick="EditFun(${currentNodeId})">Edit</button>
        <button onclick="deleteFun(${currentNodeId})">Delete</button>
        <p>${x.date}</p>
    </div>`

    document.getElementById('outputNotes').innerHTML = notes + newDiv;
}


let addNote = () => {

    // if(document.getElementById('addBtn').innerText == 'Modify'){
    //     EditFun()
    // }

    let title = document.getElementById('title').value;
    if(title==''){
        alert('Enter the title');
        return;
    }
    let notes = document.getElementById('notes').value;

    let data = localStorage.getItem('userData');

    let idx = localStorage.getItem('idx');

    if(idx==null){
        localStorage.setItem('idx',-1);
    }

    if(data==null){
        localStorage.setItem('userData',JSON.stringify([]));   
    }

    data = JSON.parse(localStorage.getItem('userData'));

    idx = parseInt(localStorage.getItem('idx'));

    localStorage.setItem('idx',idx+1);

    //For date
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    let newData = {
        id: localStorage.getItem('idx'),
        title: title,
        notes: notes,
        date: today
    }

    //For checking already same note exists or note...
    for(let x of data)
    {
        if(x.title==newData.title && x.notes==newData.notes)
        {
            alert('Same note already exists...Try to add unique notes');
            return;
        }
    }

    data.push(newData);

    localStorage.setItem('userData',JSON.stringify(data));

    document.getElementById('title').value = '';
    document.getElementById('notes').value = '';

    let cnt = localStorage.getItem('counter');
    
    if(cnt==null){
        localStorage.setItem('counter',-1);
    }

    cnt = parseInt(localStorage.getItem('counter'));

    localStorage.setItem('counter',cnt+1);
    
    document.getElementById('dataPresent').innerText = '';

    retreiveNotes();

    // let latestData = JSON.parse(localStorage.getItem('userData'));

    // console.log(latestData);

    // let itr = 1;

    // // document.getElementById('outputNotes').innerHTML = '';

    // for(let x of latestData)
    // {
    //     let titleTag = document.createElement('h2');
    //     titleTag.innerHTML = x.title;

    //     let notesTag = document.createElement('p');
    //     notesTag.innerHTML = x.notes;

    //     let editBtn = document.createElement('BUTTON');
    //     let editTxt = document.createTextNode('Edit');
    //     editBtn.appendChild(editTxt);

    //     let deleteBtn = document.createElement('BUTTON');
    //     let deleteTxt = document.createTextNode('Delete');
    //     deleteBtn.appendChild(deleteTxt);

    //     let noteContainer = document.createElement('div');
    //     noteContainer.appendChild(titleTag);
    //     noteContainer.appendChild(notesTag);
    //     noteContainer.appendChild(editBtn);
    //     noteContainer.appendChild(deleteBtn);
    //     noteContainer.id = "note"+itr++;

    //     document.getElementById('outputNotes').appendChild(noteContainer);
    // }
}




