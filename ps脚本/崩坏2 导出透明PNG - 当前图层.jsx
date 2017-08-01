

var docRef = app.activeDocument;

var saveName = docRef.name;
var saveFile = File("~/Desktop/" + saveName);

var alphaName = saveName.replace(/.png/, "_Alpha.png")
    //$.writeln (alphaName);
var fileAlpha = File(docRef.path + "/" + alphaName);
//$.writeln (docRef.path + "/" + alphaName);
if (fileAlpha.exists) {
    var docAlpha = app.open(fileAlpha);

    //$.writeln (savePath+"/export/"+fileRef.displayName);

    app.activeDocument = docRef;
    docRef.artLayers[0].copy();
    app.activeDocument = docAlpha;
    app.activeDocument.paste();
    docRef.close(SaveOptions.DONOTSAVECHANGES);
    app.activeDocument.artLayers[0].visible = false;
    var r = app.activeDocument.activeChannels[0];
    var s = app.activeDocument.selection.load(r, SelectionType.REPLACE, false);
    app.activeDocument.artLayers[0].visible = true;
    app.activeDocument.selection.cut();
    for (var i = 0; i < app.activeDocument.artLayers.length; i++) {
        app.activeDocument.artLayers[i].visible = false;
    }
    var result = app.activeDocument.paste();

    app.activeDocument.saveAs(saveFile, PNGSaveOptions, true, Extension.NONE)

    docAlpha.close(SaveOptions.DONOTSAVECHANGES);
} else {
    alert("_Alpha文件不存在！");
}
