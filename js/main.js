/**
 * General functionality on page load.
 * Sets up the Draggable elements for the page.
 *
 */
$( function() {

  // Global Variables
  var $xcoordinate = $( "#x-coordinate" ),
      $ycoordinate = $( "#y-coordinate" ),
      $draggable_identifier = $( ".draggable" ),
      $draggable_container = $( "#draggable-container" );

  initializeDraggables( $draggable_identifier, $draggable_container, $xcoordinate, $ycoordinate );


});


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
 * initializeDraggables
 * Makes all of the identified elements considered Draggable by jQuery UI.
 *
 */
function initializeDraggables( $identifier, $container, $xcoordinate, $ycoordinate ) {
  $identifier.draggable( { 
    containment: $container,
    scroll: false,
    drag: function() {
      updateXYCoordinates( $( this ), $container, $xcoordinate, $ycoordinate );
    },
  } );
}


// function generateDraggableElement( $container ) {

// }


/**
 * createDraggable
 * Generates a new Draggable element that can be added to a container.
 *
 */
function createDraggable( $identifier, $container ) {
  console.log( "Generating Draggable element." );
  if ( $container.children().length == 0 ) {
    $new_draggable = $( '<div class="draggable drag-box"></div>' );
  } else if ( $container.children().length > 50 ) {

  } else {
    $new_draggable = $( '<div class="' + $identifier.attr("class") + '"></div>' );
  }
  $new_draggable.attr( "id", "drag" + $container.children().length + 1  );
  $new_draggable.append( '<div class="drag-text">Draggable ' +  $container.children().length + 1 + "</div>" );
  $new_draggable.append( '<div class="drag-buttons"><button id="edit' + $container.children().length + 1 + '" class="edit"><i class="fa fa-cog fa-fw"></i></button><button class="delete" onclick="deleteDraggable( this );"><i class="fa fa-trash-o fa-fw"></i></button></div>' );


  return $new_draggable;
}


/**
 * addDraggable
 * Adds another Draggable element to the screen inside of the given container.
 *
 */
function addDraggable( identifier, container ) {
  console.log( "Adding another draggable!" );
  console.log( $( container ).children().length );
  // console.log( createDraggable( $( identifier ), container ) );
  $new_element = createDraggable( $( identifier ), $( container ) );
  if( $new_element ) {
    $( container ).append( $new_element );
    initializeDraggables( $( identifier ), $( container ), $( "#x-coordinate" ), $( "#y-coordinate" ) );
  } else {
    return;
  }
}


function deleteDraggable( to_delete ) {
  console.log( "Deleting draggable!" );
  $( to_delete ).parent().parent().remove();
}



// function editDraggable ( to_edit ) {
//   console.log( "Editing Draggable!" );
// }



/**
 * saveDraggables
 * Parses all of the draggable elements and saves their XY coordinates to localStorage.
 *
 */
function saveDraggables( identifier, container ) {
  console.log( "Saving location data!" );
  var draggable_objects = document.getElementsByClassName( identifier );
  $( identifier ).each( function( event ) {
    console.log( $( this ).attr( "id" ) );
    console.log( $( this ).position().left - $( container ).position().left - parseInt( $( container ).css( "padding-left" ) )  ); // x
    console.log( $( this ).position().top - $( container ).position().top - parseInt( $( container ).css( "padding-top" ) ) ); // y
  });
}







/***** LocalStore Experiment for test_localstore.html *****/

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