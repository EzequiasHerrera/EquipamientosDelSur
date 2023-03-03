const alquileres_list = document.querySelector('.alquileres_list'),
  btn_prices = document.getElementById('btn_edit_prices'),
  main = document.querySelector("main");

const username = prompt("Ingrese su usuario:");
const password = prompt("Ingrese su contraseña:");

// Verificar si se ingresaron los datos y enviarlos al servidor
if (username && password && username != "" && password != "") {
  // Enviar los datos al servidor utilizando AJAX
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      const response = this.responseText;
      if (response === "ok") {
        alert("Acceso concedido");
        fetch('/nebulizadores/php/bdalquileres.php')
          .then(function (response) {
            return response.json();
          })
          .then(function (alquileres) {
            // AQUI DEBO GENERAR LOS CARDS CON LOS ALQUILERES
            alquileres.forEach(alquiler => {
              alquileres_list.innerHTML +=
                `<div class="card_alquiler" data-alquiler-id="${alquiler.id}">
                <strong id="nombre_cliente">${alquiler.nombre_cliente}</strong>
                <div class="line"></div>
                <div class="div-img">
                  <img src="../img/art${alquiler.id_nebulizador}.webp" alt="">
                </div>
                <div class="div-flex">
                  <strong>ID: </strong>
                  <p data-alquiler-id="${alquiler.id}">${alquiler.id}</p>
                </div>
                <div class="div-flex">
                  <strong>MODELO: </strong>
                  <p id="modelo_cliente">${alquiler.id_nebulizador}</p>
                </div>
                <div class="div-flex">
                  <strong>DNI: </strong>
                  <p id="dni_cliente">${alquiler.dni_cliente}</p>
                </div>
                <div class="div-flex">
                  <strong>TEL: </strong>
                  <p id="tel_cliente">${alquiler.tel_cliente}</p>
                </div>
                <div class="div-flex">
                  <strong>DOMICILIO: </strong>
                  <p id="dom_cliente">${alquiler.domicilio}</p>
                </div>
                <div class="div-flex">
                  <strong>PAGO: </strong>
                  <p id="pago_cliente">${alquiler.pago}</p>
                </div>
                <div class="div-flex">
                  <strong>INICIO: </strong>
                  <p id="fecha_inicio">${(alquiler.fecha_inicio).slice(0, 10)}</p>
                </div>
                <div class="div-flex">
                  <strong>VENC.: </strong>
                  <p id="fecha_vencimiento">${(alquiler.fecha_vencimiento).slice(0, 10)}</p>
                </div>
                <button type="submit" class="btn-Borrar">BORRAR</button>
                <button type="submit" class="btn-Generar">GENERAR PDF</button>
              </div>`;
            });

            // Seleccionar todos los botones de borrar
            const botonesBorrar = document.querySelectorAll('.btn-Borrar');
            const botonesGenerar = document.querySelectorAll('.btn-Generar');

            // Agregar un controlador de eventos a cada botón
            botonesGenerar.forEach(function (botonGenerar) {
              botonGenerar.addEventListener('click', function () {
                // Obtener la card de la que se va a borrar el alquiler
                const cardAlquiler = botonGenerar.closest('.card_alquiler');
                // Obtener el ID del alquiler de la card
                const idAlquiler = cardAlquiler.dataset.alquilerId;
                const nombreAlquiler = cardAlquiler.querySelector('#nombre_cliente').textContent;
                const dniAlquiler = cardAlquiler.querySelector('#dni_cliente').textContent;
                const domAlquiler = cardAlquiler.querySelector('#dom_cliente').textContent;
                const telAlquiler = cardAlquiler.querySelector('#tel_cliente').textContent;
                const pagoAlquiler = cardAlquiler.querySelector('#pago_cliente').textContent;
                const fechaVenAlquiler = cardAlquiler.querySelector('#fecha_vencimiento').textContent;
                const modeloAlquiler = cardAlquiler.querySelector('#modelo_cliente').textContent;

                generarPDF(nombreAlquiler, dniAlquiler, domAlquiler, telAlquiler, pagoAlquiler, fechaVenAlquiler, modeloAlquiler);
              });
            })

            // Agregar un controlador de eventos a cada botón
            botonesBorrar.forEach(function (botonBorrar) {
              botonBorrar.addEventListener('click', function () {
                // Obtener la card de la que se va a borrar el alquiler
                const cardAlquiler = botonBorrar.closest('.card_alquiler');
                // Obtener el ID del alquiler de la card
                const idAlquiler = cardAlquiler.dataset.alquilerId;
                const options = {
                  method: 'POST',
                  body: JSON.stringify({ idAlquiler: idAlquiler })
                };

                // Hacer la solicitud
                fetch('../php/borrarAlquileres.php', options)
                  .then(response => response.text())
                  .then(data => console.log(data))
                  .catch(error => console.error(error));
              });
            })
          })
          .catch(function (error) {
            console.error('Hubo un error al obtener los datos:', error);
          });

        btn_prices.addEventListener('click', () => {
          const contenedor = document.createElement('div');
          contenedor.classList.add('contenedor');
          contenedor.innerHTML =
            `<div id="ventanaCompra"><div class="ventana ventanaPrecios formulario"><h2>CAMBIO DE PRECIOS</h2>
  <div class="line"></div>
  <div class="imgInput">
      <p>MODELO 1</p>
      <img id="imgPrecios" src="../img/art1.webp" alt="logo">
      <div class="dosInputs">
        <div class="tit_input">
          <h3>PRECIO POR DÍA</h3>
          <input type="text" name="" id="precio-modelo1">
        </div>
        <div class="tit_input">
          <h3>PRECIO BASE</h3>
          <input type="text" name="" id="base-modelo1">
        </div>
      </div>
  </div>
  <div class="imgInput">
      <p>MODELO 2</p>
      <img id="imgPrecios" src="../img/art2.webp" alt="logo">
      <div class="dosInputs">
        <div class="tit_input">
          <h3>PRECIO POR DÍA</h3>
          <input type="text" name="" id="precio-modelo2">
        </div>
        <div class="tit_input">
          <h3>PRECIO BASE</h3>
          <input type="text" name="" id="base-modelo2">
        </div>
      </div>
  </div>
  <div class="imgInput">
      <p>MODELO 3</p>
      <img id="imgPrecios" src="../img/art3.webp" alt="logo">
      <div class="dosInputs">
        <div class="tit_input">
          <h3>PRECIO POR DÍA</h3>
          <input type="text" name="" id="precio-modelo3">
        </div>
        <div class="tit_input">
          <h3>PRECIO BASE</h3>
          <input type="text" name="" id="base-modelo3">
        </div>
      </div>
  </div>
  <div class="imgInput">
      <p>MODELO 4</p>
      <img id="imgPrecios" src="../img/art4.webp" alt="logo">
      <div class="dosInputs">
        <div class="tit_input">
          <h3>PRECIO POR DÍA</h3>
          <input type="text" name="" id="precio-modelo4">
        </div>
        <div class="tit_input">
          <h3>PRECIO BASE</h3>
          <input type="text" name="" id="base-modelo4">
        </div>
      </div>
  </div>
<button id="btn-confirmar-precios" type="submit">CONFIRMAR</button></div></div>`;

          // COLOCO VENTANA CON EL MENU AL INICIO DEL MAIN
          main.insertBefore(contenedor, main.firstChild);

          // ESCUCHA EL CLICK FUERA DE LA VENTANA PARA CERRARLA
          const ventanaCompra = document.getElementById('ventanaCompra');
          ventanaCompra.addEventListener('click', (event) => {
            // SI EL ELEMENTO CLICKEADO ES FUERA DE LA VENTANA, ENTONCES LO ELIMINO
            if (event.target === ventanaCompra) {
              ventanaCompra.parentNode.removeChild(ventanaCompra);
              const contenedor = document.querySelector('.contenedor');
              contenedor.remove();
            }
          });

          const btn_ConfirmPrices = document.getElementById('btn-confirmar-precios');

          btn_ConfirmPrices.addEventListener('click', () => {
            const precioModelo1 = document.getElementById('precio-modelo1').value;
            const precioModelo2 = document.getElementById('precio-modelo2').value;
            const precioModelo3 = document.getElementById('precio-modelo3').value;
            const precioModelo4 = document.getElementById('precio-modelo4').value;
            const baseModelo1 = document.getElementById('base-modelo1').value;
            const baseModelo2 = document.getElementById('base-modelo2').value;
            const baseModelo3 = document.getElementById('base-modelo3').value;
            const baseModelo4 = document.getElementById('base-modelo4').value;

            const formData = new FormData();
            formData.append('precioModelo1', precioModelo1);
            formData.append('precioModelo2', precioModelo2);
            formData.append('precioModelo3', precioModelo3);
            formData.append('precioModelo4', precioModelo4);

            formData.append('baseModelo1', baseModelo1);
            formData.append('baseModelo2', baseModelo2);
            formData.append('baseModelo3', baseModelo3);
            formData.append('baseModelo4', baseModelo4);

            const options = {
              method: 'POST',
              body: formData
            };

            fetch('/nebulizadores/php/cambiarPrecios.php', options)
              .then(response => response.text())
              .then(data => console.log(data))
              .then(() => {
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Los precios han sido correctamente modificados.',
                  showConfirmButton: false,
                  timer: 1500
                });
              })
              .catch(error => console.error(error));
          });
        })
      } else {
        alert("Acceso denegado");
        window.location.href = "../index.php";
      }
    }
  };
  xhttp.open("POST", "/nebulizadores/php/verificarUsuario.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(`username=${username}&password=${password}`);
}

function generarPDF(nombre, dni, domicilio, telefono, pago, fechadev, modeloAlquilado) {
  const fecha = new Date();
  let pdf = new jsPDF();

  // Establece el tamaño de fuente para el título
  pdf.setFontSize(13);

  // Define el texto del título
  let title = "TRATO DE ALQUILER DE NEBULIZADOR/ASPIRADOR";

  // Calcula el ancho del título en unidades de medida del PDF
  let titleWidth = pdf.getStringUnitWidth(title) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;

  // Calcula la posición x del título para que esté centrado
  let x = (pdf.internal.pageSize.width - titleWidth) / 2;

  // Añade el título al PDF
  pdf.text(title, x, 20);

  // Definir opciones de texto
  var options = {
    align: "justify",
    lineHeight: 1.2,
    maxWidth: 170,
  };

  // Agregar texto al documento
  pdf.setFontSize(10);

  pdf.text("En Necochea en la fecha de " + fecha + " entre LOCADOR con domicilio en DIRECCION_DEL_LOCADOR en adelante el locador, y " + nombre + " DNI (" + dni + ") con domicilio en " + domicilio + ". En adelante el locatario, se ha convenido en celebrar el presente contrato de locación de OBJETO el que se regirá por las siguientes cláusulas:", 20, 30, options);
  pdf.text("PRIMERO: Objeto: OBJETO entrega en locación al locatario, quien recibe de entera conformidad la siguiente maquina: " + modeloAlquilado + ".", 20, 50, options);
  pdf.text("SEGUNDA: El locatario destinará la maquina para ................................................", 20, 60, options);
  pdf.text("TERCERA: Precio. El precio de la locación se fija en la suma de pesos $" + pago + ".", 20, 70, options);
  pdf.text("CUARTA: Traslados. El precio estipulado en la cláusula anterior no incluye gastos de entrega, traslados, ni recepción, los que quedarán a cargo de la parte locataria.", 20, 80, options);
  pdf.text("QUINTA: Plazo. El inicio de la locación se produce en el día de la fecha a las ........ y finaliza el día " + fechadev + " a las ....... horas, termino perentorio e improrrogable, en el que deberán restituirse la maquina al locador en el domicilio de la calle XX n° xxxx de Necochea. El cumplimiento de la hora establecida para la devolución generara como pena sin excepcion, el importe correspondiente aun día de alquiler (clausula 3°) El incumplimiento de la fecha establecida para la devolucion dará derecho al locador a declarar resuelto el contrato, haciendo efectivo el deposito en garantía, con mas daños y perjuicios. En caso de que el locatario reintegrara la cosa al locador antes de la finalización del plazo convenido, no tendrá derecho a reintegro o descuento de la suma abonada en concepto de alquiler.", 20, 90, options);
  pdf.text("SEXTA: Condiciones de entrega. El locador entrega las herramientas en perfectas condiciones de operación para ser usada con el destino convenido, y el locatario las recibe prestando conformidad con tales condiciones, que declara conocer y aceptar, sin efectuar reserva alguna. Será obligación del locatario informarse sobre la forma de uso de las herramientas", 20, 125, options);
  pdf.text("SEPTIMA: Reparaciones. En caso de que, observando el destino y el buen uso de las herramientas lacadas, se produjera algún desperfecto en las mismas, el servicio de mantenimiento y reparación será efectuado exclusivamente por el locador, sin cargo alguno. Toda reparación realizada por el locatario durante la vigencia del contrato será por cuente y orden del mismo, no pudiendo reclamar el reintegro del valor que hubiese gastado, y asumiendo las responsabilidades que de tal acto deriven", 20, 143, options);
  pdf.text("OCTAVA: Obligaciones del locatario. El presente contrato es intransferible no pudiendo el locatario subalquilar las herramientas, ni ceder o transferir la locación en forma alguna, ni aun en los casos previstos en el CODIGO CIVIL. Tampoco podrá el locatario introducir modificaciones de ninguna naturaleza a las herramientas, o quitar, raspar o alterar en manera alguna las placas de identidad de la propiedad, numero, modelo y marca de la herramienta. Es obligación del locatario efectuar un uso normal de la herramienta de acuerdo a sus caracteristicas técnico y destino, los que declara conocer mantenerla en buen estado de conservación y devolverla en el mismo estado que la recibió, notificar inmediatamente al locador de todo desperfecto que pueda sufrir la herramientas, como de cualquier intervención o violación efectuada por terceros respecto de sus derechos.", 20, 163, options);
  let y = 163;
  pdf.text(`NOVENA. La falta de corriente eléctrica, combustible o cualquier otra circunstancia ajena a la voluntad del locador que impidiera hacer uso de las herramientas, no eximirá al locatario de cumplir las obligaciones emergentes del presente contrato
  `, 20, y = y + 40, options);
  pdf.text(`DECIMA: Perdida. El locatario responderá por toda perdida total o parcial o deterioro o rotura, total o parcial que sufrieran las cosas locadas, provocadas, por no observar condiciones de buen uso a juicio del locador. A tales fines el locatario se compromete a entregar una suma equivalente en pesos al precio en plaza, pudiendo imputarse, a esos efectos, el deposito en garantía constituido de conformidad con la Cláusula Décimo Tercera, o una /s maquinas/s de las mismas características o estado de conservación, a elección del locador.`, 20, y = y + 15, options);
  pdf.text(`DECIMO PRIMERA: El locador no se responsabiliza de los daños y perjuicios que pudieran producir al locatario y/o sus familiares y/o terceros y/o bienes, el uso de las herramientas lacadas.`, 20, y = y + 25, options);
  pdf.text(`DECIMO SEGUNDA: Incumplimiento. En caso de incumplimiento de parte del locatario de cualquiera de las obligaciones estipuladas en el presente en tiempo y forma acordados,este contrato quedara resuelto de pleno derecho, sin necesidad de interpelación judicial previa, y dara derecho al locador para exigir la restitución de la cosa y/o iniciar juicio ejecutivo con base en el pagare suscripto como deposito en garantia,con mas los daños, perjuicios e intereses a que se hubiere lugar en ambos casos a su elección, queda pactada la mora automática`, 20, y = y + 10, options);

  pdf.addPage();

  pdf.text(`DECIMO TERCERA: Depósito en garantía. En garantía de cumplimiento de todas las obligaciones asumidas el locatario suscribe a favor del locador un pagare por la suma de pesos.......... Si las herramientas se entregan en buen estado de uso y conservación y en tiempo oportuno él pagare será reintegrado al momento de la restitución de las mismas. En caso de incumplimiento se observa lo dispuesto en la cláusula anterior.`, 20, y = 10, options);
  pdf.text(`DECIMO CUARTA: Los contratantes se someten para cualquier divergencia que pudiera surgir de la interpretación y aplicación del presente contrato, a la Jurisdicción de los Tribunales Ordinarios de Necochea renunciando a todo otro fuero o jurisdicción que pudiera corresponderles, inclusive la federal.`, 20, y = y + 20, options);
  pdf.text(`DECIMO QUINTA: Domicilios. Para todos los efectos legales los firmantes constituyen como domicilios especiales los señalados a comienzo del contrato en los que serán validas todas las notificaciones y diligencia que se practiquen aunque los interesados no vivan o no se encuentren en ellos.`, 20, y = y + 20, options);
  pdf.text(`Firma............................         Firma............................`, 20, y = y + 20, options);
  pdf.text(`Aclaración.......................         Aclaración.......................`, 20, y = y + 20, options);
  pdf.text(`Vence el ....... de .......... del 20..... por $..............`, 20, y = y + 20, options)
  pdf.text(`PAGARÉ SIN PROTESTO AL SEÑOR .............................`, 20, y = y + 20, options)
  pdf.text(`LA CANTIDAD DE PESOS .....................................`, 20, y = y + 20, options)
  pdf.text(`Pagadero en ..................`, 20, y = y + 20, options)
  pdf.text(`Firmante ..................`, 20, y = y + 20, options)
  pdf.text(`D.N.I/L.E/L.C ..................`, 20, y = y + 20, options)
  pdf.text(`Domicilio ..................`, 20, y = y + 20, options)
  pdf.text(`Localidad ..................`, 20, y = y + 20, options)
  pdf.save("contrato_" + nombre + ".pdf");
}