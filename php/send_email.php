<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = $_POST["name"] ?? '';
    $email = $_POST["email"] ?? '';
    $message = $_POST["message"] ?? '';

    // Validação simples
    if (empty($name) || empty($email) || empty($message)) {
        echo "Todos os campos são obrigatórios.";
        exit;
    }

    // Email para onde será enviado
    $to = "seuemail@exemplo.com";
    $subject = "Nova mensagem de contato";
    $body = "Nome: $name\nEmail: $email\nMensagem:\n$message";

    $headers = "From: $email\r\nReply-To: $email\r\n";

    if (mail($to, $subject, $body, $headers)) {
        echo "Mensagem enviada com sucesso!";
    } else {
        echo "Falha ao enviar a mensagem.";
    }
} else {
    http_response_code(405); // Retorna erro 405 se o método não for POST
    echo "Método não permitido.";
}
?>
