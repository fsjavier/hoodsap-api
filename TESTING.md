## Functional Testing

### User stories testing

| Description | Steps | Expected Outcome | Outcome |
|-------------|-------|------------------|---------|
| **Registration and Authentication** ||||
| As a user, I can create an account to have access to all features. | Navigate to the Sign Up page, fill in the form, and submit. | User account is created, and the user is directed to the Sing-In page. | Works as expected |
| As a registered user, I can log in so that I can access my account. | Navigate to the Sign In page, enter username and password and submit. | User is logged in and redirected to the home page. | Works as expected |
| As a logged in user, I can choose to stay logged in so that I don't have to log in every time I come back. | Revisit the site within 24 hours | User remains logged in upon returning to the site without needing to log in again. | Works as expected |
| As a logged-in user, I can log out so that my account information is not compromised. | Click on the avatar and then Click on the logout option. | User is logged out | Works as expected |
| As a developer, I want to avoid sending unnecessary requests to the API so that the session is optimized. | As a logged user open the developer tools and visit any page  | No refresh token requests are logged in the console | Works as expected |
|||||
| **Navigation** ||||
| As a user, I can see a different navigation menu when I'm logged in/out so that I can easily identify my state. | View the navigation bar as both a logged-in user and as a guest. | As a logged user only Log In and Sign In is displayed. As a logged in user Home, Events, Feed and the Avatar menu are displayed | Works as expected |
|||||
| **User Profiles** ||||
| As a user, I can visit any profile so that I can see their public information. | Navigate to a user's profile page. | The selected user's public information is displayed. Follow / Unfollow button or Edit profile buttons are not present | Works as expected |
| As a registered user, I can update my profile so that I can change my preferences as wanted. | Click on the avatar and then Profile. Click Edit Prodfile and make changes, and save. | The profile is updated with the new information. | Works as expected |
|||||
| **Posts** ||||
| As a registered user, I can create a post so that I can share my content with everyone else. | Click on the avatar and then Add Post. Fill in the details, and submit. | The post is created and the user is redirected to the post. | Works as expected. |
| As a user, I can click on a post so that I can see all details. | Click on any post in the Home page or (if logged in) in the Feed or any Profile. | Redirected to the Post detail page with full information. | Works as expected |
| As a user, I can see a list of all posts so that I can scroll through the content. | Navigate to the Home / Posts page. | A list of posts is displayed for browsing. | Works as expected |
| As a logged-in user, I can edit and delete my own posts so that I can control my content. | Find one of your posts in the Posts Page, Feed or Profile. Click the vertical 3 dots and select the edit or delete option. Clicking Edit takes the user to the Edit Form. Clicking delete triggers the confirmation modal | After confimration the post is either updated with new content or removed | Works as expected |
|||||
| **EPIC: Social Events** ||||
| As a registered user, I can create an event so that I can share it with everyone else. | Click on the avatar and then Add Event. Fill in the details, and submit. | The event is created and displayed in the Events Page and Profile. | Works as expected |
| As a user, I can click on an event so that I can see all details. | Click on any event in the Events Page or the Profile Page. | Redirected to the event detail page with full information. | Works as expected |
| As a user, I can see a list of all events so that I can scroll through the content. | Navigate to the Events page. Although there is no direct link for logged users the page content is not restricted | A list of events is displayed for browsing. | Works as expected |
| As a logged-in user, I can edit and delete my own events so that I can control my content. | Find one of your events in the Events Page or Profile. Click the vertical 3 dots and select the edit or delete option. Clicking Edit takes the user to the Edit Form. Clicking delete triggers the confirmation modal | After confimration the event is either updated with new content or removed | Works as expected |
| **Location** ||||
| As a registered user, I can select a location so that my posts are specific to a neighborhood. | During post/event creation or profile update, select a specific location. | The chosen location is associated with the post/event/profile. | Works as expected |
| As a logged-in user, I can filter the posts and events based on my location so that I can see only the ones that are relevant to me. | Apply the location filter on the posts or events page when your location is set | Only posts/events within the specified radius from the user's location are displayed. | Works as expected |
| As a user, I want to get recommended users to follow based on my and their location so that I can follow the most relevant users. | Recommended profiles are displayed in the Posts and Feed Pages. If the user has the location set the profiles will be filtered when interacting with the distance filter. | Profiles are recommended based on proximity to the user's location. | Works as expected |
| As a logged-in user, I want to filter events based on my and their location so that I can see the most relevant events. | Apply the location filter on the events page. | Only events within the specified radius from the user's location are displayed. | Works as expected |
|||||
| **Comments** ||||
| As a logged-in user, I can write comments on posts to contribute to them. | Navigate to a post, enter a comment, and submit. | The comment is added under the post. | Works as expected |
| As a logged-in user, I can edit and delete my posts comments so that I can fix, update, or remove my comment. | Find one of your comments and select the edit or delete option (three vertical dots). After clicking Edit the text field is active again and the comment can be edited. After clicking delete the confirmation modal is displayed | The comment is either updated or removed from under the post. | Works as expecte |
| As a logged-in user, I can write comments on events to contribute to them. | Navigate to an event, enter a comment, and submit. | The comment is added under the event. | Works as expected |
| As a logged-in user, I can edit and delete my event comments so that I can fix, update, or remove my comment.  Find one of your comments and select the edit or delete option (three vertical dots). After clicking Edit the text field is active again and the comment can be edited. After clicking delete the confirmation modal is displayed | The comment is either updated or removed from under the event. | Works as expecte |
|||||
| **Followers** ||||
| As a user, I can see recommended profiles so that I can easily find interesting profiles to follow. | See the recommended profiles section in the Posts page or Feed page. | Recommended profiles are displayed based on the user's or location. | Works as expected |
| As a logged-in user, I can follow/unfollow users so that I can easily see their content. | Click the follow/unfollow button on the recommended profiles section ir in a the Profile page. | The user is either followed, and their posts appear in the feed, or unfollowed, and their posts are removed from the feed. | Works as expected |
|||||
| **EPIC: Tags** ||||
| #25 As a logged-in user, I can add tags to a post so that I can highlight words that fit the content. | While creating or editing a post, add tags related to the content. A maximum of 5 tags can be added | Tags are added to the post and displayed in the post. | Works as expected |

### Responsiveness

All pages have been tested for responsiveness with Google Chrome Developer Tools on screens from 320px, making sure the content adjusts correctly on all screen sizes.

### Browser Compatibilty

The website has been tested in the following browsers on desktop, without finding any significant problems, besides the grey map described below:

Chrome
Safari
Firefox
Opera›
Edge

### Fixed Bugs

| Bug | Solution |
|-----|----------|
| User data is “undefined” when refreshing the page | Use `const { data } = await axiosRes.get("dj-rest-auth/user/");` instead of `const data  = await axiosRes.get("dj-rest-auth/user/");` |
| Creating a post in the frontend returns an error because 'CloudinaryResource' object has no attribute 'size' | Replace in the model CloudinaryField with ImageField |
| When the distance filter is set to 0 all events, profiles, posts are loaded | Check `{latitude && longitude && radius !=={maxValue}}` instead of `{latitude && longitude && radius}`
| Profile location data wouldn’t persist after updating the profile, causing that the slider location filter doesn’t work | Use `setCurrent` with updated user data when updating the profile to have access to the `profile_location_data` field from the serializer |
| Following some users would return a 400 error (Invalid pk - object does not exist) | The issue was a mismatch between user ids and profile ids when sending the follow profile request with the profile id. The solution was to include the `user_id` in the Profile serializer and use this instead of the `profile_id` in the request. |


### Unfixed Bugs

- When the user gives location permission and the user wants to edit a post or the profile, the location picker moves from the current position to the user position.
- After creating an event the hour is disregarded.
- A new issue has been identified in the final stages of development, where the map display turns grey, predominantly affecting logged-out users on the Home Page. Interestingly, this issue does not seem to affect logged-in users, and the map functions correctly on other pages. This problem is currently under investigation to determine its cause and find a resolution.


## Validator Testing

### ESLint

Eslint has been installed and configured. All code passes without errors. The only error logged is related to the ReactDOM.render being deprecated.

![](documentation/readme_images/tests/ESLint.png)


### CSS [W3C Jigsaw Validator](https://jigsaw.w3.org/css-validator/)

All CSS files have been checked and passed without errors

![](documentation/readme_images/tests/css_validator.png)

## Accessibility

All pages received high scores in terms of Accessibility, Best Practices, and SEO. The lower scores in Performance are primarily attributed to issues such as render-blocking resources and the size of images, both of which will be optimized in future updates.

![](documentation/readme_images/tests/lighthouse_home.png)
![](documentation/readme_images/tests/lighthouse_events.png)

### Lighthouse

### Wave WebAIM

The WAVE WebAIM web accessibility tool was used throughout the development of the website. It alerted me to issues such as:

- Missing form labels
- Empty links
- Repeated alt text

The problems have been addressed and in the final rounds of website testing no accessibility issues were identified.