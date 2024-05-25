
# <img src="https://github.com/webdoli/mogl3d-editor/blob/main/src/12_logo.png?raw=true" alt="Logo" width="42" height="42" /> **MOGL3D-Editor**


<div>MOGL3D Editor is a WYSIWYG editor that allows 3D files to be uploaded on the web. </div>


<br>


## 🏷️ Web 3D Wysiwyg Editor 
In version 1.xx, only the 3D file upload feature is provided, and the supported 3D file formats are as follows:</p>

* fbx
* gltf
* obj

<br>
<div align="center">
    <img src="https://github.com/webdoli/mogl3d-editor/assets/55019191/cd8a6627-e82a-4903-9ad9-daabb3ce3823" width="86%" />
</div>

<br>
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
