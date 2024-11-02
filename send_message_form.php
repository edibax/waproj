<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $phoneNumber = escapeshellarg($_POST['phone_number']); // Sanitiza o número
    $message = escapeshellarg($_POST['message']); // Sanitiza a mensagem

    // Executa o script Node.js com os argumentos do número e da mensagem
    $output = shell_exec("node C:/xampp/htdocs/vendas/waproj/sendMessage.js $phoneNumber $message 2>&1");
    echo "<pre>$output</pre>";
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Enviar Mensagem pelo WhatsApp</title>
</head>
<body>
    <h1>Enviar Mensagem pelo WhatsApp</h1>
    <form method="POST">
        <label for="phone_number">Número de Telefone:</label>
        <input type="text" id="phone_number" name="phone_number" placeholder="5511999999999" required><br><br>

        <label for="message">Mensagem:</label>
        <textarea id="message" name="message" placeholder="Digite sua mensagem aqui..." required></textarea><br><br>

        <button type="submit">Enviar Mensagem</button>
    </form>
</body>
</html>
