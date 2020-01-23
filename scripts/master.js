
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



		var lis=$(".folders, .files").click(function(e){
			if(!e.ctrlKey) {
			        // Ctrl not pressed, clear previous selections
			         lis.removeClass("selected");
			    }
			    $(this).addClass("selected");
		});
  }

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