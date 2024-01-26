# Hoodsap API

Hoodsap API, developed using Django Rest Framework, is backend solution for neighborhood-based social networking applications. It's the core of the Hoodsap platform, which is a community-driven social network enabling users to engage with their local area through posts and events.

## Table of Contents

* [Agile Methodology](#agile-methodology)
* [Features](#features)
* [Database Design](#database-design)
* [Endpoints](#ui-/-ux)
* [Technologies Used](#technologies-used)
* [Testing](#testing)
* [Deployment](#deployment)
* [Credits](#credits)


## Agile Methodology

I've adopted Agile methodology for project planning, using GitHub Projects as the tool. Within the [project](https://github.com/users/fsjavier/projects/6), I've organized work into Epics to group user stories. Each user story includes a title, description, acceptance criteria, tasks, and tags to distinguish between "must have", "should have" and "could have" features. The workflow progresses from "To Do" to "In Progress" while working on user stories and finally to "Done" upon completion.

https://github.com/fsjavier/hoodsap-api/labels/must-have



### User Stories

EPIC: Registration and Authentication
- As a developer I want users to be able to log in and out (must-have)
- As a developer I want to enable access to an API endpoint to obtain an refresh access token (must-have)
- As a developer I want to enable users to register using their social accounts (could-have)

EPIC: User Profiles 
- As a developer I want a new profile to be automatically created when a user register (must-have)
- As a developer I want users to access all profiles but only be able to edit their own (must-have)

EPIC: Posts
- As a developer I want users to be able to create, retrieve, update and delete their own posts https://github.com/fsjavier/hoodsap-api/issues/5 (must-have)
- As a developer I want to enable users to upload more than 1 image in a post (could-have)

EPIC: Social Events
- As a developer I want users to be able to create, retrieve, update and delete their own events (must-have)

EPIC: Location
- As a developer I want to add location functionality to be consumed by different parts of the application (profiles, posts, events) (must-have)

EPIC: Comments
- As a developer I want to enable users to create, read, update and delete post comments if it's their own (must-have)
- As a developer I want to enable users to create, read, update and delete social events comments if it's their own (must-have)

EPIC: Likes
- As a developer I want to enable users to create, read and delete likes if it's their own (must-have)

Epic: Followers
- As a developer I want to enable users to create, read and delete following if it's their own (must-have)

EPIC: Reports
- As a developer I want to enable users to create, read, update and delete reports if it's their own (must-have)

EPIC: Tags
- As a developer I want to enable users to create, read and delete tags for post and events if it's their own (must-have)