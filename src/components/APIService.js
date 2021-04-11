// import { format } from 'quasar';
import { date } from 'quasar';
import axios from 'axios';
import Vue from 'vue';
import AxiosPlugin from 'vue-axios-cors';
import JSONDATA from 'assets/json/1337.json';
// import { promises as fs } from 'fs';
// import fs from 'fs';
// import { promisify } from 'util';

Vue.use(AxiosPlugin);

//const { pad } = format

// const readFileAsync = promisify(fs.readFile)
// const fsPromises = fs.promises;
// const readFile = util.promisify(fs.readFile);
// let JSONDATA;
/*
function handleFile(error,data) {
    if (error) {
        console.error(error.message);
        throw error
    } else {
        const DATA = JSON.parse(data);
        JSONDATA = DATA.programme.entries;
        console.log('APIService.handleFile -> response is : ' + JSON.stringify(JSONDATA[0].title));
    }        
}
*/

export class APIService{

    constructor() {
        this.isservicelocal = false;
        this.isfilelocal = false;
        this.isproduction = true;
        this.localName = 'Production';
        this.status = { code: 0, message: '' };
        this.response = [];
        this.responseDate = '';
        this.hasData = false;
        this.wasExecuted = false;
        this.filename = '';
        if (this.isservicelocal) {
            this.API_URL = 'https://epg-api.video.globo.com/programmes'
        } else {
            this.API_URL = 'http://localhost:3000/programme'
        }
        this.monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
        ];
        this.daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        this.currentDate = new Date();
        this.searchDate = new Date();
        this.date = this.currentDate.getDate();
        this.day = this.currentDate.getDay();
        this.month = this.currentDate.getMonth() + 1;
        this.year = this.currentDate.getFullYear();
        this.timestamp = this.currentDate.getTime();
        this.hours = this.currentDate.getHours();
        this.minutes = this.currentDate.getMinutes();
        this.seconds = this.currentDate.getSeconds();

        // this.ordinalDate = ordinal(this.date) + ' ' + this.monthNames[this.month] + ', ' + this.year;
        // this.ordinalDateWithDayOfWeek = this.daysOfWeek[this.day] + ', ' + this.ordinalDate;

        this.sDay = this.pad(this.day);
        this.sMonth = this.pad(this.month);
        this.sYear = String(this.year);
        this.sDate = this.sYear + '-' + this.sMonth + '-' + this.sDay;
        this.sDatePtBr = this.sDay + '/' + this.sMonth + '/' + this.sYear;
        this.sFileDate = this.sYear + this.sMonth + this.sDay;

        this.sHours = this.pad(this.hours);
        this.sMinutes = this.pad(this.minutes);
        this.sSeconds = this.pad(this.seconds);
        this.sTime = this.sHours + ':' + this.sMinutes + ':' + this.sSeconds;
        this.sFileTime = this.sHours + '-' + this.sMinutes + '-' + this.sSeconds;

        this.sToday = this.sDate + ' ' + this.sTime;
        this.sFileToday = this.sFileDate + '_' + this.sFileTime;
    }
    pad(n) {
        return n < 10 ? '0' + String(n) : String(n);
    }
    setSearchDate(p_dt_Search) { 
        this.searchDate = p_dt_Search; 
        // this.sDate = date.formatDate(this.searchDate, 'YYYY-MM-DD');
    }
    getSearchDate() { return this.searchDate; }
    getYear() { return this.year; }
    getStringYear() { return this.sYear; }

    getMonth() { return this.month; }
    getStringMonth() { return this.sMonth; }

    getDay() { return this.day; }
    getStringDay() { return this.sDay; }

    getTime() { return this.timestamp; }
    getStringTime() { return this.sTime; }

    getHours() { return this.hours; }
    getStringHours() { return this.sHours; }

    getMinutes() { return this.minutes; }
    getStringMinutes() { return this.sMinutes; }

    getSeconds() { return this.seconds; }
    getStringSeconds() { return this.sSeconds; }

    getToday() { return this.currentDate; }
    getStringToday() { return this.sToday; }
    getStringDate() { return this.sDate; }
    getStringDatePtBr() { return this.sDatePtBr; }

    getStringFileToday() { return this.sFileToday; }
    getStringFileDate() { return this.sFileDate; }
    getStringFileTime() { return this.sFileTime; }

    isServiceLocal() { return this.isservicelocal; }
    setServiceLocal() { 
        this.isservicelocal = true;
        this.localName = 'Service';
    }
    setServiceLocalOn() { 
        this.isservicelocal = true;
        this.isfilelocal = false;
        this.isproduction = false;
        this.localName = 'Service';
    }
    setServiceLocalOff() { 
        this.isservicelocal = false; 
        this.isfilelocal = false;
        this.isproduction = true;
        this.localName = 'Production';
    }

    getLocal() { return this.localName; }
    isProduction() { return this.isproduction; }
    setProductionOn() { 
        this.isfilelocal = false;
        this.isservicelocal = false;
        this.isproduction = true;
        this.localName = 'Production';
    }
    setProductionOff() { 
        this.isfilelocal = true;
        this.isservicelocal = false;
        this.isproduction = false;
        this.localName = 'File';
    }

    isFileLocal() { return this.isfilelocal; }
    setFileLocalOn() { 
        this.isfilelocal = true;
        this.isservicelocal = false;
        this.isproduction = false;
        this.localName = 'File';
    }
    setFileLocalOff() {
        this.isfilelocal = false;
        this.isservicelocal = false;
        this.isproduction = true;
        this.localName = 'Production';
    }
    hasReturnedData() { return this.hasData; }
    setReexecution() { 
        this.response = [];
        this.status = { code: 0, message: '' };        
        this.wasExecuted = false; 
    }

    getFileNameCSV() {
        return 'grade_programacao_diaria_' + this.sFileToday;
    }
    getFileName() {
        return this.filename;
    }
    getBaseURL() {
        let URL;
        const searchDate = date.formatDate(this.searchDate, 'YYYY-MM-DD');

        if (this.isfilelocal) {
            URL = 'src/assets/json/1337.json';
            URL = '/home/admlnx/Desktop/_TESTES/grpcomorlei/src/assets/json/1337.json';
            // console.log('APIService.getBaseURL -> Local [%s] -> URL [%s]','File',URL);
        } else {
            if (this.isservicelocal) {
                URL = 'http://localhost:3000/programme';
                URL = `http://localhost:3000/programme?date=${searchDate}`;
                // console.log('APIService.getBaseURL -> Local [%s] -> URL [%s]','Service',URL);
            } else {
                if (process.env.DEV) {
                    URL = `http://localhost:8080/globo/1337?date=${searchDate}`;
                } else {
                    URL = `http://epg-api.video.globo.com/programmes/1337?date=${searchDate}`;
                }
                // console.log('APIService.getBaseURL -> Local [%s] -> URL [%s]','Production',URL);
            }
        }
        this.filename = URL;
        console.log('APIService.getBaseURL -> Local [%s] -> URL [%s]',this.localName,URL);
        return URL;
    }
    getAxiosConfig() {
        let URL = this.getBaseURL();
        let CONFIG;
        if (this.isservicelocal) {
            CONFIG = {
                url: URL,
                method: 'GET',
                timeout: 5000,
                responseType: 'json',
                // credentials: 'include',
                mode: 'no-cors',
                headers: { 
                    'Access-Control-Allow-Origin': '*', // 'http://localhost:9000',
                    'Access-Control-Allow-Method': '*',
                    'Access-Control-Allow-Headers': 'Authorization, Content-Type, X-Requested-With, Accept', // '*'
                    'Access-Control-Allow-Credentials': true,
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Max-Age': 86400,
                    'Accept': 'application/json; odata=verbose',
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }
        } else {
            CONFIG = {
                url: URL,
                method: 'GET',
                timeout: 5000,
                responseType: 'json',
                // credentials: 'include',
                mode: 'no-cors',
                headers: {
                    'Access-Control-Allow-Origin': '*', // 'http://localhost:9000',
                    'Access-Control-Allow-Method': '*',
                    'Access-Control-Allow-Headers': 'Authorization, Content-Type, X-Requested-With, Accept', // '*'
                    'Access-Control-Allow-Credentials': true,
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Max-Age': 86400,
                    'Accept': 'application/json; odata=verbose',
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }
        }
        return CONFIG;
    }
    returnInstanceAxios() {
        axios.head(this.getBaseURL(),this.getAxiosConfig());
        return axios;
    }
    returnInstanceAxiosCustom(instanceAxios) {
        instanceAxios.head(this.getBaseURL(),this.getAxiosConfig());
        return instanceAxios;
    }
    /*
    async readFileAsync() {
        const data = await fsPromises.readFile(this.getBaseURL(), 'utf8');
        return data;
    }
    handleFile(error,data) {
        this.response = null;
        this.status = { code: -1, message: 'NOK' };
        if (error) {
            this.status = { code: -1, message: `APIService.readLocalData -> Error reading json file [${this.fileName}] from disk: ${error}` };
            console.error(this.status.message);
            throw error
        } else {
            this.wasExecuted = true;
            // parse JSON string to JSON object
            const DATA = JSON.parse(data);
            this.status = { code: 200, message: 'OK' };
            this.response = DATA.programme.entries;
            this.hasData = true;
            this.wasExecuted = true;
            console.log('APIService.readLocalData -> response is : ' + JSON.stringify(this.response[0].title));
        }        
    }
    */
    getResponseDate() { this.responseDate; }
    readLocalData() {
        this.response = [];
        this.status = { code: -1, message: 'NOK' };
        this.responseDate = '';
        console.log('APIService.readLocalData => URL [%s]',this.filename);
        if (this.wasExecuted === false) {
            try {
                this.response = JSONDATA.programme.entries;
                this.status = { code: 200, message: 'OK' };
                this.hasData = true;
                this.wasExecuted = true;
                this.responseDate = JSON.stringify(JSONDATA.programme.date);
                console.log('APIService.readLocalData -> response is : ' + 
                ' code: ' + String(this.status.code) + 
                ', message: ' + this.status.message + 
                ', JSON (Date): ' + this.responseDate );
            } catch(error) {
                this.status = { code: -1, message: `APIService.readLocalData -> Error reading file [${this.filename}] from disk: ${error}` };
                console.error(this.status.message);
                throw error;
            }
        }
        return this.response;
    }
    async getAxiosAsync() {
        const URL = this.getBaseURL();
        axios.head(URL,this.getAxiosConfig());
        // RESPONSE = await axios.get(URL)
        const DATA = await axios.get(URL);
        return DATA;
    }
    async readRemoteData() {
        // let RESPONSE;
        const URL = this.getBaseURL();
        this.response = [];
        this.status = { code: -1, message: 'NOK' };
        this.responseDate = '';
        console.log('APIService.readRemoteData => URL [%s]',URL);
        if (this.wasExecuted === false) {
            try {
                // axios.head(URL,this.getAxiosConfig());
                // RESPONSE = await axios.get(URL)
                // axios.get(URL)
                this.getAxiosAsync()
                .then(response => { 
                    if (response.status === 200 ) {
                        if (this.isproduction || this.isfilelocal) {
                            this.response = response.data.programme.entries;
                            this.responseDate = JSON.stringify(response.data.programme.date);
                            console.log('APIService.readRemoteData (Production/File) -> response is : ' + 
                                ' code: ' + String(response.status) + 
                                ', message: ' + response.statusText + 
                                ', Date: ' + this.responseDate );
                        } else {
                            this.response = response.data.entries;
                            this.responseDate = JSON.stringify(response.data.date);
                            console.log('APIService.readRemoteData (Service) -> response is : ' + 
                                ' code: ' + String(response.status) + 
                                ', message: ' + response.statusText + 
                                ', Date: ' + this.responseDate);
                        }
                    }
                    this.status = { code: response.status, message: response.statusText };
                    this.hasData = true;
                    this.wasExecuted = true;
                    this.responseDate = '';
                    console.log('APIService.readRemoteData -> response is : ' + 
                        ' code: ' + String(response.status) + 
                        ', message: ' + response.statusText + 
                        ', JSON (Date): ' + this.responseDate);
                })
                .catch(error => {
                    this.hasData = false;
                    this.wasExecuted = false;
                    this.response = {};
                    this.status = { code: -1, message: error.message };
                    if (error.response) {
                        console.error(`APIService.readRemoteData -> ${error.response.headers}`);
                    } else if (error.request) {
                        console.error(`APIService.readRemoteData -> ${error.request}`);
                    } else {
                        console.error(`APIService.readRemoteData -> ${error.message}`);
                    }
                    console.error(`APIService.readRemoteData -> ${error.config}`);
                    throw error;
                })
            } catch(error) {
                this.status = { code: -1, message: `APIService.readRemoteData -> Error reading JSON from URL [${URL}]: ${error}` };
                console.error(this.status.message);
                throw error;
            }
        }
        return await this.response;        
    }
    execRequestLocal() {
        let result;
        this.setFileLocalOn();
        result = this.readLocalData();
        console.log('APIService.execRequestLocal -> ' + 
            (this.isValidResponseStatus() ? 'OK' : 'ERROR') + 
            ' code: ' + String(this.status.code) + 
            ' message: ' + this.status.message);
        return result;
    }
    execRequestService() {
        let result;
        this.setServiceLocalOn();
        result = this.readRemoteData();
        console.log('APIService.execRequestService -> ' + 
            (this.isValidResponseStatus() ? 'OK' : 'ERROR') + 
            ' code: ' + String(this.status.code) + 
            ' message: ' + this.status.message);
        return result;
    }    
    execRequestProduction() {
        let result;
        this.setProductionOn();
        result = this.readRemoteData();
        console.log('APIService.execRequestProduction -> ' + 
            (this.isValidResponseStatus() ? 'OK' : 'ERROR') + 
            ' code: ' + String(this.status.code) + 
            ' message: ' + this.status.message);
        return result;
    }    
    async execRequest() {
        let result;

        // if (process.env.LOCAL === undefined || process.env.LOCAL === null) this.setServiceLocalOn();
        // if (process.env.LOCAL === 'Production') this.setProductionOn();
        // if (process.env.LOCAL === 'Service') this.setServiceLocalOn();
        // if (process.env.LOCAL === 'File') this.setFileLocalOn();

        console.log('APIService.execRequest (Local) -> %s (Global %s)',this.localName, process.env.LOCAL);
        if (this.isfilelocal) {
            result = this.readLocalData();
        } else {
            result = this.readRemoteData();
        }
        console.log('APIService.execRequest -> ' + 
            (this.isValidResponseStatus() ? 'OK' : 'ERROR') + 
            ' code: ' + String(this.status.code) + 
            ' message: ' + this.status.message);
        return await result;
    }
    isValidResponseStatus() { return this.status.code === 0 || this.status.code === 200 ? true : false; }
    getResponseStatusCode() { return this.status.code; }
    getResponseStatusMessage() { return this.status.message; }
    getResponseData() { return this.response; }
    getProgramacaoDiaria() {
        return execRequest()
    }
}
