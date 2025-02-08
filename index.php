<!DOCTYPE html>
<html>
    <head>
        <title>Cyber</title>
    </head>
    <body>
        <form method="get">
            <input type="text" name="name"/>
            <br/>
            <button type="submit" name="submit">Submit</button>
        </form>
        <?php
            if(isset($_GET['submit'])){
                $conn = new mysqli('localhost','root',null,'dvwa');
                if($conn->connect_error){
                    die("connection fail $conn->connect_error");
                }else{
                    $query = "SELECT first_name, last_name FROM users WHERE user_id='".$_GET['name']."'";
                    $result = $conn->query($query);

                    if ($result->num_rows > 0) {
                    // output data of each row
                    while($row = $result->fetch_assoc()) {
                        echo $row["first_name"]. " " . $row["last_name"]. "<br>";
                    }
                    } else {
                    echo "0 results";
                    }
                    $conn->close();
                }
            }
        ?>
        <script type="module">
            import {Cryptography, Hacking, Detections} from './cyber.js';
            Hacking.sql();
        </script>
    </body>
</html>