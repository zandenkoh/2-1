







document.addEventListener("DOMContentLoaded", function() {
  // Get the close button and advertisement elements
  var closeBtn = document.getElementById("closeBtn");
  var advertisement = document.getElementById("advertisement");
  var progressBar = document.getElementById("progressBar");

  // Close the advertisement when close button is clicked
  closeBtn.addEventListener("click", function() {
      advertisement.style.display = "none";
  });

  // Automatically close the advertisement after 5 seconds
  setTimeout(function() {
      advertisement.style.display = "none";
  }, 10000);

  // Update the progress bar
  var width = 1;
  var interval = setInterval(function() {
      if (width >= 100) {
          clearInterval(interval);
      } else {
          width++;
          progressBar.style.width = width + "%";
      }
  }, 46); // Adjust the speed of the progress bar here
}); 



document.addEventListener('contextmenu',
event => event.preventDefault());
// We enclose this in window.onload.
// So we don't have ridiculous errors.
window.onload = function() {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAaYarZ9GRra00k3-bZ3i3Yq7Z29JKBGlQ",
    authDomain: "chat-f6c20.firebaseapp.com",
    projectId: "chat-f6c20",
    storageBucket: "chat-f6c20.appspot.com",
    messagingSenderId: "589761348145",
    appId: "1:589761348145:web:3e23e78556f53704198b10"
  };
  

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
     








    // This is very IMPORTANT!! We're going to use "db" a lot.
    var db = firebase.database()
    // We're going to use oBjEcT OrIeNtEd PrOgRaMmInG. Lol
    class MEME_CHAT{

      delete_all_messages() {
        // Get the firebase database reference to the "chats" node
        var chatsRef = db.ref('chats/');
    
        // Remove all messages from the database
        chatsRef.remove()
          .then(() => {
            // After removing the entire "chats" node, recreate it to keep the structure
            chatsRef.set({});
    
            // After successful deletion, refresh the chat to update the UI
            this.refresh_chat();
          })
          .catch((error) => {
            console.error("Error removing messages: ", error);
          });
      }
      // Home() is used to create the home page
      home(){
        // First clear the body before adding in
        // a title and the join form
        document.body.innerHTML = ''
        this.create_title()
        this.create_join_form()
      }
      // chat() is used to create the chat page
      chat(){
        this.create_title()
        this.create_chat()
      }
      // create_title() is used to create the title
      create_title(){
        // This is the title creator. 🎉
        var title_container = document.createElement('div')
        title_container.setAttribute('id', 'title_container')
        var title_inner_container = document.createElement('div')
        title_inner_container.setAttribute('id', 'title_inner_container')
  
        var title = document.createElement('h1')
        title.setAttribute('id', 'title')
        title.textContent = '2-1'
  
        title_inner_container.append(title)
        title_container.append(title_inner_container)
        document.body.append(title_container)
      }
      // create_join_form() creates the join form
      create_join_form() {
        var parent = this;
      
        var join_container = document.createElement('div');
        join_container.setAttribute('id', 'join_container');
        var join_inner_container = document.createElement('div');
        join_inner_container.setAttribute('id', 'join_inner_container');
      
        var join_button_container = document.createElement('div');
        join_button_container.setAttribute('id', 'join_button_container');
      
        var join_button = document.createElement('button');
        join_button.setAttribute('id', 'join_button');
        join_button.innerHTML = 'Join <i class="fas fa-sign-in-alt"></i>';
        join_button.classList.add('disabled'); // Start with button disabled

          // Create and style an <h3> element for the name label
          var nameLabel = document.createElement('h3');
          nameLabel.textContent = 'Name:';
          nameLabel.classList.add('label-style'); // Add your CSS class here
      
        var join_input_container = document.createElement('div');
        join_input_container.setAttribute('id', 'join_input_container');


      
        var join_input = document.createElement('input');
        join_input.setAttribute('id', 'join_input');
        join_input.setAttribute('maxlength', 7);
        join_input.placeholder = 'Your name';
      
        var password_input_container = document.createElement('div');
        password_input_container.setAttribute('id', 'password_input_container');

          // Create and style an <h3> element for the password label
          var passwordLabel = document.createElement('h3');
          passwordLabel.textContent = 'Password:';
          passwordLabel.classList.add('label-style'); // Add your CSS class here


      
        var password_input = document.createElement('input');
        password_input.setAttribute('id', 'password_input');
        password_input.setAttribute('type', 'password');
        password_input.setAttribute('maxlength', 20);
        password_input.placeholder = 'Enter password';
      
        // Function to check if both inputs are valid and enable/disable the button
        function checkInputs() {
          if (
            join_input.value.length > 4 &&
            password_input.value === '1class1voice'
          ) {
            join_button.classList.add('enabled');
            join_button.onclick = function () {
              parent.save_name(join_input.value);
              join_container.remove();
              //parent.create_chat();
              window.location.reload();
            };
          } else {
            join_button.classList.remove('enabled');
            join_button.onclick = null;
          } 
        }
      
        // Attach event listeners for input changes
        join_input.onkeyup = checkInputs;
        password_input.onkeyup = checkInputs;
      
        // Append everything to the body
        join_button_container.append(join_button);
        join_input_container.append(join_input);
        password_input_container.append(password_input);
        join_inner_container.append(join_input_container, password_input_container, join_button_container);
        join_container.append(join_inner_container);
        document.body.append(join_container);
      

      }
      
      // create_load() creates a loading circle that is used in the chat container
      create_load(container_id){
        // YOU ALSO MUST HAVE (PARENT = THIS). BUT IT'S WHATEVER THO.
        var parent = this;
  
        // This is a loading function. Something cool to have.
        var container = document.getElementById(container_id)
        container.innerHTML = ''
  
        var loader_container = document.createElement('div')
        loader_container.setAttribute('class', 'loader_container')
  
        var loader = document.createElement('div')
        loader.setAttribute('class', 'loader')
  
        loader_container.append(loader)
        container.append(loader_container)
  
      }
      // create_chat() creates the chat container and stuff
      create_chat(){
        // Again! You need to have (parent = this)
        var parent = this;
        // GET THAT MEMECHAT HEADER OUTTA HERE
        var title_container = document.getElementById('title_container')
        var title = document.getElementById('title')
        title_container.classList.add('chat_title_container')
        // Make the title smaller by making it 'chat_title'
        title.classList.add('chat_title')
  
        var chat_container = document.createElement('div')
        chat_container.setAttribute('id', 'chat_container')
  
        var chat_inner_container = document.createElement('div')
        chat_inner_container.setAttribute('id', 'chat_inner_container')
  
        var chat_content_container = document.createElement('div')
        chat_content_container.setAttribute('id', 'chat_content_container')
  
        var chat_input_container = document.createElement('div')
        chat_input_container.setAttribute('id', 'chat_input_container')
  
        var chat_settings = document.createElement('button')
        chat_settings.setAttribute('id', 'chat_settings')
        chat_settings.innerHTML = `<i class="fa-solid fa-sliders"></i>`

        var sidebar = document.getElementById('sidebar');
        chat_settings.addEventListener('click', function() {
          if (sidebar.style.width === '80px') {
            sidebar.style.width = '0';
            sidebar.style.transition = '0.6s ease';
            sidebar.style.opacity = '0';
            sidebar.style.right = '-100px';
            sidebar.style.zIndex = '1000';
            chat_settings.style.right = '25px';
            chat_settings.style.transition = '0.6s ease';
            chat_settings.style.backgroundColor = '#ffffff';
            chat_settings.style.color = '#000000';
            chat_settings.innerHTML = `<i class="fa-solid fa-sliders"></i>`;
          } else {
            sidebar.style.width = '80px';
            sidebar.style.transition = '0.6s ease';
            sidebar.style.opacity = '1';
            sidebar.style.right = '14px';
            sidebar.style.zIndex = '1000';
            chat_settings.style.right = '70px';
            chat_settings.style.transition = '0.6s ease';
            chat_settings.style.backgroundColor = '#ffffff';
            chat_settings.style.color = '#000000';
            chat_settings.innerHTML = `<i class="fa-solid fa-chevron-right"></i>`
          }
        });


        var meet = document.getElementById('meet');
        var isMeet = true;

        meet.addEventListener('click', function() {
          if (isMeet) {
            window.open('https://meet.google.com/sww-jszj-tjs', '_myMeeting');
            isMeet = false; // Update the state
          } else {
            isMeet = true;
          }
        });

        var overlay = document.getElementById('overlay');
        var spotify = document.getElementById('spotify');
        var music = document.getElementById('music');
        var isMusic = true;

        music.addEventListener('click', function() {
          if (isMusic) {
            if (forms.style.display === 'block') {
              spotify.style.display = 'none';
              chat_input.style.display = 'none';
              chat_input_send.style.display = 'none';
              overlay.style.display = 'block';
            } else {
              spotify.style.display = 'block';
              spotify.style.opacity = '1';
              spotify.style.top = '50%';
              overlay.style.display = 'block';
              sidebar.style.marginRight = '-14px';
              sidebar.style.paddingLeft = '28px';
              chat_settings.style.marginRight = '-14px';
              chat_input.style.display = 'none';
              chat_input_send.style.display = 'none';
              isMusic = false; // Update the state
            };
          } else {
            spotify.style.display = 'none';
            spotify.style.opacity = '0';
            spotify.style.top = '0';
            overlay.style.display = 'none';
            sidebar.style.marginRight = '0';
            sidebar.style.paddingLeft = '35px';
            chat_settings.style.marginRight = '0';
            chat_input.style.display = 'block';
            chat_input_send.style.display = 'block';
            isMusic = true;
          }
        });

        // Get all playlist divs
var playlists = document.getElementsByClassName('spotify')[0].getElementsByClassName('playlist');

// Get all buttons
var btnPlaylist1 = document.getElementById('btn_playlist_1');
var btnPlaylist2 = document.getElementById('btn_playlist_2');
var btnPlaylist3 = document.getElementById('btn_playlist_3');

// Add click event listeners to the buttons
btnPlaylist1.addEventListener('click', function() {
    document.getElementById('playlist_1').style.display = 'block';
    document.getElementById('playlist_2').style.display = 'none';
    document.getElementById('playlist_3').style.display = 'none';

    btnPlaylist1.style.fontWeight = '700';
    btnPlaylist2.style.fontWeight = '100';
    btnPlaylist3.style.fontWeight = '100';
});

btnPlaylist2.addEventListener('click', function() {
    document.getElementById('playlist_2').style.display = 'block';
    document.getElementById('playlist_1').style.display = 'none';
    document.getElementById('playlist_3').style.display = 'none';

    btnPlaylist2.style.fontWeight = '700';
    btnPlaylist1.style.fontWeight = '100';
    btnPlaylist3.style.fontWeight = '100';
});

btnPlaylist3.addEventListener('click', function() {
    document.getElementById('playlist_3').style.display = 'block';
    document.getElementById('playlist_2').style.display = 'none';
    document.getElementById('playlist_1').style.display = 'none';

    btnPlaylist3.style.fontWeight = '700';
    btnPlaylist2.style.fontWeight = '100';
    btnPlaylist1.style.fontWeight = '100';
});

      

        var forms = document.getElementById('forms');
        var feedback = document.getElementById('feedback');
        var isFeedback = true;

        feedback.addEventListener('click', function() {
          if (isFeedback) {
            if (spotify.style.display === 'block') {
              forms.style.display = 'none';
              chat_input.style.display = 'none';
              chat_input_send.style.display = 'none';
              overlay.style.display = 'block';
            } else {
              forms.style.display = 'block';
              forms.style.opacity = '1';
              overlay.style.display = 'block';
              chat_input.style.display = 'none';
              chat_input_send.style.display = 'none';
              chat_settings.style.marginRight = '-14px';
              sidebar.style.marginRight = '-14px';
              sidebar.style.paddingLeft = '28px';
              isFeedback = false;
            };
          } else {
            forms.style.display = 'none';
            forms.style.opacity = '0';
            overlay.style.display = 'none';
            chat_input.style.display = 'block';
            chat_input_send.style.display = 'block';
            chat_settings.style.marginRight = '0';
            sidebar.style.marginRight = '0';
            sidebar.style.paddingLeft = '35px';
            isFeedback = true;
          }
        })



        var lightMode = document.getElementById('light_mode');
        var isLightMode = true; // Variable to track current mode
        
        lightMode.addEventListener('click', function() {
          if (isLightMode) {
            // Apply dark mode styles
            chat_container.style.backgroundColor = '#202020';
            chat_settings.style.backgroundColor = '#ffffff';
            chat_settings.style.color = '#000000';
            chat_settings.style.fontSize = '17px';
            sidebar.style.backgroundColor = '#000000';
            sidebar.style.color = '#ffffff';
            lightMode.style.color = '#ffffff';
            lightMode.style.fontSize = '26px';
            chat_input.style.color = '#ffffff';
            chat_input.style.backgroundColor = '#303030';
            chat_input.style.outline = '#474747 solid 1px';
            chat_logout.style.backgroundColor = '#000000';
            chat_logout.style.outline = '#ffffff';
            chat_logout.style.color = '#ffffff';
            document.documentElement.style.setProperty('--custom-scrollbar-track-color', '#000000');
            document.documentElement.style.setProperty('--custom-scrollbar-thumb-color', '#4c81d0');
            document.documentElement.style.setProperty('--message-container-background-color', '#383838');
            document.documentElement.style.setProperty('--message-container-color', '#ffffff');
            document.documentElement.style.setProperty('--message-user-color', '#4c81d0');
            document.documentElement.style.setProperty('--chat-content-container-background-color', '#2e2e2e');
            isLightMode = false; // Update mode
          } else {
            // Apply light mode styles
            chat_container.style.backgroundColor = ''; // Revert to default
            chat_settings.style.backgroundColor = '';
            chat_settings.style.color = '';
            chat_settings.style.fontSize = '';
            sidebar.style.backgroundColor = '';
            sidebar.style.color = '';
            lightMode.style.color = '';
            lightMode.style.fontSize = '';
            chat_input.style.color = '';
            chat_input.style.backgroundColor = '';
            chat_input.style.outline = '';
            chat_logout.style.backgroundColor = '';
            chat_logout.style.outline = '';
            chat_logout.style.color = '';
            document.documentElement.style.setProperty('--custom-scrollbar-track-color', '');
            document.documentElement.style.setProperty('--custom-scrollbar-thumb-color', '');
            document.documentElement.style.setProperty('--message-container-background-color', '');
            document.documentElement.style.setProperty('--message-container-color', '');
            document.documentElement.style.setProperty('--message-user-color', '');
            document.documentElement.style.setProperty('--chat-content-container-background-color', '');
            isLightMode = true; // Update mode
          }
        });
        
        
        var chat_input_send = document.createElement('button')
        chat_input_send.setAttribute('id', 'chat_input_send')
        chat_input_send.setAttribute('disabled', true)
        chat_input_send.setAttribute('unsent', true)
        chat_input_send.innerHTML = `<i class="fa-solid fa-arrow-up"></i>`
        
  
        var chat_input = document.createElement('input')
        chat_input.setAttribute('id', 'chat_input')
        // Only a max message length of 1000
        chat_input.setAttribute('maxlength', 3000)
        // Get the name of the user
        chat_input.placeholder = `${parent.get_name()}, join the conversation!`
        chat_input.onkeyup  = function(){
          if(chat_input.value.length > 0){
            chat_input_send.removeAttribute('disabled');
            chat_input_send.setAttribute('unsent', true);
            chat_input_send.classList.add('enabled');
            chat_input_send.classList.remove('sent');

           
            chat_input_send.onclick = function(){
              chat_input_send.removeAttribute('unsent');
              chat_input_send.classList.add('sent');
              chat_input_send.setAttribute('disabled', true);
              chat_input_send.classList.remove('enabled');
              if(chat_input.value.trim().length <= 0 || chat_input.value.trim() === ''){
                return
              }
              // Enable the loading circle in the 'chat_content_container'
              parent.create_load('chat_content_container');
              // Send the message. Pass in the chat_input.value
              parent.send_message(chat_input.value.trim())
              // Clear the chat input box
              chat_input.value = ''
              // Focus on the input just after
              chat_input.focus()
            }
          }else{
            chat_input_send.classList.remove('enabled');
            chat_input_send.classList.remove('sent');
          }


        }
        
        

        chat_input.addEventListener('keypress', function(event) {
          if (event.key === 'Enter' && chat_input_send.classList.contains('enabled','sent')) {
            setTimeout(function() {
              chat_input_send.click();
            }, 90); // Trigger the send button's click event
          }

        });

        var chat_logout_container = document.createElement('div')
        chat_logout_container.setAttribute('id', 'chat_logout_container')
  
        var chat_logout = document.createElement('button')
        chat_logout.setAttribute('id', 'chat_logout')
        chat_logout.textContent = `${parent.get_name()} | Logout`
        // "Logout" is really just deleting the name from the localStorage
        chat_logout.onclick = function(){
          localStorage.clear()
          // Go back to home page
          parent.home()
        }
        

        chat_logout_container.append(chat_logout)
        chat_input_container.append(chat_input, chat_input_send, chat_settings)
        chat_inner_container.append(chat_content_container, chat_input_container, chat_logout_container)
        chat_container.append(chat_inner_container)
        document.body.append(chat_container)
        // After creating the chat. We immediatly create a loading circle in the 'chat_content_container'
        parent.create_load('chat_content_container')
        // then we "refresh" and get the chat data from Firebase
        parent.refresh_chat()



       //HAHHAAHAHAHAHHAHAHAHAHHAHAHHAHAHAHAHHAHAHAHHAHAHHA//
   


       // Function to format date to 12-hour format with AM/PM
      function formatTimestamp(timestamp) {
        const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12; // Convert 0 to 12
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${formattedHours}:${formattedMinutes} ${ampm}`;
      }


       ordered.forEach(function(data) {
        var name = data.name;
        var message = data.message;
        var timestamp = data.timestamp; // Get the timestamp from the message data
        var isCurrentUser = name === parent.get_name(); // Check if the message is sent by the current user
      
        var message_container = document.createElement('div');
        message_container.setAttribute('class', `message_container ${isCurrentUser ? 'sent' : 'received'}`);
      
        var message_inner_container = document.createElement('div');
        message_inner_container.setAttribute('class', 'message_inner_container');
      
        var message_user_container = document.createElement('div');
        message_user_container.setAttribute('class', 'message_user_container');
      
        var message_user = document.createElement('p');
        message_user.setAttribute('class', 'message_user');
        message_user.textContent = `${name}`;
      
        var message_timestamp = document.createElement('p');
        message_timestamp.setAttribute('class', 'message_timestamp');
        var formattedTimestamp = formatTimestamp(timestamp);
        message_timestamp.textContent = formattedTimestamp; // Format the timestamp
      
        var message_content_container = document.createElement('div');
        message_content_container.setAttribute('class', 'message_content_container');
      
        var message_content = document.createElement('p');
        message_content.setAttribute('class', 'message_content');
        message_content.textContent = `${message}`;
      
        message_user_container.append(message_user, message_timestamp); // Append the timestamp after the name
        message_content_container.append(message_content);
        message_inner_container.append(message_user_container, message_content_container);
        message_container.append(message_inner_container);
      
        chat_content_container.append(message_container);
      });
      
      
    
      // Go to the recent message at the bottom of the container
      const lastMessage = chat_content_container.lastElementChild;
      lastMessage.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
     }

      
      // Save name. It literally saves the name to localStorage
      save_name(name){
        // Save name to localStorage
        localStorage.setItem('name', name)
      }    

      // Sends message/saves the message to firebase database
      send_message(message){
        var parent = this;
        
        // If the local storage name is null and there is no message,
        // then return/don't send the message. 
        // The user is somehow hacking to send messages,
        // or they just deleted the localstorage themselves.
        if (parent.get_name() == null || message == null || message.trim() === '') {
          return;
        }
      
        // Create a new timestamp for the message
        var timestamp = Date.now();
      
        // Get the firebase database reference
        var chatsRef = db.ref('chats/');
      
        // Get the number of existing messages to determine the index
        chatsRef.once('value', function(message_object) {
          var index = parseFloat(message_object.numChildren()) + 1;
      
          // Set the message data in the database
          var messageData = {
            name: parent.get_name(),
            message: message.trim(),
            timestamp: timestamp,
            index: index,
            sender: parent.get_name() // Update this property to identify the sender
          };
      
          // Push the message data to the database
          chatsRef.child(`message_${index}`).set(messageData)
            .then(function() {
              // After we send the chat, refresh to get the new messages
              parent.refresh_chat();
            });
        });
      }
      
      
      
      // Get name. Gets the username from localStorage
      get_name(){
        // Get the name from localstorage
        if(localStorage.getItem('name') != null){
          return localStorage.getItem('name')
        }else{
          this.home()
          return null
        }
      }
      // Refresh chat gets the message/chat data from firebase
      refresh_chat(){
        var chat_content_container = document.getElementById('chat_content_container')
  
        // Get the chats from firebase
        db.ref('chats/').on('value', function(messages_object) {
          // When we get the data clear chat_content_container
          chat_content_container.innerHTML = ''
          // if there are no messages in the chat. Retrun . Don't load anything
          if(messages_object.numChildren() == 0){
            return
          }
  
          // OK! SO IF YOU'RE A ROOKIE CODER. THIS IS GOING TO BE
          // SUPER EASY-ISH! I THINK. MAYBE NOT. WE'LL SEE!
  
          // convert the message object values to an array.
          var messages = Object.values(messages_object.val());
          var guide = [] // this will be our guide to organizing the messages
          var unordered = [] // unordered messages
          var ordered = [] // we're going to order these messages
  
          for (var i, i = 0; i < messages.length; i++) {
            // The guide is simply an array from 0 to the messages.length
            guide.push(i+1)
            // unordered is the [message, index_of_the_message]
            unordered.push([messages[i], messages[i].index]);
          }
  
          // Now this is straight up from stack overflow 🤣
          // Sort the unordered messages by the guide
          guide.forEach(function(key) {
            var found = false
            unordered = unordered.filter(function(item) {
              if(!found && item[1] == key) {
                // Now push the ordered messages to ordered array
                ordered.push(item[0])
                found = true
                return false
              }else{
                return true
              }
            })
          }
          
          






        )




          // Remove the "new-sent-message" class from newly sent messages after a delay
          setTimeout(function() {
            var newSentMessages = document.querySelectorAll('.new-sent-message');
            newSentMessages.forEach(function(message) {
              message.classList.remove('new-sent-message');
            });
          }, 5000); // Remove the class after 5 seconds (adjust the delay as needed)


          function receiveNewMessage(message) {
            // Code to receive a new message
          
            if (Notification.permission === 'granted') {
              const notification = new Notification('New Message', {
                body: message.sender + ': ' + message.content,
              });
              
              // Adjust notification behavior as needed
              notification.onclick = function () {
                // Handle click event when user clicks on the notification
              };
            }
          }
          
  
          // Now we're done. Simply display the ordered messages
          ordered.forEach(function(data) {
            var name = data.name
            var message = data.message
            var timestamp = data.timestamp; // Get the timestamp from the message data

  
            var message_container = document.createElement('div')
            message_container.setAttribute('class', 'message_container')


            //HAHAHAHAHAHAHAHHAHAAHHAHAHHHHHHHAHAAAAAAHHHHHAAAHHHH//
  
            var message_inner_container = document.createElement('div')
            message_inner_container.setAttribute('class', 'message_inner_container')
  
            var message_user_container = document.createElement('div')
            message_user_container.setAttribute('class', 'message_user_container')
  
            var message_user = document.createElement('p')
            message_user.setAttribute('class', 'message_user')
            message_user.textContent = `${name}`
  
            var message_content_container = document.createElement('div')
            message_content_container.setAttribute('class', 'message_content_container')
  
            var message_content = document.createElement('p')
            message_content.setAttribute('class', 'message_content')
            message_content.textContent = `${message}`
  
            message_user_container.append(message_user)
            message_content_container.append(message_content)
            message_inner_container.append(message_user_container, message_content_container)
            message_container.append(message_inner_container)
  
            chat_content_container.append(message_container)



                    // Create the timestamp element
             var message_timestamp = document.createElement('p');
             message_timestamp.setAttribute('class', 'message_timestamp');
             message_timestamp.textContent = new Date(timestamp).toLocaleString(); // Format the timestamp

             message_user_container.append(message_user);
             message_content_container.append(message_content, message_timestamp); // Append the timestamp
             message_inner_container.append(message_user_container, message_content_container);
             message_container.append(message_inner_container);

             chat_content_container.append(message_container);
            });
          // Go to the recent message at the bottom of the container
          chat_content_container.scrollTop = chat_content_container.scrollHeight;
      })
  

      }






    }





























    // So we've "built" our app. Let's make it work!!
    var app = new MEME_CHAT()
    // If we have a name stored in localStorage.
    // Then use that name. Otherwise , if not.
    // Go to home.
    if(app.get_name() != null){
      app.chat()
    }

    if (app.get_name() != null) {
      app.chat();
      // Delete all existing messages from the database
      app.delete_all_messages();
    }








  } 
