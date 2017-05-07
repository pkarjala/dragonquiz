// Initial concept from http://jsfiddle.net/39khs/82/

// Load up data from Local Storage.
var quiz_data = JSON.parse( localStorage.getItem("dragonquiz") );
if ( quiz_data ) {
  console.log( quiz_data );
} else {
  console.log( "No data found." );
}

// Load up and place the drop container with background image.
console.log( "Background is: " + quiz_data.image.url );
$( '#dropcontainer' ).css( 'background-image', 'url(' + quiz_data.image.url + ')' );
$( '#dropcontainer' ).css( 'height', quiz_data.image.height );
$( '#dropcontainer' ).css( 'width', quiz_data.image.width );

// Load up and place the drop zones.


// Set up the answer key.
var answer_key = [];

// Initialize Draggable elements.
$( ".draggable" ).draggable({
  containment: "#dragcontainer",
  cursor: "move",
  revert: "invalid"
});

// Set up drop areas.
$( ".drop" ).droppable({ 
  accept: ".draggable",
  tolerance: 'touch',
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
    // Fire the check for correctness here; see separate function
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