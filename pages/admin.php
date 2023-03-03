<!DOCTYPE html>
<html lang="en">
<?php
    header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
    header("Expires: Sat, 1 Jul 2000 05:00:00 GMT"); // Fecha en el pasado
?>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="/nebulizadores/css/style.css?v1.0" media="all" >
    <link rel="shortcut icon" href="/nebulizadores/img/logo.png" type="image/x-icon">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.debug.js" 
        integrity="sha384-NaWTHo/8YCBYJ59830LTz/P4aQZK1sS0SneOgAvhsIl3zBu8r9RevNg5lHCHAuQ/"
        crossorigin="anonymous"></script>
    <script src="~/lib/html2canvas/html2canvas.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="sweetalert2.all.min.js"></script>
    <title>Nebu Neco</title>
</head>
<body>
    <header>
        <div class="header_content">
            <a href="../index.php"><img src="../img/logo.png" alt="logo"></a>
            <button id="btn_edit_prices"><box-icon name='edit' type='solid' ></box-icon></button>
        </div>

    </header>
    <main>
        <section class="alquileres_list">
        </section>
    </main>
    <footer>
        <div class="footer_info">
            <section>
                <strong>NUESTRAS REDES SOCIALES</strong>
                <div class="footer_icon">
                    <box-icon type='logo' color='#003feb' name='instagram'></box-icon>
                    <p>INSTAGRAM</p>
                </div>
                <div class="footer_icon">
                    <box-icon type='logo' color='#003feb' name='facebook'></box-icon>
                    <p>FACEBOOK</p>
                </div>
            </section>

            <div class="line_v"></div>

            <section>
                <strong>PAGINAS RELACIONADAS</strong>
                <div class="footer_icon">
                    <box-icon type='logo' color='#003feb' name='instagram'></box-icon>
                    <a href="/nebulizadores/pages/admin.php"><p>Administrador</p></a>
                </div>
            </section>
        </div>

    </footer>
    <script src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js"></script>
    <script src="/nebulizadores/js/admin.js?v1.0"></script>
</body>
</html>