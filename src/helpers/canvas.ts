const createRectangle = (ctx:CanvasRenderingContext2D, x:number, y:number, width:number, height:number, colour:string|CanvasGradient)=>{
    ctx.fillStyle = colour;
    ctx.fillRect(x, y, width, height);
}

const genGradient = (ctx:CanvasRenderingContext2D, colours:{step:number, colour:string}[]):CanvasGradient => {
    const grd = ctx.createLinearGradient(0, 0, 200, 0);
    colours.map(colour=>{
        grd.addColorStop(colour.step, colour.colour);
    })
    return grd
}


export {createRectangle,genGradient}