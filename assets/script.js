var doc = document;
var wrapper = doc.querySelector('.wrapper');
var navElem = doc.createElement('nav');
navElem.classList.add('nav');

createDemos();
createNav();
addCodeButtons();
// scrollToStep();
// addPalette();

// ------------------------------------------

function createDemos () {
  var textareas = doc.querySelectorAll('.demo__code');

  for( var i = 0; i < textareas.length; i++ ) {
    var item = textareas[ i ];
    var nextNode = item.nextElementSibling;
    item.target = nextNode.childElementCount > 1 ? nextNode.firstElementChild : nextNode;

    item.target.innerHTML = item.value;

    item.oninput = function( evn ) {
      this.target.innerHTML = this.value;
    }
  }

  // scrollToStep();
}

// ------------------------------------------

function createNav () {
  var titles = doc.querySelectorAll('.step:not(.step--hidden) .step__title');

  var navItems = [];

  for (var i = 0; i < titles.length; i++) {
    var item = titles[i];
    var parent = item.parentNode;
    var itemClass = 'nav__item';

    if ( parent.classList.contains('step--test') ) {
      itemClass += ' ' + itemClass + '--test';
    }

    var itemText = item.textContent;
    item.id = item.id || 'step-' + i;
    var itemLink = '<a href="#' + item.id + '"">' + itemText + '</a>';

    navItems.push('<li class="' + itemClass + '">' + itemLink + '</li>');
  }

  navElem.innerHTML = '<ol class="nav__items">' + navItems.join('\n') + '</ol>';

  // wrapper.insertBefore( navElem,  wrapper.firstChild );
  wrapper.appendChild( navElem );

}

// ------------------------------------------

function addCodeButtons() {
  var contentHolders = doc.querySelectorAll('.step__desc, .demo__goals');
  var nodeContent = getNodeContent( contentHolders[0] ).join('\n\n');

  for (var i = 0; i < contentHolders.length; i++) {
    var contItem = contentHolders[i];

    var button = doc.createElement('button');
    button.classList.add('button','button--copy-html');
    button.innerHTML = "&lt;&hellip;>";
    button.parentElem = contItem;
    contItem.insertBefore( button, contItem.firstChild );

    var textarea = doc.createElement('textarea');
    textarea.classList.add('textarea', 'textarea--copy-html');
    textarea.value = getNodeContent( contItem ).join('\n\n');
    contItem.insertBefore( textarea, contItem.firstChild );

    button.onclick = function() {
      this.parentElem.classList.toggle('state--show-code');
      this.classList.toggle('button--pressed');
    }
  }

}

// ------------------------------------------

function getNodeContent( elem ) {

  if ( elem.childElementCount == 0 ) {
    return;
  }

  var children = [];

  for (var i = 0; i < elem.children.length; i++) {
    if ( elem.children[i].tagName == 'H3'
         || elem.children[i].tagName == 'BUTTON' ) {
      continue;
    }
    var content = elem.children[i].outerHTML;

    var re = /[ ]{2,}/g;
    content = content.replace(re, '');
    re = /\<li/g;
    content = content.replace(re, '  <li');
    children.push( content );
  }

  return children;
}

// ------------------------------------------

function scrollToStep() {
  if ( !doc.location.hash ) {
    return;
  }
  var currentElem = doc.querySelector( doc.location.hash );
  var offsetTop = currentElem.offsetTop;

  window.scrollBy( 0, offsetTop );

  console.log( 'scroll!' );
}

//---------------------------------------------

function addPalette() {
  var colors = [
    'tomato',
    'darkorange',
    'gold',
    'yellowgreen',
    'lightseagreen',
    'teal'
  ];

  var ul = doc.createElement('ul');
  ul.classList.add('palette');

  colors.forEach( function ( item ) {
    var li = doc.createElement('li');
    li.innerHTML = item;
    li.style.background = item;
    ul.appendChild( li );
  })

  doc.body.appendChild( ul );
}
