var filemanager,
	breadcrumbs,
	fileList,
	breadcrumbsUrls=[],
	currentPath='';

$(function(){


	var filetypeicons={'zip':'zip-o', 'rar':'zip-o','gz':'zip-o','7z':'zip-o','bz':'zip-o','tar':'archive-o',
									'jpg':'image-o', 'png':'image-o', 'gif':'image-o', 'bmp':'image-o',
									'doc':'word-o', 'docx':'word-o', 'odf':'word-o',
									'xls':'excel-o', 'xlsx':'excel-o', 'ods':'excel-o',
									'ppt':'powerpoint-o', 'pptx':'powerpoint-o',
									'txt':'text-o', 'rtf':'text', 'pdf':'pdf-o',
									'wav':'sound-o', 'mp3':'sound-o', 'ogg':'sound-o', 'oga':'sound-o', 'midi':'sound-o', 'mpa':'sound-o',
									'webm':'movie-o', 'mp4':'movie-o', 'ogv':'movie-o', 'avi':'movie-o', 'mpg':'movie-o', 'mpeg':'movie-o',
									'php':'code-o', 'pl':'code-o', 'py':'code-o', 'asp':'code-o', 'aspx':'code-o', 'jsp':'code-o', 'html':'code-o', 'htm':'code-o',
									'css':'code-o', 'js':'code-o', 'scss':'code-o'
								};

  var filemanager = $('#djfm'),
		breadcrumbs = $('#breadcrumbs'),
		fileList = $('#data');
		breadcrumbsUrls=[];
		currentPath='';


	function scanPath(path){
		if(!path) path=".";
		breadcrumbs.html(`<li><i class="uk-icon-spinner uk-icon-spin"> </i> Loading...</li>`);
		$.get('scan.php?path='+path, function(data) {
			var response = [data];
			// check path exists and slice to that point
			pathIndex=breadcrumbsUrls.indexOf(path);
			if(pathIndex==-1){
				breadcrumbsUrls.push(path);
			}else{
				breadcrumbsUrls.length=pathIndex+1; //removes elements after the index value
			}
			render(response[0]);
			renderBreadcrumbs(path);
			$(".dj-actions button").attr('disabled',"disabled");
			currentPath=path;
		});
	}

  function render(data) {

    var scannedFolders = [],
      scannedFiles = [];

      var items=data.items;
      console.log(items);
      if(items.length>0){
        items.forEach(function(i){
          if(i.type==='folder'){
            scannedFolders.push(i);
          }else if(i.type==="file"){
            scannedFiles.push(i);
          }
        });
      }

    // Empty the old result and make the new one
		// fileList.empty().hide();
    fileList.empty().animate({'display':'block'});

    if(!scannedFolders.length && !scannedFiles.length) {
      filemanager.find('.nothingfound').show();
    }
    else {
      filemanager.find('.nothingfound').hide();
    }

    if(scannedFolders.length) {

      scannedFolders.forEach(function(f) {

        var itemsLength = f.items.length,
          name = escapeHTML(f.name),
          icon = '<i class="uk-icon-folder"></i> ';

        if(itemsLength) {
          icon = '<i class="uk-icon-folder full"></i> ';
        }

        if(itemsLength == 1) {
          itemsLength += ' item';
        }
        else if(itemsLength > 1) {
          itemsLength += ' items';
        }
        else {
          itemsLength = 'Empty';
        }

				// var folder = $('<dd class="folders"><a href="'+ f.path +'" title="'+ f.path +'" class="folders">'+icon+'<span class="name">' + name + '</span> <span class="details">' + itemsLength + '</span></a></dd>');
        var folder = $(`<li class="folders" data-path="${f.path}">${icon} ${name}</li>`);
        folder.appendTo(fileList);
      });

    }

    if(scannedFiles.length) {

      scannedFiles.forEach(function(f) {

        var fileSize = bytesToSize(f.size),
          name = escapeHTML(f.name),
          fileType = name.split('.'),
          icon = '<i class="uk-icon-folder file"></i> ';

        fileType = fileType[fileType.length-1];
				if(filetypeicons.hasOwnProperty(fileType)){
					fileTypeIcon='file-'+filetypeicons[fileType];
				}else{
					fileTypeIcon="file";
				}
        icon = '<i class="uk-icon-'+fileTypeIcon+'"></i> ';

        // var file = $('<li class="files"><a href="'+ f.path+'" title="'+ f.path +'" class="files">'+icon+'<span class="name">'+ name +'</span> <span class="details">'+fileSize+'</span></a></li>');
				var file = $(`<li class="files" data-path="${f.path}">${icon} ${name}</li>`);

        file.appendTo(fileList);
      });

    }

		// Building the breadcrumbs


    // Show the generated elements
    fileList.animate({'display':'block'});
    // fileList.show();

		//bind double click event to folders and files
		$(".folders").dblclick(function(e){
			scanPath($(this).data('path'));
		});


		// MULTI SELECT FILES USING CONTROL KEY (shift key not yet added)
		var lis=$(".folders, .files").click(function(e){
			if(!e.ctrlKey) {
			        // Ctrl not pressed, clear previous selections
			         lis.removeClass("selected");
			    }
			    $(this).addClass("selected");
		});

		$(".folders, .files").mouseup(function(e){
			$(".dj-actions button").removeAttr('disabled');
		});


		$("#deletefiles").unbind("click").click(function(e){
			UIkit.modal.confirm("Are you sure to delete selected files/folders?", function(){
					// will be executed on confirm.
					var dpaths=[];
					fileList.find("li.selected").each(function(i,l){
						dpaths.push($(this).data('path'));
					});
					var params="action=delete&paths="+dpaths;
					$.post("actions.php",params,function(data){
						if(data.err==0){
							scanPath(currentPath);
						}
					});
			});
		});

		// Upload files
		$("#uploadfilesmodal").unbind("click").click(function(){
			var upmodal = UIkit.modal("#uploadmodal");
			$("#uploadform").trigger("reset");
			upmodal.show();
		});

		var upload = document.getElementById('fileup');
		var uploadinfo = $('#dj-uploadinfo');
		var uploadfiles;
		var currentuploadFile=0;
		var lastFile=0;
		upload.onchange = function(e){
			e.preventDefault();
			$("#uploadFiles").removeAttr("disabled");
		}

		$("#fileup").change()
		$("#uploadFiles").unbind("click").click(function(e) {
			if (window.File && window.FileReader && window.FileList && window.Blob) {
				
						uploadfiles = upload.files;
						if (!uploadfiles.length) {
							uploadinfo.empty().show();
							uploadinfo.append('<p class="uk-text-warning">No files selected</p>');
						}else{
							uploadinfo.empty().show();
							uploadInitiate(currentuploadFile);

				function uploadInitiate(f){
					uploadinfo.append('<p class="uk-text-primary">Uploading '+uploadfiles[f].name+'</p>');
					uploadFiles(uploadfiles[f]);
					currentuploadFile++;
				}

				function uploadFiles(file){
					var data = new FormData();
					data.append("file", file);
					data.append("action", "upload");
					data.append("path", currentPath);

					var upurl="actions.php";
					var xhr = new XMLHttpRequest();
					xhr.upload.addEventListener("progress",uploadProgress,false);
					xhr.addEventListener("load",uploadDone,false);
					xhr.addEventListener("error",uploadError,false);
					xhr.open("POST", upurl, true);
					xhr.send(data);
				}

				function uploadProgress(){
					jQuery("#dj-uploadprogress").show();
					jQuery("#dj-uploadprogress").html('<div class="uk-alert uk-alert-primary"><i class="uk-icon-spinner uk-icon-spin" id="myloader"></i> Uploading Files...</div>');
				}

				function uploadDone(data){
					data=data.target.responseText;
					data=jQuery.parseJSON(data);
					if(data.err==0){
						uploadinfo.append('<p class="uk-text-success">'+data.serverFile+' uploaded.</p>');
						if(currentuploadFile==uploadfiles.length){
							uploadinfo.append('<p class="uk-text-success">All Done.</p>');
							jQuery("#dj-uploadprogress").hide();
							$('#uploadmodal').on(
								{
									'hide.uk.modal': function(){
										scanPath(currentPath);
							  	}
								});
						}else{
							uploadInitiate(currentuploadFile);
						}
					}
					// jQuery("#dj-uploadprogress").hide();
				}

				function uploadError(data){
					uploadinfo.append('<div class="uk-alert uk-alert-danger">Error while uploading file. Please try again</div>');
				}

			} else {
				UIkit.modal.alert("The File APIs are not fully supported in this browser.Please use another browser");
			}

		});


		//  End upload files


		$("#movefiles").unbind("click").click(function(e){

		});

		$("#copyfiles").unbind("click").click(function(e){

		});


  } // Main Function End



	function renderBreadcrumbs(path){
		var paths=path.split("/");
		var i=0;
		breadcrumbs.empty();
		paths.forEach(function(p){
			if(p=="."){
				breadcrumbs.append(`<li class="breadcrumburl" data-path="${breadcrumbsUrls[i]}"><a><i class="uk-icon-home"> </i></a></li>`);
			}else{
				breadcrumbs.append(`<li class="breadcrumburl" data-path="${breadcrumbsUrls[i]}"><a>${p}</a></li>`);
			}
			i++;
		});

		$(".breadcrumburl").click(function(e){
			scanPath($(this).data('path'));
		});

	}

	scanPath();



	//create Folder
		$("#createfolder").click(function(e){
			UIkit.modal.prompt("Name:", '', function(fname){
			    // will be executed on submit.
					if(isValid(fname)){
						breadcrumbs.html(`<li><i class="uk-icon-spinner uk-icon-spin"> </i> Loading...</li>`);
						$.get('actions.php?action=createfolder&path='+currentPath+"&foldername="+fname, function(data) {
							if(data.err==0){
								scanPath(currentPath);
							}else{
								UIkit.modal.alert(data.msg);
								renderBreadcrumbs(currentPath);
							}
						});
					}else{
						UIkit.modal.alert("Not a valid file");
					}
			});

		});


//create file
	$('#createfile').click(function(e){
		UIkit.modal.prompt("Name:", '', function(fname){
				if(isValid(fname)){
					breadcrumbs.html(`<li><i class="uk-icon-spinner uk-icon-spin"> </i> Loading...</li>`);
					$.get('actions.php?action=createfile&path='+currentPath+"&filename="+fname, function(data) {
						if(data.err==0){
							scanPath(currentPath);
						}else{
							UIkit.modal.alert(data.msg);
							renderBreadcrumbs(currentPath);
						}
					});
				}else{
					UIkit.modal.alert("Not a valid file");
				}
		});
	});




});

//filename or foldername check

var isValid=(function(){
  var rg1=/^[^\\/:\*\?"<>\|]+$/; // forbidden characters \ / : * ? " < > |
  // var rg2=/^\./; // cannot start with dot (.)
  // var rg3=/^(nul|prn|con|lpt[0-9]|com[0-9])(\.|$)/i; // forbidden file names
  return function isValid(fname){
    return rg1.test(fname);
  }
})();

// This function escapes special html characters in names

function escapeHTML(text) {
  return text.replace(/\&/g,'&amp;').replace(/\</g,'&lt;').replace(/\>/g,'&gt;');
}


// Convert file sizes from bytes to human readable units

function bytesToSize(bytes) {
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return '0 Bytes';
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}
