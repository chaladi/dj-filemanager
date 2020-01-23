<!DOCTYPE html>
<html lang="en"  class="uk-height-1-1">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>djFilemanager</title>
  <link rel="stylesheet" href="css/master.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/uikit/2.27.5/css/uikit.min.css" integrity="sha256-iyi99z0YCXphPJKgycNSwgYQwMV9qvCJLC8tlBHvBO0=" crossorigin="anonymous" />

</head>
<body class="uk-height-1-1">
  <div class="" id="djfm">
    <div class="uk-flex uk-flex-middle uk-flex-space-between" id="toolbar">
      <div class="uk-flex-left">
        <div class="uk-button-group">
          <a href="#" class="uk-button uk-button-primary" title="Create New Folder" id="createfolder"><i class="uk-icon-folder"></i></a>
          <a href="#" class="uk-button uk-button-primary" title="Create new File" id="createfile"><i class="uk-icon-file"></i></a>
          <a href="#" class="uk-button uk-button-primary" title="Upload Files" id="uploadfiles"><i class="uk-icon-upload"></i></a>
          <a href="#" class="uk-button uk-button-primary" title="Install Wordpress Here"><i class="uk-icon-wordpress"></i></a>
        </div>
        <!-- Actions General -->
        <div class="uk-button-group">
          <a href="#" class="uk-button " title="Copy"><i class="uk-icon-copy"></i></a>
          <a href="#" class="uk-button" title="Move"><i class="uk-icon-cut"></i></a>
          <a href="#" class="uk-button" title="Download"><i class="uk-icon-download"></i></a>
          <a href="#" class="uk-button" title="Properties"><i class="uk-icon-info-circle"></i></a>
          <a href="#" class="uk-button" title="Compress to Archive"><i class="uk-icon-file-archive-o"></i></a>
          <a href="#" class="uk-button" title="Delete"><i class="uk-icon-ban"></i></a>
          <a href="#" class="uk-button" title="Permissions"><i class="uk-icon-unlock-alt"></i></a>
        </div>
        <!-- Actions file -->
        <div class="uk-button-group">
          <a href="#" class="uk-button" title="Edit"><i class="uk-icon-edit"></i></a>
        </div>
      </div>
      <div class="uk-flex-right">
        <form class="uk-form" action="index.html" method="post">
          <div class="uk-form-icon">
            <i class="uk-icon-search"></i>
            <input type="text" id="#search" class="uk-form-width-small">
          </div>
        </form>
      </div>
    </div>

    <div class="breadcrumbs"><ul id="breadcrumbs" class="uk-breadcrumb"></ul></div>
    <ul class="data" id="data"></ul>
    <div class="nothingfound">
      <div class="nofiles"></div>
      <span>No files here.</span>
    </div>
  </div>


  <script src="https://code.jquery.com/jquery-3.2.1.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/2.27.5/js/uikit.min.js" integrity="sha256-cpRPZqhjd9qhuLI11hjlSy0W1o4xd1O5L12RYiA2rpU=" crossorigin="anonymous"></script>
  <script type="text/javascript" src="scripts/master.js"></script>
</body>
</html>
