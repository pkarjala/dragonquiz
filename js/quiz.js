// Initial concept for drag / drop / replace from http://jsfiddle.net/39khs/82/


/**
 * translateToPixels
 * Takes a numerical value and outputs it as a pixel value for CSS rules.
 */
function translateToPixels( value ) {
  return value + "px";
}


/**
 * calculatePositionX
 * Calculates the X position for a value on its parent container.
 */
function calculatePositionX( container, value ) {
  return value + $( container ).position().left + parseInt( $( container ).css( "padding-left" ) );
}


/**
 * calculatePositionY
 * Calculates the Y position for a value based on its parent container.
 */
function calculatePositionY( container, value ) {
  return value + $( container ).position().top + parseInt( $( container ).css( "padding-top" ) );
}


/**
 * checkCorrect
 * Checks based on the answer_key whether or not the draggable is in the correct drop zone.
 */
function checkCorrect( drop, draggable ) {
  if ( answer_key[$( drop ).attr('id')] == $( draggable ).attr('id') ) {
    console.log( "Correct!" );
    return true;
  }
  console.log( "Wrong." );
  return false;
}


/**
 *
 *
 */
function setColor( container, correct, reset = false ) {
  if( reset ) {
    $( container ).removeClass( "correct wrong" );
    return;
  }
  if( correct ) {
    $( container ).removeClass( "correct wrong" ).addClass( "correct" );
    return;
  } else {
    $( container ).removeClass( "correct wrong" ).addClass( "wrong" );
    return;
  }
}


// Set up the answer key.
var answer_key = [];

// Attempt to load data saved from Local Storage.
var quiz_data = JSON.parse( localStorage.getItem("dragonquiz") );
// console.log( quiz_data );
if ( quiz_data ) {
  // Load up and place the drop container with background image.
  // console.log( "Background is: " + quiz_data.image.url );
  $( '#dropcontainer' ).css( 'background-image', 'url(' + quiz_data.image.url + ')' );
  $( '#dropcontainer' ).css( 'height', quiz_data.image.height );
  $( '#dropcontainer' ).css( 'width', quiz_data.image.width );

  // Load up and place the drop zones and their paired answers, and add them to the answer key.
  // Appended drop zones will look like:
  // <div id="1" class="drop" style="top: xxxpx; left: xxxpx;"></div>
  // Appended draggables will look like:
  // <div id="name" title="one" class="draggable">Mast</div>
  quiz_data.draggables.forEach( function ( value, index ) {
    // console.log( index + " : " + value.name + "; " + value.x + ", " + value.y );
    $( '#dropcontainer' ).append( '<div id="' + index + '" class="drop" style=""></div>' );
    $( '#dropcontainer > #' + index ).css( 'left', translateToPixels( calculatePositionX( '#dropcontainer', value.x ) ) );
    $( '#dropcontainer > #' + index ).css( 'top', translateToPixels( calculatePositionY( '#dropcontainer', value.y ) ) );
    
    $( '#origin' ).append( '<div id="' + value.name + '" title="' + value.name + '" class="draggable">' + value.name + '</div>' );

    answer_key[index] = value.name;
  });
  // console.log( answer_key );
} else {
  // console.log( "No data found." );
  $( '#title' ).html( '<h1>Sorry, no Data Found for creating a quiz!  Please go <a href="./index.html">back</a>.</h1>' );
}


// Initialize Draggable elements.
$( ".draggable" ).draggable({
  containment: "#dragcontainer",
  cursor: "move",
  revert: "invalid"
});

// Set up drop areas.
$( ".drop" ).droppable({ 
  accept: ".draggable",
  tolerance: 'pointer',
  hoverClass: 'over',
  drop: function( event, ui ) {
    // console.log( "drop" );
    // If there is a parent that was disabled (usually another drop zone), enable it
    if( $( ui.draggable ).parent().droppable( "option", "disabled" ) ) {
      $( ui.draggable ).parent().droppable( 'enable' );
    }
    $( ui.draggable ).detach().css({ top: 0, left: 0 }).appendTo( $( this ) );
    // When an item has been dropped, we want to disable this.
    $( this ).droppable( 'disable' );
    // Check to see if the dropped value is correct, and set the background based on the result.
    setColor( this, checkCorrect( this, ui.draggable ) );
  }
});

// Set up starting area as a return drop point.
$( "#origin" ).droppable({ 
  accept: ".draggable",
  hoverClass: 'over',
  drop: function( event, ui ) {
    // console.log("drop");
    // console.log( $( ui.draggable ).parent() );
    $( ui.draggable ).parent().droppable( 'enable' );
    $( ui.draggable ).detach().css({ top: 0, left: 0 }).appendTo( $( this ) );
  }
});

$( function() {
  // Set the height of the draggable area based on the height of the droppable image container.
  $( "#dragcontainer" ).css( "height", $( "#dropcontainer" ).css( "height" ) );
});


// function 