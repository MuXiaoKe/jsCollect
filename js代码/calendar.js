//todo
/**
 * Created by ZLY on 2016/4/29.
 */
    var ZH = ZH||{};
    ZH.Component={};
    ZH.Component.calendar = function(){
        var initHeight = 380,  //初始高度
            palnDate = null ,//日程数据
            curToday = new Date(), //当前日期
            pageDate = new Date(), //日历日期
            curSelectDate = "",   //当前选择日期
            lastOpt,
            lastOptCss = "";

        function initToday(){
            var todayD = curToday.getDate();//本日
            var todayWD = curToday.getDay();//本周几
            $("#currentDay").html(todayD);         //页面日期显示
            $("#currentWeekDay").html(getWeekDay(todayWD));     //页面星期显示
        }
        function getWeekDay(day) {
            var weekDay = "";
            if (day == 0) {
                weekDay = "星期日";
            } else if (day == 1) {
                weekDay = "星期一";
            } else if (day == 2) {
                weekDay = "星期二";
            } else if (day == 3) {
                weekDay = "星期三";
            } else if (day == 4) {
                weekDay = "星期四";
            } else if (day == 5) {
                weekDay = "星期五";
            } else if (day == 6) {
                weekDay = "星期六";
            }
            return weekDay;
        }
        function DateAdd(interval, number, idate) {
            var date = new Date(idate.getFullYear(), idate.getMonth(), idate.getDate());
            number = parseInt(number);
            switch (interval) {
                case "y":
                    date.setFullYear(date.getFullYear() + number);
                    break;
                case "m":
                    date.setMonth(date.getMonth() + number);
                    break;
                case "d":
                    date.setDate(date.getDate() + number);
                    break;
                case "w":
                    date.setDate(date.getDate() + 7 * number);
                    break;
                case "h":
                    date.setHours(date.getHours() + number);
                    break;
                case "n":
                    date.setMinutes(date.getMinutes() + number);
                    break;
                case "s":
                    date.setSeconds(date.getSeconds() + number);
                    break;
                case "l":
                    date.setMilliseconds(date.getMilliseconds() + number);
                    break;
            }
            return date;
        }
        function calendar(showObj){
            clearData();
            var year = pageDate.getFullYear();      //选中年
            var month = pageDate.getMonth() + 1;    //选中月
            var day = pageDate.getDate();           //选中日
            var todayY = curToday.getFullYear();//本年
            var todayM = curToday.getMonth() + 1;//本月
            var todayD = curToday.getDate();//今天

            var todayStr = todayY + "-" + (todayM > 9 ? todayM : "0" + todayM) + "-" + (todayD > 9 ? todayD : "0" + todayD);//格式化年月日
            var selectDate = year + "-" + (month > 9 ? month : "0" + month) + "-" + (day > 9 ? day : "0" + day);
            $("#showDate").html(year + "年" + (month > 9 ? month : "0" + month) + "月");

            //当前月月第一天是星期几（距星期日离开的天数）
            var startDay = new Date(year, month - 1, 1).getDay();
            var firstdate = new Date(year, month - 1, 1);//选中月第一天
            var lastMonth = new Date(year, month - 2, 1);//选中月上个月第一天
            var nextMonth = new Date(year, month, 1);//选中月下月第一天

            var lastStr = lastMonth.getFullYear() + "-" + ((lastMonth.getMonth() + 1) > 9 ? (lastMonth.getMonth() + 1) : "0" + (lastMonth.getMonth() + 1));              //上个月年月
            var currentStr = year + "-" + (month > 9 ? month : "0" + month);
            var nextStr = nextMonth.getFullYear() + "-" + ((nextMonth.getMonth() + 1) > 9 ? (nextMonth.getMonth() + 1) : "0" + (nextMonth.getMonth() + 1));      //下个月年月

            var lastMothStart = DateAdd("d", -startDay, firstdate).getDate();//日期第一天
            var lastMothend = DateAdd("d", -1, firstdate).getDate();//上月的最后一天

            //本月有多少天(即最后一天的getDate()，但是最后一天不知道，我们可以用“上个月的0来表示本月的最后一天”)
            var nDays = new Date(year, month, 0).getDate();

            //开始画日历
            var numRow = 0;  //记录行的个数，到达7的时候创建tr
            var totalRow = 1;
            var i;        //日期
            var html = '<tr class="calen-head"><td class="title">日</td>' +
                '<td class="title">一</td>' +
                '<td class="title">二</td>' +
                '<td class="title">三</td>' +
                '<td class="title">四</td>' +
                '<td class="title">五</td>' +
                '<td class="title">六</td></tr>';
            //渲染本月显示的上月天数
            for (i = lastMothStart; startDay != 0 && i <= lastMothend; i++) {
                html += '<td  id="' + lastStr + '-' + i + '" class="prevDay" data="">';
                html += '<div class="notSelectMonthDay " title="' + lastStr + '-' + i + '">';
                html += i;
                html += '</div></td>';
                numRow++;
            }
            for (var j = 1; j <= nDays; j++) {
                if (year == todayY && month == todayM && j == todayD) {
                    html += '<td id="' + currentStr + '-' + (j > 9 ? j : '0' + j) + '" class="curMouthDay" data="" >';
                    html += '<div class="currentCalendar" title="' + currentStr + '-' + (j > 9 ? j : "0" + j) + '">';
                }
                else {
                    html += '<td id="' + currentStr + '-' + (j > 9 ? j : '0' + j) + '" class="curMouthDay" data="">';
                    html += '<div title="' + currentStr + '-' + (j > 9 ? j : "0" + j) + '">';
                }
                html += j;
                html += '</div></td>';
                numRow++;
                if (numRow == 7) {  //如果已经到一行（一周）了，重新创建tr
                    numRow = 0;
                    totalRow++;
                    html += '</tr><tr>';
                }
            }
            //补充后一个月
            if (numRow > 0) {
                for (var k = 1; k <= 7; k++) {
                    html += '<td  id="' + nextStr + '-0' + k + '" class="nextDay" data="">';
                    html += '<div class="notSelectMonthDay " title="' + nextStr + '-0' + k + '">' + k + '</div></td>';
                    numRow++;
                    if (numRow == 7) {  //如果已经到一行（一周）了，重新创建tr
                        numRow = 0;
                        html += '</tr>';
                        break;
                    }
                }
            }
            $('#LDay').html(html);
            //initHeight = parseInt($('#LDay').height()) + 80 + 40 + 10 + 15;

            //标记选中日期
            if (showObj != 'undefined' && showObj != undefined) {
                $('div[title="' + showObj + '"]').addClass("currentSelect");
            } else {
                if (selectDate != todayStr) {
                    $('div[title="' + selectDate + '"]').addClass("currentSelect");
                }
            }
            //ajax获取数据
            $.ajax({
                type: "POST",
                url: "data/test.json",
                success: function (data) {
                    var sd = $(".currentSelect").attr("title");
                    if (sd == undefined || selectDate == 'undefined') {
                        sd = $(".currentCalendar").attr("title");
                    }
                    var datas = data.dateevents;
                    planData = data.events;
                    for (var key in datas) {
                        //$('#'+key).addClass("hashPlanTD");
                        $('#' + key).children('div').eq(0).addClass("hashPlanDiv");
                        $('#' + key).attr("data", datas[key]);
                        if (key == sd) {
                            //clickDate($('#'+key));
                            showData($('#' + sd));
                        }
                    }
                }
            });
        }
        function next(obj) {
            pageDate.setDate(1);//设置本月第一天
            pageDate.setMonth(pageDate.getMonth() + 1);
            var idv = $(obj).attr("id");
            if (idv != 'prevbtn' && idv != 'nextbtn') {
                calendar(idv);
            } else {
                calendar();
            }
        }

        function prev(obj) {
            pageDate.setDate(1);//设置本月第一天
            pageDate.setMonth(pageDate.getMonth() - 1);
            var idv = $(obj).attr("id");
            if (idv != 'prevbtn' && idv != 'nextbtn') {
                calendar(idv);
            } else {
                calendar();
            }

        }
        function todayClick() {
            pageDate = new Date(curToday.getFullYear(), curToday.getMonth(), curToday.getDate());
            calendar();
        }
        //点击日期
        function clickDate(obj) {
            showData(obj);
            //reGetDate();
        }
        function clearData() {
            $('.EventDataList').html("");
        }
        function showData(obj) {
            if (lastOpt == undefined || lastOpt == 'undefined') {

            } else {
                $(lastOpt).children('div').eq(0).addClass(lastOptCss);
            }

            $('div').removeClass("currentSelect");
            var divObj = $(obj).children('div').eq(0);

            lastOpt = obj;
            lastOptCss = $(divObj).attr("class");
            $(divObj).removeClass(lastOptCss);
            $(divObj).addClass("currentSelect");
            currentSelectDate = $(divObj).attr("title");
            clearData();
            var data = $(obj).attr("data");
            if (data == '') return false;
            var datas;
            if (typeof (data) == "string") {
                datas = data.split(",");
            }

            if (typeof (data) == "object") {
                datas = data;
            }
            //$('#planDataEvent').addClass("planDataEvent");

            var html = '';
            var cnt = 0;
            for (var key in datas) {
                if (isNaN(key)) continue;
                html += '<div class="hand dataEvent clearfix" onclick="clickData(\'' + datas[key] + '\')" title="' + planData[datas[key]][5] + '\n' + planData[datas[key]][1] + '">';
                html += '<div class="eventBd"></div>';
                html += '<div class="dataEvent2" ><div class="dataEvent2_1">' + planData[datas[key]][3] + '&nbsp;&nbsp;' + planData[datas[key]][4] + '</div></div>';
                html += '<div class="dataEvent3 of">' + planData[datas[key]][1] + '</div>';
                html += '</div>';
            }

            $('.EventDataList').html(html);
        }
        initToday();
        calendar();
        $(document).on('click','#prevbtn,.prevDay',function(){
            prev(this)
        }) ;
        $(document).on('click','#nextbtn,.nextDay',function(){
            next(this)
        });
        $(document).on('click','#todayshow',function(){
            todayClick()
        }) ;
        $(document).on('click','.curMouthDay',function(){
            clickDate(this)
        }) ;
    };

    $(function(){
        ZH.Component.calendar();
    }) ;


