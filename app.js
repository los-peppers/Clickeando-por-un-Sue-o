var express = require('express');
var app = express();
var cors = require('cors');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var cassandra = require('cassandra-driver');

// Leaderboards
var recentLeaderboard = [];
var globalLeaderboard = [];

// Cassandra client
var cassandraClient = new cassandra.Client({
  contactPoints: ['localhost'],
  keyspace: 'clickathon'
});

const insertQuery = 'INSERT INTO points (username, event_time, points) VALUES (?, ?, ?) USING TTL 60;';
const recentQuery = 'SELECT username, event_time, points FROM points WHERE event_time > ? ALLOW FILTERING;';
const globalQuery = 'SELECT username, event_time, points FROM points;';

// Express app
app.use(cors());

app.get('/leaderboards', function (req, res) {
  res.status(200).send({
    recent: recentLeaderboard,
    global: globalLeaderboard
  });
});

// New connection
var connectionUsernameMap = {}
io.on('connection', function (socket) {
  // Set the username
  socket.on('set-username', function(username) {
    connectionUsernameMap[socket.id] = username
  });
  // Socket disconnection
  socket.on('disconnect', function() {
    delete connectionUsernameMap[socket.id];
  });
  // Point insertion
  socket.on('send-points', function(points) {
    username = connectionUsernameMap[socket.id];
    eventTime = Date.now();
    cassandraClient.execute(insertQuery, [username, eventTime, points], { prepare : true }, function (err) {
      if (err != null) {
        console.error(err);
      }
    });
  });
});

// Serve static content
app.use(express.static('web/dist'));

// Update leaderboards periodically
function startLeaderBoardsUpdates() {
  setInterval(function () {
    cassandraClient.execute(globalQuery, [], function (err, res) {
      if (err != null) {
        return console.error(err);
      }
      globalLeaderboard = parseLeaderboardData(res.rows);
    });
    var referenceTime = new Date();
    referenceTime.setSeconds(referenceTime.getSeconds() - 5);
    cassandraClient.execute(recentQuery, [referenceTime], { prepare : true }, function (err, res) {
      if (err != null) {
        return console.error(err);
      }
      recentLeaderboard = parseLeaderboardData(res.rows);
    });
  }, 1000);
}

// Parse database rows and create leaderboards.
function parseLeaderboardData(rows) {
  var leaderboardDict = {};
  rows.forEach(function (row) {
    leaderboardDict[row.username] = leaderboardDict[row.username] || 0;
    leaderboardDict[row.username] = leaderboardDict[row.username] + row.points;
  });
  var leaderboard = [];
  for (var key in leaderboardDict) {
    leaderboard.push({username: key, points: leaderboardDict[key]});
  }
  return leaderboard.sort(function (entryA, entryB) {
    // Use descending order
    return entryB.points - entryA.points;
  });
}

// Start HTTP server
http.listen(3000, function() {
  console.log('Listening on port 3000');
  startLeaderBoardsUpdates();
})