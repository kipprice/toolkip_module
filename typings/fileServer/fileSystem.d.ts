/// <reference path="../../compiled_js/fileSystemAPI.d.ts" />
/**----------------------------------------------------------------------------
 * @class   FileStorage
 * ----------------------------------------------------------------------------
 * Allow storing into a local filesystem
 * @author  Kip Price
 * @version 1.0.0
 * ----------------------------------------------------------------------------
 */
export declare class _FileStorage {
    /** store the file system we work within, in order to be more efficient */
    protected _fileSystem: any;
    /** set a default storage size */
    protected readonly _DEFAULT_SIZE: number;
    /** keep track of the file system type we are using */
    protected _fileSystemType: any;
    /**
     * save
     * ----------------------------------------------------------------------------
     * Save a file to local storage
     * @param   fileName    The name of the file to save
     * @param   data        The data within the file to save
     */
    save(fileName: string, data: Blob, directoryPath?: string): Promise<boolean>;
    /**
     * load
     * ----------------------------------------------------------------------------
     * Load a file from local storage
     * @param fileName
     */
    load(fileName: string, directoryPath?: string): Promise<string>;
    /**
    * deleteLocalFile
    * ----------------------------------------------------------------------------
    * @param directoryPath
    * @param fileName
    */
    deleteLocalFile(directoryPath: string, fileName: string): Promise<boolean>;
    /**
     * createDirectory
     * ----------------------------------------------------------------------------
     * Create a local directory
     * @param   directoryPath   The name of the directory to create
     * @returns Promise that will create a directory
     *
     */
    createDirectory(directoryPath: string): Promise<boolean>;
    /**
     * getDirectory
     * ----------------------------------------------------------------------------
     * @param directoryPath
     *
     */
    getDirectory(directoryPath: string): Promise<DirectoryEntry>;
    /**
     * getDirectoryContents
     * ----------------------------------------------------------------------------
     * Find everything that is directly a part of this directory
     * @param   directoryName   The directory to find
     *
     */
    getDirectoryContents(directoryName: string, create?: boolean): Promise<DirectoryContentEntry[]>;
    /**
     * _requestFileSystem
     * ----------------------------------------------------------------------------
     * Ensure we have a file system in order to kick off the request
     */
    protected _getFileSystem(size?: number, type?: any): Promise<FileSystem>;
    /**
     * _requestQuota
     * ----------------------------------------------------------------------------
     * Request some storage for our app
     * @param size  The amount of storage to request, in bytes
     */
    protected _requestQuota(size: number): Promise<number>;
    /**
     * _requestFileSystem
     * ----------------------------------------------------------------------------
     * Retrieve the local file system that we will be saving into
     */
    protected _requestFileSystem(type: any, size: number): Promise<FileSystem>;
    /**
     * _createFile
     * ----------------------------------------------------------------------------
     * Create a file with a particular name
     */
    protected _createFile(dirEntry: DirectoryEntry, fileName: string): Promise<FileEntry>;
    /**
     * _getFileWriter
     * ----------------------------------------------------------------------------
     * return a promise that will retrieve a file writer
     */
    protected _getFileWriter(fileEntry: FileEntry): Promise<FileWriter>;
    /**
     * _writeFile
     * ----------------------------------------------------------------------------
     * Add details to a particular file
     * @param data
     */
    protected _writeFile(writer: FileWriter, entry: FileEntry, data: Blob | string, append?: boolean): Promise<boolean>;
    /**
     * _getFileEntry
     * ----------------------------------------------------------------------------
     * Retrieve meta-details about a file
     */
    protected _getFileEntry(dir: DirectoryEntry, fileName: string, create?: boolean): Promise<FileEntry>;
    /**
     * _getFile
     * ----------------------------------------------------------------------------
     * Grab the file object within a FileEntry
     */
    protected _getFile(fileEntry: FileEntry): Promise<File>;
    /**
     * _readFile
     * ----------------------------------------------------------------------------
     * Read the contents of a file into the resolve function
     */
    protected _readFile(file: File): Promise<string>;
    /**
     * _getDirectoryEntry
     * ----------------------------------------------------------------------------
     * @param directoryName
     * @param create
     */
    protected _getDirectoryEntry(fileSystem: FileSystem, directoryName?: string, create?: boolean): Promise<DirectoryEntry>;
    /**
     * _getFileSystemRoot
     * ----------------------------------------------------------------------------
     * Grab the root directory of our current file system
     */
    protected _getFileSystemRoot(fileSystem: FileSystem): Promise<DirectoryEntry>;
    /**
     * _splitDirectoryPathPieces
     * ----------------------------------------------------------------------------
     * Split a directory path into its relevant subpaths
     */
    protected _splitDirectoryPathPieces(directoryName: string): string[];
    /**
     * _getSubDirectory
     * ----------------------------------------------------------------------------
     * Find a nested directory
     */
    protected _getSubDirectory(directoryEntry: DirectoryEntry, subPath: string, create?: boolean): Promise<DirectoryEntry>;
    /**
     * _readDirectoryContents
     * ----------------------------------------------------------------------------
     * Find the contents of a particular directory
     */
    protected _readDirectoryContents(dirEntry: DirectoryEntry): Promise<DirectoryContentEntry[]>;
    /**
     * _deleteFile
     * ----------------------------------------------------------------------------
     * delete a file from our system
     */
    protected _deleteFile(file: FileEntry): Promise<boolean>;
    /**
     * _handleError
     * ----------------------------------------------------------------------------
     * Log appropriate details when an error occurs
     */
    protected _handleError(err: any, reject?: Function): void;
}
export declare const FileStorage: _FileStorage;
