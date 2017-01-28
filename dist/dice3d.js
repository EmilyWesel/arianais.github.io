(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.dice3d = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var table;
var initialized = false;

var initialize = function initialize() {
    table = document.createElement('div');
    table.id = 'dice3d-table';
    document.body.appendChild(table);

    initialized = true;
};

var played = false;

var dice3d = function dice3d(faces, n, callback) {
    if (!initialized) initialize();

    if (faces == 6) {
        var sound = document.getElementById('dice3d-sound');

        if (!played || sound.ended) {
            played = true;
            sound.play();
        } else {
            var audio = document.createElement('audio');
            audio.src = sound.src;
            audio.volume = sound.volume;
            setTimeout(function () {
                audio.play();
            }, Math.random() * 500);
        }

        var angle = {
            1: [90, 0],
            2: [0, 90],
            3: [180, 0],
            4: [0, 0],
            5: [0, -90],
            6: [-90, 0]
        }[n];
        var outer = document.createElement('div');
        outer.className = 'dice3d-outer';
        table.appendChild(outer);

        var dice = document.createElement('div');
        dice.className = 'dice3d';
        dice.style.transform = 'rotateX(' + angle[0] + 'deg) rotateZ(' + angle[1] + 'deg)';
        outer.appendChild(dice);

        var getFace = function getFace(pips) {
            var XMLNS = "http://www.w3.org/2000/svg";
            var svg = document.createElementNS(XMLNS, 'svg');
            svg.setAttribute('class', 'dice3d-face');
            svg.setAttribute('width', 50);
            svg.setAttribute('height', 50);

            pips.map(function (pip) {
                var circle = document.createElementNS(XMLNS, 'circle');
                Object.keys(pip).forEach(function (key) {
                    return circle.setAttribute(key, pip[key]);
                });
                return circle;
            }).forEach(function (circle) {
                return svg.appendChild(circle);
            });

            return svg;
        };

        [[{ cx: 25, cy: 25, r: 9.4, fill: 'red' }], [{ cx: 12.5, cy: 12.5, r: 4.7}, { cx: 37.5, cy: 37.5, r: 4.7 }], [{ cx: 12.5, cy: 12.5, r: 4.7 }, { cx: 25, cy: 25, r: 4.7 }, { cx: 37.5, cy: 37.5, r: 4.7 }], [{ cx: 12.5, cy: 12.5, r: 4.7 }, { cx: 37.5, cy: 37.5, r: 4.7 }, { cx: 12.5, cy: 37.5, r: 4.7 }, { cx: 37.5, cy: 12.5, r: 4.7 }], [{ cx: 12.5, cy: 12.5, r: 4.7 }, { cx: 25, cy: 25, r: 4.7 }, { cx: 37.5, cy: 37.5, r: 4.7 }, { cx: 12.5, cy: 37.5, r: 4.7 }, { cx: 37.5, cy: 12.5, r: 4.7 }], [{ cx: 12.5, cy: 12.5, r: 4.7 }, { cx: 37.5, cy: 37.5, r: 4.7 }, { cx: 12.5, cy: 25, r: 4.7 }, { cx: 37.5, cy: 25, r: 4.7 }, { cx: 12.5, cy: 37.5, r: 4.7 }, { cx: 37.5, cy: 12.5, r: 4.7 }]].map(getFace).forEach(function (face) {
            return dice.appendChild(face);
        });

        setTimeout(function () {
            outer.addEventListener('transitionend', function (e) {
                table.removeChild(this);
                if (callback) {
                    callback();
                }
            });
            outer.style.opacity = 0;;
        }, 3 * 1000);
    } else {
        console.error('Unsupported number of faces: ' + faces);
    }
};

module.exports = dice3d;

},{}]},{},[1])(1)
});
