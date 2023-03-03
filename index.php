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
    <link rel="stylesheet" type="text/css" href="css/style.css?v1.0" media="all" >
    <link rel="shortcut icon" href="img/logo.png" type="image/x-icon">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.debug.js" 
        integrity="sha384-NaWTHo/8YCBYJ59830LTz/P4aQZK1sS0SneOgAvhsIl3zBu8r9RevNg5lHCHAuQ/"
        crossorigin="anonymous"></script>
    <script src="~/lib/html2canvas/html2canvas.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<!-- Sweet Alert -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="sweetalert2.all.min.js"></script>

    <title>Nebu Neco</title>
</head>

<body>
    <header>
        <div class="header_content">
            <img src="img/logo.png" alt="logo">
            <h1 id="titulo">EQUIPAMIENTOS DEL SUR</h1>
            <div></div>
        </div>

    </header>
    <main>
        <section>
            <aside>
                <div class="search_bar">
                    <input type="" placeholder="Busqueda..." name="filter" id="">
                    <a class="search_icon" href=""><box-icon name='search'></box-icon></a>
                </div>
                <ul>
                    <li><a href="">Nebulizadores</a></li>
                    <li><a href="">Aspiradores</a></li>
                    <li><a href="">Diagnostico del Sueño</a></li>
                    <li><a href="">Ofertas</a></li>
                </ul>
            </aside>
            <div class="product_list">
            </div>
            <a href="https://wa.me/92262232518?text=Hola!%20Tengo%20una%20consulta.%20¿Podrías%20ayudarme?" id="whatsapp"><img src="\nebulizadores\img\WhatsAppButtonGreen.svg" alt=""></a>
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
            </section>

            <div class="line_v"></div>

            <section>
                <strong>PAGINAS RELACIONADAS</strong>
                <div class="footer_icon">
                    <box-icon color='#003feb' name='lock-alt'></box-icon>
                    <a href="/nebulizadores/pages/admin.php"><p>ADMINISTRADOR</p></a>
                </div>
            </section>
        </div>

    </footer>
    <script src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js"></script>
    <script src="/nebulizadores/js/index.js"></script>
</body>
</html>