
# <img src="https://github.com/webdoli/mogl3d-editor/blob/main/src/12_logo.png?raw=true" alt="Logo" width="42" height="42" /> **MOGL3D-Editor**


<div>MOGL3D Editor is a WYSIWYG editor that allows 3D files to be uploaded on the web. </div>


<br>


## 🏷️ Web 3D Wysiwyg Editor 
In version 1.xx, only the 3D file upload feature is provided, and the supported 3D file formats are as follows:</p>

* fbx
* gltf
* obj


<div align="center">
  <video src="https://private-user-images.githubusercontent.com/55019191/333774745-d9025cb8-faee-4c32-b5c3-e5f835bff173.webm?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTY2MTU1NTcsIm5iZiI6MTcxNjYxNTI1NywicGF0aCI6Ii81NTAxOTE5MS8zMzM3NzQ3NDUtZDkwMjVjYjgtZmFlZS00YzMyLWI1YzMtZTVmODM1YmZmMTczLndlYm0_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwNTI1JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDUyNVQwNTM0MTdaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1mODUwMmM5ZGY5YzdiMjc4MGNhMDI4NWQ1MDI3ZTIyZDY3ZmZiNzM3NTdjOWUyMmQwZDUzODZiN2Y0OWY4OTkwJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.d7CoiWILHxJYYc1E-lQGSlI-ra4WHbUu1CkkdE0b1cU" style="max-width: 100%; height: auto;" controls autoplay muted></video>
</div>

<br>


## ⚙️ Install
### CDN

#### 1️⃣ mogl3d editor


  ```html
    <script src="https://unpkg.com/mogl3d-editor@1.1.1/lib/mogl3d-editor.js"></script>
    <script src="https://unpkg.com/mogl3d-editor@1.1.1/lib/mogl3d-editor.min.js"></script>
  ```

<p>
 To use the 3D file upload feature, the main library must be installed. Insert the JavaScript script tag between the <head> tags in the HTML. 
If there is no need to upload 3D files, the 3D module does not need to be installed. However, if 3D functionality is required, please follow step 2 below to install the 3D module.
 </p>

<br>
<br>

 
 #### 2️⃣ plugin: three.js | mogl3d module

<p>To use 3D functionality in the MOGL3D Editor, the three.js module must first be installed, followed by the installation of the threeModule.js from MOGL3D.</p>

* #### three.js module

```html
 <script type="importmap">
 {
   "imports":{
      "three":"https://unpkg.com/three@0.159.0/build/three.module.min.js"
   }
 }
</script>
```

<br>
<br>

<p>
 After installing the three.js module library, the three object must be imported using the importMap method.
 threeModules.js depends on the three.js module.
</p>

* #### threeModule.js module

```html
 <script src="https://unpkg.com/mogl3d-editor@1.1.1/plugin/threeModules.js"></script>
 <script src="https://unpkg.com/mogl3d-editor@1.1.1/plugin/threeModules.min.js"></script>
```
<p>
 
</p>
