# Team Roster [![Netlify Status](https://api.netlify.com/api/v1/badges/1a52e6d7-b7e9-4539-ba6f-8ba57c467987/deploy-status)](https://app.netlify.com/sites/djs-hockey-roster/deploys)
For this project you will be building a team roster for a sports team.  Pick any team sport you want.  Theme your project based on the sport.

## Requirements
Take some time to plan your project and track how the data will flow. **It is expected that you will complete this assignment by the due date, so plan accordingly.**

- Use the react template to start the project

Here is the ERD for this project:

<img width="291" alt="srerd" src="https://user-images.githubusercontent.com/29741570/137314750-ec4b65c5-e139-4b1a-8fa5-6d25aa57afb7.png">

Here are the user stories that need to be completed:
### Authentication
* As a user, who is logged out, I should only be able to see the authentication screen
* As a user who is logged out, I would like to be able to click on an authentication button and login via google.
* As a user who is logged in, I should not be able to see the authentication button.
* As a user who is logged in, I should be able to see the Team view.
* As a user who is logged in, I should be able to see a log out button

### Routing
* As a user if I click the TEAM link in the navbar, I should navigate to '/team' and see an h1 tag that says 'Team'.
* As a user if I click the NEW link in the navbar, I should navigate to '/new' and see an h1 tag that says 'Add a Player'.

### CREATE Players
* As an authenticated user, I should be able to click the NEW link in the navbar that displays a form to add a new player.
* As an authenticated user, when I fill out the form and submit a new Player should be created in firebase and should now show in my Team view.

### READ Players
* As an authenticated user, I should be able to see the Team view with all the players I have created.
* As an authenticated user I should not be able to see players that were created by another user.

### UPDATE Players
* As an authenticated user, I should be able to see an edit button on each player card.
* As an authenticated user, when I click the edit button I should see a form with the player information pre-populated in the form.
* As an authenticated user, I should be able to edit the information in the form and hit the submit button.
* As an authenticated user, when I submit the edit form firebase should be updated (PATCH request) and the Team view should update

### DELETE Players
* As an authenticated user, I should see a delete button on each player.
* As an authenticated user, when I click a delete button that
