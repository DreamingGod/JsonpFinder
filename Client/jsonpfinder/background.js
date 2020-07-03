/*Jsonp Found */


//1.几分钟重新获取一次 不删除
//2.UserdicNumber获取逻辑问题优化

new_element = document.createElement("script");
new_element.setAttribute("type", "text/javascript");
new_element.setAttribute("src", "base64.js");
document.body.appendChild(new_element);

var record = sessionStorage;
var recordKey = localStorage;
var recordTry = sessionStorage;
var Userdic = {};
var UserdicNumber = {};
var status = true;
var UserKeyNumber = 0, UserKeyNumbers = 0, logNum = 0, KeyNumber = 0, DictNumber = 0;

var keyUrl = {
  0: 'https://vip.qq.com/my/index.html?ADTAG=vip.qq.com/my/index.html', //qq昵称
  1: 'https://vip.qq.com/my/index.html?ADTAG=vip.qq.com/my/', //qq号
  2: 'http://i.360.cn/profile/chnickname?sb_param=0168d7329985355c225289f5d43489a2', //360qid
  3: 'http://i.360.cn/profile/chnickname', //360昵称
  4: 'https://github.com/', //github昵称 
  5: 'https://github.com/settings/emails?_pjax=%23js-pjax-container', //github邮箱
  6: 'https://fofa.so/', //fofa昵称
  7: 'https://fofa.so/user/users/info', //fofa邮箱
  8: 'https://api.bilibili.com/x/web-interface/nav', //bilibili会员号/昵称
  9: 'https://myaccount.google.com/?utm_source=sign_in_no_continue', //google邮箱
  10: 'https://myaccount.google.com/?utm_source=sign_in_no_continue', //google昵称
  11: 'https://www.baidu.com/', //baidu昵称
  12: 'http://baike.baidu.com/mall/', //baidu uid
  13: 'https://sinfo.ctrip.com/MyInfo/Ajax/GetUserInfoHandlerNew.ashx', //携程 昵称
  14: 'https://sinfo.ctrip.com/MyInfo/Ajax/GetUserInfoHandlerNew.ashx', //携程 手机号
  15: 'http://my.sina.com.cn/', //网易 uid
  16: 'http://my.sina.com.cn/', //网易 名称
  17: 'https://i.jd.com/user/info.php', //京东 登录名
  18: 'https://i.jd.com/user/info.php', //京东 用户名
  19: 'https://huan.jd.com/order/list.action?tab=1', //京东 昵称
  20: 'https://le.jd.com/myBusinessHall', //京东 手机号
  21: 'https://passport.wanmei.com/', //完美世界 昵称
  22: 'https://passport.wanmei.com/', //完美世界 数字账号
  23: 'https://i.wanmei.com/', //完美世界 手机号
  24: 'https://www.toutiao.com/', //今日头条 ID
  25: 'https://www.toutiao.com/', //今日头条 用户名
};

var KeyRegular = {
  0: '<span class="ui-navbar-status-username">(\\\S*)<\\\/span>', //qq昵称
  1: '"uin":(\\\S*)}', //qq号
  2: 'qid\' : \'(\\\S*)\',', //360qid
  3: 'nickName\' : \'(\\\S*)\',', //360昵称
  4: '<meta name="user-login" content="(\\\S*)">', //github昵称
  5: '<option selected="selected" value="\\\d+">(\\\S*)<\\\/option>', //github邮箱
  6: '<span class="notification">5<\\\/span>-->(\\\S*)<b class="caret">', //fofa昵称 
  7: '<div class="col-lg-8">[\\\S\\\s]* (([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?))', //fofa邮箱
  8: '"mid":(\\\S*),\"mobile_verified', //bilibili会员号/昵称
  9: '<div class="gb_qb">(.*?)<\\\/div>', //google邮箱
  10: '<div class="gb_ob gb_pb">(.*?)<\\\/div>', //google昵称
  11: '<span class="user-name">(.*?)<\\\/span>', //baidu 昵称
  12: '"uid":(.*?),', //baidu uid
  13: '"Username":"(.*?)",', //携程 昵称
  14: '"EncriptMobilephone":"86-(.*?)"}', //携程 手机号
  15: 'uid:\'(.*?)\',', //网易 uid
  16: '<p class="me_name" title="(.*?)">', //网易 昵称
  17: 'id="aliasName" name="aliasName" value = "(.*?)">', //京东 登录名
  18: '<div><B>用户名：(.*?)<\\\/B><\\\/div>', //京东 用户名
  19: '<p class="user-name">(.*?)</p>', //京东 昵称
  20: '"phonenumber":"(.*?)","', //京东 手机号
  21: '昵称：<\\\/span><span>(.*?)<\\\/span>', //完美世界 昵称
  22: '<span>（数字账号：(.*?)）</span>', //完美世界 数字账号
  23: '<span class="login_user">(.*?)<\\\/span>', //完美世界 手机号
  24: ' id: (.*?),', //今日头条 ID
  25: 'userName: \'(.*?)\',', //今日头条 名称

};

chrome.contextMenus.create({
  title: "Stop JsonpFinder",
  id: "JsonpFinder",
  onclick: function () {
    if (status == 'true') {
      chrome.contextMenus.update('JsonpFinder', { title: 'Start JsonpFinder' }, function () { });
      status = false;
    } else {
      chrome.contextMenus.update('JsonpFinder', { title: 'Stop JsonpFinder' }, function () { });
      status = true;
    }
  }
});

function copyTextToClipboard(text) {
  var textArea = document.createElement("textarea")
  textArea.style.position = 'fixed'
  textArea.style.top = 0
  textArea.style.left = 0
  textArea.style.width = '2em'
  textArea.style.height = '2em'
  textArea.style.padding = 0
  textArea.style.border = 'none'
  textArea.style.outline = 'none'
  textArea.style.boxShadow = 'none'
  textArea.style.background = 'transparent'
  textArea.value = text
  document.body.appendChild(textArea)
  textArea.select()
  try {
    var msg = document.execCommand('copy') ? 'sucess' : 'failed'
  } catch (err) {
    console.log('不能使用这种方法复制内容')
  }
  document.body.removeChild(textArea)
}

function show(title, content) {
  var notice = new Notification(title, {
    body: content,
    icon: "icon48.png",
  });

  notice['onclick'] = function (event) {
    copyTextToClipboard(content);
  };
}

function GoGet(){
  for (var i in keyUrl) {
    GetKeyCron(i, keyUrl[i]);
  }
}

GoGet()

setInterval(function () {
  GoGet()
}, 300000);

setInterval(function () {
  for (var i in UserdicNumber) {
    delete UserdicNumber[i];
  }
  UserKeyNumbers = 0;
  GoGet()
}, 600000);

function setStorageKey(url) {
  recordKey.setItem(url, true);
}
function removeStorageKey(url) {
  recordKey.removeItem(url);
}
function getStorageKey(url) {
  if (recordKey.getItem(url)) {
    return true;
  } else {
    return false;
  }
}


function setStorageTry(url) {
  recordTry.setItem(url, true);
}
function removeStorageTry(url) {
  recordTry.removeItem(url);
}
function getStorageTry(url) {
  if (recordTry.getItem(url)) {
    return true;
  } else {
    return false;
  }
}

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}


var keyArry = new Array;
function GetbilibiliKey(currenturl) {
  function fetchMe(url) {
    return $.ajax({
      url: url,
      method: 'get',
      dataType: "json",
    });
  }
  $.when(fetchMe(currenturl))
    .then(function (r1) { // Resolve
      $.each(r1['data'], function (i, n) {
        if (i.toString() == 'uname') { keyArry.push(n); }
        if (i.toString() == 'mid') { keyArry.push(n.toString()); }
      });
    }, function () { // Reject!
    });
}


function AddUserKey(key, numbers) {
  if (typeof (key) == "undefined" || key == "" || key == null || key == "null" || key.length == 0) {
    return;
  }
  key = key.toString()
  if (key.search("\'") != -1 || key.search("\"") != -1) { return; }
  if (key != 0) {
    for (var i in Userdic) {
      if (Userdic[i] == key) {
        return;
      }
    }
    UserdicNumber[UserKeyNumbers] = numbers;
    ++UserKeyNumbers;
    Userdic[UserKeyNumber] = key;
    ++UserKeyNumber;
  }
}


function GetUserKey(currenturl, numbers) {
  $.ajax(currenturl).then(function (data) {
    var reg = new RegExp(KeyRegular[numbers], "i");
    if (numbers == 8) {
      GetbilibiliKey(currenturl);
      sleep(5000).then(() => {
        for (var i = 0; i < keyArry.length; i++) {
          if (typeof (keyArry[i]) == "undefined" || keyArry[i] == "" || keyArry[i] == null || keyArry[i] == "null" || keyArry[i].length == 0) {
            return;
          } else {
            str = keyArry[i];
          }
        }
      })
    }
    else {
      try {
        str = data.match(reg)[1];
        AddUserKey(str, numbers);
      }
      catch (error) {
      }
    }
  })
}

function GetKeyCron(KeyNumber, KeyUrl) {
  for (var i in UserdicNumber) {
    if (UserdicNumber[i] == KeyNumber) {
      return 0
    }
  }
  recordKey.clear();
  record.clear();
  if (!getStorageKey(KeyUrl)) {
    GetUserKey(KeyUrl, KeyNumber);
    setStorageKey(KeyUrl);
  }
}

chrome.webRequest.onBeforeSendHeaders.addListener(function (details) {
  var blockingResponse = {};
  var domain, url;
  ++logNum;

  function GetHeader() {
    rid = details.requestId;
    url = details.url;
    domain = /^(?:[\w-]+):\/\/([^\/]+)\//.exec(url);
    domain = domain ? domain[1] : url;

    Domain = /[\w][\w-]*\.(?:com\.cn|com|cn|co|net|org|gov|cc|biz|info)(\/|$)/.exec(domain);
    Domain = Domain ? Domain[0] : Domain;
  }

  function CheckCallback() {
    Result = /[\?\&](callback|jsonp|cb|function)=([^\&]*)(\&?)/i.test(details.url);
    if (Result) { GetHeader(); }
    return Result;
  }

  function CheckResponseback(data) {
    Result = /[\"\'](uid|user_id|uin|name|username|nick|usernickname|phone|mail)([^\&]*)(\&?)/i.test(data);
    if (Result) { return 1; }
    return 0;
  }

  function CheckUrlSome(url) {
    TryUrl = /(https|http):\/\/(.*?)\?/.exec(url);
    if (!getStorageTry(TryUrl[2])) {
      setStorageTry(TryUrl[2]);
      return 1
    }
    else {
      return 0
    }
  }

  function CheckUrl(url) {
    var Auth = ['oauth2=', 'csrf', 'token=', 'g_tk='];
    for (var i in Userdic) {
      if (url.search(Userdic[i]) != -1) {
        return 1;
      }
    }
    for (var i in Auth) {
      if (url.search(Auth[i]) != -1) {
        return 1;
      }
    }
    return 0;
  }

  function CheckResponse(currenturl) {
    $.ajax({
      type: "GET",
      url: currenturl,
      complete: function (xmlhttp) {
        if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
            xmlhttp.setRequestHeader("Content-type", "application/json");
            if (xmlhttp.status == 200) {
              var responseText = xmlhttp.responseText;
              if (CheckUrl(currenturl)) { return; }
              for (var i in Userdic) {
                if (Userdic[i] == '') {
                  delete Userdic[i];
                }
                if (responseText.search(Userdic[i]) != -1) {
                  if (status == 'true') {
                    if (CheckUrlSome(currenturl)) {
                      show('确定', currenturl)
                    }
                  }
                  return
                }
              }
              if (CheckResponseback(responseText)) {
                if (status == 'true') {
                  if (CheckUrlSome(currenturl)) {
                    show('疑似', currenturl)
                  }
                }
              }
            }
            else { }
          }
        }
      },
    });
  }

  function setStorage(url) {
    record.setItem(url, true);
  }
  function getStorage(url) {
    if (record.getItem(url)) {
      return true;
    } else {
      return false;
    }
  }

  if (CheckCallback()) {
    if (!getStorage(details.url)) {
      var currenturl = details.url
      CheckResponse(currenturl);
      setStorage(details.url);
    }
  }

  blockingResponse.requestHeaders = details.requestHeaders;
  return blockingResponse;
}, { urls: ["<all_urls>"] }, ['requestHeaders', 'blocking', 'extraHeaders']);