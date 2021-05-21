
import React from 'react';

const Icons = ({ type }) => {
  switch (type) {
    case 'logo':
      return (
        <svg  className="logo-svg" enable-background="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><g><g><path d="m475.647 442.729c-13.619-20.123-49.937-73.786-49.937-73.786-15.731-24-7.236-55.55-5.616-81.947 1.862-30.344-7.644-60.161-20.653-87.32-6.656-13.896-14.522-27.19-22.931-40.089-16.381-25.127-35.006-48.657-53.183-72.484-4.631-6.07-13.102-8.056-19.693-4.202-6.17 3.608-8.867 10.944-6.707 17.578.677 2.097 1.367 4.192 2.062 6.287-3.121-6.812-11.19-10.173-18.368-7.157-6.574 2.762-10.081 9.969-8.185 16.843 8.953 32.468 42.992 126.228 36.042 206.085l.007-.013c-2.595 31.801 2.175 64.382 16.75 92.314 10.768 20.636 24.868 39.355 34.172 60.784l13.495 31.079c2.154 4.96 8.229 6.823 12.792 3.922l87.386-55.535c4.185-2.659 5.347-8.251 2.567-12.359z" fill="#ffcebf"/><path d="m321.119 265.862c-3.314 8.855-6.07 18.107-8.205 27.593l-2.532 13.949-1.901 15.138c1.647-18.971.986-38.736-1.108-58.267 8.479-25.224 9.11-53.997 1.81-79.272-3.467-11.966-7.412-23.872-11.499-35.747l-5.683-16.379-7.29-21.432c-1.149-4.392-4.199-7.707-7.981-9.394 1.128-1.007 2.44-1.83 3.894-2.44 1.8-.763 3.67-1.118 5.49-1.118 6.232 0 12.048 4.148 13.736 10.614l7.279 21.442 5.694 16.379c4.077 11.875 8.032 23.77 11.489 35.747 7.676 26.578 6.588 57.058-3.193 83.187z" fill="#ffb09e"/><path d="m475.646 442.726c-13.613-20.12-49.94-73.781-49.94-73.781-15.728-24.004-7.229-55.552-5.612-81.945 1.86-30.348-7.646-60.168-20.649-87.324-6.659-13.898-14.529-27.186-22.937-40.088-16.379-25.122-35.005-48.659-53.183-72.48-4.626-6.07-13.105-8.062-19.693-4.209-.854.498-1.637 1.068-2.349 1.688.885.742 1.688 1.576 2.41 2.521 18.178 23.821 36.804 47.357 53.183 72.48 8.408 12.902 16.277 26.19 22.926 40.088 13.014 27.156 22.52 56.975 20.659 87.324-1.627 26.393-10.116 57.941 5.612 81.945 0 0 40.647 65.19 54.271 85.311 1.749 2.593 1.932 5.775.773 8.439l11.966-7.605c4.18-2.665 5.349-8.257 2.563-12.364z" fill="#ffb09e"/><g><path d="m327.932 239.053 5.469-21.255c1.278-5.399 6.045-9.17 11.593-9.17 5.627 0 10.527 3.968 11.654 9.436 3.402 16.516 7.334 53.158-4.494 113.066-.355 1.375-1.881 7.561-2.692 15.2-1.282 12.085-.17 21.738 3.307 28.691 1.336 2.672 4.029 4.217 6.826 4.217 1.146 0 2.309-.26 3.405-.807 3.766-1.883 5.293-6.464 3.409-10.23-3.977-7.955-1.777-24.701.543-33.381.045-.166.083-.334.117-.502 11.782-59.535 8.959-97.752 4.515-119.329-2.579-12.521-13.763-21.61-26.591-21.61-12.65 0-23.52 8.597-26.443 20.946l-4.997 21.613z" fill="#ffb09e"/></g><path d="m38.921 455.089 87.386 55.535c4.563 2.9 10.639 1.037 12.792-3.922l13.495-31.079c9.305-21.429 23.404-40.148 34.172-60.784 14.575-27.932 19.345-60.513 16.75-92.314l.007.013c-6.95-79.857 27.089-173.617 36.042-206.085 1.896-6.874-1.611-14.081-8.185-16.843-7.179-3.016-15.247.345-18.368 7.157.695-2.095 1.385-4.19 2.062-6.287 2.16-6.634-.536-13.97-6.707-17.578-6.591-3.854-15.062-1.869-19.693 4.202-18.177 23.827-36.802 47.357-53.183 72.484-8.409 12.899-16.276 26.193-22.931 40.089-13.009 27.159-22.515 56.976-20.653 87.32 1.62 26.397 10.115 57.947-5.616 81.946 0 0-36.318 53.663-49.937 73.786-2.781 4.108-1.619 9.7 2.567 12.36z" fill="#ffcebf"/><path d="m190.881 265.862c3.314 8.855 6.07 18.107 8.205 27.593l2.532 13.949 1.901 15.138c-1.647-18.971-.986-38.736 1.108-58.267-8.479-25.224-9.11-53.997-1.81-79.272 3.467-11.966 7.412-23.872 11.499-35.747l5.683-16.379 7.29-21.432c1.149-4.392 4.199-7.707 7.981-9.394-1.128-1.007-2.44-1.83-3.894-2.44-1.8-.763-3.67-1.118-5.49-1.118-6.232 0-12.048 4.148-13.736 10.614l-7.279 21.442-5.694 16.379c-4.077 11.875-8.032 23.77-11.489 35.747-7.676 26.578-6.588 57.058 3.193 83.187z" fill="#ffb09e"/><path d="m38.916 455.089 11.966 7.605c-1.159-2.664-.976-5.846.773-8.439 13.624-20.12 54.271-85.311 54.271-85.311 15.728-24.004 7.239-55.552 5.612-81.945-1.861-30.348 7.646-60.168 20.659-87.324 6.649-13.898 14.518-27.186 22.926-40.088 16.379-25.122 35.005-48.659 53.183-72.48.722-.946 1.525-1.779 2.41-2.521-.712-.62-1.495-1.189-2.349-1.688-6.588-3.853-15.067-1.861-19.693 4.209-18.179 23.821-36.804 47.357-53.183 72.48-8.408 12.902-16.277 26.19-22.937 40.088-13.004 27.156-22.509 56.975-20.649 87.324 1.617 26.393 10.116 57.941-5.612 81.945 0 0-36.326 53.661-49.94 73.781-2.785 4.108-1.616 9.7 2.563 12.364z" fill="#ffb09e"/><g><path d="m184.128 239.053-5.469-21.255c-1.278-5.399-6.045-9.17-11.593-9.17-5.627 0-10.527 3.968-11.654 9.436-3.402 16.516-7.334 53.158 4.494 113.066.355 1.375 1.881 7.561 2.692 15.2 1.282 12.085.17 21.738-3.307 28.691-1.336 2.672-4.029 4.217-6.826 4.217-1.146 0-2.309-.26-3.405-.807-3.766-1.883-5.293-6.464-3.41-10.23 3.977-7.955 1.777-24.701-.543-33.381-.045-.166-.083-.334-.117-.502-11.782-59.535-8.959-97.752-4.515-119.329 2.579-12.521 13.763-21.61 26.591-21.61 12.65 0 23.52 8.597 26.443 20.946l4.997 21.613z" fill="#ffb09e"/></g></g><g><g><g><path d="m256 39.506c-4.212 0-7.625-3.413-7.625-7.625v-24.256c0-4.212 3.413-7.625 7.625-7.625s7.625 3.413 7.625 7.625v24.256c0 4.212-3.413 7.625-7.625 7.625z" fill="#b3dafe"/></g></g><g><g><g><g><path d="m147.015 67.801c-1.951 0-3.903-.745-5.392-2.233l-17.152-17.152c-2.978-2.979-2.978-7.806 0-10.784 2.979-2.977 7.806-2.977 10.784 0l17.152 17.152c2.978 2.979 2.978 7.806 0 10.784-1.489 1.488-3.441 2.233-5.392 2.233z" fill="#b3dafe"/></g></g><g><path d="m118.722 136.107h-24.256c-4.212 0-7.625-3.413-7.625-7.625s3.413-7.625 7.625-7.625h24.256c4.212 0 7.625 3.413 7.625 7.625 0 4.211-3.414 7.625-7.625 7.625z" fill="#b3dafe"/></g></g><g><path d="m417.534 136.107h-24.256c-4.212 0-7.625-3.413-7.625-7.625s3.413-7.625 7.625-7.625h24.256c4.212 0 7.625 3.413 7.625 7.625 0 4.211-3.413 7.625-7.625 7.625z" fill="#b3dafe"/></g><g><g><path d="m364.985 67.801c-1.951 0-3.903-.745-5.392-2.233-2.978-2.979-2.978-7.806 0-10.784l17.152-17.152c2.979-2.977 7.806-2.977 10.784 0 2.978 2.979 2.978 7.806 0 10.784l-17.152 17.152c-1.489 1.488-3.441 2.233-5.392 2.233z" fill="#b3dafe"/></g></g></g></g></g></svg>
      );
    case 'user': 
      return (
        <svg viewBox="-42 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m333.671875 123.308594c0 33.886718-12.152344 63.21875-36.125 87.195312-23.972656 23.972656-53.308594 36.125-87.195313 36.125h-.058593c-33.84375-.011718-63.160157-12.164062-87.132813-36.125-23.976562-23.976562-36.125-53.308594-36.125-87.195312 0-33.875 12.148438-63.210938 36.125-87.183594 23.960938-23.964844 53.277344-36.1132812 87.132813-36.125h.058593c33.875 0 63.210938 12.152344 87.195313 36.125 23.972656 23.972656 36.125 53.308594 36.125 87.183594zm0 0" fill="#ffbb85"/><path d="m427.167969 423.945312c0 26.734376-8.503907 48.378907-25.253907 64.320313-16.554687 15.753906-38.449218 23.734375-65.070312 23.734375h-246.53125c-26.621094 0-48.515625-7.980469-65.058594-23.734375-16.761718-15.953125-25.253906-37.59375-25.253906-64.320313 0-10.28125.339844-20.453124 1.019531-30.234374.691407-10 2.089844-20.882813 4.152344-32.363282 2.078125-11.574218 4.75-22.515625 7.949219-32.515625 3.320312-10.351562 7.8125-20.5625 13.371094-30.34375 5.773437-10.152343 12.554687-18.996093 20.15625-26.277343 7.96875-7.621094 17.710937-13.742188 28.972656-18.203126 11.222656-4.4375 23.664062-6.6875 36.976562-6.6875 5.222656 0 10.28125 2.136719 20.03125 8.488282 6.101563 3.980468 13.132813 8.511718 20.894532 13.472656 6.703124 4.273438 15.78125 8.28125 27.003906 11.902344 9.863281 3.191406 19.875 4.972656 29.765625 5.28125 1.089843.039062 2.179687.058594 3.269531.058594 10.984375 0 22.09375-1.800782 33.046875-5.339844 11.222656-3.621094 20.3125-7.628906 27.011719-11.902344 7.84375-5.011719 14.875-9.539062 20.886718-13.460938 9.757813-6.363281 14.808594-8.5 20.042969-8.5 13.300781 0 25.742188 2.25 36.972657 6.6875 11.261718 4.460938 21.003906 10.59375 28.964843 18.203126 7.613281 7.28125 14.394531 16.125 20.164063 26.277343 5.5625 9.789063 10.0625 19.992188 13.371094 30.332031 3.203124 10.011719 5.882812 20.953126 7.960937 32.535157 2.050781 11.492187 3.453125 22.375 4.140625 32.347656.691406 9.75 1.03125 19.921875 1.042969 30.242187zm0 0" fill="#6aa9ff"/><path d="m210.351562 246.628906h-.058593v-246.628906h.058593c33.875 0 63.210938 12.152344 87.195313 36.125 23.972656 23.972656 36.125 53.308594 36.125 87.183594 0 33.886718-12.152344 63.21875-36.125 87.195312-23.972656 23.972656-53.308594 36.125-87.195313 36.125zm0 0" fill="#f5a86c"/><path d="m427.167969 423.945312c0 26.734376-8.503907 48.378907-25.253907 64.320313-16.554687 15.753906-38.449218 23.734375-65.070312 23.734375h-126.550781v-225.535156c1.089843.039062 2.179687.058594 3.269531.058594 10.984375 0 22.09375-1.800782 33.046875-5.339844 11.222656-3.621094 20.3125-7.628906 27.011719-11.902344 7.84375-5.011719 14.875-9.539062 20.886718-13.460938 9.757813-6.363281 14.808594-8.5 20.042969-8.5 13.300781 0 25.742188 2.25 36.972657 6.6875 11.261718 4.460938 21.003906 10.59375 28.964843 18.203126 7.613281 7.28125 14.394531 16.125 20.164063 26.277343 5.5625 9.789063 10.0625 19.992188 13.371094 30.332031 3.203124 10.011719 5.882812 20.953126 7.960937 32.535157 2.050781 11.492187 3.453125 22.375 4.140625 32.347656.691406 9.75 1.03125 19.921875 1.042969 30.242187zm0 0" fill="#2682ff"/></svg>
      );
    default:
      return null;
  }
};

export default Icons;