# DragonQuiz #

A simple tool for generating Drag and Drop Quizzes.

Utilizes jQuery UI.

## To Start

1. Load up index.html in your web browser.

2. Choose an image URL and paste it into the "Image URL" input, then click "Load Image".

3. Add Answers by clicking the "Add Answer" Button.  These may be placed anywhere on the image by dragging them for placement.  Up to 50 may be placed.

4. Change the answers by clicking on the Gear icon, and changing the name.  Click Update Name to change ths information.

5. Remove an Answer by clicking the trash can icon.

6. Click "Save Answers and Image Info" to save the information to localStorage in the browser.

## To take the Quiz

1. Set up a Quiz following the first part, then load up quiz.html in your web browser.

2. Drag items from the right hand side to the possible answer areas.

Correct answers will turn green, incorrect will turn red.

## Known Issues

* There are some button layout problems with Draggables on Firefox; need to test and fix.
* Multiple Answers can stack on top of each other, which is not desireable.

Please add any additional issues to the github repo at https://github.com/pkarjala/dragonquiz/issues