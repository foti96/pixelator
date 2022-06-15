import React, { Ref } from 'react'

interface IProps {
    title: string
    size: number
    buttonLabel:string
    onClick: () => void
}

const Canvas = React.forwardRef<HTMLCanvasElement, IProps>(({ title,size, onClick, buttonLabel }, ref) => {
    return (
        <div>
            <h3>{title}</h3>
            <canvas height={size} width={size} ref={ref} />
            <button onClick={onClick}>{buttonLabel}</button>
        </div>
    )

})

export { Canvas }