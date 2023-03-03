<?php
include("connection.php");

// Recibir los datos enviados por AJAX
$precioModelo1 = $_POST['precioModelo1'];
$precioModelo2 = $_POST['precioModelo2'];
$precioModelo3 = $_POST['precioModelo3'];
$precioModelo4 = $_POST['precioModelo4'];

$baseModelo1 = $_POST['baseModelo1'];
$baseModelo2 = $_POST['baseModelo2'];
$baseModelo3 = $_POST['baseModelo3'];
$baseModelo4 = $_POST['baseModelo4'];


// Actualizar los precios en la base de datos
$query = "UPDATE nebulizadores SET precio = 
        CASE 
            WHEN modelo = '1' THEN $precioModelo1
            WHEN modelo = '2' THEN $precioModelo2
            WHEN modelo = '3' THEN $precioModelo3
            WHEN modelo = '4' THEN $precioModelo4
        END,
        preciobase = 
        CASE 
            WHEN modelo = '1' THEN $baseModelo1
            WHEN modelo = '2' THEN $baseModelo2
            WHEN modelo = '3' THEN $baseModelo3
            WHEN modelo = '4' THEN $baseModelo4
        END";

if (mysqli_query($conexion, $query)) {
    echo "Los precios han sido actualizados correctamente.";
} else {
    echo "Error al actualizar los precios: " . mysqli_error($conexion);
}

mysqli_close($conexion);

?>