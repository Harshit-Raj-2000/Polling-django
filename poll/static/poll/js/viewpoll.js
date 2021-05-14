document.querySelector('#copybutton').onclick = ()=>{
    urlinput = document.querySelector('#shareurl')
    urlinput.select()
    document.execCommand("copy")
    document.querySelector('#copyindicator').style.display="block"
    setTimeout(()=>{
    document.querySelector('#copyindicator').style.display="none"
    },1000)


}
