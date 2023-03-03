<?php

// ENLAZO EL ARCHIVO DE CONEXION PARA OBTENER LA BASE DE DATOS
include("connection.php");

$query = "SELECT id, id_nebulizador, nombre_cliente, dni_cliente, tel_cliente, domicilio, pago, fecha_inicio, fecha_vencimiento FROM alquileres";
$result = mysqli_query($conexion, $query);

// Verificar si la consulta ha obtenido resultados
if (mysqli_num_rows($result) > 0) {
    // Almacenar los resultados en un array
    $alquileres = mysqli_fetch_all($result, MYSQLI_ASSOC);
} else {
    echo "No se encontraron resultados";
}

$alquileresData = [];

foreach ($alquileres as $alquiler){
    $alquileresData[$alquiler['id']] = [
        'id' => $alquiler['id'],
        'id_nebulizador' => $alquiler['id_nebulizador'],
        'nombre_cliente' => $alquiler['nombre_cliente'],
        'dni_cliente' => $alquiler['dni_cliente'],
        'tel_cliente' => $alquiler['tel_cliente'],
        'domicilio' => $alquiler['domicilio'],
        'pago' => $alquiler['pago'],
        'fecha_inicio' => $alquiler['fecha_inicio'],
        'fecha_vencimiento' => $alquiler['fecha_vencimiento']
    ];
}

$alquileresData = array_values($alquileresData);

// Convertir el array a formato JSON para enviarlo a JavaScript
$alquileresJson = json_encode($alquileresData);

echo $alquileresJson;

mysqli_close($conexion);

?>