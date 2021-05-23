validationAlert = document.querySelector('#topAlert')


document.querySelector('#copybutton').onclick = ()=>{
    urlinput = document.querySelector('#shareurl')
    urlinput.select()
    document.execCommand("copy")
    document.querySelector('#copyindicator').style.display="block"
    setTimeout(()=>{
    document.querySelector('#copyindicator').style.display="None"
    },1000)
}

document.querySelector('#voteForm').addEventListener('submit',voted)

function voted(e){
    e.preventDefault()
    var chosenIndex = -1
    var checkArray = document.querySelectorAll('input[name="option"]')
    for(i = 0; i < checkArray.length; i++){
        item = checkArray[i]
        if(item.checked){
            chosenIndex = i
            break;
        }
    }
    if(chosenIndex == -1){
        validationAlert.innerHTML = "Please chose an option before voting!"
        validationAlert.style.display = "block"
        setTimeout(()=>{
            validationAlert.style.display = "None"
        },5000)
        return
    }

    var data = JSON.stringify({chosenIndex})

    var url = document.querySelector('#shareurl').value
    var csrf_token = e.target.dataset.csrf
    var xhr = new XMLHttpRequest()
    xhr.open('POST', url, true)

    xhr.setRequestHeader('content-type', 'application/json')
    xhr.setRequestHeader('X-CSRFToken', csrf_token)

    xhr.onload = function(){
        if(this.status == 200){
            validationAlert.innerHTML = "Your vote was successfully added!"
            validationAlert.style.display = "block"
            setTimeout(()=>{
                validationAlert.style.display = "None"
            },3000)
        }
        else{
            validationAlert.innerHTML = "Something went wrong. Please try again!"
            validationAlert.style.display = "block"
            setTimeout(()=>{
                validationAlert.style.display = "None"
            },3000)
            }
    }

    xhr.send(data)

}