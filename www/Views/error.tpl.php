<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/src/css/style.css">
    <title>ERROR Template</title>
</head>

<body>
    <div class="error">
        <h1> Error
            <?= $code ?>
        </h1>
        <h2>
            <?= $message ?>
        </h2>

        <a href="/">
            Revenir en lieu sûr
        </a>
    </div>
</body>

</html>