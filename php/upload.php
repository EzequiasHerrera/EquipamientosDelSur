<?php

// ENLAZO EL ARCHIVO DE CONEXION PARA OBTENER LA BASE DE DATOS
include("connection.php");

// Recibir los datos del formulario
$id_nebulizador = $_POST['id_nebulizador'];
$nombre_cliente = $_POST['nombre_cliente'];
$dni_cliente = $_POST['dni_cliente'];
$telefono_cliente = $_POST['telefono_cliente'];
$fecha_hoy = $_POST['fecha_hoy'];
$fecha_devolucion = $_POST['fecha_devolucion'];
$domicilio_cliente = $_POST['domicilio_cliente'];
$pago = $_POST['precioTotal'];

// Preparar la consulta para insertar los datos en la tabla "alquileres"
$query = "INSERT INTO alquileres (id_nebulizador, nombre_cliente, dni_cliente, tel_cliente, domicilio, pago, fecha_inicio, fecha_vencimiento) VALUES ('$id_nebulizador', '$nombre_cliente', '$dni_cliente', '$telefono_cliente', '$domicilio_cliente', '$pago', '$fecha_hoy', '$fecha_devolucion')";

// Ejecutar la consulta
$resultado = mysqli_query($conexion, $query);

// Verificar si la consulta se ejecutó correctamente
if ($resultado) {
    // La consulta se ejecutó correctamente
    $id_alquiler = mysqli_insert_id($conexion); // Obtener el ID asignado a ese alquiler

    // Preparar la consulta para actualizar el primer elemento del modelo indicado
    $query = "UPDATE nebulizadores SET disponibilidad = 'NO', id_alquiler = $id_alquiler, fecha_vencimiento = '$fecha_devolucion' WHERE modelo = $id_nebulizador AND disponibilidad = 'SI' LIMIT 1";
    
    // Ejecutar la consulta
    $resultado = mysqli_query($conexion, $query);

    // Verificar si la consulta se ejecutó correctamente
    if ($resultado) {
        // La consulta se ejecutó correctamente
        echo $id_alquiler;
    } else {
        // La consulta falló
        echo "error";
    }
} else {
    // La consulta falló
    echo "Error al insertar los datos en la tabla alquileres: " . mysqli_error($conexion);
}

// Cerrar la conexión MySQL
mysqli_close($conexion);

?>