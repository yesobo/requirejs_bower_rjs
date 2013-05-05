/**
 * @license RequireJS Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */

function processFile(){htmlFile=files[fileIndex],fileIndex+=1;if(!htmlFile)return;transFile=htmlFile+".trans",console.log("Creating "+htmlFile),child_process.exec("./Markdown.pl --html4tags "+htmlFile+" > "+transFile,function(e,t,n){if(e){console.log("Could not markdown "+htmlFile),processFile();return}fileContents=file.readFile(transFile),title=h1RegExp.exec(fileContents),title=title&&title[1],fileContents=preContents+fileContents+postContents,h1=fileContents.match(/<h1>([^<]+)<\/h1>/),h1&&h1[1]?h1=h1[1]:h1="",fileContents=fileContents.replace(/\$\{title\}/,h1),fileContents=fileContents.replace(/href="requirejs\/tree\/master\/docs\//g,'href="docs/').replace(/href="([^"]+)\.md/g,'href="$1.html'),homePath=htmlFile.replace(/\/[^\/]+$/,"").replace(/^\.\/dist-site\//,"");if(!homePath||homePath==="dist-site")isTopPage=!0,homePath="./",cssPath="main.css",ieCssPath="ie.css",jsPath="init.js";else{isTopPage=!1,length=homePath.split("/").length,homePath="";for(j=0;j<length-1;j++)homePath+="../";cssPath=homePath+"main.css",ieCssPath=homePath+"ie.css",jsPath=homePath+"init.js"}fileContents=fileContents.replace(/HOMEPATH/g,homePath),fileContents=fileContents.replace(/\main\.css/,cssPath),fileContents=fileContents.replace(/\ie\.css/,ieCssPath),fileContents=fileContents.replace(/\init\.js/,jsPath),title&&(fileContents=fileContents.replace(/<title>[^<]*<\/title>/,"<title>"+title+"</title>")),isTopPage&&(fileContents=fileContents.replace(/href="\.\.\/"/g,'href="./"').replace(/class="local" href="([^"]+)"/g,'class="local" href="docs/$1"')),file.saveFile(htmlFile,fileContents),file.deleteFile(transFile),processFile()})}var files,htmlFile,transFile,fileContents,preContents,postContents,h1,homePath,cssPath,ieCssPath,jsPath,length,j,title,isTopPage=!1,fileIndex=0,h1RegExp=/<h1>([^<]+)<\/h1>/,file=require("./file"),child_process=require("child_process");file.copyFile("init.js","./dist-site/init.js"),file.copyDir("fonts","./dist-site/fonts",/\w/),file.copyFile("../index.html","./dist-site/index.html"),file.copyDir("../docs/","./dist-site/docs/",/\w/),preContents=file.readFile("pre.html"),postContents=file.readFile("post.html"),files=file.getFilteredFileList("./dist-site",/\.html$/,!0),processFile();