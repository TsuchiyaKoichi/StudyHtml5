(function() {
    
    var docFragment = document.createDocumentFragment();
    
    var p1 = document.createElement('p');
    p1.appendChild(document.createTextNode('p1'));
    var div1 = document.createElement('div');
    div1.appendChild(document.createTextNode('div1'));
    var div2 = document.createElement('div');
    div2.appendChild(document.createTextNode('div2'));
    
    docFragment.appendChild(p1);
    docFragment.appendChild(div1);
    docFragment.appendChild(div2);
    
    var query = document.querySelectorAll('div');
    var element = document.getElementsByTagName('div');
    
    console.log(query[1]);
    console.log(element[1]);
    
    document.body.appendChild(docFragment);
    
    console.log(query[1]);
    console.log(element[1]);
}());