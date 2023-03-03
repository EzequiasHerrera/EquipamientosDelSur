<?php
include("connection.php");

if ($conexion->connect_error) {
    die("Conexión fallida: " . $conexion->connect_error);
}

// Obtener el contenido del cuerpo de la solicitud
$data = file_get_contents('php://input');

// Decodificar el JSON en un objeto PHP
$obj = json_decode($data);

// Obtener el ID del alquiler
$idAlquiler = $obj->idAlquiler;

// Hacer lo que necesites con el ID del alquiler
echo "Se recibió el ID de alquiler: " . $idAlquiler;

    $query = "DELETE FROM alquileres WHERE id = " . $idAlquiler;
    
    // SI SE REALIZA CORRECTAMENTE LA QUERY "$QUERY":
    if ($conexion->query($query) === TRUE) {

      // Actualización del registro correspondiente en la tabla nebulizadores
      $query_nebulizadores = "UPDATE nebulizadores SET id_alquiler = NULL, disponibilidad = 'SI', fecha_vencimiento = NULL WHERE id_alquiler = " . $idAlquiler;
      
      // SI SE REALIZA CORRECTAMENTE LA QUERY "$QUERY_NEBULIZADORES"
      if ($conexion->query($query_nebulizadores) === TRUE) {
        echo "El alquiler ha sido eliminado exitosamente.";
      } else {
        echo "Error al actualizar la tabla de nebulizadores: " . $conexion->error;
      }
    } else {
      echo "Error al eliminar el alquiler: " . $conexion->error;
    }

// Cierre de la conexión a la base de datos
$conexion->close();
?>
