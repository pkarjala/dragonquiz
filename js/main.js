var $modal_trigger, $name, $dialog, caller;

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
      $draggable_container = $( "#draggable-container" ),
      $modal_trigger = $( ".edit" ),
      form,
      $name = $( "#name" );

  // Initialization
  initializeDraggables( $draggable_identifier, $draggable_container, $xcoordinate, $ycoordinate );
  

  //----------------------------- Dialog Setup

  // Sets up the dialog loading element for editing a draggable.
  // NOTE:  Refactor?
  $dialog = $( "#dialog-form" ).dialog({
    autoOpen: false,
    height: 175,
    width: 350,
    modal: true,
    resizable: false,
    buttons: {
      "Save Settings": updateDraggable,
      Cancel: function() {
        $dialog.dialog( "close" );
      }
    },
    close: function() {
      form[ 0 ].reset();
    }
  });

  form = $dialog.find( "form" ).on( "submit", function( event ) {
    event.preventDefault();
    updateDraggable();
  });


  initializeModal( $modal_trigger, $name, $dialog );


  // Save the values to the Draggable element that called this item.
  // NOTE:  this function is inside of the parent so that we have access to globals.
  function updateDraggable() {
    console.log("Saving Draggable!");
    console.log( $( this ) );
    console.log( $( caller ).children( '.drag-text' ).text() );
    $( caller ).children( '.drag-text' ).text( $name.val() );
    $dialog.dialog( "close" );
    return true;
  }


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
    cursor: "move",
    scroll: false,
    drag: function() {
      updateXYCoordinates( $( this ), $container, $xcoordinate, $ycoordinate );
    },
  } );
}



function initializeModal( $modal_trigger, $name, $dialog ) {
  $modal_trigger.on( "click", function( event ) {
    console.log( $( this ).parent().parent().attr( 'id' ) );
    caller = $( this ).parent().parent();
    $name.val( $( this ).parent().siblings( ".drag-text" ).text() );
    $dialog.dialog( "open" );
  });
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
  console.log( $container.children().length );
  if ( $container.children().length >= 0 ) {
    $new_draggable = $( '<div class="draggable drag-box"></div>' );
  } else if ( $container.children().length > 50 ) {
    $( '#feedback-message' ).text("Too many draggables!");
    return;
  } else {
    $new_draggable = $( '<div class="' + $identifier.attr("class") + '"></div>' );
  }
  var draggable_count = $container.children().length + 1;
  $new_draggable.attr( "id", "drag" + draggable_count );
  $new_draggable.append( '<div class="drag-text">Draggable ' + draggable_count + "</div>" );
  $new_draggable.append( '<div class="drag-buttons"><button id="edit' + draggable_count + '" class="edit"><i class="fa fa-cog fa-fw"></i></button><button class="delete" onclick="deleteDraggable( this );"><i class="fa fa-trash-o fa-fw"></i></button></div>' );

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
    initializeModal( $( '.edit' ), $( "#name" ), $dialog );
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
 * saveContent
 * Parses all of the draggable elements and image data and saves it to localStorage.
 *
 */
function saveContent( identifier, container ) {
  console.log( "Saving location data!" );
  var draggable_objects = document.getElementsByClassName( identifier );
  $( identifier ).each( function( event ) {
    // Replace with actual construction of JSON data objects.
    console.log( $( this ).attr( "id" ) );
    console.log( $( this ).children( '.drag-text' ).text() );
    console.log( $( this ).position().left - $( container ).position().left - parseInt( $( container ).css( "padding-left" ) )  ); // x
    console.log( $( this ).position().top - $( container ).position().top - parseInt( $( container ).css( "padding-top" ) ) ); // y
  });
  console.log( getBackgroundImageData( container ) );
  console.log( $( container ).css( 'height' ) );
  console.log( $( container ).css( 'width' ) );
}



/**
 * loadImage
 * Loads the image URL provided to the background of the provided container.
 *
 */
function loadImage( image_input, container ) {
  // Set the background container image.
  $( container ).css( 'background-image', 'url(' + $( image_input ).val() + ')' );

  // Create an Image object in javaScript to load the dimensions of the image
  var remote_image = new Image();

  // When we load the image value, set the container width and height to the image.
  remote_image.onload = function () {
    $( container ).css( 'height', remote_image.height );
    $( container ).css( 'width', remote_image.width );
  }
  // Load the image to our object.
  remote_image.src = getBackgroundImageData( container );
}


/**
 *
 *
 *
 */
function getBackgroundImageData( container ) {
  return $( container ).css( 'background-image' ).replace(/url\(\"|\"\)$/ig, "");
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