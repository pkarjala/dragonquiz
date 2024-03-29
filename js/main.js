// Global variables
var $modal_trigger, $name, $dialog, caller, $draggable_list = new Array();

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
  initializeDraggables( $draggable_identifier, $draggable_container, $xcoordinate, $ycoordinate, $draggable_list );
  

  //----------------------------- Dialog Setup

  // Sets up the dialog loading element for editing a draggable.
  $dialog = $( "#dialog-form" ).dialog({
    autoOpen: false,
    height: 175,
    width: 350,
    modal: true,
    resizable: false,
    buttons: {
      "Update Name": updateDraggable,
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
    // console.log("Saving Draggable!");
    // console.log( $( this ) );
    // console.log( $( caller ).children( '.drag-text' ).text() );
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
function initializeDraggables( $identifier, $container, $xcoordinate, $ycoordinate, $draggable_list ) {
  $identifier.draggable( { 
    containment: $container,
    cursor: "move",
    scroll: false,
    drag: function() {
      updateXYCoordinates( $( this ), $container, $xcoordinate, $ycoordinate );
    },
  } );
}


/**
 * initializeModal
 * Sets up the modal box for changing information regarding a draggable.
 *
 */
function initializeModal( $modal_trigger, $name, $dialog ) {
  $modal_trigger.on( "click", function( event ) {
    // console.log( $( this ).parent().parent().attr( 'id' ) );
    caller = $( this ).parent().parent();
    $name.val( $( this ).parent().siblings( ".drag-text" ).text() );
    $dialog.dialog( "open" );
  });
}



/**
 * createDraggable
 * Generates a new Draggable element that can be added to a container.
 *
 */
function createDraggable( $identifier, $container ) {
  // console.log( "Generating Draggable element." );
  // console.log( $container.children().length );
  // Determine what type of draggable we need to generate based on existing count.
  if ( $container.children().length >= 0 ) {
    $new_draggable = $( '<div class="draggable drag-box"></div>' );
  } else if ( $container.children().length > 50 ) {
    $( '#feedback-message' ).text("Too many draggables!");
    return;
  } else {
    $new_draggable = $( '<div class="' + $identifier.attr("class") + '"></div>' );
  }

  // Parse through and add the draggable based on existing counts
  var draggable_count = $container.children().length + 1;
  var this_draggable_num;
  var key;
  for ( var i = 0; i < draggable_count; i++ ) {
    key = "drag" + (i + 1);
    if ( $draggable_list[i] === undefined ) {
      this_draggable_num = i + 1;
      $draggable_list[i] = key;
      break;
    }
  }
  // console.log( $draggable_list );
  $new_draggable.attr( "id", "drag" + this_draggable_num );
  $new_draggable.append( '<div class="drag-text">Draggable ' + this_draggable_num + "</div>" );
  $new_draggable.append( '<div class="drag-buttons"><button id="edit' + this_draggable_num + '" class="edit"><i class="fa fa-cog fa-fw"></i></button><button class="delete" onclick="deleteDraggable( this );"><i class="fa fa-trash-o fa-fw"></i></button></div>' );

  return $new_draggable;
}


/**
 * addDraggable
 * Adds another Draggable element to the screen inside of the given container.
 *
 */
function addDraggable( identifier, container ) {
  // console.log( "Adding another draggable!" );
  // console.log( $( container ).children().length );
  // console.log( createDraggable( $( identifier ), container ) );
  $new_element = createDraggable( $( identifier ), $( container ) );
  if( $new_element ) {
    $( container ).append( $new_element );
    initializeDraggables( $( identifier ), $( container ), $( "#x-coordinate" ), $( "#y-coordinate" ), $draggable_list );
    initializeModal( $( '.edit' ), $( "#name" ), $dialog );
  } else {
    return;
  }
}


/**
 * deleteDraggable
 * Deletes a draggable from the page.
 */
function deleteDraggable( to_delete ) {
  // console.log( "Deleting draggable!" );
  var id_to_delete = $( to_delete ).parent().parent().attr("id");
  // Stored ids are "drag#" where "#" is the index of the item in our list.
  id_to_delete = id_to_delete.slice(-1);
  // console.log( "Deleting " + id_to_delete + " from array." );
  $draggable_list[id_to_delete - 1] = undefined;
  // Experimenting with re-sorting the array to remove blanks.
  // console.log( $draggable_list );
  // var temp_array = new Array();
  // $draggable_list.forEach( function(item) {
  //   if ( item != undefined ) {
  //     temp_array.push(item);
  //   }
  // });
  // console.log( temp_array );

  $( to_delete ).parent().parent().remove();
}



/**
 * saveContent
 * Parses all of the draggable elements and image data and saves it to a JSON object which is
 * then saved to localStorage.
 *
 */
function saveContent( identifier, container ) {
  // console.log( "Saving location data!" );
  // var draggable_objects = document.getElementsByClassName( identifier );
  json_data = {};

  json_data.draggables = new Array();

  $( identifier ).each( function( index, value ) {
    // Replace with actual construction of JSON data objects.
    json_data['draggables'][index] = {
      // id : $( this ).attr( "id" ),
      name: $( this ).children( '.drag-text' ).text(),
      x: $( this ).position().left - $( container ).position().left - parseInt( $( container ).css( "padding-left" ) ),
      y: $( this ).position().top - $( container ).position().top - parseInt( $( container ).css( "padding-top" ) )
    }
  });

  json_data.image = {
    url :  getBackgroundImageData( container ),
    height : $( container ).css( 'height' ),
    width : $( container ).css( 'width' )
  }

  // Save all of the JSON data above to Local Storage.
  console.log(json_data);

  localStorage.setItem( "dragonquiz", JSON.stringify( json_data ) );
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
 * getBackgroundImageData
 * Loads the URL information about the background image for a provided container.
 *
 */
function getBackgroundImageData( container ) {
  return $( container ).css( 'background-image' ).replace(/url\(\"|\"\)$/ig, "");
}