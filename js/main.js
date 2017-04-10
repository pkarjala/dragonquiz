$( function() {

  var $xcoordinate = $( "#drag-x" ),
      $ycoordinate = $( "#drag-y" );

  $( ".draggable" ).draggable( { 
    containment: "#draggable-container",
    scroll: false,
    drag: function() {
      updateXYCoordinates( $( this ), $( "#draggable-container" ), $xcoordinate, $ycoordinate );
    },
  } );


} );



function updateXYCoordinates( $draggable_object, $parent_object, $xid, $yid ) {
  console.log( $draggable_object.position() );
  console.log( $parent_object.position() );
  console.log( $parent_object.css( "padding-left" ) );
  console.log( $parent_object.css( "padding-top" ) )
  $( "span.coordinate", $xid ).text( $draggable_object.position().left - $parent_object.position().left - parseInt( $parent_object.css( "padding-left" ) ) );
  $( "span.coordinate", $yid ).text( $draggable_object.position().top - $parent_object.position().top - parseInt( $parent_object.css( "padding-top" ) ) );
}