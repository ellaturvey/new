
    document.addEventListener('DOMContentLoaded', () => {
        const thumbnail = document.getElementById('thumbnail'); // Clickable image
        const vidPlayer = document.getElementById('vidPlayer'); // Video container
        const closeButton = vidPlayer.querySelector('span'); // Close button
        const video = vidPlayer.querySelector('video');
        const phaserGames = document.getElementById('phaserGames');
        const closeGame = phaserGames.querySelector('span')
        const myVid = document.getElementById('myVideo')
        
    
        // play by clicking thumbnail
        thumbnail.onclick = () => {
            thumbnail.style.display = 'none';
            vidPlayer.style.display = 'block'; // Show video
            video.load();

            if (mainContainer.requestFullscreen) {
                mainContainer.requestFullscreen();
            } else if (mainContainer.mozRequestFullScreen) {
                mainContainer.mozRequestFullScreen();
            } else if (mainContainer.webkitRequestFullscreen) {
                mainContainer.webkitRequestFullscreen();
            } else if (mainContainer.msRequestFullscreen) {
                mainContainer.msRequestFullscreen();
            }
        };
            video.addEventListener("click", () => {
        if (video.muted) {
            video.muted = false; // Unmute when tapped
            video.volume = 1.0; // Set volume to full
        }
    });
    
        // Close the video when clicking the close button
        closeButton.onclick = () => {

    vidPlayer.style.display = "none"; // Hide everything
            video.pause(); // Stop video
            thumbnail.style.display = 'block';

            // Exit fullscreen mode
        //https://www.w3schools.com/jsref/met_element_exitfullscreen.asp
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari, Opera
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
    }
};

//https://www.youtube.com/watch?v=R8rmfD9Y5-c arrays
            const notification = [
                { notif: document.getElementById('momNotif'), time: 5, game: 'games/breakout/breakoutConfig.js' },
                { notif: document.getElementById('samNotif'), time: 15, game: 'games/snake/snakeConfig.js' },
                { notif: document.getElementById('batteryNotif'), time: 25, game: 'games/chasing/chasingConfig.js' },
                { notif: document.getElementById('blockzarNotif'), time: 35, game: 'games/jump/jumpConfig.js' },
                { notif: document.getElementById('finalNotif'), time: 45, game: 'games/quiz/quizConfig.js' }
            ];
            
            let currentGame = null;
          //  https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/timeupdate_event
            video.addEventListener('timeupdate', () => {
                notification.forEach(({ notif, time }) => { //pulling image to display and time to be displayed
                    if (Math.floor(video.currentTime) === time) {  //checking time matches current video time
                       notif.style.display = 'block'; // show notification
                    //removing notification after 7 seconds 
                    //https://www.youtube.com/watch?v=Bzdtt0zh2fI
                      setTimeout(()=> {
                        notif.style.display = 'none';
                      }, 7000);
                    };
                });
            });
        
            // start game - click notification
            notification.forEach(({ notif, game }) => {
                notif.addEventListener('click', () => {
                    video.pause(); //pause video so user does not miss anything. will resume after game
                    notif.style.display = 'none'; // remove the clicked alert
                    loadGame(game); 
                });
            });
        
            //dynamic script load to pull game configs
            function loadGame(gameSrc) {
                phaserGames.style.display = 'block'
        

        
                document.body.querySelectorAll('script[data-game]').forEach(script => script.remove());
        
                const script = document.createElement('script');
                script.src = gameSrc;
                script.type = "module";
                script.setAttribute('data-game', 'true');
        
                script.onload = () => console.log(`Loaded game: ${gameSrc}`);
                script.onerror = () => console.error(`Error loading game: ${gameSrc}`);
        
                document.body.appendChild(script);
            }
        
            // using quit to close game 
                closeGame.onclick = () => {
                phaserGames.style.display = 'none' 

                const lastGame = phaserGames.querySelector('canvas'); //selecting phaser canvas attribute
                 if (lastGame) { //keeps quit sign on screen
                lastGame.remove();
        }
                video.play(); //resuming the video
            };
        });        

    
    
    // document.addEventListener('DOMContentLoaded', function () {
    
    // const vidPlayer = document.getElementById('vidPlayer');
    
    // const phaserGames = document.getElementById('phaserGames');
    // const returnToVideoButton = document.getElementById('returnToVideo');
    // const gameContainer = document.getElementById('game');
    
    // let currentGame = null;
    // let gameStartTime = 0;
    // let totalGameTime = 0;

    // const gameConfigs = {
    //     0: "games/breakout/breakoutConfig.js",
    //     1: "games/snake/snakeConfig.js",
    //     2: "games/chasing/chasingConfig.js",
    //     3: "games/jump/jumpConfig.js",
    //     4: "games/quiz/quizConfig.js"
    // };



//     const notifications = [
//         document.getElementById('momNotif'),
//         document.getElementById('batteryNotif'),
//         document.getElementById('blockzarNotif'),
//         document.getElementById('samNotif'),
//         document.getElementById('finalNotif')
//     ];

//     vidPlayer.addEventListener('timeupdate', function () {
//         const currentTime = vidPlayer.currentTime;

//         if (currentTime >= 5 && currentTime < 10) {
//             showNotification(0);
//         } else if (currentTime >= 15 && currentTime < 20) {
//             showNotification(1);
//         } else if (currentTime >= 25 && currentTime < 29) {
//             showNotification(2);
//         } else if (currentTime >= 32 && currentTime < 36) {
//             showNotification(3);
//         } else if (currentTime >= 40 && currentTime < 46) {
//             showNotification(4);
//         } else {
//             hideAllNotifications();
//         }
//     });

//     function showNotification(index) {
//         if (index < 0 || index >= notifications.length) {
//             console.error("no", index);
//             return;
//         }

//         hideAllNotifications();
//         const notification = notifications[index];
// //https://www.w3schools.com/js/js_if_else.asp 
// // if notification is true / display it
//         if (notification) {
//             notification.style.display = 'block';
// //when clicked - start the game
//             notification.onclick = function () {
//                 vidPlayer.pause();
//                 hideAllNotifications();
//                 phaserGames.style.display = 'block';
//                 loadGame(index);
//             };
//         } else {
//             console.error("undefined", index);
//         }
//     }

//     function hideAllNotifications() {
//         notifications.forEach(notification => {
//             if (notification) {
//                 notification.style.display = 'none';
//             }
//         });
//     }

//    function loadGame(gameIndex) {
//     vidPlayer.pause();
//     phaserGames.classList.add('active');

//     // Remove previous game scripts if they exist
//     document.body.querySelectorAll('script[data-game]').forEach(script => script.remove());

//    // https://www.youtube.com/watch?v=0AjIZXSnCzs
//    //https://www.youtube.com/watch?v=uKVVSwXdLr0
//    //https://www.youtube.com/watch?v=5s5fVghc4S8
//     const script = document.createElement('script'); //https://www.w3schools.com/jsref/met_document_createelement.asp
//     script.src = gameConfigs[gameIndex];
//     script.type = "module"; // treated as a module
//     script.setAttribute('data-game', 'true');

//     script.onload = function () {
//         console.log(`works ${gameConfigs[gameIndex]}`);
//     };

//     script.onerror = function () {
//         console.error(`no ${gameConfigs[gameIndex]}`);
//     };

//     document.body.appendChild(script);
// }


        

//     function closeGame() {
//         if (currentGame) {
//             currentGame.destroy(true);
//             currentGame = null;
//         }

//         phaserGames.style.display = 'none';
//         vidPlayer.play();
//     }

//     const closeButton = document.createElement('button');
//     closeButton.innerText = 'Close Game';
//     closeButton.onclick = closeGame;
//     closeButton.style.position = 'absolute';
//     closeButton.style.top = '10px';
//     closeButton.style.right = '10px';
//     phaserGames.appendChild(closeButton);

//     // returnToVideoButton.addEventListener("click", () => {
//     //     const timeSpentInGame = Math.floor((Date.now() - gameStartTime) / 1000);
//     //     totalGameTime += timeSpentInGame;

//     //     phaserGames.classList.add("hidden");
//     //     vidPlayer.classList.remove("hidden");

//     //     setTimeout(() => {
//     //         vidPlayer.play();
//     //     }, 200);

//     //     if (currentGame) {
//     //         currentGame.destroy(true);
//     //         currentGame = null;
//     //     }
//     // });

// });
