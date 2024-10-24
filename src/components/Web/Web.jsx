import React, { useRef, useEffect } from "react";

function Web() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth; // Встановлюємо ширину канвасу
    canvas.height = window.innerHeight; // Встановлюємо висоту канвасу

    // Функція малювання павутини в кутку з параметрами розміру
    function drawWebInCorner(x, y, directionX, directionY, sizeFactor) {
      const steps = 7; // Кількість кроків для зовнішніх кругів
      const spacing = 20 * sizeFactor; // Змінюємо відстань між лініями в залежності від розміру
      const lines = 12; // Кількість ліній у павутині

      // Зовнішні кола павутини
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
        ctx.stroke(); // Малюємо круги
      }

      // Радіальні лінії павутини
      for (let j = 0; j <= lines; j++) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        const angle = (j * Math.PI) / (lines / 2);
        const endX = x + directionX * steps * spacing * Math.cos(angle);
        const endY = y + directionY * steps * spacing * Math.sin(angle);
        ctx.lineTo(endX, endY);
        ctx.stroke(); // Малюємо радіальні лінії
      }
    }

    // Функція малювання павутини
    function drawSpiderWeb() {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаємо канвас

      ctx.strokeStyle = "#808080"; // Колір ліній
      ctx.lineWidth = 1.5; // Товщина ліній

      // Малюємо павутину в кожному кутку з різними розмірами
      drawWebInCorner(0, 0, 1, 1, 1.5); // Лівий верхній кут, найбільший розмір
      drawWebInCorner(canvas.width, 0, -1, 1, 1); // Правий верхній кут, середній розмір
      drawWebInCorner(0, canvas.height, 1, -1, 0.75); // Лівий нижній кут, менший розмір
      drawWebInCorner(canvas.width, canvas.height, -1, -1, 1.25); // Правий нижній кут, середній розмір
    }

    // Анімація
    function animateWeb() {
      drawSpiderWeb(); // Малюємо павутину
      requestAnimationFrame(animateWeb); // Запитуємо наступний кадр анімації
    }

    drawSpiderWeb(); // Перший малюнок павутини
    animateWeb(); // Запускаємо анімацію

    // Обробник зміни розміру вікна
    const handleResize = () => {
      canvas.width = window.innerWidth; // Оновлюємо ширину канвасу
      canvas.height = window.innerHeight; // Оновлюємо висоту канвасу
      drawSpiderWeb(); // Повторно малюємо павутину
    };

    window.addEventListener("resize", handleResize); // Додаємо обробник події зміни розміру

    return () => {
      window.removeEventListener("resize", handleResize); // Видаляємо обробник при розмонтаженні компонента
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed", // Фіксуємо канвас на фоні
        top: 0,
        left: 0,
        zIndex: -1, // Задаємо нижній порядок відображення
        width: "100%", // Розтягуємо канвас на всю ширину
        height: "100%", // Розтягуємо канвас на всю висоту
        pointerEvents: "none", // Вимикаємо взаємодію з мишею
      }}
    />
  );
}

export default Web;
