/*Jsonp Found */

new_element = document.createElement("script");
new_element.setAttribute("type", "text/javascript");
new_element.setAttribute("src", "base64.js");
document.body.appendChild(new_element);

var LogUrl = "http://xxx/ttt.php"
var GetUrl = "http://xxx/Regurl.php"

var recordKey = localStorage;
var Userdic = {};
var UserdicNumber = {};
var UsedUrl = {};
var status = false;
var UserKeyNumber = 0, UserKeyNumbers = 0, logNum = 0, KeyNumber = 0, DictNumber = 0, UsedUrlNumber = 0;
var keyUrl = {};
var KeyRegular = {};

chrome.contextMenus.create({
  title: "Start JsonpFinder",
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

function GoGet() {
  for (var i in keyUrl) {
    GetKeyCron(i, keyUrl[i]);
  }
}

function GetUrlReg(currenturl) {
  UserUrlNumbers = 0;
  UserRegNumbers = 0;
  function fetchMe(url) {
    return $.ajax({
      url: url,
      method: 'get',
      dataType: "json",
    });
  }
  $.when(fetchMe(currenturl))
    .then(function (r1) { // Resolve
      $.each(r1['url'], function (i, n) {
        keyUrl[UserUrlNumbers] = n;
        ++UserUrlNumbers;
      });
      $.each(r1['reg'], function (i, n) {
        KeyRegular[UserRegNumbers] = n;
        ++UserRegNumbers;
      });
    }, function () { // Reject!
    });
}

try {
  GetUrlReg(GetUrl + '?version=0.3');
  sleep(3000).then(() => {
    GoGet();
  })

  setInterval(function () {
    GoGet();
  }, 600000);

  setInterval(function () {
    for (var i in UserdicNumber) {
      delete UserdicNumber[i];
    }
    UserKeyNumbers = 0;
    for (var i in keyUrl) {
      delete keyUrl[i];
    }
    UserUrlNumbers = 0;
    for (var i in KeyRegular) {
      delete KeyRegular[i];
    }
    UserRegNumbers = 0;
    GetUrlReg(GetUrl + '?version=0.3');
    GoGet()
  }, 1200000);

} catch (error) {
  console.log(error)
}


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
      });
    }, function () { // Reject!
    });
}
function AddUserKey(key, numbers) {
  if (typeof (key) == "undefined" || key == "" || key == null || key == "null" || key.length == 0 || key.indexOf('*') > -1) {
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
          if (typeof (keyArry[i]) == "undefined" || keyArry[i] == "" || keyArry[i] == null || keyArry[i] == "null" || keyArry[i].length == 0 || keyArry[i].indexOf('*') > -1) {
            return;
          } else {
            str = keyArry[i];
            AddUserKey(str, numbers);
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
  if (!getStorageKey(KeyUrl)) {
    GetUserKey(KeyUrl, KeyNumber);
    setStorageKey(KeyUrl);
  }
}

chrome.webRequest.onBeforeSendHeaders.addListener(function (details) {
  var blockingResponse = {};
  var domain;
  ++logNum;

  function GetHeader(url) {
    domain = /^(?:[\w-]+):\/\/([^\/]+)\//.exec(url);
    domain = domain ? domain[1] : url;

    Domain = /[\w][\w-]*\.(?:com\.cn|com|cn|co|net|org|gov|cc|biz|info)(\/|$)/.exec(domain);
    Domain = Domain ? Domain[0] : Domain;
    return domain
  }

  function CheckCallback() {
    if (/[\?\&](callback)=([^\&]*)(\&?)/i.test(details.url)) {
      return 'callback';
    }
    if (/[\?\&](jsonp)=([^\&]*)(\&?)/i.test(details.url)) {
      return 'jsonp';
    }
    if (/[\?\&](cb)=([^\&]*)(\&?)/i.test(details.url)) {
      return 'cb';
    }
    if (/[\?\&](function)=([^\&]*)(\&?)/i.test(details.url)) {
      return 'function';
    }
    return 0;
  }

  function CheckResponseback(data) {
    Result = /[\"\'](id|uid|user_id|uin|name|username|nick|usernickname|phone|mail|screen_name)([^\&]*)(\&?)/i.test(data);
    if (Result) { return 1; }
    return 0;
  }

  function GetUrlArguments(sUrl, sName) {
    var re = RegExp("(\\?|&)?" + sName + "=([^&]*)")
    re.test(sUrl)
    return RegExp.$2
  }

  function CheckFunctionUse(data, Use_Function) {
    check = Use_Function + '(';
    if (data.indexOf(check) != -1) {
      return 1;
    }
    return 0;
  }

  function CheckUrlSome(url) {
    TryUrl = /(https|http):\/\/(.*?)\?/.exec(url);
    try {
      if (typeof (TryUrl[2]) == "undefined" || TryUrl[2] == "" || TryUrl[2] == null || TryUrl[2] == "null" || TryUrl[2].length == 0 || TryUrl[2].indexOf('*') > -1) {
        return;
      }
      for (var i in UsedUrl) {
        if (UsedUrl[i] == TryUrl[2]) {
          return 0
        }
      }
      UsedUrl[UsedUrlNumber] = TryUrl[2];
      ++UsedUrlNumber;
      return 1
    }

    catch (err) {
      console.log(err)
    }
  }

  function CheckUrl(url) {
    var Auth = ['oauth2=', 'csrf', 'token=', 'g_tk=', 'auth=', 'sign='];
    try {
      for (var i in Userdic) {
        if (url.search(Userdic[i]) != -1) {
          return 0;
        }
      }
      for (var i in Auth) {
        if (url.search(Auth[i]) != -1) {
          return 0;
        }
      }
      return 1;
    } catch (error) {
    }
  }

  function CheckResponse(currenturl, Use_Function) {
    $.ajax({
      type: "GET",
      url: currenturl,
      complete: function (xmlhttp) {
        if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
            xmlhttp.setRequestHeader("Content-type", "application/json");
            if (xmlhttp.status == 200) {
              var responseText = xmlhttp.responseText;
              Test_Function = GetUrlArguments(currenturl, Use_Function);
              if (CheckResponseback(responseText)) {
                if (CheckUrlSome(currenturl)) {
                  for (var i in Userdic) {
                    if (responseText.search(Userdic[i]) != -1) {
                      if (CheckUrl(currenturl) && CheckFunctionUse(responseText, Test_Function)) {
                        show('确定', currenturl);
                        var TrueLogUrl = LogUrl + '?version=0.1';
                        domain = GetHeader(currenturl);
                        WriteLog(currenturl, domain, TrueLogUrl);
                        return
                      }
                    }
                  }
                  show('疑似', currenturl);
                  var TryLogUrl = LogUrl + '?version=0.2';
                  domain = GetHeader(currenturl);
                  WriteLog(currenturl, domain, TryLogUrl);
                }
              }
            }
          }
        }
      },
    });
  }

  function WriteLog(url, domain, LogUrl) {
    var base = new Base64();
    var jsonpUrl = base.encode(url);
    var LogUrl = LogUrl + '&url=' + jsonpUrl + '&domain=' + domain;
    $.ajax({
      url: LogUrl,
      type: "GET",
      cache: false,
    });
  }
  try {
    Use_Function = CheckCallback()
    if (Use_Function) {
      if (!getStorageKey(details.url)) {
        var currenturl = details.url
        CheckResponse(currenturl, Use_Function);
        setStorageKey(details.url);
      }
    }

  } catch (error) {
    console.log(error)
  }
  blockingResponse.requestHeaders = details.requestHeaders;
  return blockingResponse;
}, { urls: ["<all_urls>"] }, ['requestHeaders', 'blocking', 'extraHeaders']);