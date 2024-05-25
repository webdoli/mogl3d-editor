
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
### | CDN

#### 1️⃣ three.js module 

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

 

#### 2️⃣ mogl3d editor


  ```html
    <script src="https://unpkg.com/mogl3d-editor@1.1.1/lib/mogl3d-editor.js"></script>
    <script src="https://unpkg.com/mogl3d-editor@1.1.1/lib/mogl3d-editor.min.js"></script>
  ```

<p>
 To use the 3D file upload feature, the main library must be installed. Insert the JavaScript script tag between the <head> tags in the HTML. 
If there is no need to upload 3D files, the 3D module does not need to be installed. However, if 3D functionality is required, please follow step below to install the 'threeModules.js'.
</p>


* #### threeModule.js

```html
    <script type="module">
        import { ThreeModules } from 'https://unpkg.com/mogl3d-editor@1.1.1/plugin/threeModules.min.js';
    </script>
```
<p>
❗Note: The three.module.js module must be included at the top. After installing the three.js module library, the three object must be imported using the importMap method.
 threeModules.js depends on the three.js module.
</p>

<br>
<br>

#### 3️⃣ CSS link
<p>
    The icons in MOGL3D Editor use the Font Awesome library. Therefore, please install the Font Awesome CSS library via CDN before installing the MOGL3D Editor CSS library.
</p>

* #### install font-awesome.css
```html
    <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
        <link rel="stylesheet" href="https://unpkg.com/mogl3d-editor@1.1.1/css/mogl3d_styles.css">
    </head>
```
<p>
    ❗Note: install the 'mogl3d-style.css' library below the 'font-awesome.css' library.
</p>

<br>
<br>
<br>

## 🖥️ Usage
### | Example
<p>
    The basic usage is as follows:
</p>

```html
<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="https://unpkg.com/mogl3d-editor@1.1.1/css/mogl3d_styles.css">

    <script type="importmap">
        {
            "imports": {
                "three": "https://unpkg.com/three@0.159.0/build/three.module.min.js"
            }
        }
    </script>
    <script src="https://unpkg.com/mogl3d-editor@1.1.1/lib/mogl3d-editor.js"></script>

</head>
<body>

    <h1> MOGL3D Editor </h1>
    <div id="editor"></div>

    <script type="module">
        
        import { ThreeModules } from 'https://unpkg.com/mogl3d-editor@1.1.1/plugin/threeModules.min.js';
        
        const editor = document.getElementById('editor');
        const myEditor = new MOGL3D( editor, {} ); 

    </script>

</body>
</html>
```


<br>


### | Result
<p>
    If no options are configured, all features will be enabled by default. To use specific features only, options must be set accordingly (further explanation continues below).
</p>
<div align="center">
    <img src="https://github.com/webdoli/mogl3d-editor/assets/55019191/1b8a8672-7571-4556-a326-e7c6616f5dbe" width="70%;" />
</div>




