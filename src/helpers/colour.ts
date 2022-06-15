import { IColour } from "../Interfaces/Colour"

const genColours = () => {
    let colourList:IColour[] = []
    for (let red = 0; red <= 255; red = red + 8) {
      for (let green = 0; green <= 255; green = green + 8) {
        for (let blue = 0; blue <= 255; blue = blue + 8) {
          colourList.push({red,green,blue})
        }
      }
    }
    return colourList
}


const getNearestColour = (needle:IColour, colourList:IColour[]):{colour:IColour, index:number} => {

    let distanceSq: number
    let colosestColour = Infinity
    let value: IColour = {red:0, green:0, blue:0}
    let valueIndex = -1

    for (var index = 0; index < colourList.length; ++index) {
        let colour = colourList[index]
  
        distanceSq = (
          Math.pow(needle.red - colour.red, 2) +
          Math.pow(needle.green - colour.green, 2) +
          Math.pow(needle.blue - colour.blue, 2)
        );
  
        if (distanceSq < colosestColour) {
          colosestColour = distanceSq;
          value = colour;
          valueIndex = index
        }
    }
    return {colour:value, index: valueIndex}
}


const dataToIColourObject = (data:Uint8ClampedArray):IColour=>{
    return {red: data[0], green:data[1], blue:data[2]}
    
}

const IColourObjectToRgb = (colour:IColour):string=>{
    return `rgb(${colour.red},${colour.green}, ${colour.blue})`
}



export {genColours, getNearestColour,dataToIColourObject, IColourObjectToRgb}