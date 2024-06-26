function MOGL3D( options = {}) {
    this.addFonts();
    this.name = 'MOGL3D Library';
    this.loader = null;
    this.modules = null;
    this.element = options.element;
    this.editorName = options.editorName;
    this.content = null;
    this.options = options;
    this.threeSceneNum = 0;
    this.imgFileNum = 0;
    this.filesNum = 0;
    this.uploadFiles = [];
    this.uploadModels = [];
    if( this.options.gui ) {
        this.height = ( this.options.gui.height ) ? this.options.gui.height : null;
    }
    
    if( this.options.plugins && this.options.plugins.length > 0 ) {
        let mogl3d = this;
        this.options.plugins.map( plugin => {
            for( let key in plugin ) {
                if( key === 'threeModules' ) mogl3d.modules = plugin[key] 
            }
        })
    }
    
    this.actions = options.actions
        ? (
            options.actions.map( action => {
                
                if( typeof action === 'string' ) {
                    return this.defaultActions()[action]; 
                }
                else if( this.defaultActions()[ action.name ]) return { ...this.defaultActions()[ action.name ], ...action }
                return action;
            })
        )
        : Object.keys( this.defaultActions() ).map( action => this.defaultActions()[ action ] );
    
    this.classes = { ...this.defaultClasses( this.editorName ), ...this.options.classes };
    this.formatBlock = 'formatBlock';
    this.defaultParagraphSeparatorString = 'defaultParagraphSeparator';
    
    this.init();
    this.initDropdownMenu();
}

/* ------------------------- */
/******* Buttons Funcs *******/
/* ------------------------- */
MOGL3D.prototype.dropdownActions = function () {
    return {
        fontColor: {
            icon: '<i class="fas fa-highlighter"></i>',
            result: () => this.createColorInput( 'color', 'foreColor', 'Menu-dropdown' ),
            title: 'Font Color'
        },
        fontType: {
            icon: `
                <label for="fontfamily">font family:</label>
                <select id="mogl3d-fontfamily">
                <option data-type="placeholder" selected> </option>
                    <option value='"Noto Sans KR", sans-serif'>Nano</option>
                    <option value='"Roboto", sans-serif'>Roboto</option>
                    <option value='"Poetsen One"'>Poetsen</option>
                    <option value='"Ubuntu Sans", sans-serif'>Ubuntu</option>
                    <option value='"Open Sans", sans-serif'>Open Sans</option>
                    <option value='"Sedan SC", serif'>Sedan SC</option>
                    <option value='"Lato", sans-serif'>Lato</option>
                    <option value='"Nanum Myeongjo", serif'>Nanum Myeongjo</option>
                    <option value='"Noto Serif KR", serif'>Noto</option>
                    <option value='"Black Han Sans", sans-serif'>Black Han Sans</option>
                    <option value='"Lora", serif'>Lora</option>
                    <option value='"Nanum Gothic", sans-serif'>Nanum Gothic</option>
                </select>
            `,
            result: () => {
                this.initFontTypeListener()
            },
            title: 'Font Color'
        },
        fontSize: {
            icon: `
                <label for="fontsize">size:</label>
                <select id="mogl3d-fontsize">
                    <option data-type="placeholder" selected> </option>
                    <option value="12px">Small</option>
                    <option value="16px">Medium</option>
                    <option value="20px">Large</option>
                    <option value="24px">Extra Large</option>
                </select>
            `,
            result: () => {
                this.initFontSizeListener()
            },
            title: 'Font Color'
        },
        highlight: {
            icon: '<i class="fas fa-fill-drip"></i>',
            result: () => this.createColorInput( 'color', 'backColor', 'Menu-dropdown' ),
            title: 'Highlight Text'
        },
        removeHighlight: {
            icon: '<i class="fas fa-eraser"></i>',
            result: () => { 
                this.exec('backColor', 'transparent')
                this.closeDropDown( 'Menu-dropdown' );
            },
            title: 'Remove Highlight'
        },
        leftAlign: {
            icon: '<i class="fas fa-align-left"></i>',
            result: () => { 
                this.exec( 'justifyLeft' ); 
                this.closeDropDown( 'Menu-dropdown' );
            },
            title: 'LeftAlign'
        },
        rightAlign: {
            icon: '<i class="fas fa-align-right"></i>',
            result: () => {
                this.exec( 'justifyRight' );
                this.closeDropDown( 'Menu-dropdown' );
            },
            title: 'RightAlign'
        },
        centerAlign: {
            icon: '<i class="fas fa-align-center"></i>',
            result: () => {
                this.exec( 'justifyCenter' )
                this.closeDropDown( 'Menu-dropdown' );
            },
            title: 'CenterAlign'
        },
        image: {
            icon: '<i class="fas fa-file-image"></i>',
            result: () => {
                this.createIMGFileBox( 'image/*' );
                this.closeDropDown( 'Menu-dropdown' );
            },
            title: 'Image',
        },
        files: {
            icon: '<i class="fas fa-file-archive"></i>',
            result: () => {
                this.createZipFile();
                this.closeDropDown( 'Menu-dropdown' );
            },
            title: 'files',
        },
        load3DModel: {
            icon: '<i class="fas fa-cube"></i>',
            result: () => this.threeDFileLoader(),
            title: 'Load 3D Model'
        },
    }
};

MOGL3D.prototype.defaultActions = function () {
    return {
        italic: {
            icon: '<i>I</i>',
            result: () => this.exec('italic'),
            state: () => this.queryCommandState('italic'),
            title: 'Italic',
        },
        bold: {
            icon: '<b>B</b>',
            result: () => this.exec('bold'),
            state: () => this.queryCommandState('bold'),
            title: 'Bold'
        },
        underline: {
            icon: '<u>U</u>',
            result: () => this.exec('underline'),
            state: () => this.queryCommandState('underline'),
            title: 'Underline',
        },
        strikethrough: {
            icon: '<strike>S</strike>',
            result: () => this.exec('strikeThrough'),
            state: () => this.queryCommandState('strikeThrough'),
            title: 'Strike-through',
        },
        fontMenu: {
            icon: '<i class="fas fa-text-height"></i>',
            result: () => {},
            init: ( button ) => {
                this.initMenu( 
                    button,
                    this.editorName,
                    [ 
                        this.dropdownActions().fontType, 
                        this.dropdownActions().fontSize, 
                    ], 
                    'FontMenu-dropdown' 
                )
            },
            title: 'FontDropDown',
        },
        textColorMenu: {
            icon: '<i class="fas fa-font"></i>',
            result: () => {},
            init: ( button ) => {
                this.initMenu( 
                    button, 
                    this.editorName, 
                    [ 
                        this.dropdownActions().fontColor, 
                        this.dropdownActions().highlight, 
                        this.dropdownActions().removeHighlight
                    ], 
                    'TextMenu-dropdown' 
                )
            },
            title: 'TextColorDropDown',
        },
        alignMenu: {
            icon: '<i class="fas fa-align-justify"></i>',
            result: () => {},
            init: ( button ) => {
                this.initMenu( 
                    button, 
                    this.editorName, 
                    [
                        this.dropdownActions().leftAlign, 
                        this.dropdownActions().rightAlign, 
                        this.dropdownActions().centerAlign
                    ], 
                    'AlignMenu-dropdown' 
                )
            },
            title: 'TextAlignDropDown'
        },
        line: {
            icon: '&#8213;',
            result: () => this.exec('insertHorizontalRule'),
            divider: true,
            title: 'Horizontal Line',
        },
        olist: {
            icon: '&#35;',
            result: () => this.exec('insertOrderedList'),
            title: 'Ordered List',
        },
        quote: {
            icon: '&#8220; &#8221;',
            result: () => this.exec( this.formatBlock, '<blockquote>'),
            title: 'Quote',
        },
        ulist: {
            icon: '&#8226;',
            result: () => this.exec('insertUnorderedList'),
            title: 'Unordered List',
        },
        filesMenu: {
            icon: '<i class="fas fa-upload"></i>',
            result: () => {},
            init: ( button ) => {
                this.initMenu( 
                    button, 
                    this.editorName, 
                    [
                        this.dropdownActions().image, 
                        this.dropdownActions().files, 
                        this.dropdownActions().load3DModel
                    ], 
                    'FileMenu-dropdown' 
                )},
            title: 'FilesDropDown'
        },
    }
};

MOGL3D.prototype.init = function () {

    const mogl3d = this;
    const actionbar = document.createElement('div');
    actionbar.className = this.classes.actionbar;
    this.element.appendChild( actionbar );
    actionbar.style.height = ( this.height ) ? `${ this.height }px` : '720px';

    const content = document.createElement('div');
    content.contentEditable = true;
    content.className = this.classes.content;
    content.style.height = ( this.height ) ? `${ this.height }px` : '720px';

    const defaultParagraphSeparator = this.options[this.defaultParagraphSeparatorString] || 'div';

    content.oninput = ({ target: { firstChild } }) => {

        if ( firstChild && firstChild.nodeType === 3 ) this.exec( 'formatBlock', `<${defaultParagraphSeparator}>`)
        else if ( content.innerHTML === '<br>' ) content.innerHTML = ''
        
        if ( this.options.onChange ) { 
            
            ( this.uploadModels ) 
            ? this.options.onChange( content.innerHTML, this.uploadModels )
            : this.options.onChange( content.innerHTML );
        
        }
    }
        
    content.onkeydown = event => {
        if ( event.key === 'Enter' && this.queryCommandValue( 'formatBlock' ) === 'blockquote' ) {
            setTimeout(() => this.exec( 'formatBlock', `<${defaultParagraphSeparator}>`), 0)
        }
    }

    this.element.appendChild( content );
    this.content = content;

    this.actions.forEach( actionKey => {
        
        const button = document.createElement('button');
        button.className = mogl3d.classes.button;
        button.innerHTML = actionKey.icon;
        button.setAttribute('type', 'button');
        button.title = actionKey.title;
        button.addEventListener('click', e => {
            
            actionKey.result();
            content.focus();
        })

        if( actionKey.state ) {
            const handler = () => button.classList[actionKey.state() ? 'add' : 'remove'](mogl3d.classes.selected);
            content.addEventListener( 'keyup', handler );
            content.addEventListener( 'mouseup', handler );
            button.addEventListener( 'click', handler );
        }

        actionbar.appendChild(button);
    });

    this.actions.forEach(( actionKey ) => {
        
        if( actionKey.init ) {
            const button = document.querySelector(`button[title="${ actionKey.title }"]`);
            if (button) actionKey.init(button);
        }
    });
};

MOGL3D.prototype.defaultClasses = function ( editorName ) {
    return {
        actionbar: 'mogl3d-actionbar',
        button: 'mogl3d-button',
        content: editorName,
        selected: 'mogl3d-button-selected',
    };
};

MOGL3D.prototype.exec = function( command, value = null ) {
    document.execCommand( command, false, value );
}

MOGL3D.prototype.queryCommandState = function( command ) {
    return document.queryCommandState( command );
}

MOGL3D.prototype.queryCommandValue = function( command ) {
    return document.queryCommandValue( command );
}

MOGL3D.prototype.closeDropDown = function( elName ) {
    const dropdowns = document.querySelectorAll(`.${ elName }`);
    dropdowns.forEach( dropdown => {
        dropdown.style.display = 'none';
    });
}

MOGL3D.prototype.createColorInput = function( type, execName, closeNodeName ) {
    const input = document.createElement('input');
    const mogl3d = this;
    input.type = type;
    input.oninput = (e) => {
        mogl3d.exec( execName, e.target.value );
        input.remove();
    };
    input.click();
    this.closeDropDown( closeNodeName );
}

/* -------------------------- */
/******* DropDown Funcs *******/
/* -------------------------- */
MOGL3D.prototype.initDropdownMenu = function () {
    let dropdownWrap = document.querySelectorAll('.dropdown');
    let dropdownNodesID = [ 'TextMenu-dropdown', 'AlignMenu-dropdown', 'FileMenu-dropdown', 'FontMenu-dropdown' ]

    dropdownWrap.forEach( dropEl => {

        let editor = document.querySelector('#editor');
        
        dropEl.addEventListener('click', async e => {
    
            let dropdownWrapper = e.target.parentNode;
            let dropMenuEl = ( dropdownWrapper.nodeName === 'BUTTON') ? dropdownWrapper.parentNode : dropdownWrapper; 
            let dropID = await this.chkDropID( dropMenuEl );
            
            dropdownNodesID.forEach( id => {
            
                let node = document.querySelector(`#${id}`);
                if( node ) {
                    if( id !== dropID ) node.style.display = 'none';
                }

            });

            
            let selectNode = document.querySelector(`#${dropID}`);
            
            if( selectNode.style.display === 'flex' ) {
                selectNode.style.display = 'none';
            } else {
                selectNode.style.display = 'flex';
            }

            e.stopPropagation();
        })

    });

    document.addEventListener('click', (e) => {
        
        const editor = document.querySelector(`.${this.editorName}`);
        let target = e.target;
        
        if( target.id !== 'mogl3d-fontsize' && target.id !== 'mogl3d-fontfamily' ) {
            dropdownNodesID.map( id => {
                
                let node = document.querySelector(`#${id}`);
                if( node ) {
                    if( node.style.display === 'flex' ) node.style.display = 'none';
                }
                
            })
        }

    });
};

MOGL3D.prototype.initMenu = function( button, editor, execArray, name ) {
    let content = document.querySelector(`.${ editor }`);
    let dropdownContainer = this.createDropDownMenu( button, execArray, content, name );
    button.parentNode.replaceChild( dropdownContainer, button );
}

MOGL3D.prototype.createDropDownMenu = function( button, itemsArray, content, id ) {
    const mogl3d = this;
    const dropdownContainer = document.createElement('div');
    dropdownContainer.className = 'dropdown';

    const newButton = button.cloneNode(true);
    const dropdown = document.createElement('div');
    dropdown.id = id;
    dropdown.className = 'Menu-dropdown';

    
    Array.from( itemsArray ).forEach( action => {
        
        const button = document.createElement('button');
        button.className = 'mogl3d-button';
        button.innerHTML = action.icon;
        button.title = action.title;
        button.setAttribute('type', 'button');
        button.onclick = () => action.result() && content.focus()
    
        dropdown.appendChild( button );
    });

    dropdownContainer.appendChild( newButton );
    dropdownContainer.appendChild( dropdown );

    return dropdownContainer
}


/* -------------------- */
/******* 3D Funcs *******/
/* -------------------- */

MOGL3D.prototype.threeDFileLoader = function() {

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.multiple = true;
    fileInput.onchange = async e => {

        const files = e.target.files;
        
        try {
            let filesMap = null;
            let modules = new this.modules({
                editor: this.element
            });
            
            modules.loadFiles( files, filesMap, ( res ) => {

                const currentRange = this.saveCurrentRange();
                if( currentRange ) {
                    this.insert3DModelAtLine( modules, res, currentRange );
                } else {
                    this.insert3DModelAtLine( modules, res );
                }
                
            });

        } catch ( err ) {
            console.error('3D File Loading Error:', err);
        }
    
    }

    fileInput.click();
    this.closeDropDown( 'Menu-dropdown' );

}

MOGL3D.prototype.saveCurrentRange = function() {
    if (window.getSelection().rangeCount > 0) {
        return window.getSelection().getRangeAt(0);
    }
    return null;
}

MOGL3D.prototype.getModels = function() {
    
    if( this.uploadModels.length > 0 ) return this.uploadModels
    
}

MOGL3D.prototype.getFiles = function() {

    if( this.uploadFiles.length > 0 ) return this.uploadFiles

}

MOGL3D.prototype.insert3DModelAtLine = function( modules, res, range ) {
    
    this.threeSceneNum++;
    let fileTypeDescription = '3D';
    const editor = this.element;
    const selection = window.getSelection();

    let fileName = res.name;
    let fileParts = fileName.split('.');
    let ext = fileParts.pop();
    let pureFileName = fileParts.join('.');

    let sceneContainer = document.createElement('p');
    sceneContainer.title = `threeSceneNum${this.threeSceneNum}_${pureFileName}`
    sceneContainer.className = `three-scene`;
    sceneContainer.classList.add(`mogl3d_three_scene_${this.threeSceneNum}_${pureFileName}`);

    let uploadFile = {
        'className': `mogl3d_three_scene_${this.threeSceneNum}_${pureFileName}`,
        'type': fileTypeDescription,
        'data': res,
        'three': ext
    }

    this.uploadFiles.push( uploadFile );
    
    this.uploadModels.push({
        [sceneContainer.title]: res
    });

    let container = modules.init( sceneContainer, res );


    if ( !range ) {
    
        const editorContent = document.querySelector(`.${ this.editorName }`);
        const range = document.createRange();
        let beforeDiv = document.createElement('div');
        beforeDiv.textContent = "\u00A0";
        let afterDiv = document.createElement('div');
        afterDiv.textContent = "\u00A0";
        
        range.selectNodeContents( container );
        range.collapse( true );
        selection.removeAllRanges();
        selection.addRange( range );
        editorContent.appendChild( container );
        editorContent.insertBefore( beforeDiv, container );
        editorContent.appendChild( afterDiv );
        
    } else {
        
        range.deleteContents();
        range.insertNode( container );
        let newRange = document.createRange();
        newRange.setStartAfter( container );
        newRange.collapse( true );
        window.getSelection().removeAllRanges();
        window.getSelection().addRange( newRange );
    }

}

/* --------------------------- */
/******* Img Upload Func *******/
/* --------------------------- */

MOGL3D.prototype.createIMGFileBox = function( accept ) {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = accept;
    fileInput.onchange = (e) => {
        
        const file = e.target.files[0];
        const fileType = file.type;
        let fileTypeDescription = '';
        const fileName = file.name;
        const fileParts = fileName.split('.');
        const fileExtension = fileParts.pop(); 
        const pureFileName = fileParts.join('.'); 

        if (fileType.startsWith('image/')) {
            fileTypeDescription = 'Image';
        } else if (fileType === 'application/zip') {
            fileTypeDescription = 'Zip';
        } else {
            fileTypeDescription = 'Unknown';
        }
    
        if (file) {

            this.imgFileNum++;
            const reader = new FileReader();
            reader.onload = (e) => {
                const imgWrapper = document.createElement('span');
                imgWrapper.className = `mogl3d_image${this.imgFileNum}_${pureFileName}`;
                const img = document.createElement('img');
                img.src = e.target.result;
                
                imgWrapper.appendChild( img );
                let uploadFile = {
                    'className': imgWrapper.className,
                    'type': fileTypeDescription,
                    'data' : file,
                }
                this.uploadFiles.push( uploadFile );
                const selection = document.getSelection();
                let range;

                if ( selection.rangeCount > 0 ) {
                    range = selection.getRangeAt(0);
                    range.deleteContents();
                    range.insertNode( imgWrapper );
                } else {
                    const editor = document.querySelector(`.${ this.editorName }`);
                    editor.insertBefore( imgWrapper, editor.firstChild );
                }

            };

            reader.readAsDataURL(file);

        }

        fileInput.remove();

    };

    fileInput.click(); 
    return fileInput
}

/* --------------------------- */
/******* Zip Upload Func *******/
/* --------------------------- */
MOGL3D.prototype.createZipFile = function() {
    const mogl3d = this
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.zip';

    fileInput.onchange = (e) => {
        
        const file = e.target.files[0];
        const fileType = file.type;
        let fileTypeDescription = '';
        const fileName = file.name;
        const fileParts = fileName.split('.');
        const fileExtension = fileParts.pop(); 
        const pureFileName = fileParts.join('.');
        fileTypeDescription = 'file';
    
        if (file) {
            
            this.filesNum++;
            const container = document.createElement('div');
            container.contentEditable = false;
            container.className = `mogl3d_file${this.filesNum}_${pureFileName}`;
            container.style.display = 'inline-block'; 
            container.style.margin = '5px';

            const fileNameSpan = document.createElement('span');
            fileNameSpan.textContent = file.name + " ";
            container.appendChild( fileNameSpan );

            const removeButton = document.createElement('button');
            removeButton.textContent = 'x';
            removeButton.style.marginLeft = '5px';
            removeButton.onclick = () => {
                container.remove();
            };
            container.appendChild(removeButton);

            let uploadFile = {
                'className': container.className,
                'type': fileTypeDescription,
                'data': file,
                'ext': fileExtension
            }
            this.uploadFiles.push( uploadFile );

            const selection = document.getSelection();
            let range;
    
            if ( selection.rangeCount > 0 ) {
    
                range = selection.getRangeAt(0);
                range.deleteContents(); 
                range.insertNode( container );
    
            } else {
                const editor = document.querySelector(`.${ this.editorName }`);
                editor.insertBefore( container, editor.firstChild );
            }
            fileInput.remove();
        }

    };

    fileInput.click();
    return fileInput
}

/* ----------------------------- */
/******* Video Upload Func *******/
/* ----------------------------- */
MOGL3D.prototype.createModal = function( type ) {

    let currentRange;
    if (window.getSelection().rangeCount > 0) {
        currentRange = window.getSelection().getRangeAt(0);
    }

    this.closeDropDown( 'Menu-dropdown' )
    const modal = document.createElement('div');
    modal.setAttribute('class', 'modal');
    modal.id = 'videoModal';

    const modalContent = document.createElement('div');
    modalContent.setAttribute('class', 'modal-content');
    modal.appendChild(modalContent);

    const closeButton = document.createElement('span');
    closeButton.setAttribute('class', 'modalClose');
    closeButton.id = 'videoModalClose';
    closeButton.textContent = '×';
    closeButton.addEventListener('click', e => {
    
        this.closeModal(modal)
        if( currentRange ) {
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(currentRange);
        }
    })
    
    modalContent.appendChild(closeButton);

    if( type === 'video' ) {
        let form = this.videoForm( modalContent, modal, currentRange );
        modal.appendChild(form);
    }

    document.body.appendChild( modal );
    modal.style.display = "block";

    modal.addEventListener('mousedown', function(e) {
        e.stopPropagation();
    }, true);

    return modal;
}

MOGL3D.prototype.videoForm = function( modalContent, modal, range ) {
    
    const header = document.createElement('h2');
    header.textContent = 'Add Video';

    const inputURL = document.createElement('input');
    inputURL.type = 'text';
    inputURL.id = 'videoUrlInput';
    inputURL.placeholder = 'Enter video URL';

    const inputFile = document.createElement('input');
    inputFile.type = 'file';
    inputFile.id = 'videoFileInput';
    inputFile.accept = 'video/*';

    const insertButton = document.createElement('button');
    insertButton.textContent = 'Insert Video';
    insertButton.addEventListener('click', e => this.insertVideoFromModal( modal, range ))

    modalContent.appendChild( header );
    modalContent.appendChild( inputURL );
    modalContent.appendChild( inputFile );
    modalContent.appendChild( insertButton) ;

    return modalContent
}

MOGL3D.prototype.closeModal = function( modal ) {
    modal.style.display = "none";
    modal.remove();
}

MOGL3D.prototype.insertVideoFromModal = function( modal, range ) {

    const mogl3d = this;
    const url = document.getElementById('videoUrlInput').value;
    const fileInput = document.getElementById('videoFileInput');
    const file = fileInput.files[0];

    if (url) {
        mogl3d.insertVideoIframe( url, range );
    } else if (file && file.size <= 30 * 1024 * 1024) {
        mogl3d.insertVideoFile( file );
    } else if (file) {
        alert('File is too large. Maximum size is 30MB.');
    }

    this.closeModal( modal );
}

MOGL3D.prototype.convertToEmbedUrl = function(url) {

    let embedUrl = url;
    if (url.includes('youtube.com/watch?v=')) {
        const videoId = url.split('v=')[1].split('&')[0];
        embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;
    } else if (url.includes('youtu.be/')) {
        const videoId = url.split('youtu.be/')[1];
        embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;
    }
    return embedUrl;

}

MOGL3D.prototype.insertVideoIframe = function( url, range ) {
    
    let embedUrl = this.convertToEmbedUrl( url );
    const editorContent = document.querySelector(`.${ this.editorName }`);
    let tmpTextNode = document.createTextNode('');
    const wrapper = document.createElement('span');
    wrapper.innerHTML = " ";
    wrapper.appendChild( tmpTextNode );

    const iframe = document.createElement('iframe');
    iframe.src = embedUrl;
    iframe.style.width = "560px";
    iframe.style.height = "315px";
    iframe.frameBorder = "0";
    iframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    
    wrapper.appendChild( iframe );
    wrapper.style.whiteSpace = 'pre';

    if( !range ) {
        editorContent.insertBefore( wrapper, editorContent.firstChild );
    } else {
        
        range.deleteContents();
        range.insertNode(wrapper);
    }
}

MOGL3D.prototype.insertVideoFile = function( file ) {
    
    const editorContent = document.querySelector(`.${ this.editorName }`);

    let tmpTextNode = document.createTextNode('');
    const wrapper = document.createElement('span');
    wrapper.innerHTML = " ";
    wrapper.appendChild( tmpTextNode );

    const video = document.createElement('video');
    video.controls = true;

    const source = document.createElement('source');
    source.src = URL.createObjectURL(file);
    source.type = file.type;
    video.appendChild(source);

    const afterSpace = document.createElement('p');
    afterSpace.contentEditable = true;
    afterSpace.innerHTML = "<br>";

    wrapper.appendChild( video );
    wrapper.style.whiteSpace = 'pre';
    const selection = document.getSelection();
    let range;

    if ( selection.rangeCount > 0 ) {
        range = selection.getRangeAt(0);
        range.deleteContents(); 
        range.insertNode( wrapper ); 
    } else {    
        editorContent.insertBefore( wrapper, editorContent.firstChild );
    }

    return editorContent;
}

MOGL3D.prototype.chkDropID = function( el ) {
    return new Promise( resolve => {
        
        for( let i = 0; i < el.childNodes.length; i++ ) {
            
            if( el.childNodes[i].id !== '') {
                resolve( el.childNodes[i].id );
            } 
        }
        
    })
}

/* ---------------------- */
/******* Font Funcs *******/
/* ---------------------- */

MOGL3D.prototype.addFonts = function() {

    var link1 = document.createElement('link');
    link1.rel = 'preconnect';
    link1.href = 'https://fonts.googleapis.com';
    document.head.appendChild(link1);

    var link2 = document.createElement('link');
    link2.rel = 'preconnect';
    link2.href = 'https://fonts.gstatic.com';
    link2.crossOrigin = 'anonymous';
    document.head.appendChild(link2);

    var link3 = document.createElement('link');
    link3.rel = 'stylesheet';
    link3.href = 'https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Lora:ital,wght@0,400..700;1,400..700&family=Nanum+Gothic&family=Nanum+Myeongjo&family=Noto+Sans+KR:wght@100..900&family=Noto+Serif+KR&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Poetsen+One&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Sedan+SC&family=Ubuntu+Sans:ital,wght@0,100..800;1,100..800&display=swap';
    document.head.appendChild(link3);

}

MOGL3D.prototype.initFontTypeListener = function() {

    const select = document.getElementById('mogl3d-fontfamily');
    if( !select ) return;

    select.removeEventListener( 'change', this.handleFontTypeChange );

    this.handleFontTypeChange = ( event ) => {
        const fontTypeValue = select.value;
        const selection = window.getSelection();

        if( !selection.rangeCount ) return;
        this.wrapTextWithSpan( selection, "fontFamily", fontTypeValue, 'font-family' );
    }

    select.addEventListener( 'change', this.handleFontTypeChange );

}

MOGL3D.prototype.initFontSizeListener = function() {

    const select = document.getElementById('mogl3d-fontsize');
    if (!select) return;

    select.removeEventListener('change', this.handleFontSizeChange);
    this.handleFontSizeChange = ( event ) => {

        const sizeValue = select.value;
        const selection = window.getSelection();
        
        if (!selection.rangeCount) return;
        this.wrapTextWithSpan(selection, "fontSize", sizeValue, 'font-size');
    
    };
    
    select.addEventListener('change', this.handleFontSizeChange);

};

MOGL3D.prototype.wrapTextWithSpan = function( selection, styleProperty, value, type  ) {

    let range = selection.getRangeAt(0);
    const multiLine = ( selection.toString().split('\n').length > 1 ) ? true : false;
    
    if( !multiLine ) {
        
        let extractContents = range.extractContents();
        let commonNode = range.commonAncestorContainer;
        let motherNode = this.findParentNode( commonNode, 'DIV' );
        
        ( type === 'font-size' ) 
            ? this.removeChildNode( extractContents, 'span', 'mogl3d-font-span' )
            : this.removeChildNode( extractContents, 'span', 'mogl3d-fontfamily-span' );

        let newSpan = document.createElement('span');
        newSpan.style[styleProperty] = value;
        
        newSpan.className = ( type === 'font-size' ) ? 'mogl3d-font-span' : 'mogl3d-fontfamily-span';
        newSpan.appendChild( extractContents );
        newSpan.normalize();

        range.insertNode( newSpan );
        this.removeEmptyNodes( motherNode )

    } 
    
    if( multiLine ) {
        
        let cloneNodes = range.cloneContents();
        let startNode = range.startContainer; 
        let endNode = range.endContainer;
        let startMotherNode = this.findParentNode( startNode, 'DIV' );
        let endMotherNode = this.findParentNode( endNode, 'DIV' );
        let rootNode = startMotherNode.parentNode;

        range.deleteContents();
        let newRange = document.createRange();
        
        this.removeEmptyNodes( startMotherNode );
        this.removeEmptyNodes( endMotherNode );
        
        let firstNode = cloneNodes.firstChild;
        let lastNode = cloneNodes.lastChild;

        if ( type === 'font-size' ) {
            this.removeChildNode( firstNode, 'span', 'mogl3d-font-span' );
            this.removeChildNode( lastNode, 'span', 'mogl3d-font-span' );
        }
        else if ( type === 'font-family') {
            this.removeChildNode( firstNode, 'span', 'mogl3d-fontfamily-span' );
            this.removeChildNode( lastNode, 'span', 'mogl3d-fontfamily-span' );
        }

        let firstWrapper = document.createElement('span');
        firstWrapper.className = ( type === 'font-size' ) ? 'mogl3d-font-span' : 'mogl3d-fontfamily-span';
        firstWrapper.style[styleProperty] = value;

        let midWrappers = [];
        
        let tmpMidClone = cloneNodes.cloneNode( true );
        let midNodeLength = tmpMidClone.childNodes.length - 1;
        Array.from( tmpMidClone.childNodes ).forEach( ( midNode, idx ) => {

            if( idx !== 0 && idx !== midNodeLength ) {
                
                this.removeEmptyNodes( midNode );

                ( type === 'font-size' )
                    ? this.removeChildNode( midNode, 'span', 'mogl3d-font-span' )
                    : this.removeChildNode( midNode, 'span', 'mogl3d-fontfamily-span' )

                let midWrapper = document.createElement('span');
                midWrapper.className = ( type === 'font-size' ) ? 'mogl3d-font-span' : 'mogl3d-fontfamily-span';
                midWrapper.style[styleProperty] = value;

                let midNodeSpan = this.changeNodeToNode( midNode, midWrapper );
                let tmpDiv = document.createElement('div');
                tmpDiv.appendChild( midNodeSpan );

                midWrappers.push( tmpDiv );

            }

        })

        let lastWrapper = document.createElement('span');
        lastWrapper.className = ( type === 'font-size' ) ? 'mogl3d-font-span' : 'mogl3d-fontfamily-span';
        lastWrapper.style[styleProperty] = value;

        let firstNodeSpan = this.changeNodeToNode( firstNode, firstWrapper );
        let lastNodeSpan = this.changeNodeToNode( lastNode, lastWrapper );
        firstNodeSpan.normalize();
        lastNodeSpan.normalize();

        startMotherNode.appendChild( firstNodeSpan );
        endMotherNode.insertBefore( lastNodeSpan, endMotherNode.firstChild );

        midWrappers.map( midNode => {
            midNode.normalize();
            rootNode.insertBefore( midNode, endMotherNode );
        })

        newRange.setStartBefore( firstNodeSpan );
        newRange.setEndAfter( lastNodeSpan );
        selection.removeAllRanges();
        selection.addRange( newRange );
    }

}

MOGL3D.prototype.removeEmptyNodes = function( node ) {

    if (!node) return;

    for (let i = 0; i < node.childNodes.length; i++) {
        const child = node.childNodes[i];

        this.removeEmptyNodes(child);

        if ((child.nodeType === Node.ELEMENT_NODE && child.innerHTML === '') ||
            (child.nodeType === Node.TEXT_NODE && child.textContent.trim() === '')) {
            node.removeChild(child);
            i--;
        }
    }
}

MOGL3D.prototype.changeNodeToNode = function( target, convert ) {
    
    let cloneTarget = target.cloneNode(true);

    while( cloneTarget.firstChild ) {
        convert.appendChild( cloneTarget.firstChild );
    }
    return convert;

}

MOGL3D.prototype.findChildIndex = function ( parent, element ) {

    let children = Array.prototype.slice.call(parent.childNodes);
    let index = children.indexOf( element );

    return index;

}

MOGL3D.prototype.extractText = function( node ) {
    
    let text = '';
    if (node.nodeType === Node.TEXT_NODE) {
        text += node.nodeValue;
    } else if (node.nodeType === Node.ELEMENT_NODE) {
        node.childNodes.forEach(child => {
            text += this.extractText(child);
        });
    }
    return text;

}

MOGL3D.prototype.findParentNode = function( node, tag ) {
    
    while( node !== null && node.tagName !== tag ) {
        node = node.parentNode;
    }

    return node;
}

MOGL3D.prototype.removeChildNode = function( node, tag, className ) {
    
    let class_ = ( className ) ? className : null;
    const nodes = node.querySelectorAll( tag );

    nodes.forEach( el => {
        
        if( el.className === class_ ) {
            while (el.firstChild) {
                el.parentNode.insertBefore(el.firstChild, el);
            }
            
            el.parentNode.removeChild(el);
        }
        
    });

}

MOGL3D.prototype.removeNullNode = function( node ) {

    Array.from( node.childNodes ).forEach( child => {

        this.removeNullNode( child );

        if( this.isNodeEmpty( child ) ) {
            node.removeChild( child );
        }

    })

}

MOGL3D.prototype.isNodeEmpty = function ( node ) {

    if (node.nodeType === Node.ELEMENT_NODE) {
        
        return node.childNodes.length === 0 || this.areAllChildrenEmpty( node );
    
    } else if (node.nodeType === Node.TEXT_NODE) {

        return !node.textContent.trim();

    }

    return false;

}

MOGL3D.prototype.areAllChildrenEmpty = function( node ) {

    for (let i = 0; i < node.childNodes.length; i++) {
        if (! this.isNodeEmpty( node.childNodes[i]) ) {
            return false;
        }
    }

    return true;

}

MOGL3D.prototype.removeUpToTagName = function( startNode, tagName ) {

    let parent;

    while ( startNode.parentNode && startNode.parentNode.nodeName !== tagName.toUpperCase()) {
        startNode = startNode.parentNode;
    }

    if ( startNode.parentNode && startNode.parentNode.nodeName === tagName.toUpperCase()) {
        
        parent = startNode.parentNode;
        startNode.parentNode.removeChild(startNode);
    }

    return parent;

}

MOGL3D.prototype.removeParentNode = function( node, tag ){
    
    while ( node !== null && node.tagName !== tag ) {
        node = node.parentNode;
    }

    if (node && node.tagName === tag ) {
    
        const parent = node.parentNode;
        console.log('parent: ', parent );
        while (node.firstChild) {
            parent.insertBefore(node.firstChild, node);
        }
        
        parent.removeChild(node);
    }

    return node;

}

MOGL3D.prototype.collectNode = function( node, tag, arr ) {
    
    if (node.nodeType === Node.ELEMENT_NODE && node.tagName === tag) {
        arr.push(node);
    }
    Array.from(node.childNodes).forEach(child => this.collectNode( child, tag, arr ));
    return arr;
    
}

MOGL3D.prototype.cleanNode = function( node ) {
    while ( node.firstChild ) {
        node.removeChild( node.firstChild );
    }
}

MOGL3D.prototype.processFiles = function ( files ) {

    let mogl3dContent = document.querySelector(`.${this.editorName}`);
    let contentNode = document.createElement('div');
    contentNode.innerHTML = mogl3dContent.innerHTML;

    return files.map( file => {

        return new Promise( resolve => {

            let node = contentNode.querySelector(`.${file.className}`);
            node.parentNode.className = file.className;

            this.cleanNode( node.parentNode );
            resolve({ 'data': file, 'code': contentNode.innerHTML });

        });
    });

}

MOGL3D.prototype.getDatas = async function() {

    let fileDatas = [];
        let outputCodes = null;
        let files = this.getFiles();
        if( !files ) return null;
        let promises = this.processFiles( files );
        let results = await Promise.allSettled( promises );

        results.forEach( result => {

            if ( result.status === 'fulfilled' ) {

                fileDatas.push( result.value.data );
                outputCodes = result.value.code;
            }

        });

        return {
            'code': outputCodes,
            'files': fileDatas 
        }
    }

    MOGL3D.prototype.getOutputData = async function( editor ) {

        let res = await editor.getDatas();
        if( !res ) res = document.querySelector(`.${this.editorName}`);
        
        return res;

    }

export { MOGL3D }
