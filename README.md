# Holotype

<h3>Over View</h3>

<p>
Identifying new species is a complex process that involves a detailed analysis and evaluation of various factors. Holotype is a crowdsourcing approach that can generate a substantial dataset of potential new species, which can be further examined by taxonomists to make a final determination. This method can be a valuable tool for biodiversity research in Australia.
</p>

<h3>Project architecture</h3>
<p>
Holotype is a mobile application that utilizes React Native as its front-end framework and NodeJS as its back-end technology. It stores its data on a MongoDB database, and the back-end is designed as a RESTful API. This API is deployed on Google Cloud Platform's App Engine, which is integrated with Google Storage to serve as the file system. This architecture allows the application to be scalable and capable of handling increasing traffic and data storage requirements.
</p>

<h3>Workflow</h3>

<p>
Users have the option to register as either a regular user or a taxonomist.
</p>
<div>
<img src="https://user-images.githubusercontent.com/55920971/232280840-af6d1a46-0a2f-4cd4-953f-c25a2669cf65.png" width="150" height="300">
<img src="https://user-images.githubusercontent.com/55920971/232280845-ca12f16b-bda2-44df-aeea-e3e18f924984.png" width="150" height="300">
</div>

<p>
The posts on the platform are organized into categories to facilitate easy search. Within each category, users can utilize the filter function to find posts based on their current status, which can be vote, review, verified, or rejected.
</p>
<div>
<img src="https://user-images.githubusercontent.com/55920971/232281562-a860a698-0f2c-45a6-ace0-70e8cbb3bf55.jpeg" width="150" height="300">
<img src="https://user-images.githubusercontent.com/55920971/232285888-ff21249a-2689-4f8f-b886-26fa45fc7c2c.png" width="150" height="300">
</div>

<p>
Users can create a post by providing pictures, locations and filling out a description form.
</p>
<div>
<img src="https://user-images.githubusercontent.com/55920971/232283037-7bb3aa5b-a750-4101-965e-fbb0646b8764.jpeg" width="150" height="300">
<img src="https://user-images.githubusercontent.com/55920971/232283106-d216b82d-148a-4d03-9cbe-f3411e9c8273.jpeg" width="150" height="300">
<img src="https://user-images.githubusercontent.com/55920971/232283200-20dbac70-39c5-48da-9719-6964e66e9ec3.jpeg" width="150" height="300">
</div>

<p>
Other users can comment and vote up/down a post depending on whether they believe it is a new species. Once a post has received enough votes (10 as the default), the post will be sent to taxonomists for further investigation.
</p>
<div>
<img src="https://user-images.githubusercontent.com/55920971/232283426-261138a8-b1d0-4a9b-9a9a-1515b84f9c35.png" width="150" height="300">
<img src="https://user-images.githubusercontent.com/55920971/232283596-45e280bc-db8b-4d40-8fad-8fcdf1fd8e0a.png" width="150" height="300">
</div>

<p>
In the interface of taxonomists, there is a waiting list of posts for them to look into. Taxonomists are able to verify or reject a post and provide extra information.
</p>
<div>
<img src="https://user-images.githubusercontent.com/55920971/232283577-f4c02036-099a-4ffa-8d23-dc2bbb028eb5.jpeg" width="150" height="300">
<img src="https://user-images.githubusercontent.com/55920971/232283589-7dad8e3e-fa46-4937-9833-70e005cc00ed.jpeg" width="150" height="300">
</div>

<p>
On the profile page, users can check their posts and favoured posts.
</p>
<div>
<img src="https://user-images.githubusercontent.com/55920971/232283965-ea88599b-d180-455b-9b4f-1260c9ec5a4e.jpeg" width="150" height="300">
<img src="https://user-images.githubusercontent.com/55920971/232283967-ee09fccc-8c4d-4891-b5ad-931af4062547.jpeg" width="150" height="300">
</div>

<h3>How to run the App</h3>
<ol>
<li>Install NodeJS if it is not installed on the computer.</li>
<li> Download Expo Go on your mobile device.</li>
<li> Open the terminal, on the Holotype root directory, type "npm install" to install all the dependencies.</li>
<li> Type "npm start" to run the code and it will generate a QR code.</li>
<li> Use your mobile device to scan the QR code to run the simulator on your phone.</li>
</ol>
<p>
Please note, for security reasons, the config file containing the GOOGLE_API_KEY has not been included in this repository. Therefore, to successfully run the app on a simulator, a new GOOGLE_API_KEY will be required.
</P>
