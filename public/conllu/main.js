var tts = [];
var normal = [];

function toggle(id, enhanced) {
    unhold();
    if (normal[id] && enhanced) {
        $('svg#' + id + ' .enhanced').css({'visibility': ''});
        $('svg#' + id + ' .normal').css({'visibility': 'hidden'});
        normal[id] = false;
    } else if (!normal[id] && !enhanced) {
        $('svg#' + id + ' .enhanced').css({'visibility': 'hidden'});
        $('svg#' + id + ' .normal').css({'visibility': ''});
        normal[id] = true;
    }
}

function toggleAll(enhanced) {
    unhold();
    if (enhanced) {
        $('.enhanced').css({'visibility': ''});
        $('.normal').css({'visibility': 'hidden'});
        $('.rb').prop('checked', false);
        $('.re').prop('checked', true);
    } else {
        $('.enhanced').css({'visibility': 'hidden'});
        $('.normal').css({'visibility': ''});
        $('.re').prop('checked', false);
        $('.rb').prop('checked', true);
    }
    for (var id in tts) {
        normal[id] = !enhanced;
    }
}

var holding = false;
var holdedge = false;
var holdnode = false;
var holdid = '';
var holdi = -1;
var holdj = -1;

function unhold() {
    if (holding) {
        holding = false;
        if (holdnode) {
            holdnode = false;
            unmark(holdid, holdi);
        }
        if (holdedge) {
            holdedge = false;
            unmrk(holdid, holdi, holdj);
        }
        holdid = '';
        holdi = -1;
        holdj = -1;
    }
}

function hold(id, i) {
    if (holdnode && id == holdid && i == holdi) {
        unhold();
    } else {
        unhold();
        mark(id, i);
        holding = true;
        holdnode = true;
        holdid = id;
        holdi = i;
    }
}

function hld(id, i, j) {
    if (holdedge && id == holdid && i == holdi && j == holdj) {
        unhold();
    } else {
        unhold();
        mrk(id, i, j);
        holding = true;
        holdedge = true;
        holdid = id;
        holdi = i;
        holdj = j;
    }
}

function mark(id, i) {
    var cl = normal[id] ? 'n' : 'e';
    var t = tts[id][i - 1];
    tooltip.show(t[0] + ': <em>' + t[1] + '</em><br>\n' + t[2] + '<br>\n' + t[3] + '<br>\nLemma: ' + t[4] + (t[5] == "_" ? "" : '<br>\nXpos: ' + t[5]));
    if (!holding) {
        $('svg#' + id + ' .l' + cl + i).css({'fill': 'blue', 'font-weight': 'bold'});
        $('svg#' + id + ' .e' + cl + i).css({'stroke': 'blue', 'stroke-width': 3});
    }
}

function unmark(id, i) {
    var cl = normal[id] ? 'n' : 'e';
    tooltip.hide();
    if (!holding) {
        $('svg#' + id + ' .l' + cl + i).css({'fill': 'black', 'font-weight': 'normal'});
        $('svg#' + id + ' .e' + cl + i).css({'stroke': 'black', 'stroke-width': 1});
    }
}

function mrk(id, i, j) {
    if (!holding) {
        $('svg#' + id + ' .p' + i + 'p' + j).css({'fill': 'blue', 'font-weight': 'bold'});
        $('svg#' + id + ' .q' + i + 'q' + j).css({'stroke': 'blue', 'stroke-width': 3});
        $('svg#' + id + ' .q' + i).css({'stroke': 'blue', 'stroke-width': 3});
        $('svg#' + id + ' .q' + j).css({'stroke': 'blue', 'stroke-width': 3});
    }
}

function unmrk(id, i, j) {
    if (!holding) {
        $('svg#' + id + ' .p' + i + 'p' + j).css({'fill': 'black', 'font-weight': 'normal'});
        $('svg#' + id + ' .q' + i + 'q' + j).css({'stroke': 'black', 'stroke-width': 1});
        $('svg#' + id + ' .q' + i).css({'stroke': 'black', 'stroke-width': 1});
        $('svg#' + id + ' .q' + j).css({'stroke': 'black', 'stroke-width': 1});
    }
}