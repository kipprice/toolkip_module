"use strict";
//import type * as fs from './fileSystemAPI';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**----------------------------------------------------------------------------
 * @class   FileStorage
 * ----------------------------------------------------------------------------
 * Allow storing into a local filesystem
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
class _FileStorage {
    constructor() {
        //.....................
        //#region PROPERTIES
        /** set a default storage size */
        this._DEFAULT_SIZE = 100 * 1024 * 1024;
        //#endregion
        //..................
    }
    //#ndregion
    //.....................
    //...........................
    //#region PUBLIC FUNCTIONS
    /**
     * save
     * ----------------------------------------------------------------------------
     * Save a file to local storage
     * @param   fileName    The name of the file to save
     * @param   data        The data within the file to save
     */
    save(fileName, data, directoryPath) {
        return __awaiter(this, void 0, void 0, function* () {
            let fs = yield this._getFileSystem();
            let dirEntry = yield this._getDirectoryEntry(fs, directoryPath, true);
            let file = yield this._createFile(dirEntry, fileName);
            let fw = yield this._getFileWriter(file);
            let success = yield this._writeFile(fw, file, data);
            return success;
        });
    }
    /**
     * load
     * ----------------------------------------------------------------------------
     * Load a file from local storage
     * @param fileName
     */
    load(fileName, directoryPath) {
        return __awaiter(this, void 0, void 0, function* () {
            let fs = yield this._getFileSystem();
            let dirEntry = yield this._getDirectoryEntry(fs, directoryPath, false);
            let fileEntry = yield this._getFileEntry(dirEntry, fileName);
            let file = yield this._getFile(fileEntry);
            let content = this._readFile(file);
            return content;
        });
    }
    /**
    * deleteLocalFile
    * ----------------------------------------------------------------------------
    * @param directoryPath
    * @param fileName
    */
    deleteLocalFile(directoryPath, fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            let fs = yield this._getFileSystem();
            let dirEntry = yield this._getDirectoryEntry(fs, directoryPath, false);
            let fileEntry = yield this._getFileEntry(dirEntry, fileName);
            let deleted = this._deleteFile(fileEntry);
            return deleted;
        });
    }
    /**
     * createDirectory
     * ----------------------------------------------------------------------------
     * Create a local directory
     * @param   directoryPath   The name of the directory to create
     * @returns Promise that will create a directory
     *
     */
    createDirectory(directoryPath) {
        return __awaiter(this, void 0, void 0, function* () {
            let fs = yield this._getFileSystem();
            let dirEntry = yield this._getDirectoryEntry(fs, directoryPath, true);
            return !!dirEntry;
        });
    }
    /**
     * getDirectory
     * ----------------------------------------------------------------------------
     * @param directoryPath
     *
     */
    getDirectory(directoryPath) {
        return __awaiter(this, void 0, void 0, function* () {
            let fs = yield this._getFileSystem();
            let dirEntry = yield this._getDirectoryEntry(fs, directoryPath);
            return dirEntry;
        });
    }
    /**
     * getDirectoryContents
     * ----------------------------------------------------------------------------
     * Find everything that is directly a part of this directory
     * @param   directoryName   The directory to find
     *
     */
    getDirectoryContents(directoryName, create) {
        return __awaiter(this, void 0, void 0, function* () {
            let fs = yield this._getFileSystem();
            let dirEntry = yield this._getDirectoryEntry(fs, directoryName, create);
            let contents = yield this._readDirectoryContents(dirEntry);
            return contents;
        });
    }
    //#endregion
    //...........................
    //.....................
    //#region FILESYSTEM
    /**
     * _requestFileSystem
     * ----------------------------------------------------------------------------
     * Ensure we have a file system in order to kick off the request
     */
    _getFileSystem(size, type) {
        return __awaiter(this, void 0, void 0, function* () {
            // If we aren't resizing, just use the current file system
            if (this._fileSystem && !size) {
                return Promise.resolve(this._fileSystem);
            }
            // If this browser doesn't support file system, quit with an error
            window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
            if (!requestFileSystem) {
                return Promise.reject("browser doesn't support file system");
            }
            // if a size wasn't provided, set a default of 10mb
            if (!size) {
                size = this._DEFAULT_SIZE;
            }
            // if a type wasn't specified, default to persistent
            if (!type) {
                type = PERSISTENT;
            }
            this._fileSystemType = type;
            let quotaSize = yield this._requestQuota(size);
            return yield this._requestFileSystem(type, quotaSize);
        });
    }
    /**
     * _requestQuota
     * ----------------------------------------------------------------------------
     * Request some storage for our app
     * @param size  The amount of storage to request, in bytes
     */
    _requestQuota(size) {
        return new Promise((resolve, reject) => {
            // If it's Chrome, we need to get a quota
            try {
                window.webkitStorageInfo.requestQuota(PERSISTENT, size, (grantedBytes) => {
                    resolve(grantedBytes);
                }, (err) => {
                    this._handleError(err, reject);
                });
                // If this failed, we don't need to request a quota
            }
            catch (e) {
                resolve(size);
            }
        });
    }
    /**
     * _requestFileSystem
     * ----------------------------------------------------------------------------
     * Retrieve the local file system that we will be saving into
     */
    _requestFileSystem(type, size) {
        return new Promise((resolve, reject) => {
            requestFileSystem(type, size, (fs) => {
                this._fileSystem = fs;
                resolve(this._fileSystem);
            }, (err) => {
                this._handleError(err, reject);
            });
        });
    }
    //#endregion
    //.....................
    //........................
    //#region FILE CREATION
    /**
     * _createFile
     * ----------------------------------------------------------------------------
     * Create a file with a particular name
     */
    _createFile(dirEntry, fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._getFileEntry(dirEntry, fileName, true);
        });
    }
    /**
     * _getFileWriter
     * ----------------------------------------------------------------------------
     * return a promise that will retrieve a file writer
     */
    _getFileWriter(fileEntry) {
        return new Promise((resolve, reject) => {
            fileEntry.createWriter((writer) => { resolve(writer); }, (err) => { this._handleError(err, reject); });
        });
    }
    /**
     * _writeFile
     * ----------------------------------------------------------------------------
     * Add details to a particular file
     * @param data
     */
    _writeFile(writer, entry, data, append) {
        return new Promise((resolve, reject) => {
            // handle when the file is done writing
            writer.onwriteend = () => {
                if (writer.length === 0) {
                    writer.seek(0);
                    writer.write(data);
                }
                else {
                    resolve(true);
                }
            };
            // handle any errors that occur in writing
            writer.onerror = (err) => {
                this._handleError(err, reject);
            };
            // If we are not appendind, clear the file then write via the onwriteend handler
            if (!append) {
                writer.truncate(0);
                // If we are appending, find the end of the file and and do so
            }
            else {
                writer.seek(writer.length);
                writer.write(data);
            }
        });
    }
    //#endregion
    //........................
    //........................
    //#region READ FILES
    /**
     * _getFileEntry
     * ----------------------------------------------------------------------------
     * Retrieve meta-details about a file
     */
    _getFileEntry(dir, fileName, create) {
        return new Promise((resolve, reject) => {
            dir.getFile(fileName, { create: create, exclusive: false }, (fileEntry) => {
                resolve(fileEntry);
            }, (err) => {
                this._handleError(err, reject);
            });
        });
    }
    /**
     * _getFile
     * ----------------------------------------------------------------------------
     * Grab the file object within a FileEntry
     */
    _getFile(fileEntry) {
        return new Promise((resolve, reject) => {
            fileEntry.file((file) => { resolve(file); }, (err) => { this._handleError(err, reject); });
        });
    }
    /**
     * _readFile
     * ----------------------------------------------------------------------------
     * Read the contents of a file into the resolve function
     */
    _readFile(file) {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.onloadend = (e) => {
                resolve(reader.result);
            };
            reader.onerror = (err) => {
                this._handleError(err, reject);
            };
            reader.readAsText(file);
        });
    }
    //#endregion
    //........................
    //.................................
    //#region DIRECTORY MANIPULATION
    /**
     * _getDirectoryEntry
     * ----------------------------------------------------------------------------
     * @param directoryName
     * @param create
     */
    _getDirectoryEntry(fileSystem, directoryName, create) {
        return __awaiter(this, void 0, void 0, function* () {
            // make sure we don't have any characters we don't want in our directory name
            directoryName = _cleanDirectory(directoryName);
            // kick things off with the root director for the loaded file system
            let fsRoot = yield this._getFileSystemRoot(fileSystem);
            // split the directory string to get the appropriate path
            // (for now handle either types of slashes)
            let curDir = fsRoot;
            let pathPieces = this._splitDirectoryPathPieces(directoryName);
            for (let pathPiece of pathPieces) {
                if (!pathPiece) {
                    continue;
                }
                // create a promise to return this sub-directory
                curDir = yield this._getSubDirectory(curDir, pathPiece, create);
            }
            // return the chained promises
            return curDir;
        });
    }
    /**
     * _getFileSystemRoot
     * ----------------------------------------------------------------------------
     * Grab the root directory of our current file system
     */
    _getFileSystemRoot(fileSystem) {
        return new Promise((resolve, reject) => {
            if (!fileSystem) {
                reject("No filesystem");
            }
            resolve(fileSystem.root);
        });
    }
    /**
     * _splitDirectoryPathPieces
     * ----------------------------------------------------------------------------
     * Split a directory path into its relevant subpaths
     */
    _splitDirectoryPathPieces(directoryName) {
        if (!directoryName) {
            return [];
        }
        return directoryName.split(/[\/\\]/g);
    }
    /**
     * _getSubDirectory
     * ----------------------------------------------------------------------------
     * Find a nested directory
     */
    _getSubDirectory(directoryEntry, subPath, create) {
        return new Promise((resolve, reject) => {
            directoryEntry.getDirectory(subPath, { create: create }, (dir) => { resolve(dir); }, (err) => { reject(err); });
        });
    }
    /**
     * _readDirectoryContents
     * ----------------------------------------------------------------------------
     * Find the contents of a particular directory
     */
    _readDirectoryContents(dirEntry) {
        return new Promise((resolve, reject) => {
            let reader = dirEntry.createReader();
            reader.readEntries((entries) => { resolve(entries); }, (err) => { this._handleError(err, reject); });
        });
    }
    //#endregion
    //.....................
    //#region DELETE FILE
    /**
     * _deleteFile
     * ----------------------------------------------------------------------------
     * delete a file from our system
     */
    _deleteFile(file) {
        return new Promise((resolve, reject) => {
            file.remove(() => {
                resolve(true);
            }, (err) => {
                this._handleError(err, reject);
            });
        });
    }
    //#endregion
    //.....................
    //..................
    //#region HELPERS
    /**
     * _handleError
     * ----------------------------------------------------------------------------
     * Log appropriate details when an error occurs
     */
    _handleError(err, reject) {
        console.error(err);
        if (reject) {
            reject(err);
        }
    }
}
function _cleanDirectory(directoryName) {
    let loopCnt = 0;
    // ensure that the directory path doesn't have any up-stream motions
    while (directoryName.indexOf("..") !== -1) {
        // replace any problematic character strings
        directoryName = directoryName.replace(/\.\./g, "");
        directoryName = directoryName.replace(/\/\//g, "/");
        directoryName = directoryName.replace(/\\\\/g, "\\");
        // verify we aren't in an infinite loop
        loopCnt += 1;
        if (loopCnt > 1000) {
            return "";
        }
    }
    return directoryName;
}
exports.FileStorage = new _FileStorage();
