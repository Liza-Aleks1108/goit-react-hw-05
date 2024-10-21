import React, { useRef, useEffect } from "react";

function Web() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Функция для отрисовки одной секции паутины
    function drawWebInCorner(x, y, directionX, directionY) {
      const steps = 7;
      const spacing = 20;
      const lines = 12;

      // Нарисуем круги, которые расходятся от угла
      for (let i = 1; i <= steps; i++) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        for (let j = 0; j <= lines; j++) {
          const angle = (j * Math.PI) / (lines / 2);
          const endX = x + directionX * i * spacing * Math.cos(angle);
          const endY = y + directionY * i * spacing * Math.sin(angle);
          if (j === 0) {
            ctx.moveTo(endX, endY);
          } else {
            ctx.lineTo(endX, endY);
          }
        }
        ctx.closePath();
        ctx.stroke();
      }

      // Нарисуем лучи, соединяющие круги
      for (let j = 0; j <= lines; j++) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        const angle = (j * Math.PI) / (lines / 2);
        const endX = x + directionX * steps * spacing * Math.cos(angle);
        const endY = y + directionY * steps * spacing * Math.sin(angle);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }
    }

    // Основная функция для рисования паутины по углам
    function drawSpiderWeb() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "#808080"; // Цвет паутины
      ctx.lineWidth = 1.5;

      // Паутина в верхнем левом углу
      drawWebInCorner(0, 0, 1, 1);

      // Паутина в верхнем правом углу
      drawWebInCorner(canvas.width, 0, -1, 1);

      // Паутина в нижнем левом углу
      drawWebInCorner(0, canvas.height, 1, -1);

      // Паутина в нижнем правом углу
      drawWebInCorner(canvas.width, canvas.height, -1, -1);
    }

    // Анимация для вращения паутины
    function animateWeb() {
      drawSpiderWeb();
      requestAnimationFrame(animateWeb);
    }

    drawSpiderWeb();
    animateWeb();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawSpiderWeb();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", top: 0, left: 0, zIndex: -1 }}
    />
  );
}

export default Web;
