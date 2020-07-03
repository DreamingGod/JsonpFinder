<?php
date_default_timezone_set('PRC');
$dbms='mysql';
$dbName='JSONINFORMATION';
$user='root';
$pwd='xxx';
$host='localhost';
$charset = 'utf8';
$dsn="$dbms:host=$host;dbname=$dbName;charset=$charset";
$ip = $_SERVER['REMOTE_ADDR'];
$time = date("Y-m-d G:i:s");
$q=$_GET["version"];
$d=$_GET["domain"];
$url=$_GET["url"];
if ($q == '0.1')
{
    // $ua = $_SERVER['HTTP_USER_AGENT'];
    // $uahash = hash('ripemd160', $ua);
    // if ($uahash == '848b8cf5bd15f1bb46b5a8b95a0d3086a372fb9c')
    // {
        try {
            $urldecodes = urldecode($url);
            $strurl = base64_decode($urldecodes);
            }catch (Exception $e) {
                echo $e->getMessage();
                die();
        }
    // }

    try{
        $pdo=new PDO($dsn,$user,$pwd);
    }
    catch(Exception $e)
    {
        echo $e->getMessage();
    }

    //插入
    $sql = "insert into jsonp_certain(jsonp_time,jsonp_ip,jsonp_domain,jsonp_url) values(?,?,?,?)";
    //准备sql模板
    $stmt = $pdo->prepare($sql);
    // $jsonp_time = $time;
    // $jsonp_ip = $ip;
    // $jsonp_url = $url;
    //绑定参数
    $stmt->bindValue(1,$time);
    $stmt->bindValue(2,$ip);
    $stmt->bindValue(3,$d);
    $stmt->bindValue(4,$strurl);
    //执行预处理语句
    $stmt->execute();
    $insert_id = $pdo->lastInsertId();
    //释放查询结果
    $stmt = null;
    //关闭连接
    $pdo = null;
}
if ($q == '0.2')
{
    // $ua = $_SERVER['HTTP_USER_AGENT'];
    // $uahash = hash('ripemd160', $ua);
    // if ($uahash == '848b8cf5bd15f1bb46b5a8b95a0d3086a372fb9c')
    // {
        try {
            $urldecodes = urldecode($url);
            $strurl = base64_decode($urldecodes);
            }catch (Exception $e) {
                echo $e->getMessage();
                die();
        }
    // }

    try{
        $pdo=new PDO($dsn,$user,$pwd);
    }
    catch(Exception $e)
    {
        echo $e->getMessage();
    }

    //插入
    $sql = "insert into jsonp_Uncertain(jsonp_time,jsonp_ip,jsonp_domain,jsonp_url) values(?,?,?,?)";
    //准备sql模板
    $stmt = $pdo->prepare($sql);
    // $jsonp_time = $time;
    // $jsonp_ip = $ip;
    // $jsonp_url = $url;
    //绑定参数
    $stmt->bindValue(1,$time);
    $stmt->bindValue(2,$ip);
    $stmt->bindValue(3,$d);
    $stmt->bindValue(4,$strurl);
    //执行预处理语句
    $stmt->execute();
    $insert_id = $pdo->lastInsertId();
        //释放查询结果
    $stmt = null;
    //关闭连接
    $pdo = null;
}