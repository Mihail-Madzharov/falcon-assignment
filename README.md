# Frontend assignment

Welcome to the assignment for candidates applying for a frontend position at Falcon.io.

To get started run the following commands.

```
npm install
npm start
```

Once everything is bootstraped navigate to `http://localhost:4200` in your browser.<br/>
Here you should be met with a documentation page explaining the assignment in details and how to get started.<br/>
All information needed to get started is highlighted in the documentation. Please read it thoroughly.

If you face issues with the installation, booting up the development server or API, make sure that you're running the LTS version of NodeJS, like <code>v8.10.0</code> <br>
Should you still have questions you're of course welcome to contact us.

**IMPORTANT**: <br/>
To submit your test you must create a repo on GitHub with your solution and provide us access.
Read more about how to submit in the documentation.<br/><br/>
**FRAMEWORK**:
<h1><a href="https://angular.io/">Angular</a></h1>

**TESTING**: <br/>
For unit testing we are using Jest <br/>
For testing the Effects we are using <a href="https://github.com/ReactiveX/rxjs/blob/master/docs_app/content/guide/testing/marble-testing.md">jasmine-marbles</a><br/>
To run the tests run the following command:

```
npm test
```

To run tests in watch mode run:

```
npm run test:watch
```

**STATE MANAGEMENT**<br/>
For state management we are using <a href="https://ngrx.io/docs">NgRx</a><br/>

**ARCHITECTURE**

- [app]()
  - [home]()
    - [game]()
      - [game-board]()
      - [players]()
      - [store]()
    - [footer]()
  - [store]()
  - [shared]()<br/><br/>

We have two states, one is the app state that holds the global
app state. And the other one is the one that holds the game state.<br/>

**NOTIFICATIONS**
<br/>
For notifications we are using <a href="https://github.com/sweetalert2/ngx-sweetalert2">Sweet alert</a> <br/><br/>
Enjoy!<br/>
Kind regards,<br/>
The frontend team @ Falcon.io
