var user1 = {
    userName: '@elonmusk',
    displayName: 'Elon Musk',
    joinedDate: 'June 2009',
    followingCount: 103,
    followerCount: 47900000,
    avatarURL: 'assets/elonmusk.jpg',
    coverPhotoURL: 'assets/elonmusk-cover.jpeg',
    tweets: [
        {
            text: 'I admit to judging books by their cover',
            timestamp: '2/10/2021 00:01:20'
        },
        {
            text: 'Starship to the moon',
            timestamp: '2/09/2021 18:37:12'
        },
        {
            text: 'Out on launch pad, engine swap underway',
            timestamp: '2/09/2021 12:11:51'
        }
    ]
};

var user2 = {
    userName: '@BillGates',
    displayName: 'Bill Gates',
    joinedDate: 'June 2009',
    followingCount: 274,
    followerCount: 53800000,
    avatarURL: 'assets/billgates.jpg',
    coverPhotoURL: 'assets/billgates-cover.jpeg',
    tweets: [
        {
            text: 'Everybody asks, how is the next Windows coming along? But nobody asks how is Bill? :/',
            timestamp: '2/10/2021 00:01:20'
        },
        {
            text: 'Should I start tweeting memes? Let me know in a comment.',
            timestamp: '2/09/2021 18:37:12'
        },
        {
            text: 'In 2020, I read a book every hour.',
            timestamp: '2/09/2021 12:11:51'
        }
    ]
};


// handling dynamic data
const userData = user1;

// Render user display name
const usernameElements = document.querySelectorAll('.user-display-name');

for (let element of usernameElements) {
    element.innerHTML = userData.displayName;
}

// Render # of tweets
const tweetCountPlaceholder = document.querySelector('header .flex-col')
const tweetCount = `<h3>${userData.tweets.length} Tweets</h3>`;
tweetCountPlaceholder.innerHTML += tweetCount;

// Render Banner Image
const banner = document.getElementById('banner');
banner.style.backgroundImage = `url(${userData.coverPhotoURL})`;


// Render Join Date
document.getElementById('join-date').innerHTML = `Joined ${userData.joinedDate}`;

// Render Follow Stats
const followStats = document.querySelectorAll('.follow-stats');
const [following, followers] = [followStats[0], followStats[1]];
following.innerHTML = nFormatter(userData.followingCount);
followers.innerHTML = nFormatter(userData.followerCount);

// Render Tweet(s)
const tweetContainer = document.createElement('div');
tweetContainer.classList.add('tweet')

const renderTweet = (tweetObj) => {
    const commentCount = Math.floor(Math.random() * 100000)
    const retweetCount = Math.floor(Math.random() * 10000)
    const likeCount = Math.floor(Math.random() * 100000)

    const currentTweet = document.createElement('div');
    currentTweet.classList.add('tweet');
    currentTweet.innerHTML = `
        <div class="first-row flex-row">
        <div class="profile-div"></div>
        <div class="flex-col">
          <div class="flex-row top-row">
            <h3 class="user-display-name"></h3>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/512px-Twitter_Verified_Badge.svg.png"
              alt="" class="verified-icon">
            <h3 class='usertag'>${userData.userName}</h3>
            <h3>${calcTweetedDifference(tweetObj.timestamp)}</h3>
            <div class="ellipses">
              <div class="dot dot1"></div>
              <div class="dot dot2"></div>
              <div class="dot dot3"></div>
            </div>
          </div>
          <p class="tweet-text">
            ${tweetObj.text}
          </p>
        </div>
        </div>
        <div class="interactions">
        <ul>
          <li><img src="./assets/icons8-speech-32.png" class="chat icon">${nFormatter(commentCount)}</li>
          <li><img src="./assets/icons8-retweet-32.png" class="retweet icon">${nFormatter(retweetCount)}</li>
          <li><img class="like icon" src="./assets/icons8-favorite-30.png" />${nFormatter(likeCount)}</li>
          <li><img class="share icon" src="./assets/icons8-share-rounded-30.png" /></li>
        </ul>
        </div>
        `;
    return currentTweet;
}

const feedSection = document.querySelector('section.feed');

userData.tweets.map(tweet => {
    feedSection.appendChild(renderTweet(tweet));
})

// Render User @Tag
const usertagElements = document.querySelectorAll('.usertag');

for (let element of usertagElements) {
    element.innerHTML = userData.userName;
}

// Render Avatar
const avatarElements = document.querySelectorAll('.profile-div');
for (let element of avatarElements) {
    element.style.backgroundImage = `url(${userData.avatarURL})`;
}


function nFormatter(num) {
    const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "k" },
        { value: 1e6, symbol: "M" },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function (item) {
        return num >= item.value;
    });
    return item ? (num / item.value).toFixed(1).replace(rx, "$1") + item.symbol : "0";
}

function calcTweetedDifference(date) {
    return Math.round((Date.now() - new Date('2/10/2021')) / (1000 * 3600 * 24)) + 'd'
}