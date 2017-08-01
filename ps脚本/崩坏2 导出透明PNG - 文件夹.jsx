var selectFolder = Folder.selectDialog("选择文件夹");

var saveFolder = new Folder(selectFolder.fullName + "/export");
saveFolder.create();

var savePath = saveFolder.fullName;

var fileList = selectFolder.getFiles();
for (var i = 0; i < fileList.length; i++) {
    isAlpha(fileList[i]);

}


function isAlpha(fileRef) {


    var saveName = fileRef.displayName;

    //$.writeln(savePath + "/" + saveName)

    var saveFile = File(savePath + "/" + saveName);


    var alphaName = saveName.replace(/.png/, "_Alpha.png")
    var fileAlpha = File(fileRef.path + "/" + alphaName);

    if (fileAlpha.exists) {
        var docRef = app.open(fileRef);
        var docAlpha = app.open(fileAlpha);
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
        //alert("_Alpha文件不存在！");
        return;
    }
}
