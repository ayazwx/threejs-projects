var data = [
    {
        "id": 1,
        "name": "Laptop - THREE.js",
        "timestamp": "2023 / 08 / 31",
        "link": "./computer"
    },
    // {
    //     "id": 2,
    //     "name": "Personal Website",
    //     "timestamp": "2023 / 01 / 25",
    //     "link": "https://ayazvefa.dev"
    // },
    // {
    //     "id": 3,
    //     "name": "Netflix Clone - React",
    //     "timestamp": "2023 / 04 / 28",
    //     "link": "https://netflix-clone-react.ayazvefa.dev/"
    // },
    {
        "id": 4,
        "name" : "Three.js Demo",
        "timestamp": "2023 / 08 / 08",
        "link": "https://threejs-demo-wheat.vercel.app/"
    },
    {
        "id": 5,
        "name" : "Lamborghini - THREE.js",
        "timestamp": "2023 / 09 / 02",
        "link": "./lamborghini"
    }
];

var nav = document.getElementById( 'projects' ); // document.getElementById( 'nav' );
var viewer = document.getElementById( 'viewer' );
var iframe = document.getElementById( 'iframe' );

// iOS iframe auto-resize workaround

if ( /(iPad|iPhone|iPod)/g.test( navigator.userAgent ) ) {
    iframe.style.width = getComputedStyle( iframe ).width;
    iframe.style.height = getComputedStyle( iframe ).height;
}

var expand = document.getElementById( 'expand' );
expand.addEventListener( 'click', function () {

    nav.className = nav.className === '' ? 'hidden' : '';

} );

var selected, divs = {};

init();

function init () {

    buildNav( data );

    if ( window.location.hash ) {

        var hash = window.location.hash.substr( 1 );

        var id = hash.split( '/' )[ 1 ];

        for ( var i in data ) {

            if ( data[ i ].id == id ) {

                loadProject( data[ i ] );
                break;

            }

        }

    } else {

        loadProject( data[ 0 ] );

    }

    window.addEventListener( 'popstate', function ( event ) {

        if ( event.state != null ) loadProject( event.state );

    }, false );

};

function buildNav( projects ) {

    for ( var i in projects ) {

        nav.appendChild( buildProject( projects[ i ] ) );

    }

}

function buildProject( data ) {

    var div = document.createElement( 'div' );
    div.className = 'project';
    div.addEventListener( 'click', function ( event ) {

        loadProject( data );
        window.location.hash = '/' + data.id + '/' + data.name.toLowerCase().replace( /\ /gi, '_' ).replace( /[:.,\'()%]/gi, '' );

    }, false );

    var id = data.id - 1;
    var x = id % 32;
    var y = Math.floor( id / 32 );

    var span = document.createElement( 'span' );
    span.className = 'image';
    span.style.backgroundPosition = '-' + ( x * 32 ) + 'px -' + ( y * 32 ) + 'px';
    div.appendChild( span );

    var text = document.createElement( 'div' );
    text.innerHTML = data.name + '<br>';
    text.innerHTML += '<span style="color:#606060">' + data.timestamp + '</spa><br>';
    text.innerHTML += '<a class="link" href="' + data.link + '" target="_blank"><img src="assets/link.png" style="margin-top:1px"></a>'; // ' + data.link.replace( /http:\/\//gi, '' ) +
    div.appendChild( text );

    divs[ data.id ] = div;

    return div;

}

function loadProject( data ) {

    if ( selected ) {

        selected.className = 'project';

    }

    nav.className = 'hidden';

    selected = divs[ data.id ];
    selected.className = 'project selected';

    document.title = 'Ayaz | ' + data.name;
    iframe.src = data.link;

}