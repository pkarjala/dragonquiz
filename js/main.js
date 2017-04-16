/**
 * General functionality on page load.
 * Sets up the Draggable elements for the page.
 *
 */
$( function() {

  var $xcoordinate = $( "#x-coordinate" ),
      $ycoordinate = $( "#y-coordinate" );

  $( ".draggable" ).draggable( { 
    containment: "#draggable-container",
    scroll: false,
    drag: function() {
      updateXYCoordinates( $( this ), $( "#draggable-container" ), $xcoordinate, $ycoordinate );
    },
  } );


} );


/**
 * updateXYCoordinates
 * Updates the display of the XY Coordinates of a dragged object relative to its parent container.
 * 
 */
function updateXYCoordinates( $draggable_object, $parent_object, $xid, $yid ) {
  // console.log( $draggable_object.position() );
  // console.log( $parent_object.position() );
  // console.log( $parent_object.css( "padding-left" ) );
  // console.log( $parent_object.css( "padding-top" ) )
  $( $xid ).text( $draggable_object.position().left - $parent_object.position().left - parseInt( $parent_object.css( "padding-left" ) ) );
  $( $yid ).text( $draggable_object.position().top - $parent_object.position().top - parseInt( $parent_object.css( "padding-top" ) ) );
}


/**
 * saveDraggables
 * Parses all of the draggable elements and saves their XY coordinates to localStorage.
 *
 */
function saveDraggables( identifier, container ) {
  console.log( "Button clicked!" );
  var draggable_objects = document.getElementsByClassName( identifier );
  $( identifier ).each( function( event ) {
    console.log( $( this ).position().left ); // x
    console.log( $( this ).position().top ); // y
  });
}


// Get URL query parameters.
var query_values = new URLSearchParams(window.location.search);
// Parse out the username from the Query values.
var query_username = query_values.get("username");

// Set the Storage value if uername is set.
if( query_username !== null && query_username !== '') {
  localStorage.setItem( "username", query_username );
}

/**
 * setName
 * Put the username value from localStorage into the supplied HTML ID element.
 */
function setName(element_name) {
  var my_name = document.getElementById(element_name);
  if( my_name == null ) {
    return false;
  }
  var stored_username = localStorage.getItem("username");
  if ( stored_username != null ) {
    my_name.innerHTML = stored_username;
  } else {
    my_name.innerHTML = "Nothing Set!";
  }
}