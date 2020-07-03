<?php
$q=$_GET["version"];
if ($q == '0.3')
{
    $result = array('reg' => array(
    '<span class="ui-navbar-status-username">(\\S*)<\\/span>', //qq昵称
    '"uin":(\\S*)}', //qq号
    'qid\' : \'(\\S*)\',', //360qid
    'nickName\' : \'(\\S*)\',', //360昵称
    '<meta name="user-login" content="(\\S*)">', //github昵称
    '<option selected="selected" value="\\d+">(\\S*)<\\/option>', //github邮箱
    '<span class="notification">5<\\/span>-->(\\S*)<b class="caret">', //fofa昵称 
    '<div class="col-lg-8">[\\S\\s]* (([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?))', //fofa邮箱
    '"mid":(\\S*),\"mobile_verified', //bilibili会员号/昵称
    '<span class="user-name">(.*?)<\\/span>', //baidu 昵称
    '"uid":(.*?),', //baidu uid
    '"Username":"(.*?)",', //携程 昵称
    '"EncriptMobilephone":"86-(.*?)"}', //携程 手机号
    'uid:\'(.*?)\',', //新浪 uid
    '<p class="me_name" title="(.*?)">', //新浪 昵称
    'id="aliasName" name="aliasName" value = "(.*?)">', //京东 登录名
    '<div><B>用户名：(.*?)<\\/B><\\\/div>', //京东 用户名
    '<p class="user-name">(.*?)</p>', //京东 昵称
    '"phonenumber":"(.*?)","', //京东 手机号
    '昵称：<\\/span><span>(.*?)<\\\/span>', //完美世界 昵称
    '<span>（数字账号：(.*?)）</span>', //完美世界 数字账号
    '<span class="login_user">(.*?)<\\/span>', //完美世界 手机号
    ' id: (.*?),', //今日头条 ID
    'userName: \'(.*?)\',', //今日头条 名称
    '<a class="vt-user-nickname ucbannerName" id="ucbannerName" j-role="ucbannerName" href="javascript:;"> 
    (.*?)
<\\/a>', //爱奇艺 名称
    '<div class="name">(.*?)<\\/div>', //优酷 用户名
    'id="nickName" name="" value="(.*?)"', //凤凰网 用户名
    '"userId":(.*?),', //小米 uid
    '"nickname":"(.*?)"', //小米 用户名
    '\'nick\':\'(.*?)\',', //微博 nick
    '\'uid\':\'(.*?)\',', //微博uid
    '\'domain\':\'weibo.com/(.*?)\',' //微博 domain
    '"id":(.*?),', //简书 用户名
    'nickname":"(.*?)",' //简书 uid
    ),'url' => array(
    'https://vip.qq.com/my/index.html?ADTAG=vip.qq.com/my/index.html', //qq昵称
    'https://vip.qq.com/my/index.html?ADTAG=vip.qq.com/my/', //qq号
    'http://i.360.cn/profile/chnickname?sb_param=0168d7329985355c225289f5d43489a2', //360qid
    'http://i.360.cn/profile/chnickname', //360昵称
    'https://github.com/', //github昵称 
    'https://github.com/settings/emails?_pjax=%23js-pjax-container', //github邮箱
    'https://fofa.so/', //fofa昵称
    'https://fofa.so/user/users/info', //fofa邮箱
    'https://api.bilibili.com/x/web-interface/nav', //bilibili会员号/昵称
    'https://www.baidu.com/', //baidu昵称
    'http://baike.baidu.com/mall/', //baidu uid
    'https://sinfo.ctrip.com/MyInfo/Ajax/GetUserInfoHandlerNew.ashx', //携程 昵称
    'https://sinfo.ctrip.com/MyInfo/Ajax/GetUserInfoHandlerNew.ashx', //携程 手机号
    'http://my.sina.com.cn/', //新浪 uid
    'http://my.sina.com.cn/', //新浪 名称
    'https://i.jd.com/user/info.php', //京东 登录名
    'https://i.jd.com/user/info.php', //京东 用户名
    'https://huan.jd.com/order/list.action?tab=1', //京东 昵称
    'https://le.jd.com/myBusinessHall', //京东 手机号
    'https://passport.wanmei.com/', //完美世界 昵称
    'https://passport.wanmei.com/', //完美世界 数字账号
    'https://i.wanmei.com/', //完美世界 手机号
    'https://www.toutiao.com/', //今日头条 ID
    'https://www.toutiao.com/', //今日头条 用户名
    'https://www.iqiyi.com/u/point', //爱奇艺 用户名
    'https://user.youku.com/page/usc/index', //优酷 用户名
    'http://id.ifeng.com/my/info', //凤凰网 用户名
    'https://account.xiaomi.com/v2/userInfo', //小米 用户名
    'https://account.xiaomi.com/v2/userInfo', //小米 uid
    'https://account.weibo.com/set/index?topnav=1&wvr=6', //微博 用户名
    'https://account.weibo.com/set/index?topnav=1&wvr=6', //微博 uid
    'https://account.weibo.com/set/index?topnav=1&wvr=6', //微博 domain
    'https://www.jianshu.com/', //简书 用户名
    'https://www.jianshu.com/', //简书 uid


));
    // 对数组进行encode并发送给前端
    echo json_encode($result);
}