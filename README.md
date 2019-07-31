# audio


In this project we have four buttons combined and a recording info :- 
The four button with each functionality are :- <br>
<strong>
1) Start Recording :- For starting to record the Voice of the user <br>
2) Stop Recording :- To stop the user to stop the voice and the voice will go to the Current Recording <br>
3) Pause Recording  :- Pause the Recording till the user again don't click the resume button <br>
4) Reset :- It will reload the current window so that a fresh page is enabled to the user .<br>
 </strong>
 
 
In this Project , It has the feature to convert the voice into .wav form and event the user can download his/her voice .
The voice of the user can be listened also by the user itself .


Your net should be on while testing this product .

Run the code with Live Server .

Currently the time taken between the recording of the audio is 5 seconds which is equivalent to 5000. So if you have to increase or decrease the time , you can do it by changing the value of key in config.js (timeDelay)

Suppose if you want to make it 10 seconds then put 10000 .

If you have to change the file type then also you have to refer to config.js file .

When the Start Recording button is pressed then it will be disable after the click so that the user won't be able to change the current recording .

To restart a new recording , you will press reset button .

While reloading the page the reset button will be disable because currently no audio has been recorded , but when the start recording button is pressed then the button will be enabled to reset the voice once again .

Task that has not been done :- 

Didn't connect to firebase Storage .

