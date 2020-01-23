<?php
$err=0;
$msg="";
if(isset($_GET['action']) and !empty($_GET['action'])){
  $action=$_GET['action'];



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

  // switch ($action) {
  //   case 'createfolder':
  //     if(!empty($_GET['path']) and !empty($_GET['foldername'])){
  //       // $path=$_GET['path']=="."?"":$_GET['path'];
  //       $path=$_GET['path'];
  //       $fname=$path."/".$_GET['foldername'];
  //       if($folder != '.' && $folder != '/' ) {
  //           createWritableFolder(dirname($folder));
  //       }
  //       //if(is_writable($_GET['path']) and !file_exists("$fname")) {
  //         if(mkdir("$path", 0755, true)){
  //           $msg="File created";
  //         }else{
  //           $msg="Error creating file, check permissions";
  //           $err=1;
  //         }
  //       // }else{
  //       //   $msg="Cannot create file, either exists or path not writable";
  //       //   $err=1;
  //       // }
  //     }
  //   break;
  //   case 'createfile':
  //     if(!empty($_GET['path']) and !empty($_GET['filename'])){
  //       $path=$_GET['path']=="."?"":$_GET['path'];
  //       $fname=$path."/".$_GET['dirname'];
  //       if(is_writable($_GET['path']) and !file_exists("$fname")) {
  //         if(fopen($fname, 'w')){
  //           $msg="File created";
  //         }else{
  //           $msg="Error creating file, check permissions";
  //           $err=1;
  //         }
  //       }else{
  //         $msg="Cannot create file, either exists or path not writable";
  //       }
  //     }
  //   break;
  //
  //
  //
  //   default:
  //     // code...
  //     break;
  // }


}

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
