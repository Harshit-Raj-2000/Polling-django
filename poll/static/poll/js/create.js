var optionsArea = document.querySelector('#optionsArea')
validationAlert = document.querySelector('#topAlert')
var optionsArray = []
addOptionsListener()
deleteButtonListener()

function addOptionsListener() {
    optionsArea.lastElementChild.querySelector('input').addEventListener('click', addOption)
}

function addOption(e) {
    e.target.removeEventListener('click', addOption)
    var d = document.createElement('div')
    d.innerHTML = `<input id="" type="text" class="form-control form-control-sm mb-3" placeholder="Choose an answer.."autocomplete="off"><i class="fa fa-trash-o" aria-hidden="true"></i>`
    d.classList.add("option")
    optionsArea.appendChild(d)
    addOptionsListener()
    deleteButtonListener()
}

function deleteButtonListener(){
    document.querySelectorAll('.fa-trash-o').forEach((btn)=>{
        btn.addEventListener('click', deleteOption)
    })
}

function deleteOption(e){
    a = e.target.parentElement
    a.remove()
    addOptionsListener()
    deleteButtonListener()
}

document.querySelector('#creationForm').addEventListener("submit",createForm)

function createForm(e){
    e.preventDefault()
    let csrf_token = document.querySelector('input[name="csrfmiddlewaretoken"]').value
    let url = e.target.dataset.url
    let title = document.querySelector('#title')
    let description = document.querySelector('#description')
    let options = optionsArea.querySelectorAll('input')
    if(!validateForm(title, options)){
        console.log("invalid form")
        return
    }
    let createformdata = JSON.stringify({
        title: title.value,
        description: description.value,
        options: optionsArray,
    })

    var xhr = new XMLHttpRequest()
    xhr.open('POST', url, true)

    xhr.setRequestHeader('content-type', 'application/json')
    xhr.setRequestHeader('X-CSRFToken', csrf_token)

    xhr.onload = function(){
        if(this.status == 200){
            var id = JSON.parse(this.responseText).id
            window.location = `view/${id}`
        }
        else{
        validationAlert.innerHTML = "Something went wrong. Please try again!"
        validationAlert.style.display = "block"
        setTimeout(()=>{
            validationAlert.style.display = "None"
        },10000)
        }
    }

    xhr.send(createformdata)
    
}

function validateForm(title, options){
    optionsArray = []
    if(title.value == ""){
        validationAlert.innerHTML = "Title of the poll is missing!"
        validationAlert.style.display = "block"
        setTimeout(()=>{
            validationAlert.style.display = "None"
        },10000)
        return false
    }
    for(i=0; i<options.length; i++){
        item = options[i]
        if (item.value == ""){
        validationAlert.innerHTML = "Value in some options missing! Either put a value in them or delete them!"
        validationAlert.style.display = "block"
        setTimeout(()=>{
            validationAlert.style.display = "None"
        },10000)
        return false
        }
        else{
            optionsArray.push(item.value)
        }
    }
    return true
}