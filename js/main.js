'use strict';
console.log('Starting up');

function initPage() {
    createprojs();
    renderprojs();
}

function renderprojs() {
    var projs = getprojs();
    var strHtmlProt = projs.map(function(proj, index) {
        return `<div class="col-md-4 col-sm-6 portfolio-item">
        <a class="portfolio-link" data-toggle="modal" href="#portfolioModal" onclick="renderModals(${index})">
          <div class="portfolio-hover">
            <div class="portfolio-hover-content">
              <i class="fa fa-plus fa-3x"></i>
            </div>
          </div>
          <img class="img-fluid" src="${proj['theme-url']}" alt="">
        </a>
        <div class="portfolio-caption">
          <h4>${proj.name}</h4>
          <p class="text-muted">${proj.title}</p>
        </div>
      </div>`;
    })
    $('.main-modals-prot').html(strHtmlProt.join(''));
}

function renderModals(index) {
    updateIndex(index);
    var projs = getprojs();
    $('.modal-body h2').html(projs[index].name);
    $('.modal-body .para1-modal').html(projs[index].title);
    $('.modal-body img').attr('src', projs[index].url);
    $('.modal-body .para2-modal').html(projs[index].desc);
    $('.modal-body .date-modal').html(projs[index].publishedAt);
    $('.modal-body .client-modal').html(projs[index].labels[0]);
    $('.modal-body .category-modal').html(projs[index].labels[1]);
}

function submitMassage() {
    var msg = {
        mail: $('.form-control-mail').val(),
        sub: $('.form-control-subject').val(),
        con: $('.form-control-content').val()
    }
    var strLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${msg['mail']}&su=${msg.sub}&body=${msg['con']}`;
    open(strLink); // window.open
}

function cleanSubmitMassage() {
    $('.form-control-mail').val('');
    $('.form-control-subject').val('');
    $('.form-control-content').val('');
}

function openGame() {
    var index = getCurrIdx();
    var projs = getprojs();
    var strGame = `projs/${projs[index].id}/index.html`;
    open(strGame); // window.open
}