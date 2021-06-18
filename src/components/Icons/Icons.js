import React from 'react';

const Icons = ({ type, className }) => {
  switch (type) {
    case 'logo':
      return (
        <svg  className="logo-svg" enableBackground="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><g><g><path d="m475.647 442.729c-13.619-20.123-49.937-73.786-49.937-73.786-15.731-24-7.236-55.55-5.616-81.947 1.862-30.344-7.644-60.161-20.653-87.32-6.656-13.896-14.522-27.19-22.931-40.089-16.381-25.127-35.006-48.657-53.183-72.484-4.631-6.07-13.102-8.056-19.693-4.202-6.17 3.608-8.867 10.944-6.707 17.578.677 2.097 1.367 4.192 2.062 6.287-3.121-6.812-11.19-10.173-18.368-7.157-6.574 2.762-10.081 9.969-8.185 16.843 8.953 32.468 42.992 126.228 36.042 206.085l.007-.013c-2.595 31.801 2.175 64.382 16.75 92.314 10.768 20.636 24.868 39.355 34.172 60.784l13.495 31.079c2.154 4.96 8.229 6.823 12.792 3.922l87.386-55.535c4.185-2.659 5.347-8.251 2.567-12.359z" fill="#ffcebf"/><path d="m321.119 265.862c-3.314 8.855-6.07 18.107-8.205 27.593l-2.532 13.949-1.901 15.138c1.647-18.971.986-38.736-1.108-58.267 8.479-25.224 9.11-53.997 1.81-79.272-3.467-11.966-7.412-23.872-11.499-35.747l-5.683-16.379-7.29-21.432c-1.149-4.392-4.199-7.707-7.981-9.394 1.128-1.007 2.44-1.83 3.894-2.44 1.8-.763 3.67-1.118 5.49-1.118 6.232 0 12.048 4.148 13.736 10.614l7.279 21.442 5.694 16.379c4.077 11.875 8.032 23.77 11.489 35.747 7.676 26.578 6.588 57.058-3.193 83.187z" fill="#ffb09e"/><path d="m475.646 442.726c-13.613-20.12-49.94-73.781-49.94-73.781-15.728-24.004-7.229-55.552-5.612-81.945 1.86-30.348-7.646-60.168-20.649-87.324-6.659-13.898-14.529-27.186-22.937-40.088-16.379-25.122-35.005-48.659-53.183-72.48-4.626-6.07-13.105-8.062-19.693-4.209-.854.498-1.637 1.068-2.349 1.688.885.742 1.688 1.576 2.41 2.521 18.178 23.821 36.804 47.357 53.183 72.48 8.408 12.902 16.277 26.19 22.926 40.088 13.014 27.156 22.52 56.975 20.659 87.324-1.627 26.393-10.116 57.941 5.612 81.945 0 0 40.647 65.19 54.271 85.311 1.749 2.593 1.932 5.775.773 8.439l11.966-7.605c4.18-2.665 5.349-8.257 2.563-12.364z" fill="#ffb09e"/><g><path d="m327.932 239.053 5.469-21.255c1.278-5.399 6.045-9.17 11.593-9.17 5.627 0 10.527 3.968 11.654 9.436 3.402 16.516 7.334 53.158-4.494 113.066-.355 1.375-1.881 7.561-2.692 15.2-1.282 12.085-.17 21.738 3.307 28.691 1.336 2.672 4.029 4.217 6.826 4.217 1.146 0 2.309-.26 3.405-.807 3.766-1.883 5.293-6.464 3.409-10.23-3.977-7.955-1.777-24.701.543-33.381.045-.166.083-.334.117-.502 11.782-59.535 8.959-97.752 4.515-119.329-2.579-12.521-13.763-21.61-26.591-21.61-12.65 0-23.52 8.597-26.443 20.946l-4.997 21.613z" fill="#ffb09e"/></g><path d="m38.921 455.089 87.386 55.535c4.563 2.9 10.639 1.037 12.792-3.922l13.495-31.079c9.305-21.429 23.404-40.148 34.172-60.784 14.575-27.932 19.345-60.513 16.75-92.314l.007.013c-6.95-79.857 27.089-173.617 36.042-206.085 1.896-6.874-1.611-14.081-8.185-16.843-7.179-3.016-15.247.345-18.368 7.157.695-2.095 1.385-4.19 2.062-6.287 2.16-6.634-.536-13.97-6.707-17.578-6.591-3.854-15.062-1.869-19.693 4.202-18.177 23.827-36.802 47.357-53.183 72.484-8.409 12.899-16.276 26.193-22.931 40.089-13.009 27.159-22.515 56.976-20.653 87.32 1.62 26.397 10.115 57.947-5.616 81.946 0 0-36.318 53.663-49.937 73.786-2.781 4.108-1.619 9.7 2.567 12.36z" fill="#ffcebf"/><path d="m190.881 265.862c3.314 8.855 6.07 18.107 8.205 27.593l2.532 13.949 1.901 15.138c-1.647-18.971-.986-38.736 1.108-58.267-8.479-25.224-9.11-53.997-1.81-79.272 3.467-11.966 7.412-23.872 11.499-35.747l5.683-16.379 7.29-21.432c1.149-4.392 4.199-7.707 7.981-9.394-1.128-1.007-2.44-1.83-3.894-2.44-1.8-.763-3.67-1.118-5.49-1.118-6.232 0-12.048 4.148-13.736 10.614l-7.279 21.442-5.694 16.379c-4.077 11.875-8.032 23.77-11.489 35.747-7.676 26.578-6.588 57.058 3.193 83.187z" fill="#ffb09e"/><path d="m38.916 455.089 11.966 7.605c-1.159-2.664-.976-5.846.773-8.439 13.624-20.12 54.271-85.311 54.271-85.311 15.728-24.004 7.239-55.552 5.612-81.945-1.861-30.348 7.646-60.168 20.659-87.324 6.649-13.898 14.518-27.186 22.926-40.088 16.379-25.122 35.005-48.659 53.183-72.48.722-.946 1.525-1.779 2.41-2.521-.712-.62-1.495-1.189-2.349-1.688-6.588-3.853-15.067-1.861-19.693 4.209-18.179 23.821-36.804 47.357-53.183 72.48-8.408 12.902-16.277 26.19-22.937 40.088-13.004 27.156-22.509 56.975-20.649 87.324 1.617 26.393 10.116 57.941-5.612 81.945 0 0-36.326 53.661-49.94 73.781-2.785 4.108-1.616 9.7 2.563 12.364z" fill="#ffb09e"/><g><path d="m184.128 239.053-5.469-21.255c-1.278-5.399-6.045-9.17-11.593-9.17-5.627 0-10.527 3.968-11.654 9.436-3.402 16.516-7.334 53.158 4.494 113.066.355 1.375 1.881 7.561 2.692 15.2 1.282 12.085.17 21.738-3.307 28.691-1.336 2.672-4.029 4.217-6.826 4.217-1.146 0-2.309-.26-3.405-.807-3.766-1.883-5.293-6.464-3.41-10.23 3.977-7.955 1.777-24.701-.543-33.381-.045-.166-.083-.334-.117-.502-11.782-59.535-8.959-97.752-4.515-119.329 2.579-12.521 13.763-21.61 26.591-21.61 12.65 0 23.52 8.597 26.443 20.946l4.997 21.613z" fill="#ffb09e"/></g></g><g><g><g><path d="m256 39.506c-4.212 0-7.625-3.413-7.625-7.625v-24.256c0-4.212 3.413-7.625 7.625-7.625s7.625 3.413 7.625 7.625v24.256c0 4.212-3.413 7.625-7.625 7.625z" fill="#b3dafe"/></g></g><g><g><g><g><path d="m147.015 67.801c-1.951 0-3.903-.745-5.392-2.233l-17.152-17.152c-2.978-2.979-2.978-7.806 0-10.784 2.979-2.977 7.806-2.977 10.784 0l17.152 17.152c2.978 2.979 2.978 7.806 0 10.784-1.489 1.488-3.441 2.233-5.392 2.233z" fill="#b3dafe"/></g></g><g><path d="m118.722 136.107h-24.256c-4.212 0-7.625-3.413-7.625-7.625s3.413-7.625 7.625-7.625h24.256c4.212 0 7.625 3.413 7.625 7.625 0 4.211-3.414 7.625-7.625 7.625z" fill="#b3dafe"/></g></g><g><path d="m417.534 136.107h-24.256c-4.212 0-7.625-3.413-7.625-7.625s3.413-7.625 7.625-7.625h24.256c4.212 0 7.625 3.413 7.625 7.625 0 4.211-3.413 7.625-7.625 7.625z" fill="#b3dafe"/></g><g><g><path d="m364.985 67.801c-1.951 0-3.903-.745-5.392-2.233-2.978-2.979-2.978-7.806 0-10.784l17.152-17.152c2.979-2.977 7.806-2.977 10.784 0 2.978 2.979 2.978 7.806 0 10.784l-17.152 17.152c-1.489 1.488-3.441 2.233-5.392 2.233z" fill="#b3dafe"/></g></g></g></g></g></svg>
      );
    case 'user': 
      return (
        <svg viewBox="-42 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m333.671875 123.308594c0 33.886718-12.152344 63.21875-36.125 87.195312-23.972656 23.972656-53.308594 36.125-87.195313 36.125h-.058593c-33.84375-.011718-63.160157-12.164062-87.132813-36.125-23.976562-23.976562-36.125-53.308594-36.125-87.195312 0-33.875 12.148438-63.210938 36.125-87.183594 23.960938-23.964844 53.277344-36.1132812 87.132813-36.125h.058593c33.875 0 63.210938 12.152344 87.195313 36.125 23.972656 23.972656 36.125 53.308594 36.125 87.183594zm0 0" fill="#ffbb85"/><path d="m427.167969 423.945312c0 26.734376-8.503907 48.378907-25.253907 64.320313-16.554687 15.753906-38.449218 23.734375-65.070312 23.734375h-246.53125c-26.621094 0-48.515625-7.980469-65.058594-23.734375-16.761718-15.953125-25.253906-37.59375-25.253906-64.320313 0-10.28125.339844-20.453124 1.019531-30.234374.691407-10 2.089844-20.882813 4.152344-32.363282 2.078125-11.574218 4.75-22.515625 7.949219-32.515625 3.320312-10.351562 7.8125-20.5625 13.371094-30.34375 5.773437-10.152343 12.554687-18.996093 20.15625-26.277343 7.96875-7.621094 17.710937-13.742188 28.972656-18.203126 11.222656-4.4375 23.664062-6.6875 36.976562-6.6875 5.222656 0 10.28125 2.136719 20.03125 8.488282 6.101563 3.980468 13.132813 8.511718 20.894532 13.472656 6.703124 4.273438 15.78125 8.28125 27.003906 11.902344 9.863281 3.191406 19.875 4.972656 29.765625 5.28125 1.089843.039062 2.179687.058594 3.269531.058594 10.984375 0 22.09375-1.800782 33.046875-5.339844 11.222656-3.621094 20.3125-7.628906 27.011719-11.902344 7.84375-5.011719 14.875-9.539062 20.886718-13.460938 9.757813-6.363281 14.808594-8.5 20.042969-8.5 13.300781 0 25.742188 2.25 36.972657 6.6875 11.261718 4.460938 21.003906 10.59375 28.964843 18.203126 7.613281 7.28125 14.394531 16.125 20.164063 26.277343 5.5625 9.789063 10.0625 19.992188 13.371094 30.332031 3.203124 10.011719 5.882812 20.953126 7.960937 32.535157 2.050781 11.492187 3.453125 22.375 4.140625 32.347656.691406 9.75 1.03125 19.921875 1.042969 30.242187zm0 0" fill="#6aa9ff"/><path d="m210.351562 246.628906h-.058593v-246.628906h.058593c33.875 0 63.210938 12.152344 87.195313 36.125 23.972656 23.972656 36.125 53.308594 36.125 87.183594 0 33.886718-12.152344 63.21875-36.125 87.195312-23.972656 23.972656-53.308594 36.125-87.195313 36.125zm0 0" fill="#f5a86c"/><path d="m427.167969 423.945312c0 26.734376-8.503907 48.378907-25.253907 64.320313-16.554687 15.753906-38.449218 23.734375-65.070312 23.734375h-126.550781v-225.535156c1.089843.039062 2.179687.058594 3.269531.058594 10.984375 0 22.09375-1.800782 33.046875-5.339844 11.222656-3.621094 20.3125-7.628906 27.011719-11.902344 7.84375-5.011719 14.875-9.539062 20.886718-13.460938 9.757813-6.363281 14.808594-8.5 20.042969-8.5 13.300781 0 25.742188 2.25 36.972657 6.6875 11.261718 4.460938 21.003906 10.59375 28.964843 18.203126 7.613281 7.28125 14.394531 16.125 20.164063 26.277343 5.5625 9.789063 10.0625 19.992188 13.371094 30.332031 3.203124 10.011719 5.882812 20.953126 7.960937 32.535157 2.050781 11.492187 3.453125 22.375 4.140625 32.347656.691406 9.75 1.03125 19.921875 1.042969 30.242187zm0 0" fill="#2682ff"/></svg>
      );
    case 'add':
      return (
        <svg className={className} height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m304 512h-96c-17.679688 0-32-14.320312-32-32v-144h-144c-17.679688 0-32-14.320312-32-32v-96c0-17.679688 14.320312-32 32-32h144v-144c0-17.679688 14.320312-32 32-32h96c17.679688 0 32 14.320312 32 32v144h144c17.679688 0 32 14.320312 32 32v96c0 17.679688-14.320312 32-32 32h-144v144c0 17.679688-14.320312 32-32 32zm0 0" fill="#48c8ef"/></svg>
      );
    case 'check':
      return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" svgjs="http://svgjs.com/svgjs" version="1.1" width="512" height="512" x="0" y="0" viewBox="0 0 512 512" space="preserve"><g>
          <polygon xmlns="http://www.w3.org/2000/svg" points="202.624,478.016 0,291.36 70.512,214.8 191.968,326.656 431.44,33.984 512,99.904 " fill="#ffffff" data-original="#0ba4e0" /></g>
        </svg>
      );
    case 'upload':
      return (
        <svg className={className} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 512.293 512.293" style={{ "enableBackground": "new 0 0 512.293 512.293"}} space="preserve">
          <path style={{"fill": "#BBDEFB"}} d="M402.148,149.606C384.338,63.054,299.735,7.328,213.183,25.138
            C139.07,40.389,85.774,105.472,85.434,181.136c0,3.605,0.149,7.296,0.469,11.2C33.178,197.917-5.04,245.183,0.541,297.908
            c5.173,48.87,46.416,85.943,95.559,85.895h11.2c-0.256-3.541-0.533-7.061-0.533-10.667c0-76.583,62.083-138.667,138.667-138.667
            S384.1,296.553,384.1,373.136c0,3.605-0.277,7.125-0.533,10.667h11.2c64.73,0.177,117.348-52.154,117.525-116.885
            C512.462,204.807,464.148,153.348,402.148,149.606L402.148,149.606z"/>
          <circle style={{"fill":"#4CAF50"}} cx="245.434" cy="373.136" r="117.333"/>
          <g>
            <path style={{"fill":"#FAFAFA"}} d="M245.434,447.803c-5.891,0-10.667-4.776-10.667-10.667v-128c0-5.891,4.776-10.667,10.667-10.667
              s10.667,4.776,10.667,10.667v128C256.1,443.027,251.325,447.803,245.434,447.803z"/>
            <path style={{"fill":"#FAFAFA"}} d="M288.1,362.47c-2.831,0.005-5.548-1.115-7.552-3.115l-35.115-35.136l-35.115,35.136
              c-4.237,4.093-10.99,3.975-15.083-0.262c-3.993-4.134-3.993-10.687,0-14.821l42.667-42.667c4.165-4.164,10.917-4.164,15.083,0
              l42.667,42.667c4.159,4.172,4.149,10.926-0.024,15.085C293.63,361.35,290.923,362.469,288.1,362.47z"/>
          </g>
        </svg>
      );
    case 'arrow-down':
      return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" version="1.1" width="512" height="512" x="0" y="0" viewBox="0 0 491.996 491.996" space="preserve"><g>
          <g xmlns="http://www.w3.org/2000/svg">
            <g>
              <path d="M484.132,124.986l-16.116-16.228c-5.072-5.068-11.82-7.86-19.032-7.86c-7.208,0-13.964,2.792-19.036,7.86l-183.84,183.848    L62.056,108.554c-5.064-5.068-11.82-7.856-19.028-7.856s-13.968,2.788-19.036,7.856l-16.12,16.128    c-10.496,10.488-10.496,27.572,0,38.06l219.136,219.924c5.064,5.064,11.812,8.632,19.084,8.632h0.084    c7.212,0,13.96-3.572,19.024-8.632l218.932-219.328c5.072-5.064,7.856-12.016,7.864-19.224    C491.996,136.902,489.204,130.046,484.132,124.986z" fill="#5bc0eb" data-original="#000000" />
            </g>
            </g>
          </g>
        </svg>
      );
    case 'cross':
      return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" svgjs="http://svgjs.com/svgjs" version="1.1" width="512" height="512" x="0" y="0" viewBox="0 0 365.71733 365" space="preserve">
          <g>
            <g xmlns="http://www.w3.org/2000/svg" fill="#f44336">
              <path d="m356.339844 296.347656-286.613282-286.613281c-12.5-12.5-32.765624-12.5-45.246093 0l-15.105469 15.082031c-12.5 12.503906-12.5 32.769532 0 45.25l286.613281 286.613282c12.503907 12.5 32.769531 12.5 45.25 0l15.082031-15.082032c12.523438-12.480468 12.523438-32.75.019532-45.25zm0 0" fill="#e55934" data-original="#f44336" />
              <path d="m295.988281 9.734375-286.613281 286.613281c-12.5 12.5-12.5 32.769532 0 45.25l15.082031 15.082032c12.503907 12.5 32.769531 12.5 45.25 0l286.632813-286.59375c12.503906-12.5 12.503906-32.765626 0-45.246094l-15.082032-15.082032c-12.5-12.523437-32.765624-12.523437-45.269531-.023437zm0 0" fill="#e55934" data-original="#f44336"/>
            </g>
          </g>
        </svg>
      );
    case 'white-cross':
      return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" svgjs="http://svgjs.com/svgjs" version="1.1" width="512" height="512" viewBox="0 0 329.26933 329" space="preserve">
          <g>
            <path xmlns="http://www.w3.org/2000/svg" d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0" fill="#ffffff" data-original="#000000"/>
          </g>
        </svg>
      );
    case 'pointing-triangle':
      return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" svgjs="http://svgjs.com/svgjs" version="1.1" width="512" height="512" x="0" y="0" viewBox="0 0 512 512" style={{"enableBackground":"new 0 0 512 512"}} space="preserve">
          <g>
            <g xmlns="http://www.w3.org/2000/svg">
              <g>
                <path d="M507.521,427.394L282.655,52.617c-12.074-20.122-41.237-20.122-53.311,0L4.479,427.394    c-12.433,20.72,2.493,47.08,26.655,47.08h449.732C505.029,474.474,519.955,448.114,507.521,427.394z" fill="#5bc0eb" data-original="#000000"/>
              </g>
            </g>
          </g>
        </svg>
      );
    case 'reputation-1': 
      return (
        <svg className={className} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 65.44 65.44" style={{"enableBackground":"new 0 0 65.44 65.44"}} space="preserve">
          <g>
            <g id="group-3svg">
              <path id="path-1_21_" style={{"fill":"#EDC951"}} d="M65.44,34.88c0,16.616-13.472,30.086-30.089,30.086
                c-16.618,0-30.09-13.47-30.09-30.086S18.733,4.794,35.351,4.794C51.968,4.794,65.44,18.264,65.44,34.88z"/>
              <path id="path-2_21_" d="M45.647,23.775c0,2.01-1.63,3.639-3.64,3.639c-2.01,0-3.64-1.629-3.64-3.639s1.63-3.639,3.64-3.639
                C44.017,20.136,45.647,21.765,45.647,23.775z"/>
              <path id="path-3_21_" d="M24.717,23.775c0,2.01-1.629,3.639-3.639,3.639c-2.011,0-3.64-1.629-3.64-3.639s1.629-3.639,3.64-3.639
                C23.088,20.136,24.717,21.765,24.717,23.775z"/>
              <path id="path-4_21_" d="M19.207,50.977c-0.829,0-1.5-0.672-1.5-1.5c0-6.473,5.209-11.739,11.611-11.739h5.055
                c6.403,0,11.611,5.237,11.611,11.674c0,0.829-0.671,1.5-1.5,1.5c-0.829,0-1.5-0.671-1.5-1.5c0-4.783-3.863-8.674-8.611-8.674
                h-5.055c-4.748,0-8.611,3.92-8.611,8.739C20.707,50.305,20.036,50.977,19.207,50.977z"/>
              <path id="path-5_21_" d="M31.589,63.645C14.171,63.645,0,49.476,0,32.059C0,14.643,14.171,0.474,31.589,0.474
                c17.419,0,31.59,14.169,31.59,31.585C63.179,49.476,49.008,63.645,31.589,63.645z M31.589,3.474C15.825,3.474,3,16.297,3,32.059
                c0,15.763,12.825,28.587,28.589,28.587c15.765,0,28.59-12.824,28.59-28.587C60.179,16.297,47.354,3.474,31.589,3.474z"/>
            </g>
          </g>
        </svg>
      );
    case 'reputation-2':
      return (
        <svg className={className} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 64.5 64.5" style={{"enableBackground": "new 0 0 64.5 64.5"}} space="preserve">
          <g>
            <g id="group-10svg">
              <path id="path-1" style={{"fill":"#EDC951"}} d="M64.5,34.853c0,16.371-13.274,29.643-29.647,29.643
                c-16.374,0-29.647-13.272-29.647-29.643c0-16.372,13.273-29.644,29.647-29.644C51.226,5.209,64.5,18.481,64.5,34.853z"/>
              <path id="path-2" d="M39.43,46.669c-2.366,0-4.631-1.153-6.743-3.433c-1.706-1.842-3.586-2.802-5.589-2.852
                c-3.694-0.114-6.775,2.873-6.805,2.903c-0.591,0.579-1.54,0.569-2.119-0.02c-0.58-0.59-0.575-1.536,0.014-2.117
                c0.159-0.158,3.953-3.842,8.958-3.765c2.853,0.063,5.458,1.346,7.742,3.813c1.641,1.772,3.306,2.593,4.926,2.454
                c3.121-0.273,5.472-3.874,5.495-3.911c0.449-0.695,1.375-0.9,2.072-0.453c0.696,0.446,0.901,1.37,0.458,2.067
                c-0.127,0.199-3.149,4.869-7.744,5.284C39.873,46.659,39.651,46.669,39.43,46.669z"/>
              <path id="path-3" d="M44.998,22.984c0,1.981-1.606,3.586-3.586,3.586c-1.982,0-3.587-1.605-3.587-3.586
                c0-1.98,1.605-3.585,3.587-3.585C43.392,19.399,44.998,21.004,44.998,22.984z"/>
              <path id="path-4" d="M24.377,22.984c0,1.981-1.606,3.586-3.587,3.586s-3.586-1.605-3.586-3.586c0-1.98,1.605-3.585,3.586-3.585
                S24.377,21.004,24.377,22.984z"/>
              <path id="path-5" d="M31.147,62.29C13.972,62.29,0,48.319,0,31.147S13.972,0.004,31.147,0.004s31.148,13.971,31.148,31.143
                S48.322,62.29,31.147,62.29z M31.147,3.004C15.627,3.004,3,15.628,3,31.147s12.627,28.144,28.147,28.144
                c15.521,0,28.148-12.625,28.148-28.144S46.668,3.004,31.147,3.004z"/>
            </g>
          </g>
        </svg>
      );
    case 'reputation-3':
      return (
        <svg className={className} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 64.5 64.5" style={{"enableBackground":"new 0 0 64.5 64.5"}} space="preserve">
          <g>
            <g id="group-9svg">
              <path id="path-1_49_" style={{"fill":"#EDC951"}} d="M64.5,34.853c0,16.371-13.274,29.643-29.648,29.643
                c-16.373,0-29.646-13.272-29.646-29.643c0-16.372,13.273-29.644,29.646-29.644C51.226,5.209,64.5,18.481,64.5,34.853z"/>
              <path id="path-2_49_" d="M45.778,43.768h-28c-0.828,0-1.5-0.672-1.5-1.5c0-0.829,0.672-1.5,1.5-1.5h28c0.828,0,1.5,0.671,1.5,1.5
                C47.278,43.096,46.606,43.768,45.778,43.768z"/>
              <path id="path-3_49_" d="M44.998,22.984c0,1.981-1.607,3.586-3.587,3.586c-1.98,0-3.586-1.605-3.586-3.586
                c0-1.98,1.606-3.585,3.586-3.585C43.391,19.399,44.998,21.004,44.998,22.984z"/>
              <path id="path-4_49_" d="M24.376,22.984c0,1.981-1.606,3.586-3.586,3.586c-1.981,0-3.586-1.605-3.586-3.586
                c0-1.98,1.605-3.585,3.586-3.585C22.77,19.399,24.376,21.004,24.376,22.984z"/>
              <path id="path-5_49_" d="M31.147,62.29C13.973,62.29,0,48.319,0,31.147S13.973,0.004,31.147,0.004s31.147,13.971,31.147,31.143
                S48.321,62.29,31.147,62.29z M31.147,3.004C15.627,3.004,3,15.628,3,31.147s12.627,28.144,28.147,28.144
                c15.521,0,28.147-12.625,28.147-28.144S46.668,3.004,31.147,3.004z"/>
            </g>
          </g>
        </svg>
      );
    case 'reputation-4':
      return (
        <svg className={className} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 65.441 65.441" style={{"enableBackground":"new 0 0 65.441 65.441"}} space="preserve">
          <g>
            <g id="group-2svg">
              <path id="path-1_10_" style={{ "fill":"#EDC951" }} d="M65.441,34.881c0,16.616-13.472,30.086-30.09,30.086S5.262,51.497,5.262,34.881
                S18.733,4.795,35.351,4.795S65.441,18.265,65.441,34.881z"/>
              <path id="path-2_10_" d="M45.647,23.776c0,2.01-1.629,3.639-3.639,3.639c-2.011,0-3.641-1.629-3.641-3.639s1.63-3.639,3.641-3.639
                C44.018,20.137,45.647,21.766,45.647,23.776z"/>
              <path id="path-3_10_" d="M24.718,23.776c0,2.01-1.629,3.639-3.64,3.639c-2.01,0-3.64-1.629-3.64-3.639s1.63-3.639,3.64-3.639
                C23.089,20.137,24.718,21.766,24.718,23.776z"/>
              <path id="path-4_10_" d="M34.374,50.737h-5.055c-6.403,0-11.611-5.145-11.611-11.469c0-0.829,0.671-1.5,1.5-1.5
                c0.828,0,1.5,0.671,1.5,1.5c0,4.749,3.782,8.469,8.611,8.469h5.055c4.828,0,8.611-3.658,8.611-8.329c0-0.829,0.671-1.5,1.5-1.5
                c0.828,0,1.5,0.671,1.5,1.5C45.985,45.761,40.885,50.737,34.374,50.737z"/>
              <path id="path-5_10_" d="M31.59,63.646C14.171,63.646,0,49.477,0,32.06C0,14.644,14.171,0.475,31.59,0.475
                c17.418,0,31.59,14.169,31.59,31.585C63.18,49.477,49.008,63.646,31.59,63.646z M31.59,3.475C15.825,3.475,3,16.298,3,32.06
                c0,15.763,12.825,28.587,28.59,28.587c15.764,0,28.59-12.824,28.59-28.587C60.18,16.298,47.354,3.475,31.59,3.475z"/>
            </g>
          </g>
        </svg>
      );
    case 'reputation-5':
      return (
        <svg className={className} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 67.32 67.32" style={{"enableBackground":"new 0 0 67.32 67.32"}} space="preserve">
          <g>
            <g id="group-36svg">
              <path id="path-1_28_" style={{"fill":"#EDC951"}} d="M67.32,35.821c0,16.616-13.471,30.085-30.089,30.085S7.141,52.437,7.141,35.821
                S20.613,5.735,37.231,5.735S67.32,19.205,67.32,35.821z"/>
              <path id="path-2_28_" style={{"fill":"#E56A77"}} d="M52.896,22.015c-0.948,0-1.819,1.176-2.525,1.701
                c-0.705-0.525-1.577-1.701-2.524-1.701c-2.34,0-4.238,1.897-4.238,4.237s6.057,9.249,6.762,8.724
                c0.706,0.525,6.762-6.384,6.762-8.724S55.236,22.015,52.896,22.015z"/>
              <path id="path-3_28_" style={{"fill":"#E56A77"}} d="M28.807,22.015c-0.947,0-1.819,1.176-2.525,1.701
                c-0.705-0.525-1.577-1.701-2.524-1.701c-2.34,0-4.237,1.897-4.237,4.237s6.056,9.249,6.761,8.724
                c0.706,0.525,6.762-6.384,6.762-8.724S31.147,22.015,28.807,22.015z"/>
              <path id="path-4_28_" d="M34.373,52.227h-5.055c-6.511,0-11.611-5.001-11.611-11.386c0-0.829,0.671-1.5,1.5-1.5
                c0.828,0,1.5,0.671,1.5,1.5c0,4.703,3.782,8.387,8.611,8.387h5.055c4.909,0,8.61-3.51,8.61-8.165c0-0.829,0.672-1.5,1.501-1.5
                c0.828,0,1.5,0.671,1.5,1.5C45.984,47.323,40.883,52.227,34.373,52.227z"/>
              <path id="path-5_28_" d="M44.837,33.684c-0.038,0.001-0.072-0.001-0.108-0.003c-0.032,0.002-0.065,0.003-0.098,0.003
                c-2.212,0-8.163-7.474-8.163-10.253c0-3.163,2.574-5.737,5.737-5.737c1.05,0,1.878,0.607,2.524,1.186
                c0.647-0.579,1.475-1.186,2.525-1.186c3.163,0,5.737,2.574,5.737,5.737c0,1.735-1.78,4.31-3.274,6.163
                C46.449,33.651,45.282,33.684,44.837,33.684z M42.143,20.688c-1.447,0.006-2.675,1.234-2.675,2.743
                c0.046,1.247,3.688,5.925,5.261,7.125c1.573-1.2,5.215-5.878,5.262-7.128c0-1.506-1.228-2.734-2.737-2.734
                c-0.137,0.051-0.605,0.493-0.856,0.73c-0.271,0.255-0.532,0.496-0.773,0.675c-0.533,0.396-1.259,0.396-1.791,0
                c-0.242-0.179-0.502-0.42-0.774-0.675C42.809,21.186,42.341,20.745,42.143,20.688z"/>
              <path id="path-6_23_" d="M20.748,33.684c-0.036,0.001-0.072-0.001-0.108-0.003c-0.032,0.002-0.065,0.003-0.097,0.003
                c-2.213,0-8.164-7.474-8.164-10.253c0-3.163,2.574-5.737,5.737-5.737c1.05,0,1.878,0.607,2.524,1.186
                c0.647-0.578,1.475-1.186,2.525-1.186c3.163,0,5.737,2.574,5.737,5.737c0,1.735-1.78,4.31-3.274,6.163
                C22.36,33.651,21.193,33.684,20.748,33.684z M18.054,20.688c-1.447,0.006-2.675,1.234-2.675,2.743
                c0.046,1.247,3.688,5.925,5.261,7.125c1.574-1.2,5.216-5.878,5.262-7.128c0-1.506-1.228-2.734-2.737-2.734
                c-0.137,0.051-0.604,0.492-0.855,0.729c-0.272,0.256-0.533,0.497-0.775,0.676c-0.531,0.396-1.258,0.395-1.79,0
                c-0.241-0.179-0.502-0.42-0.774-0.675C18.72,21.186,18.253,20.745,18.054,20.688z"/>
              <path id="path-7_22_" d="M31.589,64.586C14.171,64.586,0,50.417,0,33C0,15.584,14.171,1.414,31.589,1.414S63.178,15.584,63.178,33
                C63.178,50.417,49.007,64.586,31.589,64.586z M31.589,4.414C15.825,4.414,3,17.238,3,33c0,15.763,12.825,28.586,28.589,28.586
                S60.178,48.763,60.178,33C60.178,17.238,47.353,4.414,31.589,4.414z"/>
            </g>
          </g>
        </svg>
      );
    case 'more-options':
      return (
        <svg className={className} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          width="375.636px" height="375.635px" viewBox="0 0 375.636 375.635" style={{"enableBackground": "new 0 0 375.636 375.635"}}
          space="preserve">
          <g>
            <g>
              <g>
                <path d="M41.013,228.825C18.396,228.825,0,210.438,0,187.818c0-22.608,18.396-41.007,41.013-41.007
                  c22.617,0,41.013,18.398,41.013,41.007C82.025,210.438,63.63,228.825,41.013,228.825z"/>
              </g>
              <g>
                <path d="M185.513,228.825c-22.617,0-41.013-18.387-41.013-41.007c0-22.608,18.396-41.007,41.013-41.007
                  c22.613,0,41.013,18.398,41.013,41.007C226.525,210.438,208.126,228.825,185.513,228.825z"/>
              </g>
              <g>
                <path d="M334.623,228.825c-22.613,0-41.013-18.387-41.013-41.007c0-22.608,18.399-41.007,41.013-41.007
                  c22.614,0,41.013,18.398,41.013,41.007C375.636,210.438,357.237,228.825,334.623,228.825z"/>
              </g>
            </g>
          </g>
        </svg>
    );
    case 'default-image':
      return (
        <svg className={className} enableBackground="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg">
          <g>
            <path d="m502 183.622h-49.71v-49.7c0-5.522-4.478-10-10-10h-49.707v-49.713c0-5.522-4.478-10-10-10h-141.292c-5.522 0-10 4.478-10 10s4.478 10 10 10h131.292v152.079l-72.116-68.342c-3.857-3.654-9.901-3.656-13.757 0l-95.544 90.535-60.279-59.363c-3.893-3.834-10.141-3.834-14.033 0l-96.854 95.381v-210.29h131.291c5.523 0 10-4.478 10-10s-4.477-10-10-10h-141.291c-5.523 0-10 4.478-10 10v244.168c0 5.522 4.477 10 10 10h49.71v49.705c0 5.522 4.478 10 10 10h49.71v49.71c0 5.522 4.478 10 10 10h372.58c5.522 0 10-4.478 10-10v-244.17c0-5.523-4.478-10-10-10zm-208.412 5.358 78.995 74.862v44.534h-204.998zm-169.718 31.297 52.77 51.967-38.132 36.132h-104.097zm-44.16 108.099h302.873c5.522 0 10-4.478 10-10v-174.455h39.707v224.16h-352.58zm412.29 99.416h-352.58v-39.71h302.87c5.522 0 10-4.478 10-10v-174.46h39.71z"/><circle cx="196.291" cy="74.209" r="10"/><path d="m197.994 195.979c21.976 0 39.854-17.878 39.854-39.854s-17.878-39.854-39.854-39.854c-21.975 0-39.854 17.879-39.854 39.854s17.879 39.854 39.854 39.854zm0-59.708c10.947 0 19.854 8.906 19.854 19.855 0 10.947-8.906 19.854-19.854 19.854s-19.854-8.906-19.854-19.854c0-10.949 8.906-19.855 19.854-19.855z"/>
          </g>
        </svg>
      )
    default:
      return null;
  }
};

export default Icons;
