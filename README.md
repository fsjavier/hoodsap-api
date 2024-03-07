# Hoodsap

Hoodsap is a community-based platform that connects neighborhoods through shared experiences and local insights. It fosters community engagement by providing a space for residents to share updates, organize events, and support one another. Neighbors can stay informed about what's happening locally, from discovering architectural gems to addressing communal concerns.

For details on the backend application, plese see the [API documentation](./README_BE.md)

[View the live site here](https://hoodsap-api-d42fd4bc31f5.herokuapp.com/)


![Mockup]()

## Table of Contents

* [Agile](#agile)
* [Features](#features)
* [UX / UI](#ui-/-ux) 
* [Technologies Used](#technologies-used)
* [Testing](#testing)
* [Deployment](#deployment)
* [Credits](#credits)


## Agile

I've embraced the Agile methodology for project management, utilizing GitHub Projects as the tool for this purpose. Within the project, tasks were organized into Epics to efficiently group related user stories. Each user story has a title, a description, clear acceptance criteria, associated tasks, and tags to effectively categorize them as "must-have," "should-have," or "could-have" features. This structured approach facilitated a dynamic workflow that transitions from "To Do" for pending tasks, to "In Progress" for those under active development, and finally to "Done" upon completion.

### Project Goal

The core objective of Hoodsap is to empower neighborhoods by offering a dynamic platform that encourages community interaction and the exchange of local insights. It aims to streamline the process for residents to post updates, arrange local events, and foster mutual support. Hoodsap serves as a hub for residents who want to stay informed about neighborhood activities, discovering local points of interest, and collaboratively addressing community issues. It is designed to be an useful tool for anyone interested in enriching their neighborhood's collective experience and building a stronger, more connected community.


### User Stories

EPIC: Registration and Authentication
- https://github.com/fsjavier/hoodsap-api/issues/16 As a user I can create an account to have access to all features
- https://github.com/fsjavier/hoodsap-api/issues/17 As a registered user I can log in so that I can access my account
- https://github.com/fsjavier/hoodsap-api/issues/18 As a logged in user I can choose to stay logged in so that I don't have to log in every time I come back
- https://github.com/fsjavier/hoodsap-api/issues/19 As a logged in user I can log out so that my account information is not compromised
- https://github.com/fsjavier/hoodsap-api/issues/35 As a developer I want to avoid sending unnecessary requests to the API so that the session is optimised

EPIC: Navigation
- https://github.com/fsjavier/hoodsap-api/issues/22 As a user I can see a different navigation menu when I'm logged in / out so that I can easy identify my state

EPIC: User Profiles
- https://github.com/fsjavier/hoodsap-api/issues/20 As a user I can visit any profile so that I can see their public information
- https://github.com/fsjavier/hoodsap-api/issues/21 As a registered user I can update my profile so that I can change my preferences as wanted

EPIC: Posts
- https://github.com/fsjavier/hoodsap-api/issues/23 As a registered user I can create a post so that I can share my content with everyone else
- https://github.com/fsjavier/hoodsap-api/issues/28 As a user I can click on a post so that I can see all details
- https://github.com/fsjavier/hoodsap-api/issues/29 As a user I can see a list with all posts so that I can scroll through the content
- https://github.com/fsjavier/hoodsap-api/issues/30 As a logged in user I can edit and delete my own posts so that I can control my content

EPIC: Social Events
- https://github.com/fsjavier/hoodsap-api/issues/36 As a registered user I can create an event so that I can share it with everyone else
- https://github.com/fsjavier/hoodsap-api/issues/37 As a user I can click on an event so that I can see all details
- https://github.com/fsjavier/hoodsap-api/issues/38 As a user I can see a list with all events so that I can scroll through the content
- https://github.com/fsjavier/hoodsap-api/issues/41 As a logged in user I can edit and delete my own events so that I can control my content

EPIC: Location
- https://github.com/fsjavier/hoodsap-api/issues/24 As a registered user I can select a location so that my posts are specific to a neighborhood.
- https://github.com/fsjavier/hoodsap-api/issues/43 As a logged in user I can filter the posts and events based on my location so that I can see only the ones that are relevant to me
- https://github.com/fsjavier/hoodsap-api/issues/44 As a user I want to get recommended users to follow based on my and their location so that I can follow the most relevant users
- https://github.com/fsjavier/hoodsap-api/issues/45 As a logged in user I want to filter events based on my and their location so that I can see the most relevant events

EPIC: Comments
- https://github.com/fsjavier/hoodsap-api/issues/31 As a logged in user I can write comments to posts so that contribute to them
- https://github.com/fsjavier/hoodsap-api/issues/32 As a logged in user I can edit and delete my comments so that I can fix, update or remove my comment
- https://github.com/fsjavier/hoodsap-api/issues/39 As a logged in user I can write comments to event so that contribute to them
- https://github.com/fsjavier/hoodsap-api/issues/40 As a logged in user I can edit and delete my event comments so that I can fix, update or remove my comment

Epic: Followers
- https://github.com/fsjavier/hoodsap-api/issues/33 As a user I can see recommended profiles so that I can easily find interesting profiles to follow
- https://github.com/fsjavier/hoodsap-api/issues/34 As a logged in user I can follow/unfollow users so that I can easily see their content

EPIC: Tags
- https://github.com/fsjavier/hoodsap-api/issues/25 As a logged in user I can add tags to a post so that highlight words that fit the content


## Features

All features have been prioritized and developed in response to the needs outlined in the user stories during the planning stage.

### Existing Features

#### Authentication

- Secure registraion and login process to ensure user authenticity.
- Once registered and logged in, users can set a new username and password in their profile.
- Logged out users have limited access to the features:
    - They won't see the location slider filter
    - They will be redirected back to the home page if they try access pages restricted to logged in users, like create a post.

<details><summary>Logged out user</summary>
<img src="documentation/readme_images/authentication/logged_out_user.png">
</details>
<details><summary>Logged in user</summary>
<img src="documentation/readme_images/authentication/logged_in_user.png">
</details>
<details><summary>Account settings</summary>
<img src="documentation/readme_images/authentication/account_settings.png">
</details>
<details><summary>Change username</summary>
<img src="documentation/readme_images/authentication/change_username.png">
</details>
<details><summary>Change password</summary>
<img src="documentation/readme_images/authentication/change_password.png">
</details>

#### Navigation

- Responsive top navigation bar adaptable to various screen sizes.
- For logged-in users, additional options are accessible, including direct links to their profiles, ability to create posts or events, and logout option.
- A bottom navigation bar on mobile devices for easy access to core sections: Home, Events, Feed.

<details><summary>Navigation</summary>
<img src="documentation/readme_images/navigation/navigation.png">
</details>
<details><summary>Navigation bottom bar</summary>
<img src="documentation/readme_images/navigation/navigation_bar_bottom.png">
</details>

#### Profiles

- Personalized profiles showcasing user details, posts, and events.
- Displays follower counts and provides follow/unfollow functionality directly from the profile view if the visiting user is logged in.
- Features an edit option for users to update their profile information and avatar.
- The user's exact location is not displayed (only approximate location) to preserve users privacy.

<details><summary>Own profile</summary>
<img src="documentation/readme_images/profiles/own_profile.png">
</details>
<details><summary>Profile - looged in</summary>
<img src="documentation/readme_images/profiles/profile_loggedin.png">
</details>
<details><summary>Profile - looged out</summary>
<img src="documentation/readme_images/profiles/profile_loggedout.png">
</details>

#### Home Page / Posts

- The home page dynamically adjusts based on user authentication status.
- When logged out displays all posts.
- When logged in it incorporates a location-based filtering system, allowing users to discover posts within a specified radius.

<details><summary>Posts - looged out</summary>
<img src="documentation/readme_images/posts/posts_loggedout.png">
</details>
<details><summary>Posts - looged in</summary>
<img src="documentation/readme_images/posts/posts_loggedin.png">
</details>

#### Add / Edit / Delete Post

- Users can add new posts, specifying details such as an image, title, content, and location.
- Users can add up to 5 tags to their posts.
- Editing functionality enables users to update their posts, ensuring the information remains relevant and accurate.
- Users can delete their own posts. Deletion must be confirmed.

<details><summary>Add post</summary>
<img src="documentation/readme_images/posts/add_post.png">
</details>
<details><summary>Edit post</summary>
<img src="documentation/readme_images/posts/edit_post.png">
</details>
<details><summary>Delete post</summary>
<img src="documentation/readme_images/posts/delete_post.png">
</details>

#### Events

- A dedicated section for viewing and organizing neighborhood events.
- Events are categorized and can be filtered by category and if they are indoor or outdoor, offering a tailored experience.
- When logged in it incorporates a location-based filtering system.

<details><summary>Events</summary>
<img src="documentation/readme_images/events/events.png">
</details>

#### Add / Edit / Delete Events

- User can create new events, including image, date, time, location, category, and description.
- Users can add up to 5 tags to their events.
- Event creators can edit their events to adjust details or provide updates.
- Users can delete their own events. Deletion must be confirmed.

<details><summary>Add event</summary>
<img src="documentation/readme_images/events/add_event.png">
</details>
<details><summary>Edit Event</summary>
<img src="documentation/readme_images/events/edit_event.png">
</details>
<details><summary>Delete Event</summary>
<img src="documentation/readme_images/events/delete_event.png">
</details>

#### Location

- A cornerstone feature, allowing users to set their location for personalized content based on geographical proximity.
- It is possible to use the application without setting the user's prefered location, but the location filter is not visible.
- Location picker aids in accurately setting the user's location, enhancing the relevance of posts and events displayed.
- Location is set automatically on the map if the user gives permission.
- Users can explore posts and events within a set radius from their location, promoting local interaction and participation.
- When users are logged in and have location set, the map is centered based on their location.
- When users are not logged in, the map is centered based on the first result (post or event).
- As the users reduces the distance filter, the map zooms in.

<details><summary>Logged in - No location</summary>
<img src="documentation/readme_images/location/no_location_set.png">
</details>
<details><summary>Location - Distance filter</summary>
<img src="documentation/readme_images/location/location_distance_filter.png">
</details>

#### Follow / Unfollow Profiles

- Users can follow or unfollow others directly from their profiles, facilitating community building and interaction.
- The following system updates content feeds to include posts from followed users.
- Following / unfollowing users in the Feed Page updates instantly the page to include / exclude the posts.

<details><summary>Follow - Recommended profiles</summary>
<img src="documentation/readme_images/follow/follow_recommended.png">
</details>
<details><summary>Follow - Profile page</summary>
<img src="documentation/readme_images/follow/follow_profile.png">
</details>

#### Like / Unlike Posts

- Like functionality for posts to express appreciation or interest.
- Users can easily like or unlike posts, with updates reflected in real-time.

<details><summary>Liked post</summary>
<img src="documentation/readme_images/likes/liked_post.png">
</details>
<details><summary>Like own post</summary>
<img src="documentation/readme_images/likes/like_own_post.png">
</details>

#### Comment and Edit / Delete Comments (Posts and Events)

- Commenting feature available on both posts and events for users to engage in discussions.
- Provides options to edit or delete their comments, ensuring flexibility in communication.

<details><summary>Comment field</summary>
<img src="documentation/readme_images/comments/comment_field.png">
</details>
<details><summary>Comment</summary>
<img src="documentation/readme_images/comments/comment.png">
</details>
<details><summary>Edit Comment</summary>
<img src="documentation/readme_images/comments/edit_comment.png">
</details>
<details><summary>Delete Comment</summary>
<img src="documentation/readme_images/comments/delete_comment.png">
</details>

#### Search

- Comprehensive search functionality that applies to posts, user feeds, and events.
- Supports filtering by titles and descriptions, making it easier to find relevant content.

<details><summary>Search - post</summary>
<img src="documentation/readme_images/search/search_post.png">
</details>
<details><summary>Search - event</summary>
<img src="documentation/readme_images/search/search_events.png">
</details>

### Future Features

#### Short term goals

- Reporting System for users to report posts, profiles, or events that violate community guidelines. This feature is already prepared on the backend.
- Allowing users to post more than image (up to 3) for a post.
- Enabling social accounts registration.
- Switching to a Geospatial Database to enhance the precision and efficiency of location-based filtering.
- Implementing a dedicated notifications section to keep users informed about important activities related to their posts, events, and interactions. This includes new followers, comments, likes, and updates on events they're interested in.

#### Long term goals

- Creating a dedicated section for local businesses, handymen, nannies, etc., allowing community members to easily find and offer services within their neighborhood.
- Developing a real-time chat feature to enable direct communication among users.
- Allowing users to RSVP to events directly through the platform.
- Integrating an emergency alert feature that can be used to share critical information with the neighborhood, such as weather warnings.

### Main components

The application is structured around a series of React components and pages. The components are organized to align closely with the user stories.

#### Registration and Authentication
SignInForm.js & SignUpForm.js: Facilitates user stories #16 and #17 by providing UI components for account creation and login functionalities.

CurrentUserContext.js: Supports user story #18 by maintaining the authentication state across sessions.

#### Navigation
NavBar.js & NavBarMobile.js: Addresses user story #22 by rendering different navigation menus based on the user's authentication state.

#### User Profiles
ProfilePage.js & ProfileEditForm.js: Enable user stories #20 and #21 by displaying public profile information and allowing authenticated users to update their profiles.

#### Posts
PostCreateForm.js & PostEditForm.js: Cater to user stories #23 and #30 by providing interfaces for creating and editing posts.

Post.js, PostsPage.js, PostListView.js & PostPage.js: Serve user stories #28 and #29 by displaying a list of posts and detailed views for individual posts.

#### Social Events
EventCreateForm.js & EventEditForm.js: Facilitate user stories #36 and #41 by offering interfaces for users to create and edit their events.

Event.js, EventsPage.js, EventListView.js & EventPage.js: Address user stories #37 and #38 by showing a list of events and detailed views for individual events.

#### Location
PostsPage.js & EventsPage.js utilize RadiusFilterContext.js to implement location-based filtering as per user stories #43, #44, and #45.

#### Comments
CommentPostCreateForm.js, CommentEditForm.js, CommentEventCreateForm.js: Address user stories #31, #32, #39, and #40 by allowing users to add, edit, and delete comments on posts and events.

#### Followers
Profile.js & RecommendedProfiles.js: Support user story #33 by recommending profiles to users based on location. ProfileDataContext.js aids in managing follow/unfollow actions as per user story #34.

#### Tags
FormTagsField.js: Enables user story #25 by allowing users to add tags to their posts, enhancing the post's context and discoverability.

#### Reusable components
The creation of reusable components, significantly enhances efficiency and consistency across the application. These components, including Asset.js, Avatar.js, ConfirmationModal.js, LocationPicker.js, FormImageField.js, MoreDropdown.js, and CustomButton.js, serve as versatile building blocks.

## UI / UX

Hoodsap is designed with a mobile-first approach, ensuring it's accessible on-the-go, including bottom navigation bar for mobile users. Designed to cater to users of all demographics, the application facilitates effortless interactions through a clean and intuitive interface. The site is responsive, providing a consistent experience across a wide range of devices. The top navigation bar makes the profile menu accessible via a simple avatar click or tap.

### Wireframes

The initial wireframes served as a starting point for the layout and functionality of Hoodsap. Throughout the development process, various enhancements and design adjustments were introduced to improve the user experience and interaction.

The most significant deviation from the initial wireframes is the implementation of a distance slider, which became a key feature. The original plan was to filter posts and events directly based on the user's location. This change grants users the flexibility to adjust the radius for filtering posts and events, rather than relying on automatic content visibility determined by their location.

Additionally, a bottom navigation bar for mobile users was introduced, enhancing navigation on smaller devices. The search bar was consistently positioned in the top navigation bar and made visible only on relevant pages.

Minor changes were also made, refining the overall aesthetics and usability of the platform.

<details><summary>Posts wireframe</summary>
<img src="documentation/readme_images/wireframes/wireframe_posts.png">
</details>
<details><summary>Events wireframe</summary>
<img src="documentation/readme_images/wireframes/wireframe_posts.png">
</details>
<details><summary>Profile wireframe</summary>
<img src="documentation/readme_images/wireframes/wireframe_posts.png">
</details>


### Colors


### Fonts


## Technologies Used

### Languages


### Frameworks


### Libraries and Dependencies


### Hosting and Deployment


### Other Technologies


## Testing

The full testing documentation can be found in [TESTING.md](./TESTING.md)

## Deployment


## Credits

### Code


### Content

- Bios for fictional profiles, posts and events have been enhanced using ChatGPT.

### Media

#### Icons


#### Images

- User John: Image by [Sasin Tipchai](https://pixabay.com/users/sasint-3639875) from [Pixabay](https://pixabay.com/)
- User Sarah: Image by [Uschi Dugulin](https://pixabay.com/users/uschi_du-6837866) from [Pixabay](https://pixabay.com/)
- User Michael: Image by [stephanfredthielen](https://pixabay.com/users/stephanfredthielen-17479201) from [Pixabay](https://pixabay.com/)
- User Lisa: Image by [Jill Wellington](https://pixabay.com/users/jillwellington-334088) from [Pixabay](https://pixabay.com/)
- User Robert: Image by [Michael Strobel](https://pixabay.com/users/lichtsammler-11059614) from [Pixabay](https://pixabay.com/)

### Acknowledgments

Thank you to my mentor Gareth McGirr for his guidance, feedback and resources provided.