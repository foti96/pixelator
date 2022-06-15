
[Demo Link](https://foti96.github.io/pixelator/)

## Libraries
- React
- Typescript

## What it does
The code generate a base image and then reproccess the image to generate a new image whit all the colours included

A user is able to upload their own image to proccess if required, but by standard it isn't reqired.

### How it does it
The code breaks the screen down into 3x3 blocks and gives it a unique colour once that colour has been used it gets removed from the list. This continues till the list is empty.

If there are more squares then colours the code will generate black squares till the canvas is full
