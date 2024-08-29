# Easy Retro App

An application that will help you improve sprint retrospective sessions and enable tracking of all important events during a sprint.

## Instalation
```
# Clone the repository
git clone https://github.com/nadja-sokolovic/easy-retro-app.git

# Navigate to the project directory
cd easy-retro-app

# Navigate to server or web directory
cd server/web

# Install dependencies
npm install

# Start the development server
npm start
```

## Features
* **Feature 1:** Easy items

  It represents a board that includes three types of items organized into categories for the team to start, continue, or stop working on. All team members are able to delete the existing or add new items to every single category. It is also possible to drag an item from one column and drop it into another, in which case the item type will be updated.  
* **Feature 2:** Easy progress

  In this part of the application, items are organized into 4 categories: _best-story, most-annoying-story, most-technically-complex-story, most-exciting-story_. When the user selects a category, all items will be displayed, including the ability to add new ones and delete existing ones. For each item, it's possible to add a like or dislike reaction, as well as enable text editing by double-clicking.
* **Feature 3:** Easy report

  The user is able to see the text report for the selected sprint.

## Technologies Used
**Frontend**
* Library/Framework: React, Angular
* State Management: Redux
* Styling: SCSS
* Routing: React Router, Angular Router
* API Calls: Axios, HttpClient

**Backend**
* Language: Java
* Framework: Spring Boot
* Database: MySQL


  
