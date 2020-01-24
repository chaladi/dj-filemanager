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
          <a class="uk-button uk-button-primary" title="Upload Files" id="uploadfilesmodal"><i class="uk-icon-upload"></i></a>
          <a href="#" class="uk-button uk-button-primary" title="Install Wordpress Here"><i class="uk-icon-wordpress"></i></a>
        </div>
        <!-- Actions General -->
        <div class="uk-button-group dj-actions">
          <button class="uk-button" title="Copy" id="copyfiles" disabled><i class="uk-icon-copy"></i></button>
          <button class="uk-button" title="Move" id="movefiles" disabled><i class="uk-icon-cut"></i></button>
          <button class="uk-button uk-button-danger" id="deletefiles" title="Delete" disabled><i class="uk-icon-ban "></i></button>
          <button class="uk-button" title="Properties" id="properties" disabled><i class="uk-icon-info-circle"></i></button>
          <button class="uk-button" title="Permissions" id="permissions" disabled><i class="uk-icon-unlock-alt"></i></button>
          <button class="uk-button" title="Download" id="downloadfiles" disabled><i class="uk-icon-download"></i></button>
          <button class="uk-button" title="Compress to Archive" id="makearchieve" disabled><i class="uk-icon-file-archive-o"></i></button>
        </div>
        <!-- Actions file -->
        <div class="uk-button-group dj-edit">
          <button href="#" class="uk-button" title="Edit" disabled><i class="uk-icon-edit"></i></button>
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
    <div class="uk-grid uk-height-1-1">
      <div class="uk-width-9-10">
        <ul class="data" id="data"></ul>
      </div>
      <div class="uk-width-1-10">
        <div class="dj-fileinfo">

        </div>
        <div class="dj-loginfo">

        </div>
      </div>
    </div>
    <div class="nothingfound">
      <div class="nofiles"></div>
      <span>No files here.</span>
    </div>
  </div>


  <!--
    UPLOAD FILES MODEL
  -->

  <div id="uploadmodal" class="uk-modal">
    <div class="uk-modal-dialog">
      <button type="button" class="uk-modal-close uk-close"></button>
      <div class="uk-modal-header">
        <h3>Upload Files</h3>
      </div>
      <div>
        <p>Select single or multiple files to upload.</p>
        <form class="uk-form" id="uploadform" enctype="multipart/form-data" action="index.html" method="post">
          <div class="uk-form-row">
            <label class="uk-form-label" for=""></label>
            <div class="uk-form-controls">
              <input type="file" id="fileup" name="fileup" multiple />
              <button type="button" name="button" id="uploadFiles"  disabled>Upload Files</button>
            </div>
          </div>
        </form>
        <div id="dj-uploadprogress"></div>
        <div id="dj-uploadinfo" class="uk-alert"></div>
      </div>
      <div class="uk-modal-footer">

      </div>
    </div>
  </div>

  <script src="https://code.jquery.com/jquery-3.2.1.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/2.27.5/js/uikit.min.js" integrity="sha256-cpRPZqhjd9qhuLI11hjlSy0W1o4xd1O5L12RYiA2rpU=" crossorigin="anonymous"></script>
  <script type="text/javascript" src="scripts/master.js"></script>
</body>
</html>
