
import { Canvas, Rect, Circle, Triangle } from "fabric";
import React, { useRef, useEffect, useState } from "react";
import "./CanvasEditor.css";
import { IconButton } from 'blocksin-system';
import { CircleIcon, PokeballIcon, SquareIcon, TextIcon, TriangleUpIcon } from "sebikostudio-icons";
import * as fabric from "fabric";

const CanvasEditor = ({ imageUrl }) => {
  const canvasRef = useRef(null);
  const [canva, setCanvas] = useState(null);

  useEffect(() => {
    if (canvasRef.current) {
      const initCanvas = new Canvas(canvasRef.current, {
        width: 500,
        height: 500
      });
      initCanvas.backgroundColor = "#fff";
      initCanvas.renderAll();

      setCanvas(initCanvas);

      return () => {
        initCanvas.dispose();
      };
    }
  }, [imageUrl]);

  useEffect(() => {
    if (imageUrl && canva) {
      canva.clear();
      canva.backgroundColor = "#fff";
      canva.renderAll();
      const imgElement = new Image();
      imgElement.crossOrigin = "anonymous"; 
      imgElement.src = imageUrl;

      imgElement.onload = () => {
        const imgInstance = new fabric.Image(imgElement, {
          scaleX: 500 / imgElement.width,
          scaleY: 500 / imgElement.height,
          selectable: false,
        });
        canva.add(imgInstance);
        canva.renderAll();
      };
    }
  }, [imageUrl, canva]);

  const addRectangle = () => {
    if (canva) {
      const rect = new Rect({
        top: Math.random() * 400,
        left: Math.random() * 400,
        width: 100,
        height: 60,
        fill: "#D84D42",
        selectable: true,
      });

      canva.add(rect);
    }
  };

  const addCircle = () => {
    if (canva) {
      const circle = new Circle({
        top: Math.random() * 400,
        left: Math.random() * 400,
        radius: 50,
        fill: "#e07b39",
        selectable: true,
      });
      canva.add(circle);
    }
  };

  const addTriangle = () => {
    if (canva) {
      const triangle = new Triangle({
        top: Math.random() * 400,
        left: Math.random() * 400,
        width: 100,
        height: 100,
        fill: "#2596be",
        selectable: true,
      });
      canva.add(triangle);
    }
  };

  const addPolygon = () => {
    if (canva) {
      const points = [
        { x: 200, y: 0 },
        { x: 250, y: 50 },
        { x: 250, y: 100 },
        { x: 200, y: 150 },
        { x: 150, y: 100 },
        { x: 150, y: 50 },
      ];

      const polygon = new fabric.Polygon(points, {
        left: 100,
        top: 100,
        fill: "#063970",
        selectable: true,
      });

      canva.add(polygon);
    }
  };

  const addText = () => {
    if (canva) {
      const text = new fabric.Textbox("Editable Text", {
        left: 100,
        top: 100,
        fontSize: 24,
        fill: "#ffff",
        fontWeight:"bold",
        selectable: true,
        hasControls: true,
        hasBorders: true,
        editable: true,
      });
      canva.add(text);
    }
  };


   const downloadCanvas = () => {
    if (canva) {
      const dataURL = canva.toDataURL({
        format: "png",
        quality: 1.0,
      });
      
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "canvas-image.png";
      link.click();
    }
  };

  const logCanvasLayers = () => {
    if (canva) {
      const objects = canva.getObjects();
      const layers = objects.map((obj) => {
        return {
          type: obj.type,
          left: obj.left,
          top: obj.top,
          width: obj.width || obj.scaleX * obj.width,
          height: obj.height || obj.scaleY * obj.height,
          fill: obj.fill,
          text: obj.text || '', 
          scaleX: obj.scaleX,
          scaleY: obj.scaleY,
          angle: obj.angle,
        };
      });
      console.log(layers);
    }
  };

  return (
    <>
      <div className="flex flex-col p-4 bg-gray-100 rounded-lg shadow-lg" style={{maxHeight:"850px"}}>
      <h2 className="text-2xl font-bold text-center text-black-600 mb-4">Edit Your Image</h2>
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <IconButton onClick={addRectangle} size="medium" className="bg-blue-500 text-white hover:bg-blue-600 transition">
            <SquareIcon />
          </IconButton>

          <IconButton onClick={addCircle} size="medium" className="bg-blue-500 text-white hover:bg-blue-600 transition">
            <CircleIcon />
          </IconButton>

          <IconButton onClick={addTriangle} size="medium" className="bg-blue-500 text-white hover:bg-blue-600 transition">
            <TriangleUpIcon />
          </IconButton>

          <IconButton onClick={addPolygon} size="medium" className="bg-blue-500 text-white hover:bg-blue-600 transition">
            <PokeballIcon />
          </IconButton>

          <IconButton onClick={addText} size="medium" className="bg-blue-500 text-white hover:bg-blue-600 transition">
            <TextIcon />
          </IconButton>
        </div>
        <button
          onClick={downloadCanvas}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Download
        </button>

        <button
          onClick={logCanvasLayers}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Log Canvas
        </button>
      </div>
      <div className="relative">
        <canvas
          id="canvas"
          ref={canvasRef}
          style={{ border: "1px solid gray", zIndex: 2 }}
          className="lower-canvas"
        />
      </div>
    </div>
    </>
  );
};

export default CanvasEditor;

