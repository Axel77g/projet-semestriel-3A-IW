<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/src/css/style.css">
    
    <link rel="stylesheet" href="/src/assets/bootstrap/css/bootstrap.min.css" crossorigin="anonymous">
    <link rel="stylesheet" href="/src/assets/bootstrap/css/bootstrap-theme.min.css" crossorigin="anonymous">
    
    
    <title>Front Template</title>

    <script src="/src/assets/jquery.js"></script>
    <script src="/src/assets/bootstrap/js/bootstrap.min.js" ></script>

    <script>
        
        <?php if (defined("TITLE")) : ?>
            const SITE_NAME = "<?= TITLE ?>";
        <?php endif; ?>
    </script>

</head>

<body>
    <?php include $this->view; ?>
</body>


</html>