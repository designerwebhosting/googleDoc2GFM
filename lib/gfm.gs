//
* GFM library
//

 var parent = {

    PARAGRAPH: function(element) {                                  
      var headText = heading[element.getAttributes().HEADING]();     
      var loopResponse = loopElement(element);
      loopResponse = paraEmperise(element,loopResponse);
      var style = styling(element);
      loopResponse = headText + loopResponse;
      if (!tableTrigger) {loopResponse = '\n' + loopResponse + '\n' + style + '\n'}  
      listItem = 0;
      return loopResponse},
    
    LIST_ITEM: function(element) {                                  
      listItem++;
      var loopResponse =  loopElement(element);     Logger.log(element.getAttributes())
      if (element.getAttributes().GLYPH_TYPE) {listTag = glyphs[element.getAttributes().GLYPH_TYPE]();}
      var style = styling(element);
      loopResponse = listTag + style + paraEmperise(element,loopResponse);
      if (!tableTrigger) {loopResponse = loopResponse + ' ' + '\n'}  
      if (listItem == 1) {loopResponse = '\n' + loopResponse}
      return loopResponse},
    
    TABLE: function(element) {                                      
      tableTrigger = true;                                         
      var numRows = element.getNumRows();                          
      var style = styling(element);
      var tableCols = element.getRow(0).getNumCells();           
      var tableText = '';
      var headText = [];headText[0] = '\n|';headText[1] = '\n|'; 
      for (c = 0; c < tableCols; c++) { headText[0] = headText[0] + '   |';headText[1] = headText[1] + '---|'; }      
      for (v = 0; v < numRows; v++) {                               
        tableText = tableText + child['TABLE_ROW'](element.getRow(v));
      }                                                             
        tableTrigger = false;
        tableText = headText[0] + headText[1] + tableText + '\n' + style + '\n{:.table}\n';
        listItem = 0;
        return  tableText
      }
  }
  
  var child = {
  
    TEXT: function(element) {                                        
      var keyText = textElement(element);                            
      return keyText},
    
    INLINE_IMAGE: function(element) {                                
      if (!imageTrigger) {imageTrigger = true; images = getImageLnks(gdocId);}
      imgText = '![' + images[imageCounter].alt + '](' + images[imageCounter].url + '){: style="' + images[imageCounter].style + '"}{:  .img-responsive }';
      imageCounter = imageCounter + 1;      
      return  imgText},
    
    TABLE_ROW: function(element) {                                                 
      var numCells = element.getNumCells();                          
      for (j = 0; j < numCells; j++) {                               
        rowText = rowText + child['TABLE_CELL'](element.getCell(j)) + '|';    //Logger.log('cell number: ' + j)
      }                                                              
      head = false;
   return  rowText},
    
    INLINE_DRAWING: function(element) {
      if (!imageTrigger) {imageTrigger = true; images = getImageLnks(gdocId);}
      imgText = '![' + images[imageCounter].alt + '](' + images[imageCounter].url + '){: style="' + images[imageCounter].style + '"}{:  .img-responsive }';
      imageCounter = imageCounter + 1;
      return  imgText},
    
    TABLE_CELL: function(element) {                                 
      var cellText = '';                                              
      var numChilds = element.getNumChildren();                       
      for (w = 0; w < numChilds; w++) {                                
        cellText = cellText + parent['PARAGRAPH'](element.getChild(w)); 
      }
      return cellText}
  }

  var heading = {
    Normal: function() {return ''},
    Title: function() {return '# '},
    Subtitle: function() {return '## '},
    'Heading 1': function() {return '# '},
    'Heading 2': function() {return '## '},
    'Heading 3': function() {return '### '},
    'Heading 4': function() {return '#### '},
    'Heading 5': function() {return '##### '},
    'Heading 6': function() {return '###### '}
  }
  
  var glyphs = {
      BULLET: function() {return '- '},
      NUMBER: function() {return listItem + '. '}
      }
  
  var getAttr = {
      FONT_SIZE: function(attr) {return ['font-size:' + attr + 'px;',attr]}, 
      ITALIC: function(txt) {return ['','*'+txt+'*']}, 
      HORIZONTAL_ALIGNMENT: function(attr) {return ['text-align:' + attr + ';','']}, 
      INDENT_END: function(attr) {return ['','']}, 
      INDENT_START: function(text) {return ['','> ' + text ]}, 
      LINE_SPACING: function(attr) {return ['line-height:' + attr + ';','']}, 
      LINK_URL: function(txt,url) {return ['','[' + txt + '](' + url + ')']}, 
      UNDERLINE: function(txt) {return ['', txt]}, 
      BACKGROUND_COLOR: function(attr) {return ['background-color:' + attr + ';',attr]},
      INDENT_FIRST_LINE: function(text) {return ['','']}, 
      LEFT_TO_RIGHT: function(atr) {return ['',''] }, 
      SPACING_BEFORE: function(attr) {return ['margin-top:' + attr + 'px;','']}, 
      HEADING: function(attr) {return [ '', heading[attr]()]}, 
      SPACING_AFTER: function(attr) {return ['margin-bottom:' + attr + 'px;','']}, 
      STRIKETHROUGH: function(txt) {return ['','~~'+txt+'~~']}, 
      FOREGROUND_COLOR: function(attr) {return ['color:' + attr + ';', attr]}, 
      BOLD: function(txt) {return ['','**'+txt+'**']}, 
      FONT_FAMILY: function(attr) { if (fonts[attr]) {
        markdown.head = markdown.head + '\n    <link href="https://fonts.googleapis.com/css?family=' + fonts[attr] + '" rel="stylesheet" type="text/css">';}
        return ['font-family:' + attr + ';',attr]},
      GLYPH_TYPE: function(attr) {return ['','']},
      LIST_ID: function(attr) {return ['','']},
      BORDER_COLOR: function(attr) {return ['border-color:' + attr + ';','']},
      BORDER_WIDTH: function(attr) {return ['border-width:' + attr + 'px;','']},
      PADDING_LEFT: function(attr) {return ['padding-left:' + attr + 'px;','']},
      PADDING_RIGHT: function(attr) {return ['padding-right:' + attr + 'px;','']},
      PADDING_TOP: function(attr) {return ['padding-top:' + attr + 'px;','']},
      PADDING_BOTTOM: function(attr) {return ['padding-bottom:' + attr + 'px;','']},
      VERTICAL_ALIGNMENT: function(attr) {return ['vertical-align:' + attr + 'px;','']},
      WIDTH: function(attr) {return ['width:' + attr + 'px;','']}
    }
    
    var imageAttr = {
      WIDTH: function(attr) {return 'width:' + attr.WIDTH + ';'}, 
      HEIGHT: function(attr) {return 'heigh:' + attr.HEIGHT + ';'}, 
      LINK_URL: function(attr) {return ''}
    }
  
  var fonts = {
    Garamond: 'EB+Garamond',
    Syncopate: 'Syncopate',
    'Droid Serif': 'Droid+Sans',
    Pacifico: 'Pacifico',
    'Open Sans': 'Open+Sans'
    //'Times New Roman': '',
    //'Comic Sans MS': ''.
    //'Arial Black': ''
  }
