<?php
    if(isset($_POST["page_name"])){
        getPageData($_POST["page_name"]);
    }

    function connectToDB(){
        $mysqliLink = new mysqli("localhost", "root","root", "Dr_vamp");
        if(mysqli_connect_errno()) {
            exit();
        }

        return $mysqliLink;
    }
    function getPageData($pageName) {
        $mysqliLink = connectToDB();

        $query = $mysqliLink->query("SELECT * FROM page_data WHERE page_name = '$pageName'");

        $title = "";
        $desc = "";
        if($row = $query->fetch_object()) {
            $title = $row->page_title;
            $desc = $row->page_desc;
        }

        $html = "<h1>" . $title . "</h1>";
        $html .= "<p>" . $desc . "</p>";

        echo $html;
    }
?>
