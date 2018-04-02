var section = [];
var tabsChild = [];
var currentTabs = [];
var subTabs = [];

function initialize() {
    tab();
    if($('#tdp-detail').length)
        tourismNav("detail");
}

function calcChanged() {
    var val = $("#calcType").val();
}

function tab() {
    var i = 0;
    $("div[id^='tab-container']").each(function () {
        var temp = i;
        section.push($(this));
        tabsChild.push($("#" + $(this).attr('id') + " > .tab").children().find('a'));
        // alert(i);
        subTabs.push(0);
        currentTabs.push(0);
        var j = 0;
        tabsChild[i].each(function () {
            $($(this).attr('href')).css('display', 'none');
            if (j == 0)
                switchTab(temp, $(this).attr('href'));
            j++;
            $(this).click(function () {
                switchTab(temp, $(this).attr('href'));
                return false;
            });
        })
        i++;
    });
}

function switchTab(sectionID, tabId) {
    $(tabId).css('display', 'block')
    $(currentTabs[sectionID]).css('display', 'none');
    currentTabs[sectionID] = tabId;
    subTabs[sectionID] = 0;
    tabsChild[sectionID].each(function () {
        if ($(this).attr('href') == tabId) {
            $(this).addClass('active');
            currentTabs[sectionID] = tabId;
        } else if ($(this).attr('class') == 'active')
            $(this).removeClass('active');
    })

    subTab(sectionID, 0);
}

function subTab(sectionID, value) {
    var id = currentTabs[sectionID];
    var temp;
    id = id.replace('#', '');
    subTabs[sectionID] += value;
    if (!$("#" + id + "-" + subTabs[sectionID]).length) {
        subTabs[sectionID] -= value;
        return;
    }
    $("div[id^='" + id + "-']").css('display', 'none');

    if (value != 0) {
        $("#" + id + "-" + (subTabs[sectionID] - value)).css('display', 'block');
    }

    if (value != 0) {
        if (Math.abs(value) == value)
            $("#" + id + "-" + (subTabs[sectionID] - value)).addClass("animated fadeOutLeft");
        else
            $("#" + id + "-" + (subTabs[sectionID] - value)).addClass("animated fadeOutRight");
        window.setTimeout(function () {
            $("#" + id + "-" + (subTabs[sectionID] - value)).removeClass("fadeOutLeft");
            $("#" + id + "-" + (subTabs[sectionID] - value)).removeClass("fadeOutRight");
            $("#" + id + "-" + (subTabs[sectionID] - value)).removeClass("animated");
            $("div[id^='" + id + "-']").css('display', 'none');
        }, 500);
        window.setTimeout(function () {
            if (Math.abs(value) == value)
                $("#" + id + "-" + subTabs[sectionID]).addClass("fadeInRight animated");
            else
                $("#" + id + "-" + subTabs[sectionID]).addClass("fadeInLeft animated");
            $("#" + id + "-" + subTabs[sectionID]).css('display', 'block');
        }, 500);

        window.setTimeout(function (){
            $("#" + id + "-" + subTabs[sectionID]).removeClass("fadeInLeft");
            $("#" + id + "-" + subTabs[sectionID]).removeClass("fadeInRight");
            $("#" + id + "-" + subTabs[sectionID]).removeClass("animated");
        }, 1500);
    } else {
        $("#" + id + "-" + subTabs[sectionID]).css('display', 'block');
    }
    
    if ($("#" + id + "-" + (subTabs[sectionID] - value).length)) {
        $('#sub-nav-' + sectionID).find('.back').addClass('nav-noninteractive');
        $('#sub-nav-' + sectionID).find('.back').removeClass('nav-interactive');
        if ($("#" + id + "-" + (subTabs[sectionID] + value).length)) {
            $('#sub-nav-' + sectionID).find('.next').removeClass('nav-noninteractive');
            $('#sub-nav-' + sectionID).find('.next').addClass('nav-interactive');
        }else{
            $('#sub-nav-' + sectionID).find('.next').removeClass('nav-interactive');
            $('#sub-nav-' + sectionID).find('.next').addClass('nav-noninteractive');
        }
    } else if ($("#" + id + "-" + (subTabs[sectionID] + value).length)) {
        $('#sub-nav-' + sectionID).find('button.next').removeClass('nav-noninteractive');
        $('#sub-nav-' + sectionID).find('button.next').addClass('nav-interactive');
        if ($("#" + id + "-" + (subTabs[sectionID] + value).length)) {
            $('#sub-nav-' + sectionID).find('button.back').removeClass('nav-interactive');
            $('#sub-nav-' + sectionID).find('button.back').addClass('nav-noninteractive');
        }else{
            $('#sub-nav-' + sectionID).find('button.back').removeClass('nav-noninteractive');
            $('#sub-nav-' + sectionID).find('button.back').addClass('nav-interactive');
        }
    }

}

function navElaps() {
    var x = $('#navbar');
    if (!x.hasClass('responsive')) {
        x.addClass('responsive');
    } else {
        x.removeClass('responsive');
    }
}

function tourismNav(id){
    $('#tdp-detail').css('display', 'none');
    $('#tdp-history').css('display', 'none');
    $('#tdp-map').css('display', 'none');
    $('#tdp-gallery').css('display', 'none');

    $('#btn-detail').removeClass('active');
    $('#btn-history').removeClass('active');
    $('#btn-map').removeClass('active');
    $('#btn-gallery').removeClass('active');

    $('#tdp-'+id).css('display', 'block');
    $('#btn-'+id).addClass('active');   
}

function tsahClose(){
    $("#tsah").removeClass("fadeInUp animated");
    $("#tsah").addClass("fadeOutDown animated");    
}

function tsahShow(){
    $("#tsah").css('display', 'block');
    $("#tsah").removeClass("fadeOutDown animated");
    $("#tsah").addClass("fadeInUp animated");
}