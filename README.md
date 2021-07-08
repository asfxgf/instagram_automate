[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/amamenko/inky-doodle">
    <img src="https://i.imgur.com/KXPwAad.png" alt="Logo" width="500"  />
  </a>
  
  <br/>
  <br/>
  
  <img src="./pixel_mike.jpg" width="150" />

  <h3 align="center">Daily Pixel Mike</h3>

  <p align="center">
    Automated Daily Instagram Posts with Node.js, Express, and TypeScript
    <br />
    <br />
    <a href="https://github.com/amamenko/daily-pixel-mike/issues">Report Issue</a> 
    ·
    <a href="https://www.instagram.com/dailypixelmike/">Follow @dailypixelmike</a> 
  </p>
</p>

## Overview

This project is an [Express](https://expressjs.com) server that posts the same locally-stored picture of Pixel [Mike Wazowski](https://pixar.fandom.com/wiki/Mike_Wazowski) to the [@dailypixelmike](https://www.instagram.com/dailypixelmike/) Instagram page every day at 12 PM Eastern Time via [node-cron](https://www.npmjs.com/package/node-cron) and [instagram-web-api](https://www.npmjs.com/package/instagram-web-api). 

Every post includes a custom caption that includes Pixel Mike's "feeling" of the day. This "feeling" is a random adjective or adverb generated by [wordpos](https://www.npmjs.com/package/wordpos), which pulls lexicographic data from [WordNet online](http://wordnetweb.princeton.edu/perl/webwn). Each caption also includes a definition for the adjective or adverb, which is also provided by [wordpos](https://www.npmjs.com/package/wordpos) and parsed to make a complete sentence. Additional hashtags are also included as an automated comment on each Instagram post.

The server initially logs in to Instagram with a username and password. It then persists the authenticated cookies in a cookie store via [tough-cookie-filestore2](https://www.npmjs.com/package/tough-cookie-filestore2) for future use. The server is deployed to [Heroku](https://www.heroku.com) and the Heroku dyno kept awake with [UptimeRobot](https://uptimerobot.com/).

## Local Development

To set up this project locally, you can follow the steps below.

### Prerequisites

You will need to have the following software installed:

- npm
- Git
- Node.js

### Installation

1. Create your own [Instagram](https://www.instagram.com/) account.
2. Clone the Github repository.
   ```sh
   git clone https://github.com/amamenko/daily-pixel-mike.git
   ```
3. Install all server-side NPM packages.
   ```sh
   npm install
   ```
4. Add your server-side environment variables.
   ```JS
   INSTAGRAM_USERNAME=YOUR INSTAGRAM USERNAME
   INSTAGRAM_PASSWORD=YOUR INSTAGRAM PASSWORD 
   ```  
5. Start the local server.
   ```JS
   npm start
   ``` 

<!-- CONTRIBUTING -->

## Contributing

Contributions are welcome!

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/MyFeature`).
3. Commit your changes (`git commit -m 'Add my feature'`).
4. Push to the branch (`git push origin feature/MyFeature`).
5. Open a pull request.

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<!-- CONTACT -->

## Contact

Avraham (Avi) Mamenko - avimamenko@gmail.com

Project Link: [https://github.com/amamenko/daily-pixel-mike](https://github.com/amamenko/daily-pixel-mike)

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

- Alex Jaloza 
- [node-cron](https://www.npmjs.com/package/node-cron)
- [instagram-web-api](https://www.npmjs.com/package/instagram-web-api) 
- [wordpos](https://www.npmjs.com/package/wordpos)
- [Heroku](https://www.heroku.com) 
- [UptimeRobot](https://uptimerobot.com/)
- [Best-README-Template](https://github.com/othneildrew/Best-README-Template)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/amamenko/daily-pixel-mike/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/avrahammamenko
