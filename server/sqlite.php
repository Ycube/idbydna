<?php

   $db = new SQLite3('dnaDB');
   if(!$db){
      echo $db->lastErrorMsg();
   } else {
      echo "Opened database successfully\n";
   }
   $statement = $db->prepare('SELECT * FROM organismClass');
   $result = $statement->execute();
   
?>