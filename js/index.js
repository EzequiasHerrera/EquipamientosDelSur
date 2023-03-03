const product_list = document.querySelector('.product_list'),
    urlParams = new URLSearchParams(window.location.search),
    modeloURL = urlParams.get('modelo'),
    fechaActual = new Date();

let fechaSeleccionada = new Date();
// IMPRIMIR CARDS CON DATOS EN PAGINA PRINCIPAL
fetch('/nebulizadores/php/main.php')
    .then(function (response) {
        return response.json();
    })
    .then(function (nebulizadores) {
        let precios = {};
        let preciosBase = {};

        nebulizadores.forEach(nebulizador => {
            let nombreVariable = 'precio' + nebulizador.modelo;
            // CONSIGO EL PRECIO Y LA BASE DE LA BASE DE DATOS Y LA GUARDO
            precios[nombreVariable] = nebulizador.precio;
            preciosBase[nombreVariable] = nebulizador.preciobase;

            product_list.innerHTML +=
                '<a href="#" id="modelo' + nebulizador.modelo + '">' +
                '<div class="card" >' +
                '<img src="img/art' + nebulizador.modelo + '.webp" alt="">' +
                '<div class="line"></div>' +
                '<div class="card_text">' +
                '<small class="stock_text' + nebulizador.modelo + '">DISPONIBLES: ' + nebulizador.stock + '</small>' +
                '<p id="nombre_art' + nebulizador.modelo + '" class="art_name">' + nebulizador.nombre + '</p>' +
                '<p class="art_desc">' + nebulizador.descripcion + '</p>' +
                '</div>' +
                '</div>' +
                '</a >'
        });
        // DEFINO DONDE VOY A COLOCAR EL MENÚ
        const main = document.querySelector("main");
        // ----------------------------------------------------------------------------------------------------------------------------
        // VARIABLES QUE VOY A NECESITAR:
        let precioTotal,
            nombre_cliente,
            dni_cliente,
            telefono_cliente,
            fecha_devolucion,
            modelo_alquilado;

        // ----------------------------------------------------------------------------------------------------------------------------
        function abrirVentanaAlquiler(idModelo, valorxDia, art, base) {
            // GUARDO EL NOMBRE DEL PRODUCTO PARA PODER MOSTRARLO Y CONVIERTO EL NOMBRE A TEXTO
            let nombre = (document.getElementById(`nombre_art${art}`)).textContent;
            if (art != "4") {
                const etiquetaVentana = '<div id="ventanaCompra"><div class="ventana"><p class="titulo_card">' + nombre.toUpperCase() + '</p><img src="img/art' + art + '.webp" alt="art' + art + '"><label for="fecha">Seleccione la fecha de fin</label><input type="date" id="fecha" max="2025-12-31"><div><p class="txtFecha">Días seleccionados: 0</p><p class="valorAlquiler"></p><button class="btn-confirmar" type="submit">CONFIRMAR</button></div></div></div></div>',
                    modelo = document.getElementById(idModelo);

                // GUARDO EL MODELO QUE SE QUIERE ALQUILAR
                modelo_alquilado = art;
                // ----------------------------------------------------------------------------------------------------------------------------
                const stock = document.querySelector(`.stock_text${art}`);
                modelo.addEventListener('click', () => {
                    if (stock.textContent != "DISPONIBLES: 0") {
                        const contenedor = document.createElement('div');

                        contenedor.classList.add('contenedor');
                        contenedor.innerHTML = etiquetaVentana;

                        // COLOCO VENTANA CON EL MENU AL INICIO DEL MAIN
                        main.insertBefore(contenedor, main.firstChild);

                        // OBTENGO EL BOTON DE CONFIRMAR
                        const btnConfirmar = document.querySelector('.btn-confirmar');

                        // DEFINO LA FECHA MINIMA Y MAXIMA
                        const inputFecha = document.getElementById('fecha');
                        let dias = 0;

                        // DEFINO COMO FECHA MINIMA EL DÍA DE HOY
                        inputFecha.setAttribute("min", fechaActual.toISOString().split("T")[0]);

                        // OBTENGO EL OBJETO VENTANA PARA PODER CERRARLO CUANDO CLICKEO FUERA
                        const ventanaCompra = document.getElementById('ventanaCompra');
                        ventanaCompra.addEventListener('click', (event) => {
                            // SI EL ELEMENTO CLICKEADO ES FUERA DE LA VENTANA, ENTONCES LO ELIMINO
                            if (event.target === ventanaCompra) {
                                ventanaCompra.parentNode.removeChild(ventanaCompra);
                                const contenedor = document.querySelector('.contenedor');
                                contenedor.remove();
                            }
                        });

                        // DETECTO EL CAMBIO DEL CALENDARIO Y CALCULO EL PRECIO DEL ALQUILER
                        inputFecha.addEventListener('change', () => {
                            fechaSeleccionada = new Date(inputFecha.value + 'T00:00:00-03:00');
                            const textoFecha = document.querySelector(".txtFecha"),
                                valorTotal = document.querySelector(".valorAlquiler");

                            fecha_devolucion = fechaSeleccionada;
                            //diferencia obtiene el resultado en milisegundos y debo convertirlo en días
                            let diferencia = (fechaSeleccionada.getTime() - fechaActual.getTime()) / (1000 * 60 * 60 * 24);
                            dias = Math.ceil(diferencia);

                            textoFecha.innerText = "Días seleccionados: " + dias;
                            valorTotal.innerText = "El coste del alquiler es de: $" + calculoValor(valorxDia, dias, base);
                            precioTotal = calculoValor(valorxDia, dias, base);
                        })

                        btnConfirmar.addEventListener('click', () => {
                            if (dias > 0) {
                                const ventana = document.querySelector(".ventana");
                                vaciarEtiqueta(ventana);
                                generarFormulario(ventana);
                                const btnConfirmar = document.querySelector(".btn-confirmar-datos"),
                                    nombre = document.getElementById('input-nombre'),
                                    apellido = document.getElementById('input-apellido'),
                                    dni = document.getElementById('input-dni'),
                                    domicilio = document.getElementById('input-domicilio'),
                                    tel = document.getElementById('input-tel'),
                                    aviso = document.getElementById('aviso-tel');

                                // nombre, dni, domicilio, telefono, pago, fechadev, modeloAlquilado
                                btnConfirmar.addEventListener('click', () => {
                                    if (nombre.value != "" || apellido.value != "" || dni.value != "" || domicilio.value != "" || tel.value != "") {
                                        if (contarDigitos(dni)) {
                                            nombre_cliente = (apellido.value + " " + nombre.value).toUpperCase();
                                            dni_cliente = dni.value;
                                            domicilio_cliente = (domicilio.value).toUpperCase();
                                            telefono_cliente = tel.value;

                                            // GENERACION DEL CONTRATO DE ALQUILER:
                                            generarPDF(nombre_cliente, dni_cliente, domicilio_cliente, telefono_cliente, precioTotal, "20/05/2023", art);
                                            enviarDatosAlPHP(art, nombre_cliente, dni_cliente, telefono_cliente, fechaActual, fecha_devolucion, domicilio_cliente, precioTotal);

                                            Swal.fire({
                                                position: 'top-end',
                                                icon: 'success',
                                                title: 'Su alquiler ha sido correctamente registrado',
                                                showConfirmButton: false,
                                                timer: 1500
                                            })
                                        } else { aviso.textContent = "* Ingrese un DNI válido." }
                                    } else { aviso.textContent = "* Asegurese de rellenar todos los campos." }
                                });
                            } else {
                                Swal.fire({
                                    title: 'Seleccione fecha de devolución',
                                    text: 'Revise la fecha de devolución.',
                                    icon: 'error',
                                    confirmButtonText: 'Gracias!'
                                })
                            }
                        });
                    } else {
                        Swal.fire({
                            title: 'Sin Stock Disponible!',
                            text: 'Lo lamentamos, no contamos con stock. Comuniquese para informarse acerca de fechas de disponibildad.',
                            icon: 'info',
                            confirmButtonText: 'Gracias!'
                        })
                    }
                });
            }
            else {
                // CREO LA VENTANA ALQUILER PARA PODER GENERARLA LUEGO
                const etiquetaVentana = `<div id="ventanaCompra"><div class="ventana"><p class="titulo_card">${nombre.toUpperCase()}</p><img src="img/art${art}.webp" alt="art${art}"><label for="fecha">Seleccione la fecha de alquiler</label><input type="date" id="fecha" max="2025-12-31"><div><p class="txtFecha">Disponible para 1 solo día</p><p class="valorAlquiler">$${base}</p><button class="btn-confirmar" type="submit">CONFIRMAR</button></div></div></div></div>`,
                    modelo = document.getElementById(idModelo);

                // GUARDO EL MODELO QUE SE QUIERE ALQUILAR
                modelo_alquilado = art;

                // ----------------------------------------------------------------------------------------------------------------------------
                // GUARDO CON EL ID EL LUGAR DONDE DEBO COLOCAR EL STOCK
                const stock = document.querySelector(`.stock_text${art}`);

                // AL HACER CLICK EN EL MODELO:
                modelo.addEventListener('click', () => {
                    // SI HAY STOCK
                    if (stock.textContent != "DISPONIBLES: 0") {
                        // CREO EL CONTENEDOR Y LE DOY LA CLASE CONTENEDOR
                        const contenedor = document.createElement('div');
                        contenedor.classList.add('contenedor');

                        // INTRODUZCO LA VENTANA DENTRO DEL CONTENEDOR
                        contenedor.innerHTML = etiquetaVentana;

                        // COLOCO VENTANA CON EL MENU AL INICIO DEL MAIN
                        main.insertBefore(contenedor, main.firstChild);

                        // OBTENGO EL BOTON DE CONFIRMAR
                        const btnConfirmar = document.querySelector('.btn-confirmar');

                        // DEFINO LA FECHA MINIMA Y MAXIMA
                        const inputFecha = document.getElementById('fecha');
                        // INICIALIZO LOS DIAS EN 0
                        let dias = 0;

                        // DEFINO COMO FECHA MINIMA EL DÍA DE HOY
                        inputFecha.setAttribute("min", fechaActual.toISOString().split("T")[0]);

                        // OBTENGO EL OBJETO VENTANA PARA PODER CERRARLO CUANDO CLICKEO FUERA
                        const ventanaCompra = document.getElementById('ventanaCompra');
                        ventanaCompra.addEventListener('click', (event) => {
                            // SI EL ELEMENTO CLICKEADO ES FUERA DE LA VENTANA, ENTONCES LO ELIMINO
                            if (event.target === ventanaCompra) {
                                ventanaCompra.parentNode.removeChild(ventanaCompra);
                                const contenedor = document.querySelector('.contenedor');
                                contenedor.remove();
                            }
                        });

                        // DETECTO EL CAMBIO DEL CALENDARIO Y CALCULO EL PRECIO DEL ALQUILER
                        inputFecha.addEventListener('change', () => {
                            fechaSeleccionada = new Date(inputFecha.value + 'T00:00:00-03:00');
                            // AL SER EL ARTICULO 4 SOLAMENTE PUEDE ALQUILARSE UN DÍA POR LO QUE LE SUMO UN DÍA A LA FECHA SELECCIONADA
                            fecha_devolucion = new Date(fechaSeleccionada.getTime() + 24 * 60 * 60 * 1000); // Sumamos un día en milisegundos
                            dias = 1;
                            // EL PRECIO TOTAL SERÁ LA BASE SIEMPRE
                            precioTotal = base;
                        })

                        // CONFIRMO LOS DÍAS Y LO COMPRUEBO
                        btnConfirmar.addEventListener('click', () => {
                            // SI ELEGÍ UN DÍA VALIDO:
                            if (dias > 0) {
                                // GUARDO LA VENTANA EN UN OBJETO VENTANA
                                const ventana = document.querySelector(".ventana");

                                // VACÍO LA VENTANA
                                vaciarEtiqueta(ventana);

                                // GENERO EL FORMULARIO SIGUIENTE
                                generarFormulario(ventana);

                                // GUARDO LOS DATOS QUE INGRESAN EN LOS INPUTS SEGUN SU ID Y EL BOTON DE CONFIRMAR
                                const btnConfirmar = document.querySelector(".btn-confirmar-datos"),
                                    nombre = document.getElementById('input-nombre'),
                                    apellido = document.getElementById('input-apellido'),
                                    dni = document.getElementById('input-dni'),
                                    domicilio = document.getElementById('input-domicilio'),
                                    tel = document.getElementById('input-tel'),
                                    aviso = document.getElementById('aviso-tel');

                                // AL PRESIONAR EN CONFIRMAR:
                                btnConfirmar.addEventListener('click', () => {
                                    // COMPRUEBO QUE NO HAYA ESPACIOS VACÍOS
                                    if (nombre.value != "" || apellido.value != "" || dni.value != "" || domicilio.value != "" || tel.value != "") {
                                        // CUENTO LOS DIGITOS DEL DNI PARA COMPROBAR LA VALIDEZ
                                        if (contarDigitos(dni)) {
                                            // JUNTO EL APELLIDO Y EL NOMBRE Y LOS CONVIERTO EN MAYUSCULAS
                                            nombre_cliente = (apellido.value + " " + nombre.value).toUpperCase();
                                            dni_cliente = dni.value;
                                            domicilio_cliente = (domicilio.value).toUpperCase();
                                            telefono_cliente = tel.value;

                                            // GENERACION DEL CONTRATO DE ALQUILER:
                                            generarPDF(nombre_cliente, dni_cliente, domicilio_cliente, telefono_cliente, precioTotal, fecha_devolucion, art);
                                            enviarDatosAlPHP(art, nombre_cliente, dni_cliente, telefono_cliente, fechaActual, fecha_devolucion, domicilio_cliente, precioTotal);

                                            Swal.fire({
                                                position: 'top-end',
                                                icon: 'success',
                                                title: 'Su alquiler ha sido correctamente registrado',
                                                showConfirmButton: false,
                                                timer: 1500
                                            })
                                        } else { aviso.textContent = "* Ingrese un DNI válido." }
                                    } else { aviso.textContent = "* Asegurese de rellenar todos los campos." }
                                });
                            } else {
                                Swal.fire({
                                    title: 'Seleccione fecha de devolución',
                                    text: 'Revise la fecha de devolución.',
                                    icon: 'error',
                                    confirmButtonText: 'Gracias!'
                                })
                            }
                        });
                    } else {
                        Swal.fire({
                            title: 'Sin Stock Disponible!',
                            text: 'Lo lamentamos, no contamos con stock. Comuniquese para informarse acerca de fechas de disponibildad.',
                            icon: 'info',
                            confirmButtonText: 'Gracias!'
                        })
                    }
                });
            }
        }
        // ----------------------------------------------------------------------------------------------------------------------------
        // EN ESTE LUGAR DEFINO EL VALOR DE CADA PRODUCTO
        abrirVentanaAlquiler("modelo1", parseFloat(precios.precio1), "1", preciosBase.precio1);
        abrirVentanaAlquiler("modelo2", parseFloat(precios.precio2), "2", preciosBase.precio2);
        abrirVentanaAlquiler("modelo3", parseFloat(precios.precio3), "3", preciosBase.precio3);
        abrirVentanaAlquiler("modelo4", parseFloat(precios.precio4), "4", preciosBase.precio4);

        if (modeloURL === '1') {
            const modURL = document.getElementById("modelo1").click();
        } else if (modeloURL === '2') {
            const modURL = document.getElementById("modelo2").click();
        } else if (modeloURL === '3') {
            const modURL = document.getElementById("modelo3").click();
        } else if (modeloURL === '4') {
            const modURL = document.getElementById("modelo4").click();
        };
    })
    .catch(function (error) {
        console.error('Hubo un error al obtener los datos:', error);
    });


function calculoValor(valor, dias, base) {
    if (dias == 1) {
        return base;
    }
    return ((valor * (dias)) + parseFloat(base));
}

function vaciarEtiqueta(etiqueta) {
    etiqueta.innerHTML = "";
}

function formatearFecha(fecha) {
    const dia = fecha.getUTCDate().toString().padStart(2, '0');
    const mes = (fecha.getUTCMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getUTCFullYear().toString().substr(-2);
    return (`${dia}/${mes}/${anio}`);
}

function generarFormulario(contenedor) {
    contenedor.innerHTML =
        `<h2>RELLENA EL FORMULARIO</h2>
        <div class="line"></div>
        <div>
            <p>Nombre</p>
            <input type="text" name="nombre" id="input-nombre">
        </div>
        <div>
            <p>Apellido</p>
            <input type="text" name="apellido" id="input-apellido">
        </div>
        <div>
            <p>DNI (Sin puntos)</p>
            <input type="text" name="" id="input-dni">
            <small id="aviso-dni"></small>
        </div>
        <div>
            <p>Domicilio (Calle Altura)</p>
            <input type="text" name="" id="input-domicilio">
            <small id="aviso-domicilio"></small>
        </div>
        <div>
            <p>Telefono ej: (2262112233)</p>
            <input type="tel" name="" id="input-tel">
            <small id="aviso-tel"></small>
    </div>
    <button class="btn-confirmar-datos" type="submit">CONFIRMAR</button>`
}

function contarDigitos(dni) {
    const valor = dni.value;
    const digitos = valor.replace(/\D/g, '');
    const cantidadDigitos = digitos.length;
    if (cantidadDigitos < 8) {
        return false;
    } else { return true; }
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

function enviarDatosAlPHP(modelo, nombre_cliente, dni_cliente, telefono_cliente, fechaActual, fecha_devolucion, domicilio_cliente, precioTotal) {

    let anio = fechaActual.getFullYear();
    let mes = fechaActual.getMonth();
    let dia = fechaActual.getDate();
    fechaActual = anio + '-' + (mes + 1).toString().padStart(2, '0') + '-' + dia.toString().padStart(2, '0');
    anio = fecha_devolucion.getFullYear();
    mes = fecha_devolucion.getMonth();
    dia = fecha_devolucion.getDate();
    fecha_devolucion = anio + '-' + (mes + 1).toString().padStart(2, '0') + '-' + dia.toString().padStart(2, '0');
    // Creo el objeto con los datos
    const datos = {
        id_nebulizador: modelo,
        nombre_cliente: nombre_cliente,
        dni_cliente: dni_cliente,
        telefono_cliente: telefono_cliente,
        fecha_hoy: fechaActual,
        fecha_devolucion: fecha_devolucion,
        domicilio_cliente: domicilio_cliente,
        precioTotal: precioTotal
    };

    $.post("/nebulizadores/php/upload.php", datos, function (response) {
        if (response) {
            const ventana = document.querySelector(".ventana");
            vaciarEtiqueta(ventana);
            ventana.innerHTML = `<h1>Sus datos han sido correctamente registrados</h1><h2>El codigo de trámite es <span>${response}</span></h2><p id="texto_wpp">Aguarde mientras procesamos el contrato en PDF con sus datos.</p><a href="https://wa.me/92262232518?text=Hola!%20Acabo%20de%20confirmar%20mi%20alquiler...%20Mi%20codigo%20de%20tramite%20es%20${response}"><img id="whatsapp_img" src="/nebulizadores/img/WhatsAppButtonGreen.svg" alt=""></a>`
        } else {
            console.log("Hubo un error");
        }
    });
}