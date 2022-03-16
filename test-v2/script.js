document.getElementsByTagName('video')[0].volume = 0.3;

(function () {
  seekIfNeeded();
  displayTimeURL();

  function seekIfNeeded () {
    var q = window.location.search;

    if (q.indexOf('t=') > -1) {
      var timeString = q.split('=')[1],
        media = document.getElementById('media'),
        seekedFromURL = false;

      media.addEventListener('canplay', function () {
        if (!seekedFromURL) {
          media.currentTime = secondsFromTimeParts(partsFromTimeString(timeString));
          seekedFromURL = true;
        }
      });
      
      media.load();
      media.play();
    }
  }

  function partsFromTimeString (str) {
    var parts = {h: 0, m: 0, s: 0};

    try {
      str.match(/[0-9]+[hms]+/g).forEach(function (val) {
        var part = val.match(/[hms]+|[0-9]+/g);
        parts[part[1]] = parseInt(part[0], 10);
      });
    }
    catch (e) {}

    return parts;
  }

  function timeStringFromParts (parts) {
    var str = '';

    for (key in parts) {
      if (parts[key] > 0) {
        str += parts[key] + key;
      }
    }

    return str;
  }

  function timePartsFromSeconds (seconds) {
    var parts = {},
      secondsInt = Math.floor(seconds);

    parts.h = Math.floor((secondsInt / 3600) % 24);
    parts.m = Math.floor(secondsInt / 60);
    parts.s = secondsInt % 60;

    return parts;
  }

  function secondsFromTimeParts (parts) {
    var seconds = 0;

    seconds += parts.s;
    seconds += parts.m * 60;
    seconds += parts.h * 3600;

    return seconds;
  }

  function displayTimeURL () {
    var loc = window.location,
      timeDisplay = document.querySelector('.current-url'),
      media = document.getElementById('media'),
      coolTime = '';

    media.addEventListener('timeupdate', function () {
      var newCoolTime = timeStringFromParts(timePartsFromSeconds(media.currentTime));

      if (coolTime != newCoolTime) {
        coolTime = newCoolTime;
        var url = loc.origin + loc.pathname + '?t=' + coolTime;

        if (timeDisplay != document.activeElement) {
          timeDisplay.setAttribute('value', url);
        }
      }
    });
  }
}());