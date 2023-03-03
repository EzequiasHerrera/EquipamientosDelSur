<?php

// ENLAZO EL ARCHIVO DE CONEXION PARA OBTENER LA BASE DE DATOS
include("connection.php");
//PROGRAMO LA CONSULTA:

// id,
$query = "SELECT nombre, modelo, descripcion, disponibilidad, precio, preciobase  FROM nebulizadores";
//ENVÍO LA CONSULTA A LA BASE DE DATOS
$result = mysqli_query($conexion, $query);

// Verificar si la consulta ha obtenido resultados
if (mysqli_num_rows($result) > 0) {
     // Almacenar los resultados en un array
    $nebulizadores = mysqli_fetch_all($result, MYSQLI_ASSOC);
} else {
    echo "No se encontraron resultados";
}

$nebulizadoresData = [];

foreach ($nebulizadores as $nebulizador) {
    $modelo = $nebulizador['modelo'];
    $disponibilidad = $nebulizador['disponibilidad'];
    if (array_key_exists($modelo, $nebulizadoresData)) {
        if ($disponibilidad === 'SI') {
            $nebulizadoresData[$modelo]['stock'] += 1;
        }
    } else {
        $nebulizadoresData[$modelo] = [
            'nombre' => $nebulizador['nombre'],
            'modelo' => $modelo,
            'descripcion' => $nebulizador['descripcion'],
            'disponibilidad' => $disponibilidad,
            'stock' => ($disponibilidad === 'SI') ? 1 : 0,
            'precio' => $nebulizador['precio'],
            'preciobase' => $nebulizador['preciobase']
        ];
    }
}

$nebulizadoresData = array_values($nebulizadoresData);

// Convertir el array a formato JSON para enviarlo a JavaScript
$nebulizadoresJson = json_encode($nebulizadoresData);

echo $nebulizadoresJson;

mysqli_close($conexion);
// echo json_encode($data);
?>

