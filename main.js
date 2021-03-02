const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight
const gui = new dat.GUI()

const X = canvas.width
const Y = canvas.height

const wave = {
    y: Y/2,
    length: .02,
    amplitude: 100,
    frequency: .005
}
const strokeColor = {
    h:200,
    s:50,
    l:50
}

const waveFolder = gui.addFolder('wave')
waveFolder.add(wave,'y',0,Y)
waveFolder.add(wave,'length',-.02,.02)
waveFolder.add(wave,'amplitude',-400,400)
waveFolder.add(wave,'frequency',-.01,.1)
waveFolder.open()
const strokeFolder = gui.addFolder('strokeColor')

strokeFolder.add(strokeColor,'h',0,360)
strokeFolder.add(strokeColor,'s',0,100)
strokeFolder.add(strokeColor,'l',0,100)
strokeFolder.open()

console.log(wave)
let increment = wave.frequency
function animate(){
    ctx.fillStyle = 'rgba(0,0,0,.01)'
    ctx.fillRect(0,0,X,Y)
    ctx.beginPath()
    ctx.moveTo(0,Y/2)
    for(i=0;i<X;i++){
            ctx.lineTo(i,wave.y+Math.sin(i*wave.length+increment)*wave.amplitude*Math.sin(increment))
        }
    ctx.strokeStyle = `hsl(${strokeColor.h*Math.sin(increment)},${strokeColor.s}%,${strokeColor.l}%)`
    ctx.stroke()
    increment += wave.frequency
    requestAnimationFrame(animate)
}
animate()
