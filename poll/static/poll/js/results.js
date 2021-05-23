var mycanvas = document.getElementById('mycanvas')


function drawPieSlice(ctx, centerX, centerY, radius, startAngle, endAngle, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
}

var info = JSON.parse(document.querySelector('#info').dataset.info)
function drawPie() {

    mycanvas.width = 200
    mycanvas.height = 200
    var ctx = mycanvas.getContext("2d")

    var colors = ['blue', 'orange', 'green', 'pink', 'brown', 'purple', 'yellow', 'grey', 'red', 'black']

    var totalValue = 0
    var startAngle = 0
    var legendHTML = ""

    for (i in info) {
        totalValue += info[i]
    }
    var objkeys = Object.keys(info)
    for (k = 0; k < objkeys.length; k++) {
        i = objkeys[k]
        endAngle = startAngle + 2 * Math.PI * (info[i] / totalValue)
        drawPieSlice(ctx, 100, 100, 100, startAngle, endAngle, colors[k])
        startAngle = endAngle
        legendHTML += `<div><span style='display:inline-block;width:20px;background-color:${colors[k]};'>&nbsp;</span>${i}</div>`
    }
    document.getElementById("myLegend").innerHTML = legendHTML

}

if (mycanvas){
drawPie()
}

document.querySelector('#refreshbutton').onclick = ()=>{
    location.reload()
}