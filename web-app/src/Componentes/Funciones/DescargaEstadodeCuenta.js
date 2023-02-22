/*const downloadEmailAttachments = require("download-email-attachments");
const moment = require("moment");
const opDir = "/Users/miguel/Desktop/Prueba_Descarga";
//const opDir = "C:/Users/admin/Desktop/Attachments";
const email = "cominicartewebapp@gmail.com";
const password = "Banana12#";
const port = 993;
const host = "imap.gmail.com";
const todaysDate = moment().format("2022-11-25");
var reTry = 1;



  var paraObj = {
    invalidChars: /\W/g,
    account: `"${email}":${password}@${host}:${port}`, // all options and params
    //besides account are optional
    directory: opDir,
    filenameTemplate: "{filename}",
    // filenameTemplate: '{day}-{filename}',
    filenameFilter: /.pdf?$/,
    timeout: 10000,
    log: {
      warn: console.warn,
      debug: console.info,
      error: console.error,
      info: console.info,
    },
    since: todaysDate,
    lastSyncIds: ["234", "234", "5345"], // ids already dowloaded and ignored, helpful
    //because since is only supporting dates without time
    attachmentHandler: function (attachmentData, callback, errorCB) {
      console.log(attachmentData);
      callback();
    },
  };
  
  var onEnd = (result) => {
    if (result.errors || result.error) {
      console.log("Error ----> ", result);
      if (reTry < 4) {
        console.log("retrying....", reTry++);
        return downloadEmailAttachments(paraObj, onEnd);
      } else console.log("Failed to download attachment");
    } else console.log("done ----> ");
  };
  downloadEmailAttachments(paraObj, onEnd);
  

*/