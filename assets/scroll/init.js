(function() {
    window.zbdp = {};
    zbdp.getScaleAndLocation = function() {
        // 用于"transform": "scale(" + scale + ")",
        var scale = 1;
        // 缩放后居中的位置,
        var location = {
            x: 0,
            y: 0
        }
        var width = document.body.clientWidth;
        var height = document.body.clientHeight;
        if (width / height < 1920 / 1080) {
            scale = width / 1920;
            location.y = (height - 1080 * scale) / 2;
        } else {
            scale = height / 1080;
            location.x = (width - 1920 * scale) / 2;
        }
        return {
            scale: scale,
            location: location
        };
    }

    /*zbdp.getTime = function() {
        var date = new Date();
        var result = {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
            hours: date.getHours()
        };
        return result;
    }
    zbdp.toDayString = function(spt) {
        var spt = spt ? spt : "-";
        var time = zbdp.getTime();
        var month = time.month < 10 ? "0" + time.month : time.month;
        var day = time.day < 10 ? "0" + time.day : time.day;
        return time.year + spt + month + spt + day;
    }*/
    zbdp.formateDate = function(arg) {
        var result = {};
        var now = new Date();
        var ago = new Date(arg);
        var nowTime = {
            year: now.getFullYear(),
            month: now.getMonth() + 1,
            day: now.getDate()
        }
        var agoTime = {
            year: ago.getFullYear(),
            month: ago.getMonth() + 1,
            day: ago.getDate()
        }

        if (nowTime.year == agoTime.year) {
            if (nowTime.day == agoTime.day && nowTime.month == agoTime.month) {
                result.isToday = true;
            } else {
                result.isToday = false;
                var nowTimeDate = new Date(nowTime.year + '-' + nowTime.month + '-' + nowTime.day);
                var ageTimeDate = new Date(agoTime.year + '-' + agoTime.month + '-' + agoTime.day);
                if (nowTimeDate - ageTimeDate == 86400000) {
                    result.date = '昨天';
                } else {
                    result.date = agoTime.month + '月' + agoTime.day + '日';
                }
            }
        } else if (nowTime.year != agoTime.year) {
            result.isToday = false;
            result.date = agoTime.year + '年' + agoTime.month + '月' + agoTime.day + '日';
        }
        return result;
    }

    zbdp.resizePage = function() {
        var scaleAndLocation = zbdp.getScaleAndLocation();
        //if (scaleAndLocation.scale != 1) {
        //    $(".news-main-container").css({
        //        "transform-origin": "left top",
        //        "-webkit-transform-origin": "left top",
        //        "transform": "scale(" + scaleAndLocation.scale + ")",
        //        "-webkit-transform": "scale(" + scaleAndLocation.scale + ")",
        //        "transform-origin": "left top",
        //        "-webkit-transform-origin": "left top",
        //        "margin-left": scaleAndLocation.location.x + "px",
        //        "margin-top": scaleAndLocation.location.y + "px"
        //    });
        //}
    }

    zbdp.configData = {
        /**
         * 新闻配置项
         */
        'moveVerticalDelay': 3000, //单位（ms）,垂直滚动间隔
        'moveHorizontalSpeed': 30, //单位（像素/s）,水平滚动速度
        'moveHorizontalDelay': 2000, //单位（ms）,水平滚动间隔
        'topItemsThreshold': 5, //单位（条）,置顶的信息条目最多显示的数量，且不会垂直滚动
        'todayUpdateInterval': 100, //单位（s），今日政策更新间隔
        'groupUpdateInterval': 140, //单位（s），集团舆情更新间隔

        /**
         * 突发线索配置项
         */
        'checkEmergencyInterval': 60, //单位（s），检查是否有突发线索的时间间隔
        'showEmergencyDur': 30, //单位（s），突发事件窗口显示时长
        'toggleEmergencyInterval': 2, //单位（s），显示下个突发事件的间隔 

    }

})();
