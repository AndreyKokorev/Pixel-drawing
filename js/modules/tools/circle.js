import {
  data
} from '../../main.js';
import {
  frameToPNG
} from '../right-control-panel/animation-manager.js';
import {
  saveFrameImageData
} from '../frame-manager.js';
import {
  renderFrame
} from '../frame-manager.js';

function circle() {
  let x0, y0, x, y;
  let mouseDown;

  data.canv.addEventListener('mousedown', (e) => {

    if (data.tools.isCircle === true) {
      mouseDown = true;

      x0 = Math.floor(e.offsetX / data.canvIndex);
      y0 = Math.floor(e.offsetY / data.canvIndex);
    }


  });

  data.canv.addEventListener('mousemove', function mouseMove(e) {
    if (mouseDown === true) {
      x = Math.floor(e.offsetX / data.canvIndex);
      y = Math.floor(e.offsetY / data.canvIndex);
      data.ctx.clearRect(0, 0, data.canv.width, data.canv.height);
      drawCircle(data.ctx, x0, y0, x, y)
    }
  });

  data.canv.addEventListener('mouseup', () => {
    if (mouseDown === true) {
      mouseDown = false;
      drawCircle(data.currentCtx, x0, y0, x, y);
      data.ctx.clearRect(0, 0, data.canv.width, data.canv.height);

      saveFrameImageData(data.currentFrame, true);
      renderFrame();
      frameToPNG();
    }
  });

  function drawCircle(ctx, beginX, beginY, endX, endY) {
    let xR = endX;
    let yR = endY;
    let R = (Math.abs(endX - beginX) > Math.abs(endY - beginY)) ? Math.abs(endX - beginX) : Math.abs(endY - beginY);
    let x = 0;
    let y = R;
    let delta = 1 - 2 * R;
    let error = 0;
    while (y >= 0) {
      ctx.fillStyle = data.colors.currentColor;
      ctx.fillRect(xR + x, yR + y, data.pixelSize,  data.pixelSize);
      ctx.fillRect(xR + x, yR - y, data.pixelSize,  data.pixelSize);
      ctx.fillRect(xR - x, yR + y, data.pixelSize,  data.pixelSize);
      ctx.fillRect(xR - x, yR - y, data.pixelSize,  data.pixelSize);

      error = 2 * (delta + y) - 1

      if ((delta < 0) && (error <= 0)) {
        delta += 2 * ++x + 1;
        continue
      }

      if ((delta > 0) && (error > 0)) {
        delta -= 2 * --y + 1;
        continue;
      }

      delta += 2 * (++x - y--);
    }
  }
}

export default circle;

// Задача: построить эллипс, зная координаты центра x и y, длины большой и малой полуосей a и b.

// Алгоритм: используется модифицированный алгоритм Брезенхема генерации окружности. Как и в оригинальном алгоритме, выбор следующей точки основан на вычислении значения управляющей переменной delta.
// В поля "X" и "Y" вводятся координаты центра эллипса, в "A" и "B" - длины большой и малой полуосей.

// Код программы: 
// using System;
// using System.Drawing;
// using System.Windows.Forms;
 
// namespace Brazenham_Ellipse_v2
// {
//     public partial class Form1 : Form
//     {
//         public Form1()
//         {
//             InitializeComponent();
//         }
 
//         Graphics g;
//         SolidBrush red = new SolidBrush(Color.Red);
//         SolidBrush blue = new SolidBrush(Color.Blue);
//         int x, y, a, b;
 
//         void putpixel(int x, int y, SolidBrush color) // Рисование пикселя
//         {
//             g.FillRectangle(color, x, y, 1, 1);
//         }
 
//         void pixel4(int x, int y, int _x, int _y, SolidBrush color) // Рисование пикселя для первого квадранта, и, симметрично, для остальных
//         {
//             putpixel(x + _x, y + _y, color);
//             putpixel(x + _x, y - _y, color);
//             putpixel(x - _x, y - _y, color);
//             putpixel(x - _x, y + _y, color);
//         }
 
//         void draw_ellipse(int x, int y, int a, int b, SolidBrush color_a, SolidBrush color_b)
//         {
//             int _x = 0; // Компонента x
//             int _y = b; // Компонента y
//             int a_sqr = a * a; // a^2, a - большая полуось
//             int b_sqr = b * b; // b^2, b - малая полуось
//             int delta = 4 * b_sqr * ((_x + 1) * (_x + 1)) + a_sqr * ((2 * _y - 1) * (2 * _y - 1)) - 4 * a_sqr * b_sqr; // Функция координат точки (x+1, y-1/2)
//             while (a_sqr * (2 * _y - 1) > 2 * b_sqr * (_x + 1)) // Первая часть дуги
//             {
//                 pixel4(x, y, _x, _y, color_a);
//                 if (delta < 0) // Переход по горизонтали
//                 {
//                     _x++;
//                     delta += 4 * b_sqr * (2 * _x + 3);
//                 }
//                 else // Переход по диагонали
//                 {
//                     _x++;
//                     delta = delta - 8 * a_sqr * (_y - 1) + 4 * b_sqr * (2 * _x + 3);
//                     _y--;
//                 }
//             }
//             delta = b_sqr * ((2 * _x + 1) * (2 * _x + 1)) + 4 * a_sqr * ((_y + 1) * (_y + 1)) - 4 * a_sqr * b_sqr; // Функция координат точки (x+1/2, y-1)
//             while (_y + 1 != 0) // Вторая часть дуги, если не выполняется условие первого цикла, значит выполняется a^2(2y - 1) <= 2b^2(x + 1)
//             {
//                 pixel4(x, y, _x, _y, color_b);
//                 if (delta < 0) // Переход по вертикали
//                 {
//                     _y--;
//                     delta += 4 * a_sqr * (2 * _y + 3);
//                 }
//                 else // Переход по диагонали
//                 {
//                     _y--;
//                     delta = delta - 8 * b_sqr * (_x + 1) + 4 * a_sqr * (2 * _y + 3);
//                     _x++;
//                 }
//             }
//         }
 
//         private void button1_Click(object sender, EventArgs e) // Рисование эллипса по нажатию кнопки
//         {
//             g = Graphics.FromHwnd(pictureBox1.Handle);
//             g.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.AntiAlias;
//             if (textBox1.Text != "")
//                 x = Convert.ToInt32(textBox1.Text);
//             else x = pictureBox1.Width / 2;
//             if (textBox2.Text != "")
//                 y = Convert.ToInt32(textBox2.Text);
//             else y = pictureBox1.Height / 2;
//             if (textBox3.Text != "")
//                 a = Convert.ToInt32(textBox3.Text);
//             else a = 100;
//             if (textBox4.Text != "")
//                 b = Convert.ToInt32(textBox4.Text);
//             else b = 100;
//             draw_ellipse(x, y, a, b, red, blue);
//         }
//     }
// }