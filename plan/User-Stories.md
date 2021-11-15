User Stories:
    1. Users
        - As an unregistered user, I want to be able to register my account so I can access the features available to logged in users.
        - As a registered user, I want to be able to log out of my account so no one else can access my information.

            Acceptance Criteria:
                1. Given that I'm a logged-out user and
                    - When I'm on the /login route
                    - Then there will be a login form with an email and password field and a "Login" button to submit the form.

                2. When I try to fill out the form with an invalid email and password combination and press Enter or press the "Login" button
                    - Then at the top of the form, I will see a red message Invalid Login :( please try again.

                3. When I try to fill out the form with an email that doesn't exist in the system and press Enter or press the "Login" button
                    - Then at the top of the form, I will see a red message Invalid Login :( please try again.

                4. When I try to fill out the form with a valid email and password and  press Enter or press the "Login" button
                    - Then I will be redirected to the homepage at the / route.

                5. Given that I am a logged-in user
                    - When I refresh the homepage at the / route
                    - Then I will still be logged in

                6. Given that I am a logged-out user
                    - When I try to navigate to the homepage at the / route
                    - Then I will be redirected to the /login route

                7. Given that I am a logged-in user
                    - When I click on "My profile"
                    - Then I will be redirected to the /profile route

    2. Tasks
        - As a registered user, I want to be able to add a task to one of my lists so I can be reminded about what I need to do.
        - As a registered user, I want to be able to mark a task as complete so that I can clean up my last and feel good about myself.
        - As a registered user, I want to be able to update a task so I can my list is flexible in case my plans change.
        - As a registered user, I want to be able to delete a task (and view tasks I have deleted?) so I can free up my list when I'm not doing something anymore.

    3. Lists
        - As a registered user, I want to be able to assign a task to one of my lists so I can better organize my to-do items.
        - As a registered user, I want to be able to create a new list so I can customize my to-do lists.
        - As a registered user, I want to update my lists so I can organize my lists the way I want to.
        - As a registered user, I want to be able to delete lists of my choice, including their tasks, so I can organize my lists the way I want to.

    4. Search
        - As a registered user, I want to be able to search my lists so I can easily navigate through my tasks.

    5. Subtasks
        - As a registered user, I want to be able to break down my tasks into smaller subtasks, so I can better plan how I will take care of them.
        - (UPDATE, DELETE)
