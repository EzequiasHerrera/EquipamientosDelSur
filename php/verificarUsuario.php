<?php
include("connection.php");

// Obtener los datos enviados por AJAX
$username = $_POST["username"];
$password = $_POST["password"];

if (!$conexion) {
    die("Error al conectar a la base de datos: " . mysqli_connect_error());
}

// Consulta para verificar si el usuario y contraseña coinciden con los almacenados en la base de datos
$sql = "SELECT * FROM usuarios WHERE usuario = '$username' AND contraseña = '$password'";
$result = mysqli_query($conexion, $sql);

if (mysqli_num_rows($result) > 0) {
    // El usuario y la contraseña son válidos, devolver una respuesta "ok" al código JavaScript
    echo "ok";
} else {
    // El usuario y/o la contraseña son incorrectos, devolver una respuesta "error" al código JavaScript
    echo "error";
}

// Cerrar la conexión con la base de datos
mysqli_close($conexion);

?>
