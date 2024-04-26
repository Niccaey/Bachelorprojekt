import $ from '../externals/jquery.js';
import { GridActionEbook } from '../model/GridActionEbook';
import { constants } from '../util/constants';
import { localStorageService } from './data/localStorageService';
import { inputEventHandler } from '../input/inputEventHandler';
import { MainVue } from '../vue/mainVue';
import { i18nService } from './i18nService';

let ebookService= {};

let viewer = null;
let book;
let globalToc;
let currentChapter = 0;
let rendition;
let fontPercent = 100;

let inputElement = document.getElementById("ebookReader");

ebookService.doAction = async function (action) {

    inputElement.addEventListener('change', function (e) {
        let file = e.target.files[0];
        if (window.FileReader) {
            let reader = new FileReader();
            reader.onload = openBook;
            reader.readAsArrayBuffer(file);
        }
    });

    if(book) book.destroy();

    book = ePub();
    console.log(book.opened, book.pagelist)

    let title = document.getElementById("title");
    let next = document.getElementById("next");
    let prev = document.getElementById("prev");
    let big = document.getElementById("big");
    let small = document.getElementById("small");

    let bookUrl = action;
    let bookData = action && action.target ? action.target.result :null;
    if(bookData) {
        await book.open(bookData, "binary");
    } else {
        await book.open(bookUrl);
    }

    book.loaded.navigation.then(function(toc){
        let select = document.getElementById("toc"),
            docfrag = document.createDocumentFragment();
        globalToc = toc.toc;
        toc.forEach(function(chapter) {
            let option = document.createElement("option");
            option.textContent = chapter.label;
            option.ref = chapter.href;

            docfrag.appendChild(option);
        });

        select.appendChild(docfrag);

        select.onchange = function(){
            let index = select.selectedIndex,
                url = select.options[index].ref;
            console.log(index, url)
            rendition.display(url);
            return false;
        };
    });

    rendition = book.renderTo("viewer", {
        width: 700,
        height: 100,
        allowScriptedContent: true
    });

    rendition.display(20);

    let keyListener = function(e){
        console.log(e)
        // Left Key
        if (!e.ctrlKey && (e.keyCode || e.which) == 37) {
            rendition.prev();
        }

        // Left Key
        if (e.ctrlKey && (e.keyCode || e.which) == 37) {
            if(currentChapter > 0) {
                currentChapter--;
            }
            rendition.display(globalToc[currentChapter].href);
        }

        // Right Key
        if (!e.ctrlKey && (e.keyCode || e.which) == 39) {
            rendition.next();
        }

        // Right Key
        if (e.ctrlKey && (e.keyCode || e.which) == 39) {
            if(currentChapter < globalToc.length - 1) {
                currentChapter++;
            }
            rendition.display(globalToc[currentChapter].href);
        }

        // UP Key
        if ((e.keyCode || e.which) == 38) {
            fontPercent = fontPercent + 10;
            rendition.themes.fontSize(fontPercent + "%");
        }

        // DOWN Key
        if ((e.keyCode || e.which) == 40) {
            fontPercent = fontPercent - 10;
            rendition.themes.fontSize(fontPercent + "%");
        }
    };

    //rendition.on("keyup", keyListener);
    rendition.on("relocated", function(location){
        console.log(location);
    });

    next.addEventListener("click", function(e){
        rendition.next();
        e.preventDefault();
    }, false);

    prev.addEventListener("click", function(e){
        rendition.prev();
        e.preventDefault();
    }, false);

    big.addEventListener("click", function(e){
        fontPercent = fontPercent + 10;
        rendition.themes.fontSize(fontPercent + "%");
        e.preventDefault();
    }, false);

    small.addEventListener("click", function(e){
        fontPercent = fontPercent - 10;
        rendition.themes.fontSize(fontPercent + "%");
        e.preventDefault();
    }, false);

    document.addEventListener("keyup", keyListener, false);
}

export { ebookService };
