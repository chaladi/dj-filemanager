<?php
$err=0;
$msg="";
if(isset($_REQUEST['action']) and !empty($_REQUEST['action'])){
  $action=$_REQUEST['action'];


// CREATE FOLDER
  if($action=="createfolder"){
    $path=$_GET['path'];
    $fname=$path."/".$_GET['foldername'];
      if(is_writable($_GET['path'])){
        if(!file_exists("$fname")){
          if(mkdir($fname, 01755, true)){
            $msg="File created";
          }else{
            $msg="Error creating file, check permissions";
            $err=1;
          }
        }else{
          $msg="Folder exists";
          $err=1;
        }
      }else{
           $msg="Path not writable";
           $err=1;
      }
  }

// CREATE FILE
  if($action=="createfile"){
    $path=$_GET['path'];
    $fname=$path."/".$_GET['filename'];
      if(is_writable($_GET['path'])){
        if(!file_exists("$fname")){
          if($ff=fopen($fname, 'w')){
            $msg="File created";
            fclose($ff);
          }else{
            $msg="Error creating file, check permissions";
            $err=1;
          }
        }else{
          $msg="File exists";
          $err=1;
        }
      }else{
           $msg="Path not writable";
           $err=1;
      }
  }

  // DELETE FILE OR Folder
  if($action=="delete"){
    $paths=explode(",",$_POST['paths']);
    foreach($paths as $p){
      delete_files($p);
      $msg="Files/Folders deleted";
    }
  }
  // End Delete files

  // Upload files
  if($action=="upload"){
    $f=$_FILES['file'];
  	if($f['error']==0){
  		$output_dir = $_POST['path'];
  		$filename = $f['name'];
  		$serverFile = $filename;
  		$tmpfile=$f['tmp_name'];
  		$max_filesize = 10485760;

  		//$allowed_filetypes = array('.jpg','.jpeg','.png','.gif');
  		//$ext = substr($filename, strpos($filename,'.'), strlen($filename)-1);

  		$err=0;

  		//if(in_array($ext,$allowed_filetypes)){
  			if(move_uploaded_file($tmpfile,$output_dir ."/". $serverFile)){
  					$msg="File Uploaded";
  					$err=0;
  					$returnData = array( "serverFile" => $serverFile, "fpath"=>$output_dir . $serverFile, "err"=>$err, "msg"=>$msg );
  					echo json_encode($returnData);
            die();
  			}else{
  					$msg="Upload Problem";
  					$err=1;
  					$returnData = array( "serverFile" => $filename, "fpath"=>$output_dir . $serverFile, "err"=>$err, "msg"=>$msg );
  					echo json_encode($returnData);
  					die();
  			}
  		// }else{
  		// 		$msg="The file you attempted to upload is not allowed.";
  		// 		$err=0;
  		// 		$returnData = array( "serverFile" => $filename, "fpath"=>$output_dir . $serverFile, "err"=>$err );
  		// 		echo json_encode($returnData);
  		// 		die();
  		// }
  	}

  }
  // End upload files



}



/*
PHP FUNCTIONS TO DO ACTIONS
*/

/*
 * php delete function that deals with directories recursively
 */
function delete_files($target) {
    if(is_dir($target)){
        $files = glob( $target . '*', GLOB_MARK ); //GLOB_MARK adds a slash to directories returned

        foreach( $files as $file ){
            delete_files( $file );
        }

        rmdir( $target );
    } elseif(is_file($target)) {
        unlink( $target );
    }
}

// create folder without error
function createWritableFolder($folder)
{
    if($folder != '.' && $folder != '/' ) {
        createWritableFolder(dirname($folder));
    }
    if (file_exists($folder)) {
        return is_writable($folder);
    }

    return is_writable($folder) && mkdir($folder, 0755, true);
}


header('Content-type: application/json');

echo json_encode(array(
	"err" => "$err",
	"msg" => "$msg"
));


?>
