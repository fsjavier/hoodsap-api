## Functional Testing



### Responsiveness

All pages have been tested for responsiveness with Google Chrome Developer Tools on screens from 320px, making sure the content adjusts correctly on all screen sizes.


### Fixed Bugs

| Bug | Solution |
|-----|----------|
| User data is “undefined” when refreshing the page | Use `const { data } = await axiosRes.get("dj-rest-auth/user/");` instead of `const data  = await axiosRes.get("dj-rest-auth/user/");` |
| Creating a post in the frontend returns an error because 'CloudinaryResource' object has no attribute 'size' | Replace in the model CloudinaryField with ImageField |
| When the distance filter is set to 0 all events, profiles, posts are loaded | Check `{latitude && longitude && radius !=={maxValue}}` instead of `{latitude && longitude && radius}`
| Profile location data wouldn’t persist after updating the profile, causing that the slider location filter doesn’t work | Use `setCurrent` with updated user data when updating the profile to have access to the `profile_location_data` field from the serializer |
| Following some users would return a 400 error (Invalid pk - object does not exist) | The issue was a mismatch between user ids and profile ids when sending the follow profile request with the profile id. The solution was to include the `user_id` in the Profile serializer and use this instead of the `profile_id` in the request. |


### Unfixed Bugs

When the user gives location permission and the user wants to edit a post or the profile, the location picker moves from the current position to the user position.

## Unit Testing


## Validator Testing

### ESLint

Eslint has been installed and configured. All code passes without errors. The only error logged is related to the ReactDOM.render being deprecated.

![](documentation/readme_images/tests/ESLint.png)


### CSS [W3C Jigsaw Validator](https://jigsaw.w3.org/css-validator/)


### JavaScript [JSHint](https://jshint.com/)

## Accessibility

### Lighthouse

### Wave WebAIM

The WAVE WebAIM web accessibility tool was used throughout the development of the website. It alerted me to issues such as:

- Missing form labels
- Empty links
- Repeated alt text

The problems have been addressed and in the final rounds of website testing no accessibility issues were identified.