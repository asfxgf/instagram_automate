/* Quote I want to display :
    Hi ! I'm Quentin's Instagram Robot.
    Last time I saw Quentin, he was in "google_location = Paris".
    Here is some real time information about Paris :
    "icon" : "description"
    Température : "34" °C with "80" % humidity
    Wind speed : "70" km/h
    The sunset will be at ... PM
    I just used "Quentin's egocentric API" which told me that Quentin is :
    "A sugar addict",
    He is rated "600" on chess.com (Blitz category) and "Silver 2"  on League of Legends,
    and he likes to talk about : "L'audacieux jeune homme au trapèze volant".
*/

"use strict";

//SETUP PART
var date1 = new Date("07/26/2022"); // Insert the date of the day you want to start the program

const axios = require('axios');
var express = require("express");
var app = express();
var Instagram = require("instagram-web-api");
var FileCookieStore = require("tough-cookie-filestore2");
var cron = require("node-cron");
var WordPOS = require("wordpos");
var wordpos = new WordPOS();
var fs = require("fs");
require("dotenv").config();
var port = process.env.PORT || 4000;
const fetch = require('node-fetch');
var emoji = require('node-emoji');
var moment = require('moment');
var cloudinary = require('cloudinary');
var fs = require('fs');
var request = require('request');
var async = require("async");
var Twit = require('twit');



var city = "";
var coord_lon = "";
var coord_lat = "";
var weather_id = "";
var main = "";
var description = "";
var icon = "";
var kelvin = "";
var humidity = "";
var wind_speed = "";
var formattedTimeForSunset = "";
var visibility = "";
var icon_emoji = null;
var celcius = 0;
var message1 = "test";
var chess_current_score = 0;
var chess_best_score = 0;
var character = "";
var culture = "";
var picture_url = "";
var id_of_the_day = 1;
var twitter_message = "test_twitter_message";
var today = WithoutTime(new Date());


var T = new Twit({
  consumer_key:         `${process.env.TWITTER_CONSUMER_KEY}`,
  consumer_secret:      `${process.env.TWITTER_CONSUMER_SECRET}`,
  access_token:         `${process.env.TWITTER_ACCESS_TOKEN}`,
  access_token_secret:  `${process.env.TWITTER_ACCESS_TOKEN_SECRET}`,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
});

function tweeted(err, data, response) {
    if (err) {
        console.log("Twitter post went wrong, for reason : " + err.allErrors[0].message);
    } else {
        console.log("New Tweet posted");
    }
}

async function tweetIt() {
    var tweet = {
        status: 'publication 13'
    }
    await T.post('statuses/update', tweet, tweeted);
}

async function publishTwitter() {
  const tweet_post = await tweetIt();
}

async function publishTwitterWithMedia() {
  const tweet_post_with_media = await tweetItWithMedia();
}

async function tweetItWithMedia() {
  /*
    console.log("debut twitterwithmedia...");

    var b64content = await fs.readFileSync('./images.jpg', { encoding: 'base64' })
    // first we must post the media to Twitter

    await T.post('media/upload', { media_data: b64content }, function (err, data, response) {
        // now we can assign alt text to the media, for use by screen readers and
        // other text-based presentations and interpreters
        var mediaIdStr = data.media_id_string;
        var altText = "Image Downloaded by Quentin's personal API and posted via Quentin DELEGLISE Twitter's bot.";
        var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }
        T.post('media/metadata/create', meta_params, function (err, data, response) {
            if (!err) {
                // now we can reference the media and post a tweet (media will attach to the tweet)
                //var params = { status: `This is great coding for asfxgf ! #quentin test dev`, media_ids: [mediaIdStr] } // static
                var params = { status: twitter_message, media_ids: [mediaIdStr] } // dynamic
                T.post('statuses/update', params, function (err, data, response) {
                    console.log(data.id);
                    console.log("fin twitterwithmedia !");
                })
            } else {
                console.log(err);
            }
        })
    })
    */
}

function SetIdOfTheDay() {
    today = WithoutTime(new Date());
    var Difference_In_Time = today.getTime() - date1.getTime();
    // To calculate the no. of days between two dates
    id_of_the_day = Difference_In_Time / (1000 * 3600 * 24) + 1; // + 1 to start at ID 1
    //To display the final no. of days (result)
    console.log("L'id du jour est : " + id_of_the_day);
}

function WithoutTime(dateTime) {
    var date = new Date(dateTime.getTime());
    date.setHours(0, 0, 0, 0);
    return date;
}

const datas = async () => {
    try {
        sendGetRequests().then(() => {
            publishTwitterWithMedia();
        })
    } catch (err){
        console.error(err);
    }
}


function streamWriter(stream, filename) {
  return new Promise((resolve) => {
    const write = fs.createWriteStream(filename)
    write.on('finish', () => {
      resolve()
    })
    stream.data.pipe(write)
  })
}

async function download(uri, filename) {
  const imageStream = await axios.get(uri, { responseType: 'stream' })
  await streamWriter(imageStream, filename)
}

async function rundl() {
  //image_url = 'https://media.istockphoto.com/photos/recreational-vehicle-driving-on-autumn-highway-in-beautiful-mountains-picture-id1253960547';
  await download(picture_url, './images.jpg')
}


const sendGetRequests = async () => {
    try {
        const resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=48.85845478413813&lon=2.294438382732459&appid=${process.env.OPENWEATHER_API}`);
        const resp2 = await axios.get(`https://api.chess.com/pub/player/asfxgf/stats`);
        let axios_config = {
            headers: {
                'X-User-Email': `${process.env.INSTAGRAM_APP_API_EMAIL}`,
                'X-User-Token': `${process.env.INSTAGRAM_APP_API_TOKEN}`,
                'Content-Type': 'application/json'
            },
            params: {
            },
        }
        //const resp3 = await axios.get(`https://instagram-personal-api.herokuapp.com/api/v1/candidates/${id_of_the_day}`, axios_config);
        const resp3 = await axios.get(`https://quentin-instagram-api.osc-fr1.scalingo.io/api/v1/candidates/${id_of_the_day}`, axios_config);
        //console.log(resp.data);
        //console.log(resp2.data);
        //console.log(resp3.data);
        character = resp3.data.character;
        culture = resp3.data.culture;
        picture_url = resp3.data.picture_url;
        chess_current_score = resp2.data.chess_blitz.last.rating;
        chess_best_score = resp2.data.chess_blitz.best.rating;
        city = "Paris";
        coord_lon = resp.data.coord.lon;
        coord_lat = resp.data.coord.lat;
        weather_id = resp.data.weather[0].id;
        main = resp.data.weather[0].main;
        description = resp.data.weather[0].description;
        icon = resp.data.weather[0].icon;
        kelvin = Math.round(resp.data.main.feels_like);
        celcius = Math.round(kelvin - 273.15);
        humidity = resp.data.main.humidity;
        wind_speed = Math.round(resp.data.wind.speed * 3.6);
        visibility = resp.data.visibility;
        let unix_timestamp = resp.data.sys.sunset;
        // Create a new JavaScript Date object based on the timestamp
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        var date = new Date(unix_timestamp * 1000);
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        // Seconds part from the timestamp
        var seconds = "0" + date.getSeconds();
        // Will display time in 10:30:23 format
        formattedTimeForSunset = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        switch (icon) {
            case '01d':
            case '01n':
                icon_emoji = emoji.emojify(':sunny:');
                break;
            case '02d':
            case '02n':
                icon_emoji = emoji.emojify(':partly_sunny:');
                break;
            case '03d':
            case '03n':
                icon_emoji = emoji.emojify(':cloud:');
                break;
            case '04d':
            case '04n':
                icon_emoji = emoji.emojify(':cloud:');
                break;
            case '09d':
            case '09n':
                icon_emoji = emoji.emojify(':umbrella:');
                break;
            case '10d':
            case '10n':
                icon_emoji = emoji.emojify(':umbrella:');
                break;
            case '11d':
            case '11n':
                icon_emoji = emoji.emojify(':zap:');
                break;
            case '13d':
            case '13n':
                icon_emoji = emoji.emojify(':snowflake:');
                break;
            case '50d':
            case '50n':
                icon_emoji = emoji.emojify(':foggy:');
                break;
            default:
                icon_emoji = emoji.emojify(':heart:');
        }
        /*
        var download = async function(uri, filename, callback){
            request.head(uri, function(err, res, body){
            console.log('content-type:', res.headers['content-type']);
            console.log('content-length:', res.headers['content-length']);
            request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
            });
        };
        await download(picture_url, './images.jpg', function(){
        console.log('download done');
        });
        */

        /*
        function download (uri, filename, callback){
            request.head(uri, function(err, res, body){
                console.log('content-type:', res.headers['content-type']);
                console.log('content-length:', res.headers['content-length']);
                request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
            });
        }

        async function runDownload() {
            image_url = "https://res.cloudinary.com/asfxgf/image/upload/v1644796579/vision_x9zea3.jpg"
            console.log("1");
            await download(image_url, './images.jpg', function(){
                console.log('done');
                console.log("2");
            });
        };
        runDownload();
        */

        console.log('debut dl')
        await rundl().then(() => {
          console.log('fin dl')
        })
        message1 = emoji.emojify(':robot_face:') + "Hi ! I'm Quentin's Instagram Robot." + emoji.emojify(':robot_face:') + "\n" + emoji.emojify(':world_map:') + " Last time I saw Quentin, he was in " + city + ".\nAbout " + city + " right now :\n" + icon_emoji + " " + description + ".\n" + emoji.emojify(':thermometer:') + " Felt temperature : " + celcius + "°C (" + kelvin + "K) with " + humidity + "% humidity.\n" + emoji.emojify(":dash:") + " Wind speed : " + wind_speed + "km/h.\n" + emoji.emojify(':sunrise:') + " Sunset will be at " + formattedTimeForSunset + " " + emoji.emojify(':clock1:') + ".\nToday, Quentin's personal API told me that Quentin :\n" + emoji.emojify(':chess_pawn:') + "Is rated " + chess_current_score + " on chess.com (Blitz category)\n" + emoji.emojify(':sweat_smile:') + character + ".\n" + emoji.emojify(':heart:') + " Loves to talk about : " + culture + ".";
        await console.log("message1");
        twitter_message = "🤖Hi, i'm Quentin's free bot !🤖\nHis API told me that Quentin :\n♟ Is rated "+ chess_current_score + " on chess.com(blitz) !\n💡" + character + ".\n❤ Likes to talk about : " + culture + ".\n #nocode #lowcode";
        
        if (twitter_message.length < 280) {
            console.log("The twit get " + twitter_message.length + " characters.");
        } else {
            twitter_message = "Today's news are too huge for twitter (280 characters is not enough for my incredible life), check out my Instagram : @quentintin1\nhttps://www.instagram.com/quentintin1/";
            console.log("The twit got too much caracters (" + twitter_message.length + ") so we changed the text");
        }
        //console.log(message1);
        //console.log(twitter_message);
        console.log("fin get request, return message");
        return message1;
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

//cron.schedule("0 13 * * *", function () { return __awaiter(void 0, void 0, void 0, function () { --> Le bon cron a remettre
cron.schedule("* * * * *", function () { return __awaiter(void 0, void 0, void 0, function () {
    console.log('debut cron...');

    SetIdOfTheDay();
    datas();

    var cookieStore, client, instagramPostFunction, loginFunction;
    return __generator(this, function (_a) {
        cookieStore = new FileCookieStore("./cookies.json");
        client = new Instagram({
            username: process.env.INSTAGRAM_USERNAME,
            password: process.env.INSTAGRAM_PASSWORD,
            cookieStore: cookieStore,
        }, {
            language: "en-US",
        });
        instagramPostFunction = function (currentClient) {
            var triesCounter = 0;
            while (triesCounter < 3) {
                console.log("Try #" + triesCounter);
                try {
                    console.log("test");
                    wordpos.randAdjective({ count: 10 }, function (res) {
                        var resultArr = res.filter(function (item) {
                            // Must contain at least one vowel
                            return /[aeiouy]/i.test(item) &&
                                // If digits present, allow only digits with letters on both sides
                                (/\d/.test(item)
                                    ? /(?<=[a-zA-Z])\d+(?=[a-zA-Z])/i.test(item)
                                    : true) &&
                                // No words with two or more dots
                                !/^(?:[^.]*[.]){2,}[^.]*$/.test(item) &&
                                // No lower-case Roman numerals
                                !/^(?=[mdclxvi])m*(c[md]|d?c{0,3})(x[cl]|l?x{0,3})(i[xv]|v?i{0,3})$/i.test(item) &&
                                // No spelled-out numbers (other than one or ten)
                                !/(two|three|four|five|six|seven|eight|nine|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|thousand)/i.test(item);
                        });
                        console.log("test2");
                        var result = [""];
                        if (resultArr.length > 0) {
                            console.log("resltArr")
                            result = resultArr;
                        }
                        else {
                            console.log("result = res")
                            result = res;
                        }
                        if (result[0]) {
                            console.log("result 0");
                            var resultWord = result[0].replace(/_/g, " ");
                            var newDesc_1 = resultWord.slice(result[0].length - 3) === "ing"
                                ? resultWord
                                : "feeling " + resultWord;
                            wordpos.lookupAdjective(result[0], function (res) { return __awaiter(void 0, void 0, void 0, function () {
                                var definition, firstWordDef, secondWordDef, newDef, newCaption;
                                console.log("test3")
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            console.log("case 0")
                                            /*
                                            definition = res[0].def;
                                            firstWordDef = definition.split(" ")[0];
                                            secondWordDef = definition.split(" ")[1];
                                            newDef = (firstWordDef
                                                ? firstWordDef.slice(firstWordDef.length - 3) === "ing"
                                                : "") ||
                                                (secondWordDef
                                                    ? secondWordDef.slice(secondWordDef.length - 3) === "ing"
                                                    : "") ||
                                                firstWordDef === "of" ||
                                                firstWordDef === "in" ||
                                                firstWordDef === "most" ||
                                                (firstWordDef
                                                    ? firstWordDef.slice(firstWordDef.length - 2) === "ed"
                                                    : "") ||
                                                (firstWordDef
                                                    ? firstWordDef.slice(firstWordDef.length - 2) === "en"
                                                    : "")
                                                ? "is " +
                                                    (firstWordDef === "most" ? "the " : "") +
                                                    definition
                                                : "is feeling " + definition;
                                            */
                                            /*
                                            newCaption = "Pixel Mike is " + newDesc_1 + " today.\nIn other words, he " + newDef
                                                .replace(/\w*(?<! of )being/g, "")
                                                .replace(/\s{2,}/g, " ")
                                                .replace("your", "his")
                                                .replace("you", "he")
                                                .replace(/is having(?! or)/g, "has")
                                                .trim() + ".\nAre you " + newDesc_1 + "?\nLet him know in the comments!\n#" + result[0].replace(/_|'|-/g, "") + " #PixelMike";
                                            */
                                            newCaption = message1;
                                            console.log("message 1 : " + message1);
                                            if (!currentClient) return [3 /*break*/, 2];
                                            console.log("message 2")
                                            return [4 /*yield*/, currentClient.uploadPhoto({
                                                    photo: "./images.jpg",
                                                    //photo: "./images/google.png",
                                                    caption: newCaption,
                                                    post: "feed",
                                                }).then(function (res) { return __awaiter(void 0, void 0, void 0, function () {
                                                    var media;
                                                    console.log(res);
                                                    console.log("then function...");
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                media = res.media;
                                                                console.log("https://www.instagram.com/p/" + media.code + "/");
                                                                return [4 /*yield*/, currentClient.addComment({
                                                                        mediaId: media.id,
                                                                        text: "#nocode #lowcode #freelance #tech #paris #ruby",
                                                                        //text: "nothing to say",
                                                                    })];
                                                            case 1:
                                                                _a.sent();
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                }); })];
                                        case 1: return [2 /*return*/, _a.sent()];
                                        case 2:
                                            console.log("Instagram client does not exist!");
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                        }
                        else {
                            throw "No adjective was supplied to wordpos!";
                        }
                    });
                    break;
                }
                catch (err) {
                    console.log(err);
                }
                triesCounter++;
            }
        };
        loginFunction = function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Logging in...");
                        return [4 /*yield*/, client
                                .login()
                                .then(function () {
                                console.log("Login successful!");
                                instagramPostFunction(client);
                            }).catch(function (err) { return __awaiter(void 0, void 0, void 0, function () {
                                var newCookieStore, newClient, delayedLoginFunction;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            console.log("Login failed!");
                                            console.log(err);
                                            console.log("Deleting cookies, waiting 2 minutes, then logging in again and setting new cookie store");
                                            fs.unlinkSync("./cookies.json");
                                            newCookieStore = new FileCookieStore("./cookies.json");
                                            newClient = new Instagram({
                                                username: process.env.INSTAGRAM_USERNAME,
                                                password: process.env.INSTAGRAM_PASSWORD,
                                                cookieStore: newCookieStore,
                                            }, {
                                                language: "en-US",
                                            });
                                            delayedLoginFunction = function (timeout) { return __awaiter(void 0, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                                                        return __generator(this, function (_a) {
                                                            switch (_a.label) {
                                                                case 0:
                                                                    console.log("Logging in again.");
                                                                    return [4 /*yield*/, newClient
                                                                            .login()
                                                                            .then(function () {
                                                                            console.log("Login successful on the second try!");
                                                                            instagramPostFunction(newClient);
                                                                        })
                                                                            .catch(function (err) {
                                                                            console.log("Login failed again!");
                                                                            console.log(err);
                                                                        })];
                                                                case 1:
                                                                    _a.sent();
                                                                    return [2 /*return*/];
                                                            }
                                                        });
                                                    }); }, timeout);
                                                    return [2 /*return*/];
                                                });
                                            }); };
                                            // Wait 2 minutes before trying to log in again
                                            return [4 /*yield*/, delayedLoginFunction(120000)];
                                        case 1:
                                            // Wait 2 minutes before trying to log in again
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        loginFunction();
        return [2 /*return*/];
    });
}); });

app.listen(port, function () {
    console.log("Listening on port " + port + "...");
});