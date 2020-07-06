This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

I started the project with creating the base with create react app, and
installed all the dependencies like Redux, Formik, React-Redux, Material-Ui core

Most of the technologies were quite new to me, so i had to spend some time with tutorials
and documentations first. 

First mission was to get the initial data rendered to a table. 
I built a sketch version of the table with some hard coded values and
slowly started setting up redux for state management. I realized the hooks offered
by React-Redux were quite suitable for this project. Quite quickly i got the initial
data visible on my very sketchy table, and it was time to up the game with some Material-Ui
Goodies. 

When i got the table to look a bit easier for the eye, i started to plan the concept for
the adding/editing invoices. For some reason, i couldn't think of any other way than a dialog 
with Form fields. I kinda like the mobile app feeling that it brings. I set up the Material-ui Dialog
and started learning Formik. 

I spent way too much time on the form part of the app. I am really glad that Formik offers the 
FieldArray component, i am really not that glad of how late i found out that it exists. Also
spent way too much time on getting the values to the action creator in a proper form. Afterwards
i learned that i dont need to overcomplicate the action creator. 

When the form was good and spitting the correct values to the action creator, it was time to fine tune the reducer
to do stuff in a proper manner. Add in a thousand and one trials and errors with stylings and basically thats it. 

I prefer functional over iterative , and JS from ES6 to newer. I hope that is visible on my code. 

I didn't focus on making the app responsive, nor did i bother about form validations or error handling. Heck, you can even screw the app 
just by deleting both of the initial invoices.

*EDIT Added some basic form validations and error handling. Cant screw the app anymore just by deleting the initial invoices either :D END OF EDIT *

 I didn't feel like that was the point of this Recruitment test. 

I did do my best, and am kinda happy with the result. 

