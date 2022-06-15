import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Canvas } from './Components/Canvas'
import { genColours, getNearestColour, IColourObjectToRgb, dataToIColourObject } from './helpers/colour'
import {createRectangle, genGradient} from './helpers/canvas'
import './App.css';
import { Bars } from 'react-loader-spinner';



function App() {
  const imageCanvas = useRef<HTMLCanvasElement>(null)
  const pixelatedCanvas = useRef<HTMLCanvasElement>(null)

  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [noRepeats, setNoRepeats] = useState<boolean>(true)
  const [pixelSize] = useState<number>(3)

  useEffect(() => {
    renderImage()
  }, [imageSrc])

  const renderImage = () => {
    const imgCanvas = imageCanvas.current
    if (!imgCanvas) {
      return
    }
      const ctx = imgCanvas.getContext('2d')
      if (!ctx) {
        return
      }
      if (!imageSrc) {
        createRectangle(ctx,0,0,imgCanvas.width, imgCanvas.height,'rgb(0,0,0)')
        createRectangle(ctx,10, 20, 300, 400, genGradient(ctx,[{step:0, colour:"blue"},{ step:1,colour:'red'}]))
        createRectangle(ctx,200, 105, 300, 200,genGradient(ctx,[{step:0, colour:"red"},{ step:1,colour:'green'}]))
        createRectangle(ctx,70, 190, 200, 400,genGradient(ctx,[{step:0, colour:"green"},{ step:1,colour:'blue'}]))
        return
      }
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = imageSrc;
      ctx.clearRect(0, 0, imgCanvas.width, imgCanvas.height);
      img.onload = () => {
        ctx.drawImage(img, 0, 0)
        img.style.display = 'none'
      }
    }

  const pixelalte = () => {

    const colours = genColours()
    console.log(colours.length)
    const imgCanv = imageCanvas.current
    if (!imgCanv) {
      return
    }
    const imgContext = imgCanv.getContext('2d')
    if (!imgContext) {
      return
    }
    const imgwidth = imgCanv.width
    const imgHeight = imgCanv.height
    for (let col = 0; col <= imgHeight / pixelSize; col++) {
      for (let row = 0; row <= imgwidth / pixelSize; row++) {
        const x = row * pixelSize
        const y = col * pixelSize
        const section = imgContext.getImageData(x, y, pixelSize, pixelSize)
        const data = section.data
        const rgb = dataToIColourObject(data as unknown as any);
        const colosestData = getNearestColour(rgb, colours)
        if (noRepeats) {
          colours.splice(colosestData.index, 1)
        }
        const colour = IColourObjectToRgb(colosestData.colour)
        setPixelCanvas(x, y, colour)
      }
    }
    console.log(colours.length)
  }



  const setPixelCanvas = (x: number, y: number, colour: string) => {
    const pixcanv = pixelatedCanvas.current
    if (!pixcanv) {
      return
    }
    const pixCon = pixcanv.getContext('2d')
    if (!pixCon) {
      return
    }
    pixCon.fillStyle = colour;
    pixCon.fillRect(x, y, pixelSize, pixelSize);
  }

  const clearCanvas = () => {
    const pixcanv = pixelatedCanvas.current
    if (!pixcanv) {
      return
    }
    const pixCon = pixcanv.getContext('2d')
    if (!pixCon) {
      return
    }
    pixCon.clearRect(0, 0, pixcanv.width, pixcanv.height);
  }

  const onfileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      const objectUrl = URL.createObjectURL(files[0])
      setImageSrc(objectUrl)
    }
  }

  const size = 543

  return (<>
    <div style={{ display: "flex" }}>
      <input type={'file'} onChange={onfileUpload} accept={".png"} />
      <div><input type={"checkbox"} checked={noRepeats} onChange={() => setNoRepeats(!noRepeats)} /><label>No Repeated Colours</label> </div>
      <button onClick={clearCanvas}>Clear</button>
    </div>
    <div className='offScreen'>
     <Canvas title={"Orginal Image"} size={size} ref={imageCanvas} onClick={pixelalte} buttonLabel={"PIXELATE"} />
    </div>
   
    <div className="App">
      <Canvas title={"Pixelated"} size={size} ref={pixelatedCanvas}  onClick={pixelalte} buttonLabel={"PIXELATE"} />
    </div>
  </>

  );
}

export default App;
