<?php
$mail_body = '';
if(isset($_POST['name'])) {
    $mail_body .= '<b>Имя отправителя:</b> ' . $_POST['name'] . '<br/><br/>';
}
if(isset($_POST['email'])) {
    $mail_body .= '<b>E-mail:</b> ' . $_POST['email'] . '<br/><br/>';
}
if(isset($_POST['phone'])) {
    $mail_body .= '<b>Контактный телефон:</b> ' . $_POST['phone'] . '<br/><br/>';
}
if(isset($_POST['msg'])) {
    $mail_body .= '<p> ' . $_POST['msg'] . '</p><br/><br/>';
}
$mail_body .= '======<br/><br/>' . 'На это письмо не надо отвечать.';
$email_to = 'maylo.kondratev@yandex.ru';
$subject = 'Заявка на обратный звонок';
$header = "From: Заявка с сайта Expert Green <r.zhiltsov@hotmail.com>\r\nContent-type: text/html; charset=windows-1251 \r\n";
$body = $mail_body;
$subject = iconv('UTF-8', 'CP1251', $subject);
$header = iconv('UTF-8', 'CP1251', $header);
$body = iconv('UTF-8', 'CP1251', $body);
mail($email_to, $subject, $body, $header);
echo json_encode('success');
?>